import React from "react";
import { Switch } from "./ui/switch";

interface Props {
  label: string;
  description: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChartSetting: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
      <div className="space-y-0.5">
        <label
          htmlFor="consumption"
          className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </label>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>
      <Switch
        id="consumption"
        checked={props.state}
        onCheckedChange={() => {
          props.setState(!props.state);
        }}
      />
    </div>
  );
};

export default ChartSetting;
