import { format } from "date-fns";
import { de } from "date-fns/locale";
import React from "react";
import { Separator } from "../ui/separator";
import { DiagrammType } from "~/lib/consts";

interface Payload {
  name: string;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  diagramType: DiagrammType;
  payload?: Payload[];
  label?: Date;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  diagramType,
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
        <div className="mb-2 flex flex-wrap justify-center rounded bg-white bg-opacity-90 px-2 py-1 shadow-md dark:bg-black dark:bg-opacity-[0.6] dark:shadow-md ">
          <p className="m-0 text-center text-lg font-semibold ">
            {`${format(
              label,
              diagramType === DiagrammType.DAY
                ? "cccc, dd.MM.yyyy"
                : " LLLL yyyy",
              {
                locale: de,
              },
            )}`}
          </p>
        </div>
        {payload
          .map((entry, index) => (
            <div key={`entry-${index}`}>
              {entry.name === "Wind" && (
                <div className="mb-1 border-b-2 border-black dark:border-white"></div>
              )}
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
