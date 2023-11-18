import { endOfMonth, format, getDaysInMonth, startOfMonth } from "date-fns";
import { de } from "date-fns/locale";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DiagrammType,
  amountOfEnergyProducedByNuclearReactorPerDay,
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  efficiencyOfSolarPanels,
  powerConsumptionOfElectricCarsPerDay,
  precentageOfElectricCars,
} from "~/lib/consts";
import { useIsMobile } from "~/lib/utils";
import { api } from "~/utils/api";
import LoadingPage from "../LoadingPage";
import CustomLegend from "./ChartLegend";
import CustomTooltip from "./ChartTooltip";

const PowerDashboardData = (dateRange: DateRange) =>
  api.powerDashboard.getAll.useQuery({
    from: dateRange.from!,
    to: dateRange.to!,
  });

const GroupedPowerDashboardData = (dateRange: DateRange) =>
  api.powerDashboard.getAllByMonth.useQuery({
    from: startOfMonth(dateRange.from!),
    to: endOfMonth(dateRange.to!),
  });

interface StackedAreaChartPlotProps {
  diagramType: DiagrammType;
  amount?: number;
  dateRange: DateRange;
  showConsumption?: boolean;
  hideNuclear?: boolean;
  showWater?: boolean;
  showLosses?: boolean;
  nuclearModifier?: number;
  solarEfficiency?: number;
  windTurbines?: number;
  electricCars?: boolean;
}

