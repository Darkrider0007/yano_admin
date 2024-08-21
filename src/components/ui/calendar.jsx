"use client";
import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./scroll-area";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  customYear = 10,
  onDayClick,
  ...props
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: customYear }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [monthToDisplay, setMonthToDisplay] = React.useState(
    new Date(currentYear, selectedMonth)
  );

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = React.useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = React.useState(false);

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  React.useEffect(() => {
    setMonthToDisplay(new Date(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear]);

  const [selectedDay, setSelectedDay] = React.useState(null);

  const handleDayClickInternal = (day, { selected }) => {
    const newSelectedDay = selected ? undefined : day;
    setSelectedDay(newSelectedDay);

    if (onDayClick) {
      onDayClick(newSelectedDay);
    }
  };

  return (
    <div className="px-4 rounded-md bg-white w-[300px] text-darkblue">
      <div className="flex justify-center gap-2 items-center">
        <DropdownMenu onOpenChange={(open) => setIsMonthDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Button variant="withOutline" className="text-darkblue bg-white ">
              <>
                {months[selectedMonth]}
                <ChevronDown
                  className={`h-4 w-4 ml-1 text-darkblue duration-600 ease-in-out transition-transform ${
                    isMonthDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {months.map((month, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleMonthChange(index)}>
                {month}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu onOpenChange={(open) => setIsYearDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Button variant="withOutline" className="text-darkblue bg-white ">
              <>
                {selectedYear}
                <ChevronDown
                  className={`h-4 w-4 ml-1 text-darkblue transition-transform ${
                    isYearDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-darkblue">
            <ScrollArea className="h-80">
              {years.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => handleYearChange(year)}>
                  {year}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        onDayClick={handleDayClickInternal}
        selected={selectedDay}
        className={cn("px-3", className)}
        classNames={{
          day_selected:
            "bg-[#00263E] text-white rounded-full hover:bg-[#00263E] focus:bg-[#00263E]",
          day_today: "bg-gray-300 text-darkblue rounded-full",
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "hidden",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-700 rounded-full"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex justify-between",
          head_cell: "text-darkblue w-9 text-[13px] font-semibold",
          row: "flex justify-between mt-2",
          cell: "h-9 w-9 text-center text-sm rounded-full p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-primary/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal text-darkblue aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_outside:
            "day-outside text-gray-400 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-lightgray",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight className="h-4 w-4 text-gray-700" />
          ),
        }}
        month={monthToDisplay}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
