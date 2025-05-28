"use client";

import * as React from "react";
import { Calendar } from "./calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="w-full text-left border rounded px-3 py-2 bg-background">
            {selected ? selected.toLocaleDateString() : "Date of Event"}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar mode="single" selected={selected} onSelect={onSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