const StackedAreaChartPlot: React.FC<StackedAreaChartPlotProps> = ({
  diagramType,
  dateRange,
  showConsumption = true,
  hideNuclear = false,
  showWater = true,
  showLosses = false,
  nuclearModifier = amountOfNuclearPowerPlants,
  solarEfficiency = efficiencyOfSolarPanels,
  windTurbines = amountOfWindTurbines,
  electricCars = false,
}) => {
  const isMobile = useIsMobile();

  const powerDashboard =
    diagramType == DiagrammType.DAY
      ? PowerDashboardData(dateRange)
      : GroupedPowerDashboardData(dateRange);

  const { resolvedTheme } = useTheme();
  const [tickColor, setTickColor] = useState("#94A3B8");
  const [strokeColor, setStrokeColor] = useState("#FFF");

  useEffect(() => {
    if (resolvedTheme) {
      setTickColor(resolvedTheme === "dark" ? "#94A3B8" : "#64748B");
      setStrokeColor(resolvedTheme === "dark" ? "#FFF" : "#000");
    }
  }, [resolvedTheme]);

  if (!powerDashboard.data) {
    return <LoadingPage />;
  }

  const roundData = (value: number) =>
    value > 1000 ? roundingToZeroDezimals(value) : roundingToOneDezimal(value);

  const daysPerDataPoint = (date: Date) => {
    return diagramType === DiagrammType.MONTH ? getDaysInMonth(date) : 1;
  };

  const roundingToOneDezimal = (value: number) => Math.round(value * 10) / 10;
  const roundingToZeroDezimals = (value: number) => Math.round(value);

  const calculateNuclear = (value: number, date: Date) =>
    hideNuclear
      ? 0
      : nuclearModifier > 4
        ? roundData(
            value +
              amountOfEnergyProducedByNuclearReactorPerDay *
                (nuclearModifier - 4) *
                daysPerDataPoint(date),
          )
        : roundData((value / 4) * nuclearModifier);

  const calculateRiver = (value: number) => roundData(value);

  const calculateStoragePower = (value: number) => roundData(value);

  const calculateThermic = (value: number) => roundData(value);

  const calculateSolar = (value: number) =>
    roundData((value / efficiencyOfSolarPanels) * solarEfficiency);

  const calculateWind = (value: number) =>
    roundData((value / amountOfWindTurbines) * windTurbines);

  const calculateTotalProduction = (item: {
    id?: number;
    date: Date;
    Flusskraft: number;
    Kernkraft: number;
    Speicherkraft: number;
    Thermische: number;
    Photovoltaik: number;
    Wind: number;
    Verlust: number;
    Verbrauch: number;
  }) => {
    return roundData(
      calculateRiver(item.Flusskraft) +
        calculateNuclear(item.Kernkraft, item.date) +
        calculateStoragePower(item.Speicherkraft) +
        calculateThermic(item.Thermische) +
        calculateSolar(item.Photovoltaik) +
        calculateWind(item.Wind),
    );
  };

  const calculateConsumption = (value: number, date: Date) => {
    if (diagramType === DiagrammType.DAY) {
      return Math.round(
        value +
          (electricCars
            ? (powerConsumptionOfElectricCarsPerDay /
                precentageOfElectricCars) *
                100 -
              powerConsumptionOfElectricCarsPerDay
            : 0),
      );
    } else {
      return Math.round(
        value +
          (electricCars
            ? ((powerConsumptionOfElectricCarsPerDay * getDaysInMonth(date)) /
                precentageOfElectricCars) *
                100 -
              powerConsumptionOfElectricCarsPerDay * getDaysInMonth(date)
            : 0),
      );
    }
  };

  const modifiedData = powerDashboard.data.map((item) => {
    return {
      date: item.date,
      Solar: calculateSolar(item.Photovoltaik),
      Wind: calculateWind(item.Wind),
      Thermische: calculateThermic(item.Thermische),
      Speicherkraft: calculateStoragePower(item.Speicherkraft),
      Flusskraft: calculateRiver(item.Flusskraft),
      Kernkraft: calculateNuclear(item.Kernkraft, item.date),
      Verbrauch: calculateConsumption(item.Verbrauch, item.date),
      Produktion: calculateTotalProduction(item),
      Bedarf: item.Verbrauch + item.Verlust,
    };
  });

  interface RenderTickProps {
    x: number;
    y: number;
    payload: {
      value: number;
    };
  }

  const renderTick = ({ x, y, payload }: RenderTickProps) => {
    return (
      <g transform={`translate(${x},${y})`}>
        {payload.value >= 10000 ? (
          <text x={0} y={0} dy={6} textAnchor="end" fill={tickColor}>
            {payload.value / 1000} <tspan fontSize={12}> TWh</tspan>
          </text>
        ) : (
          <text x={0} y={0} dy={6} textAnchor="end" fill={tickColor}>
            {payload.value} <tspan fontSize={12}> GWh</tspan>
          </text>
        )}
      </g>
    );
  };

  const renderMobileTick = ({ x, y, payload }: RenderTickProps) => {
    return (
      <g transform={`translate(${x},${y})`}>
        {payload.value >= 10000 ? (
          <text x={0} y={0} dy={5} textAnchor="end" fill={tickColor}>
            {payload.value / 1000}
            <tspan x={0} dy={12} fontSize={10} className="font-bold">
              TWh
            </tspan>
          </text>
        ) : (
          <text x={0} y={0} dy={5} textAnchor="end" fill={tickColor}>
            {payload.value}
            {payload.value !== 0 && (
              <tspan x={0} dy={12} fontSize={10} className="font-bold">
                GWh
              </tspan>
            )}
          </text>
        )}
      </g>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={modifiedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            tick={{ fill: tickColor }}
            dataKey="date"
            tickFormatter={(value: Date) =>
              `${format(
                value,
                diagramType === DiagrammType.DAY ? "dd.MM" : "LLL, yy",
                {
                  locale: de,
                },
              )}`
            }
          />
          <YAxis
            tick={isMobile ? renderMobileTick : renderTick}
            width={isMobile ? 45 : 75}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            content={<CustomLegend />}
          />

          <Tooltip
            content={<CustomTooltip diagramType={diagramType} />}
            labelStyle={{ fontWeight: "bold", borderBottom: "solid" }}
          />

          {!hideNuclear && (
            <Area
              type="monotone"
              dataKey="Kernkraft"
              stroke="#66E07E"
              stackId={1}
              fill="#66E07E"
            />
          )}
          {showWater && (
            <Area
              type="monotone"
              dataKey="Flusskraft"
              stroke="#40E0D0"
              stackId={1}
              fill="#40E0D0"
            />
          )}
          {showWater && (
            <Area
              type="monotone"
              dataKey="Speicherkraft"
              stroke="#0060FF"
              stackId={1}
              fill="#0060FF"
            />
          )}
          <Area
            type="monotone"
            dataKey="Solar"
            stroke="#FFDA57"
            stackId={1}
            fill="#FFDA57"
          />
          <Area
            type="monotone"
            dataKey="Thermische"
            stroke="#FF7C30"
            stackId={1}
            fill="#FF7C30"
          />
          <Area
            type="monotone"
            dataKey="Wind"
            stroke="#87CEEB"
            stackId={1}
            fill="#87CEEB"
          />
          {showConsumption && !showLosses && (
            <Area
              type="monotone"
              dataKey="Verbrauch"
              stroke={strokeColor}
              strokeWidth={2}
              stackId={2}
              fillOpacity={0}
            />
          )}
          {showLosses && (
            <Area
              type="monotone"
              dataKey="Bedarf"
              stroke={strokeColor}
              strokeWidth={2}
              stackId={2}
              fillOpacity={0}
            />
          )}
          <Area
            type="monotone"
            dataKey="Produktion"
            stroke={strokeColor}
            strokeWidth={0}
            stackId={3}
            fillOpacity={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
export default StackedAreaChartPlot;
