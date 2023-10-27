import { useTheme } from "next-themes";
import React from "react";

interface LegendPayload {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
}

const whiteSvg = (
  <svg
    className="recharts-surface mr-1 inline-block align-middle"
    width="14"
    height="14"
    viewBox="0 0 32 32"
  >
    <title></title>
    <desc></desc>
    <path
      stroke-width="4"
      fill="none"
      stroke="#FFF"
      d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
      className="recharts-legend-icon"
    ></path>
  </svg>
);

const svg = (
  <svg
    className="recharts-surface mr-1 inline-block align-middle"
    width="14"
    height="14"
    viewBox="0 0 32 32"
  >
    <title></title>
    <desc></desc>
    <path
      stroke-width="4"
      fill="none"
      stroke="#000"
      d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
      className="recharts-legend-icon"
    ></path>
  </svg>
);

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  const theme = useTheme();
  return (
    <div className="flex justify-center">
      {payload!
        .filter((data) => data.value !== "Produktion")
        .map((entry, index) => (
          <div key={`item-${index}`} className="legend-item">
            {entry.value === "Verbrauch" || entry.value === "Verlust" ? (
              <>{theme.theme === "dark" ? whiteSvg : svg}</>
            ) : (
              <span
                className="legend-color"
                style={{ backgroundColor: entry.color }}
              />
            )}
            <span>{entry.value}</span>
          </div>
        ))}
      <style>{`
        .legend-item {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
        .legend-color {
          width: 10px;
          height: 10px;
          display: inline-block;
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default CustomLegend;
