import Image from "next/image";
import { HoverTooltip } from "./HoverTooltip";
import QuantityInput from "./NumberInput";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import { InformationPopover } from "./InformationPopover";

interface ProductionOptionsProps {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  iconPath: string;
  text: string;
  tooltip: ReactElement;
  min?: number;
  max: number;
  defaultValue: number;
  step?: number;
}

const ProductionOptions: React.FC<ProductionOptionsProps> = ({
  step = 1,
  min = 0,
  ...props
}) => {
  return (
    <div className="sheet flex flex-row items-center justify-between rounded-lg border p-4 ">
      <div className="flex items-center space-x-8">
        <div className="h-16 w-16">
          <Image
            alt={props.text}
            width={64}
            height={64}
            src={`/${props.iconPath}`}
          />
        </div>
        <div className="flex items-center space-x-2 font-semibold">
          <p className="text-md font-medium leading-none">{props.text}</p>
          <InformationPopover
            popoverContent={props.tooltip}
            popoverTrigger={
              <Button
                className="h-5 w-5 rounded-full"
                size="icon"
                variant="outline"
              >
                i
              </Button>
            }
          ></InformationPopover>
        </div>
      </div>
      <QuantityInput
        min={min}
        max={props.max}
        step={step}
        setValue={props.setAmount}
        defaultValue={props.defaultValue}
      ></QuantityInput>
    </div>
  );
};

export default ProductionOptions;
