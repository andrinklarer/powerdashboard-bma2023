import { useEffect, type ReactElement } from "react";
import { useIsMobile } from "~/lib/utils";
import { ScenarioDialog } from "../ScenarioDialog";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

interface ScenarioOptionsProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  disabled: boolean;
  iconPath: string;
  title: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogContent: ReactElement;
}

const ScenarioOptions: React.FC<ScenarioOptionsProps> = ({ ...props }) => {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (props.disabled) {
      props.setState(false);
    }
  }, [props.disabled, props.setState]);

  return isMobile ? (
    <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
      <ScenarioDialog
        dialogTitle={props.dialogTitle}
        dialogDescription={props.dialogDescription}
        dialogContent={props.dialogContent}
        dialogTrigger={
          <div className="!mt-0 space-y-0.5">
            <label
              htmlFor={props.title}
              className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.title}
            </label>
            <p className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Rein elektrischer, privater Personenverkehr
            </p>
          </div>
        }
      />
      <input className="peer hidden" disabled={props.disabled}></input>
      <Switch
        className="ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        checked={props.disabled ? false : props.state}
        onCheckedChange={() => !props.disabled && props.setState(!props.state)}
        onClick={() => {
          if (props.disabled) {
            toast({
              title: "Achtung!",
              description:
                "Der Verbrauch muss eingeschaltet sein, um diese Funktion zu nutzen",
            });
          }
        }}
      />
    </div>
  ) : (
    <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="flex items-center space-x-2">
          <div className="!mt-0 space-y-0.5">
            <input className="peer hidden" disabled={props.disabled}></input>
            <div className="!mt-0 space-x-2">
              <input className="peer hidden" disabled={props.disabled}></input>

              <label
                htmlFor={props.title}
                className="!ml-0  text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {props.title}
              </label>
              <ScenarioDialog
                dialogTitle={props.dialogTitle}
                dialogDescription={props.dialogDescription}
                dialogContent={props.dialogContent}
                dialogTrigger={
                  <Button
                    className="m-0 h-6 w-6 rounded-full p-0"
                    size="icon"
                    variant="outline"
                  >
                    i
                  </Button>
                }
              ></ScenarioDialog>
            </div>
            <p className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Rein elektrischer, privater Personenverkehr
            </p>
          </div>
        </div>
      </div>
      <input className="peer hidden" disabled={props.disabled}></input>
      <Switch
        id={props.title}
        className="ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        checked={props.disabled ? false : props.state}
        onCheckedChange={() => !props.disabled && props.setState(!props.state)}
        onClick={() => {
          if (props.disabled) {
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

export default ScenarioOptions;
