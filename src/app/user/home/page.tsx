"use client";

import * as React from "react";
import { EventRequestDialog } from "@/components/ui/event-request-dialog";
import { EventDetails } from "@/components/left-event-details";

export default function UserHomePage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <EventRequestDialog open={open} setOpen={setOpen} />
    </div> 
  );
}
