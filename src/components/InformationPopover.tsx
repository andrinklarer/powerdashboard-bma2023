import { ReactElement, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useIsMobile } from "~/lib/utils";

export interface InformationPopoverProps {
  popoverContent: ReactElement;
  popoverTrigger: ReactElement;
}

export const InformationPopover = ({
  popoverContent,
  popoverTrigger,
}: InformationPopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{popoverTrigger}</PopoverTrigger>
      <PopoverContent className="max-w-sm p-3 pb-1.5 pt-1.5	text-sm font-bold sm:max-w-md">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
};
