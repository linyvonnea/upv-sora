"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventRequestDialog } from "./event-request-dialog";

export function EventRequestTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#284b3e] hover:bg-[#284b3e]/90 text-white">
        Request an Event
      </Button>
      <EventRequestDialog open={open} onOpenChange={setOpen} />
    </>
  );
}