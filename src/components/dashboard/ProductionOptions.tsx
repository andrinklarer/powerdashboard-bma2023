import Image from "next/image";
import type { ReactElement } from "react";
import { useIsMobile } from "~/lib/utils";
import { InformationPopover } from "../InformationPopover";
import QuantityInput from "../NumberInput";
import { Button } from "../ui/button";

interface ProductionOptionsProps {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  iconPath: string;
  text: string;
  tooltip: ReactElement;
  min?: number;
  max: number;
  defaultValue: number;
}

const ProductionOptions: React.FC<ProductionOptionsProps> = ({
  min = 0,
  ...props
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 px-2 sm:p-4 ">
      {isMobile ? (
        <InformationPopover
          popoverContent={props.tooltip}
          popoverTrigger={
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
                  <InformationPopover
                    popoverContent={props.tooltip}
                    popoverTrigger={
                      <Button
                        className="m-0 h-6 w-6 rounded-full p-0"
                        size="icon"
                        variant="outline"
                      >
                        i
                      </Button>
                    }
                  ></InformationPopover>
                )}
              </div>
            </div>
          }
        ></InformationPopover>
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
              <InformationPopover
                popoverContent={props.tooltip}
                popoverTrigger={
                  <Button
                    className="m-0 h-6 w-6 rounded-full p-0"
                    size="icon"
                    variant="outline"
                  >
                    i
                  </Button>
                }
              ></InformationPopover>
            )}
          </div>
        </div>
      )}
      <QuantityInput
        min={min}
        max={props.max}
        setValue={props.setAmount}
        defaultValue={props.defaultValue}
      ></QuantityInput>
    </div>
  );
};

export default ProductionOptions;
