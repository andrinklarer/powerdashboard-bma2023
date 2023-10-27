/* eslint-disable  @typescript-eslint/no-explicit-any */

import { addDays, format } from "date-fns";
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
} from "~/lib/consts";
import { api } from "~/utils/api";
import CustomTooltip from "./ChartTooltip";
import { useTheme } from "next-themes";
import CustomLegend from "./ChartLegend";

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
}) => {
  const powerDashboard = PowerDashboardData(amount, dateRange);

  const theme = useTheme();

  if (!powerDashboard.data) {
    return <div>Data still loading!</div>;
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

  const modifiedData = powerDashboard.data.map((item) => {
    return {
      date: item.date,
      Solar: calculateSolar(item.Photovoltaik),
      Wind: calculateWind(item.Wind),
      Thermische: calculateThermic(item.Thermische),
      Speicherkraft: calculateStoragePower(item.Speicherkraft),
      Flusskraft: calculateRiver(item.Flusskraft),
      Kernkraft: calculateNuclear(item.Kernkraft),
      Verbrauch: item.Verbrauch,
      Produktion: calculateTotalProduction(item),
      Verlust: item.Verlust,
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
        <text x={0} y={0} dy={6} textAnchor="end" fill="#666">
          {payload.value} <tspan fontSize={12}>GWh</tspan>
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
            dataKey="date"
            tickFormatter={(value: Date) => `${format(value, "dd.MM")}`}
          />
          <YAxis tick={renderTick} width={70} />
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
              stroke="#82ca9d"
              stackId={1}
              fill="#82ca9d"
            />
          )}
          {showWater && (
            <Area
              type="monotone"
              dataKey="Flusskraft"
              stroke="#8884d8"
              stackId={1}
              fill="#8884d8"
            />
          )}
          {showWater && (
            <Area
              type="monotone"
              dataKey="Speicherkraft"
              stroke="#ADD8E6"
              stackId={1}
              fill="#ADD8E6"
            />
          )}
          <Area
            type="monotone"
            dataKey="Solar"
            stroke="#ffc658"
            stackId={1}
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey="Thermische"
            stroke="#4464d8"
            stackId={1}
            fill="#4464d8"
          />
          <Area
            type="monotone"
            dataKey="Wind"
            stroke="#8884d8"
            stackId={1}
            fill="#8884d8"
          />
          {showConsumption && (
            <Area
              type="monotone"
              dataKey="Verbrauch"
              stroke={theme.theme === "dark" ? "#fff" : "#000"}
              strokeWidth={3}
              stackId={2}
              fillOpacity={0}
            />
          )}
          {showLosses && (
            <Area
              type="monotone"
              dataKey="Verlust"
              stroke={theme.theme === "dark" ? "#fff" : "#000"}
              strokeWidth={1}
              stackId={2}
              fillOpacity={0}
            />
          )}
          <Area
            type="monotone"
            dataKey="Produktion"
            stroke={theme.theme === "dark" ? "#fff" : "#000"}
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
