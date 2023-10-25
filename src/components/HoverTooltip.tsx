import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export interface HoverTooltipProps {
  text: string;
}

export const HoverTooltip = ({ text }: HoverTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-5 w-5 rounded-full"
            size="icon"
            variant="outline"
          >
            i
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-md	">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
