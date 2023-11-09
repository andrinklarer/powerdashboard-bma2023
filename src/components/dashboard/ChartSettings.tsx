import React from "react";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

interface Props {
  label: string;
  description: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const ChartSetting: React.FC<Props> = ({ disabled = false, ...props }) => {
  if (disabled) {
    props.setState(false);
  }
  return (
    <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
      <input className="peer hidden" disabled={disabled}></input>
      <div className="!mt-0 space-y-0.5">
        <input className="peer hidden" disabled={disabled}></input>
        <label
          htmlFor={props.label}
          className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </label>
        <p className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {props.description}
        </p>
      </div>
      <Switch
        className="ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        id={props.label}
        checked={disabled ? false : props.state}
        onCheckedChange={() => {
          props.setState(!props.state);
        }}
        onClick={() => {
          if (disabled) {
            toast({
              title: "Achtung!",
              description:
                "Der Verbrauch muss eingeschaltet sein, um diese Funktion zu nutzen",
            });
          }
        }}
      />
    </div>
  );
};

export default ChartSetting;
