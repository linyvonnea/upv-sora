"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Step1Props {
  formData: {
    title: string;
    date: Date | undefined;
    description: string;
  };
  setFormData: (data: any) => void;
  onNext: (type: "on-campus" | "online" | "off-campus") => void;
}

export function EventRequestStep1({ formData, setFormData, onNext }: Step1Props) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Event Name</Label>
        <Input
          placeholder="e.g., Komsai Week 2025"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label>Date</Label>
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "w-full text-left px-3 py-2 border rounded-md",
                !formData.date && "text-muted-foreground"
              )}
            >
              {formData.date ? format(formData.date, "PPP") : "Pick a date"}
              <CalendarIcon className="ml-2 inline h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[9999]" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => {
                setFormData({ ...formData, date });
                setDatePickerOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-1">
        <Label>Event Description</Label>
        <Textarea
          rows={4}
          placeholder="Briefly describe your event..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label>Event Type</Label>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 border rounded-md hover:bg-muted"
            onClick={() => onNext("on-campus")}
          >
            On Campus
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md hover:bg-muted"
            onClick={() => onNext("online")}
          >
            Online
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md hover:bg-muted"
            onClick={() => onNext("off-campus")}
          >
            Off Campus
          </button>
        </div>
      </div>
    </div>
  );
}
