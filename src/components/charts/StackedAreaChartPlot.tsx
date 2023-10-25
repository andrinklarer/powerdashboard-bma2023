import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  defaultChartSize,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import { api } from "~/utils/api";

const DetailedConsumptionData = (amount: number) =>
  api.powerConsumption.getLossesOfLastN.useQuery({
    amount,
  });

const ConsumptionData = (amount: number) =>
  api.powerConsumption.getLastN.useQuery({
    amount,
  });

const TotalProductionData = (amount: number) =>
  api.powerProduction.getAllGroupedByDate.useQuery({ amount });

const DetailedProductionData = (amount: number) =>
  api.powerProduction.getAllSeperated.useQuery({
    amount,
  });

const PowerDashboardData = (amount: number) =>
  api.powerDashboard.getAll.useQuery({ amount });

interface StackedAreaChartPlotProps {
  amount?: number;
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
  showConsumption = true,
  hideNuclear = false,
  showWater = true,
  showLosses = false,
  nuclearModifier = amountOfNuclearPowerPlants,
  solarEfficiency = efficiencyOfSolarPanels,
  windTurbines = amountOfWindTurbines,
}) => {
  // const detailedProductionData = DetailedProductionData(amount);
  // const detailedConsumptionData = DetailedConsumptionData(amount);
  // const consumptionData = ConsumptionData(amount);
  // const productionData = TotalProductionData(amount);
  const powerDashboard = PowerDashboardData(amount);

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

  const modifyData = powerDashboard.data.map((item) => {
    return {
      date: `${item.date.getDate()}.${
        item.date.getMonth() + 1
      }.${item.date.getFullYear()}`,
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

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={modifyData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => "Datum: " + `${date}`}
            labelStyle={{ fontWeight: "bold", borderBottom: "solid" }}
            itemSorter={(i) =>
              [
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
            fill="url(#colorUv)"
          />
          {showConsumption && (
            <Area
              type="monotone"
              dataKey="Verbrauch"
              stroke="#000"
              strokeWidth={3}
              stackId={2}
              fillOpacity={0}
            />
          )}
          <Area
            type="monotone"
            dataKey="Produktion"
            stroke="#000"
            strokeWidth={0}
            stackId={3}
            fillOpacity={0}
          />
          {showLosses && (
            <Area
              type="monotone"
              dataKey="Verlust"
              stroke="#000"
              strokeWidth={1}
              stackId={2}
              fillOpacity={0}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
export default StackedAreaChartPlot;
