import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

interface StackedAreaChartPlotProps {
  amount?: number;
  showConsumption?: boolean;
  showNuclear?: boolean;
  showWater?: boolean;
  showLosses?: boolean;
}

const StackedAreaChartPlot: React.FC<StackedAreaChartPlotProps> = ({
  amount = 100,
  showConsumption = true,
  showNuclear = true,
  showWater = true,
  showLosses = false,
}) => {
  const detailedProductionData = DetailedProductionData(amount);
  const detailedConsumptionData = DetailedConsumptionData(amount);
  const consumptionData = ConsumptionData(amount);
  const productionData = TotalProductionData(amount);

  if (
    !detailedProductionData.data ||
    !consumptionData.data ||
    !productionData.data ||
    !detailedConsumptionData.data
  ) {
    return <div>Something went wrong!</div>;
  }

  if (!consumptionData) return;

  const mergedData = detailedProductionData.data.map((prodItem) => {
    const correspondingConsumptionItem = consumptionData.data.find(
      (entry) => entry.date.toDateString() === prodItem.date.toDateString(),
    );
    const correspondingTotalProductionItem = productionData.data.find(
      (entry) => entry.date.toDateString() === prodItem.date.toDateString(),
    );
    const correspondingDetailedConsumptionItem =
      detailedConsumptionData.data.find(
        (entry) => entry.date.toDateString() === prodItem.date.toDateString(),
      );
    return {
      date: `${prodItem.date.getDate()}.${
        prodItem.date.getMonth() + 1
      }.${prodItem.date.getFullYear()}`,
      Solar: prodItem.Solar,
      Wind: prodItem.Wind,
      Thermische: prodItem.Thermische,
      Speicherkraft: prodItem.Speicherkraft,
      Flusskraft: prodItem.Flusskraft,
      Kernkraft: prodItem.Kernkraft,
      Verbrauch: correspondingConsumptionItem
        ? correspondingConsumptionItem.consumption
        : 0,
      Produktion: correspondingTotalProductionItem
        ? correspondingTotalProductionItem.production
        : 0,
      Verlust: correspondingDetailedConsumptionItem
        ? correspondingDetailedConsumptionItem.losses
        : 0,
    };
  });

  console.log(mergedData);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={mergedData}
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
          <XAxis dataKey="date" stroke="#D3D3D3" />
          <YAxis stroke="#D3D3D3" />
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
          {showNuclear && (
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
