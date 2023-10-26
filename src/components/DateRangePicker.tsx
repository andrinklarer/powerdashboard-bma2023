"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "./../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DateRangePickerProps {
  upperLimit: Date;
  lowerLimit: Date;
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DateRangePicker({
  upperLimit,
  lowerLimit,
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateRange?.from,
    to: dateRange?.to,
  });
  const [datePickerOpen, setDatePickerOpen] = React.useState<boolean>(false);

  const apply = () => {
    setDateRange(date);
    setDatePickerOpen(false);
  };
  const changeOpen = (open: boolean) => {
    setDatePickerOpen(open);

    if (!open) {
      setDate({
        from: dateRange?.from,
        to: dateRange?.to,
      });
    }
  };
  return (
    <div className={"grid gap-2"}>
      <Popover open={datePickerOpen} onOpenChange={changeOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            fromDate={lowerLimit}
            toDate={upperLimit}
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={date}
            onSelect={(range, selected) => {
              if (
                selected.toDateString() === date?.from?.toDateString() ||
                selected.toDateString() === date?.to?.toDateString()
              ) {
                setDate({ from: selected, to: selected });
              } else {
                setDate(range);
              }
            }}
            numberOfMonths={2}
          />
          <div className="w-full p-3">
            <Button className="w-full" variant={"secondary"} onClick={apply}>
              Anwenden
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
