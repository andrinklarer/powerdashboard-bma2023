import React from "react";

interface Payload {
  name: string;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
          {label}
        </p> */}
        {payload
          .map((entry, index) => (
            <div key={`item-${index}`} style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span>
              <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                {entry.value}
              </span>
              <span className="text-sm"> GWh</span>
              {entry.name === "Verbrauch" && <hr />}
            </div>
          ))
          .reverse()}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
