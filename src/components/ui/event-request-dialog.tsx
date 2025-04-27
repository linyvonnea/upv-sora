"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export function EventRequestDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [eventName, setEventName] = React.useState("");
  const [modality, setModality] = React.useState("On Campus");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Request Event</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-8 rounded-xl">
        <div className="mb-4">
          <div className="flex justify-center mb-4">
            <Progress value={50} className="w-1/2" />
          </div>
          {/* Use DialogTitle for accessibility */}
          <DialogTitle className="text-2xl font-bold mb-1 text-center">Event Details</DialogTitle>
          <div className="h-1 w-10 bg-primary rounded-full mb-4 mx-auto" />
        </div>
        {/* 3. Input Box */}
        <div className="mb-2">
          <Label htmlFor="event-name" className="mb-1 block">
            Name
          </Label>
          <Input
            id="event-name"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        {/* 4. Date Picker Component */}
        <div className="mb-2">
          <DatePicker />
        </div>
        {/* 5. Modality Drop-Down */}
        <div className="mb-8">
          <Label className="mb-1 block">Modality</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {modality}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onSelect={() => setModality("Online")}>Online</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setModality("On Campus")}>
                On Campus
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setModality("Off Campus")}>
                Off Campus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* 6. Buttons - Cancel and Save */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
