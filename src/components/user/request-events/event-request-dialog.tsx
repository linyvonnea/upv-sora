"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventRequestStep1 } from "./EventRequestStep1";
import { EventRequestStep2 } from "./EventRequestStep2";
import { EventRequestSuccess } from "./EventRequestSuccess";
import { toast } from "sonner";

type EventType = "on-campus" | "online" | "off-campus" | null;

export function EventRequestDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [eventType, setEventType] = useState<EventType>(null);
  const [formData, setFormData] = useState<{
    title: string;
    date: Date | undefined;
    description: string;
    modality: string;
  }>({
    title: "",
    date: undefined,
    description: "",
    modality: "",
  });

  function handleSelectType(type: EventType) {
    setEventType(type);
    setStep(2);
  }

  function handleSubmitFinalForm() {
    setStep(3);
    toast.success("Event request submitted successfully!", {
      description: "Your event request has been received and is being processed.",
    });
  }

  function handleClose() {
    setStep(1);
    setEventType(null);
    setFormData({
      title: "",
      date: undefined,
      description: "",
      modality: "",
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request an Event</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <EventRequestStep1
            formData={formData}
            setFormData={setFormData}
            onNext={handleSelectType}
          />
        )}
        {step === 2 && eventType && (
          <EventRequestStep2
            eventType={eventType}
            formData={formData}
            onSubmit={handleSubmitFinalForm}
          />
        )}
        {step === 3 && <EventRequestSuccess onClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
}
