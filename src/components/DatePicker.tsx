"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "./../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Create props to pass usestate so date is available in parent component

interface ProductionOptionsProps {
  upperLimit: Date;
  lowerLimit: Date;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({
  upperLimit,
  lowerLimit,
  date,
  setDate,
}: ProductionOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>W&auml;hle ein Startdatum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          fromDate={lowerLimit}
          toDate={upperLimit}
          mode="single"
          selected={date}
          onSelect={(day) => {
            if (day) {
              setDate(day);
            } else {
              setDate(date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
