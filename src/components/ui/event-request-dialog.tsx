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
import DragFileUpload from "@/components/ui/drag-file-upload";
import FileUploadForm from "@/components/ui/file-upload-form";
import { toast } from "sonner"; // Add this import at the top

export function EventRequestDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [step, setStep] = React.useState(1);
  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState<Date | undefined>(undefined);
  const [modality, setModality] = React.useState("Online");

  const handleNext = () => {
    if (step === 1) {
      const missing: string[] = [];
      if (!eventName.trim()) missing.push("Name");
      if (!eventDate) missing.push("Date of Event");
      if (!modality) missing.push("Modality");

      if (missing.length > 0) {
        toast.error(`Please fill in the following required field(s): ${missing.join(", ")}`);
        return;
      }
      setStep(2);
    } else {
      // Submit logic
      setOpen(false);
      setStep(1);
    }
  };

  const requiredDocuments = {
    Online: [
      "Request Letter",
      "Signed Conforme of Adviser",
      "Details of Activity",
      "Letter of Partnership",
    ],
    "On Campus": [
      "Request Letter",
      "Signed Conforme of Adviser",
      "Details of Activity",
      "Letter of Partnership",
      "Signed Security/Emergency Plan",
      "Signed Health Protocol",
      "Application Form for Use of UPV Venues/Facilities",
    ],
    "Off Campus": [
      "Request Letter",
      "Signed Conforme of Adviser",
      "Details of Activity",
      "Letter of Partnership",
      "Signed Security/Emergency Plan",
      "Signed Health Protocol",
      "Detailed Medical Arrangement with First Aid Kit",
      "Coordination with Concerned Offices (HSU/ASO/Local PNP/Brgy. Officials/Principals",
      "Waivers/Student Participation Agreement",
      "List of Participants with Emergency Contact Details",
      "Itinerary of Travel",
    ],
  };

  const keyDocuments = [
    "Request Letter",
    "Signed Conforme of Adviser",
    "Details of Activity",
    "Letter of Partnership",
  ];

  const UploadSection = ({ title }: { title: string }) => (
    <div className="mb-4">
      <Label className="block mb-1">{title}</Label>
      {keyDocuments.includes(title) ? <DragFileUpload /> : <FileUploadForm />}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Request Event</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-8 rounded-xl max-h-[90vh] overflow-y-auto">
        {" "}
        {/*make it scrollable */}
        <div className="mb-4">
          <div className="flex justify-center mb-4">
            <Progress value={step === 1 ? 50 : 100} className="w-1/2" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-1 text-center">
            {step === 1 ? "Event Details" : "Upload Requirements"}
          </DialogTitle>
          <div className="h-1 w-10 bg-primary rounded-full mb-4 mx-auto" />
        </div>
        {step === 1 && (
          <>
            <div className="mb-2">
              <Label htmlFor="event-name" className="mb-1 block">
                Name
              </Label>
              <Input
                id="event-name"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <DatePicker selected={eventDate} onSelect={setEventDate} />
            </div>

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
          </>
        )}
        {step === 2 && (
          <div className="space-y-4">
            {requiredDocuments[modality as keyof typeof requiredDocuments].map((doc) => (
              <UploadSection key={doc} title={doc} />
            ))}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button onClick={handleNext}>{step === 1 ? "Next" : "Submit"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
