import { ReactElement, useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface InformationPopoverProps {
  popoverContent: ReactElement;
  popoverTrigger: ReactElement;
}

export const InformationPopover = ({
  popoverContent,
  popoverTrigger,
}: InformationPopoverProps) => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {popoverTrigger}
      </PopoverTrigger>
      <PopoverContent className="max-w-md p-3 pb-1.5 pt-1.5	text-sm font-bold">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
};
