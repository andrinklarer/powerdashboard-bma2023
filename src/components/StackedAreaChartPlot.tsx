import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { api } from "~/utils/api";

const StackedAreaChartPlot = () => {
  const { data } = api.powerProduction.getAllSeperated.useQuery();

  console.log(data);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
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
            itemSorter={(i) =>
              [
                "Wind",
                "Thermische",
                "Solar",
                "Kernkraft",
                "Speicherkraft",
                "Flusskraft",
              ].indexOf(i.dataKey!.toString())
            }
          />
          <Area
            type="monotone"
            dataKey="Flusskraft"
            stroke="#8884d8"
            stackId={1}
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="Speicherkraft"
            stroke="#ADD8E6"
            stackId={1}
            fill="#ADD8E6"
          />
          <Area
            type="monotone"
            dataKey="Kernkraft"
            stroke="#82ca9d"
            stackId={1}
            fill="#82ca9d"
          />
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
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
export default StackedAreaChartPlot;
