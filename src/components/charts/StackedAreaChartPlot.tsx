import { format } from "date-fns";
import { de } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  defaultChartSize,
  efficiencyOfSolarPanels,
  powerConsumptionOfElectricCarsPerDay,
  precentageOfElectricCars,
} from "~/lib/consts";
import { api } from "~/utils/api";
import CustomTooltip from "./ChartTooltip";
import { useTheme } from "next-themes";
import CustomLegend from "./ChartLegend";
import { useEffect, useState } from "react";
import { useIsMobile } from "~/lib/utils";
import LoadingPage from "../LoadingPage";

const PowerDashboardData = (amount: number, dateRange: DateRange) =>
  api.powerDashboard.getAll.useQuery({
    amount,
    from: dateRange.from!,
    to: dateRange.to!,
  });

interface StackedAreaChartPlotProps {
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
  amount = defaultChartSize,
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

  const powerDashboard = PowerDashboardData(amount, dateRange);

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

  /* Kernkraft */
  const calculateNuclear = (value: number) =>
    hideNuclear
      ? 0
      : Math.round(
          (value / amountOfNuclearPowerPlants) * nuclearModifier * 10,
        ) / 10;

  /* Kernkraft */
  const calculateRiver = (value: number) => value;

  /* Speicherkraft */
  const calculateStoragePower = (value: number) => value;

  /* Thermische */
  const calculateThermic = (value: number) => value;

  /* Photovoltaik */
  const calculateSolar = (value: number) =>
    Math.round((value / efficiencyOfSolarPanels) * solarEfficiency * 10) / 10;

  /* Wind */
  const calculateWind = (value: number) =>
    Math.round((value / amountOfWindTurbines) * windTurbines * 10) / 10;

  const calculateTotalProduction = (item: {
    id: number;
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
    return (
      Math.round(
        (calculateRiver(item.Flusskraft) +
          calculateNuclear(item.Kernkraft) +
          calculateStoragePower(item.Speicherkraft) +
          calculateThermic(item.Thermische) +
          calculateSolar(item.Photovoltaik) +
          calculateWind(item.Wind)) *
          10,
      ) / 10
    );
  };

  const calculateConsumption = (value: number) => {
    return Math.round(
      value +
        (electricCars
          ? (powerConsumptionOfElectricCarsPerDay / precentageOfElectricCars) *
              100 -
            powerConsumptionOfElectricCarsPerDay
          : 0),
    );
  };

  const modifiedData = powerDashboard.data.map((item) => {
    return {
      date: item.date,
      Solar: calculateSolar(item.Photovoltaik),
      Wind: calculateWind(item.Wind),
      Thermische: calculateThermic(item.Thermische),
      Speicherkraft: calculateStoragePower(item.Speicherkraft),
      Flusskraft: calculateRiver(item.Flusskraft),
      Kernkraft: calculateNuclear(item.Kernkraft),
      Verbrauch: calculateConsumption(item.Verbrauch),
      Produktion: calculateTotalProduction(item),
      Verlust: item.Verlust,
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
        <text x={0} y={0} dy={6} textAnchor="end" fill={tickColor}>
          {payload.value} <tspan fontSize={12}> GWh</tspan>
        </text>
      </g>
    );
  };

  const renderMobileTick = ({ x, y, payload }: RenderTickProps) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={5} textAnchor="end" fill={tickColor}>
          {payload.value}
          {payload.value !== 0 && (
            <tspan x={0} dy={12} fontSize={10} className="font-bold">
              GWh
            </tspan>
          )}
        </text>
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
            tickFormatter={(value: Date) => `${format(value, "dd.MM")}`}
          />
          <YAxis
            tick={isMobile ? renderMobileTick : renderTick}
            width={isMobile ? 40 : 70}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            content={<CustomLegend />}
          />

          <Tooltip
            labelFormatter={(date: Date) =>
              `${format(date, "cccc, dd.MM.yyyy", { locale: de })}`
            }
            content={<CustomTooltip />}
            labelStyle={{ fontWeight: "bold", borderBottom: "solid" }}
            itemSorter={(i) =>
              [
                "Produktion",
                "Verbrauch",
                "Verlust",
                "Wind",
                "Thermische",
                "Solar",
                "Speicherkraft",
                "Flusskraft",
                "Kernkraft",
              ].indexOf(i.dataKey!.toString())
            }
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
