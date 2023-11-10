import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  darkLineLegendItem,
  lightLineLegendItem,
} from "../theme/lineLegendItem";

interface LegendPayload {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  const { resolvedTheme } = useTheme();
  const [icon, setIcon] = useState(darkLineLegendItem);

  useEffect(() => {
    if (resolvedTheme) {
      setIcon(
        resolvedTheme === "dark" ? darkLineLegendItem : lightLineLegendItem,
      );
    }
  }, [resolvedTheme]);

  return (
    <div className="grid translate-x-4 grid-cols-3 justify-center justify-items-start sm:flex sm:grid-cols-6 sm:justify-items-center">
      {payload!
        .filter((data) => data.value !== "Produktion")
        .map((entry, index) => (
          <span key={index}>
            {(entry.value === "Verbrauch" || entry.value === "Bedarf") && (
              <div className="legend-item flex"></div>
            )}
            <div key={`item-${index}`} className="legend-item flex">
              {entry.value === "Verbrauch" || entry.value === "Bedarf" ? (
                <>{icon}</>
              ) : (
                <span
                  className="legend-color"
                  style={{ backgroundColor: entry.color, opacity: 0.6 }}
                />
              )}
              <span>{entry.value}</span>
            </div>
          </span>
        ))}
      <style>{`
        .legend-item {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
        .legend-color {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default CustomLegend;
