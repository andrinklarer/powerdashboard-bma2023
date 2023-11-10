import Image from "next/image";
import QuantityInput from "../NumberInput";
import { ReactElement, use, useEffect } from "react";
import { Button } from "../ui/button";
import { InformationPopover } from "../InformationPopover";
import { useIsMobile } from "~/lib/utils";
import { ScenarioDialog } from "../ScenarioDialog";
import { Switch } from "../ui/switch";
import { stat } from "fs";
import { toast } from "../ui/use-toast";

interface ScenarioOptionsProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  disabled: boolean;
  iconPath: string;
  text: string;
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
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 px-2 sm:p-4 ">
      {isMobile ? (
        <ScenarioDialog
          dialogTitle={props.dialogTitle}
          dialogDescription={props.dialogDescription}
          dialogContent={props.dialogContent}
          dialogTrigger={
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="h-8 w-8 sm:h-12 sm:w-12">
                <Image
                  alt={props.text}
                  width={64}
                  height={64}
                  src={`/${props.iconPath}`}
                />
              </div>
              <div className="flex items-center space-x-2 font-semibold">
                <p className="text-md font-medium leading-none">{props.text}</p>
                {!isMobile && (
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
                )}
              </div>
            </div>
          }
        ></ScenarioDialog>
      ) : (
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="h-8 w-8 sm:h-12 sm:w-12">
            <Image
              alt={props.text}
              width={64}
              height={64}
              src={`/${props.iconPath}`}
            />
          </div>
          <div className="flex items-center space-x-2 font-semibold">
            <p className="text-md font-medium leading-none">{props.text}</p>
            {!isMobile && (
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
            )}
          </div>
        </div>
      )}
      <input className="peer hidden" disabled={props.disabled}></input>
      <Switch
        className="ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        checked={props.disabled ? false : props.state}
        onCheckedChange={() => {
          props.setState(!props.state);
        }}
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
