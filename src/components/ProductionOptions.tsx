import { HoverTooltip } from "./HoverTooltip";
import QuantityInput from "./NumberInput";

interface Props {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  iconPath: string;
  text: string;
  tooltip: string;
  min: number;
  max: number;
  defaultValue: number;
}

const ProductionOptions: React.FC<Props> = (props) => {
  return (
    <div className="sheet flex flex-row items-center justify-between rounded-lg border bg-slate-200 p-4 ">
      <div className="flex items-center space-x-8">
        <div className="h-16 w-16">
          <img src={props.iconPath}></img>
        </div>
        <div className="flex space-x-2 font-semibold">
          <p className="text-md font-medium leading-none">{props.text}</p>
          {/* https://www.ensi.ch/de/themen/kernkraftwerke-schweiz/ */}
          <HoverTooltip text={props.tooltip}></HoverTooltip>
        </div>
      </div>
      <QuantityInput
        min={props.min}
        max={props.max}
        setValue={props.setAmount}
        defaultValue={props.defaultValue}
      ></QuantityInput>
    </div>
  );
};

export default ProductionOptions;
