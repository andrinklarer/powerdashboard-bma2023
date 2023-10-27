import { format } from "date-fns";
import { de } from "date-fns/locale";
import React from "react";
import { Separator } from "../ui/separator";

interface Payload {
  name: string;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: Date;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload?.length && label) {
    return (
      <div
        className="border-gray-20 border-solid bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-80"
        style={{
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p className="text-md m-0 border-b-2 border-black font-semibold dark:border-white">
          {`${format(label, "cccc, dd.MM.yyyy", { locale: de })}`}{" "}
        </p>
        {payload
          .map((entry, index) => (
            <div key={`entry-${index}`}>
              {entry.name === "Wind" && <Separator />}
              <div
                className="flex justify-between"
                style={{ color: entry.color }}
              >
                <span className="font-semibold">{entry.name}:</span>
                <div>
                  <span
                    className=""
                    style={{ fontWeight: "bold", marginLeft: "5px" }}
                  >
                    {entry.value}
                  </span>
                  <span className="text-sm"> GWh</span>
                </div>
              </div>
            </div>
          ))
          .reverse()}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
