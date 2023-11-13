"use client";

import {
  addDays,
  addMonths,
  closestTo,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  subDays,
  subMonths,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { de } from "date-fns/locale";
import { useEffect } from "react";
import { DiagrammType } from "~/lib/consts";
import { cn, useIsMobile } from "./../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DateRangePickerProps {
  diagramType: DiagrammType;
  upperLimit: Date;
  lowerLimit: Date;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export function DateRangePicker({
  diagramType,
  upperLimit,
  lowerLimit,
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  const isMobile = useIsMobile();

  const [date, setDate] = React.useState<DateRange>({
    from: dateRange.from,
    to: dateRange.to,
  });
  const [datePickerOpen, setDatePickerOpen] = React.useState<boolean>(false);

  const apply = () => {
    if (
      diagramType === DiagrammType.MONTH &&
      isSameMonth(date.to!, date.from!)
    ) {
      setDateRange({ from: subMonths(date.from!, 1), to: date.to! });
    } else {
      setDateRange(date);
    }

    setDatePickerOpen(false);
  };

  useEffect(() => {
    setDate({ from: dateRange.from, to: dateRange.to });
  }, [dateRange]);

  const changeOpen = (open: boolean) => {
    setDatePickerOpen(open);

    if (!open) {
      setDate({
        from: dateRange.from,
        to: dateRange.to,
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
              "w-fit justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                diagramType === DiagrammType.DAY ? (
                  <>
                    {format(dateRange.from, "LLL dd, y", {
                      locale: de,
                    })}{" "}
                    -{" "}
                    {format(dateRange.to, "LLL dd, y", {
                      locale: de,
                    })}
                  </>
                ) : (
                  <>
                    {format(dateRange.from, "LLL, y", {
                      locale: de,
                    })}{" "}
                    -{" "}
                    {format(dateRange.to, "LLL, y", {
                      locale: de,
                    })}
                  </>
                )
              ) : (
                format(dateRange.from, "LLL dd, y", {
                  locale: de,
                })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-3 w-auto p-0" align="start">
          <Calendar
            locale={de}
            fromDate={lowerLimit}
            toDate={upperLimit}
            pagedNavigation={diagramType === DiagrammType.MONTH}
            mode="range"
            defaultMonth={isMobile ? date.to! : subMonths(date.to!, 1)}
            selected={date}
            fixedWeeks
            onSelect={(range, selected) => {
              if (diagramType === DiagrammType.DAY) {
                if (isSameDay(selected, date.from!)) {
                  setDate({ from: selected, to: addDays(selected, 1) });
                } else if (isSameDay(selected, date.to!)) {
                  setDate({ from: subDays(selected, 1), to: selected });
                } else {
                  const closest = closestTo(selected, [date.from!, date.to!]);
                  if (isSameDay(closest!, date.from!)) {
                    setDate({ from: selected, to: date.to! });
                  } else {
                    setDate({ from: date.from!, to: selected });
                  }
                  // setDate(range!);
                }
              } else {
                if (
                  isSameMonth(selected, date.from!) &&
                  isSameDay(selected, date.from!)
                ) {
                  setDate({ from: selected, to: addMonths(selected, 1) });
                } else if (
                  isSameMonth(selected, date.to!) &&
                  isSameDay(selected, date.to!)
                ) {
                  setDate({ from: subMonths(selected, 1), to: selected });
                } else if (
                  isSameMonth(selected, date.from!) &&
                  isAfter(selected, date.from!)
                ) {
                  setDate({ from: selected, to: date.to! });
                } else {
                  setDate(range!);
                }
              }
            }}
            numberOfMonths={isMobile ? 1 : 2}
            initialFocus
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
