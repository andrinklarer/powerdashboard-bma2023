import { ReactElement } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export interface HoverTooltipProps {
  text: ReactElement;
  trigger: ReactElement;
}

export const HoverTooltip = ({ text, trigger }: HoverTooltipProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent className="max-w-md	">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
