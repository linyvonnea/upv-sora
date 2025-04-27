"use client";

import * as React from "react";
import { Calendar } from "./calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Date</span>
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="w-full text-left border rounded px-3 py-2 bg-background">
            {date ? date.toLocaleDateString() : "Date of Event"}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
