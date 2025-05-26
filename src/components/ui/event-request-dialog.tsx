// src/components/ui/event-request-dialog.tsx
"use client";

import { db } from "@/lib/firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { EventRequestDialogProps } from "@/types/event-request";
import { useAuth } from "@/contexts/AuthContext";
import { EventRequestSuccess } from "@/components/user/event-request/EventRequestSuccess";
import { FilePondUploader } from "@/components/ui/filepond-uploader";

export function EventRequestDialog({
  open,
  setOpen,
  mode,
  initialData,
}: EventRequestDialogProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const [step, setStep] = React.useState(1);
  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState<Date | undefined>(undefined);
  const [modality, setModality] = React.useState<"Online" | "On Campus" | "Off Campus">("Online");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<
    Record<string, { url: string; size: number }>
  >({});

  React.useEffect(() => {
    if (initialData && open) {
      setEventName(initialData.title || "");
      setEventDate(initialData.eventDate ? new Date(initialData.eventDate + "T00:00") : undefined);
      setModality((initialData.modality as any) || "Online");

      if (initialData.files) {
        const upgradedFiles: Record<string, { url: string; size: number }> = {};

        for (const [label, value] of Object.entries(initialData.files)) {
          if (typeof value === "string") {
            upgradedFiles[label] = { url: value, size: 0 };
          } else if (typeof value === "object" && "url" in value) {
            upgradedFiles[label] = value as { url: string; size: number };
          }
        }

        setUploadedFiles(upgradedFiles);
      } else {
        setUploadedFiles({});
      }
    }
  }, [initialData, open]);

  const handleNext = async () => {
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
      if (!eventDate) {
        toast.error("Event date is missing.");
        return;
      }

      const eventDateStr = eventDate.toLocaleDateString("en-CA");

      if (mode === "edit") {
        if (!initialData?.id) {
          toast.error("Missing event ID for editing.");
          return;
        }
        try {
          // Remove any empty uploads before saving
          const cleanedFiles = Object.fromEntries(
            Object.entries(uploadedFiles).filter(([_, value]) => value.url)
          );

          await updateDoc(doc(db, "eventRequests", initialData.id), {
            title: eventName,
            eventDate: eventDateStr,
            modality,
            files: cleanedFiles,
          });
          toast.success("Request updated successfully!");
          setOpen(false);
          setStep(1);
        } catch (err) {
          console.error(err);
          toast.error("Failed to update request.");
        }
      } else {
        if (!user) {
          toast.error("You must be logged in to submit a request.");
          return;
        }

        try {
          await addDoc(collection(db, "eventRequests"), {
            title: eventName,
            eventDate: eventDateStr,
            requestDate: new Date().toLocaleDateString("en-CA"),
            modality,
            organizationId: user.uid, // id lang
            status: "Awaiting Evaluation",
            files: uploadedFiles,
            createdAt: serverTimestamp(),
          });

          setShowSuccess(true);
          setStep(1);
          setEventName("");
          setEventDate(undefined);
          setModality("Online");
          setUploadedFiles({});
        } catch (err) {
          console.error(err);
          toast.error("Failed to submit request.");
        }
      }
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

  const UploadSection = ({ title }: { title: string }) => (
    <div className="mb-4">
      <Label className="block mb-1" htmlFor={title}>{title}</Label>
      <FilePondUploader
        initialUrl={uploadedFiles[title]?.url}
        onUpload={({ url, size }) =>
          setUploadedFiles((prev) => ({
            ...prev,
            [title]: { url, size },
          }))
        }
        onRemove={() =>
          setUploadedFiles((prev) => {
            const updated = { ...prev };
            delete updated[title];
            return updated;
          })
        }
      />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full p-8 rounded-xl max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <EventRequestSuccess onClose={() => setOpen(false)} />
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-center mb-4">
                <Progress value={step === 1 ? 50 : 100} className="w-1/2" />
              </div>
              <DialogTitle className="text-2xl font-bold mb-1 text-center">
                {step === 1
                  ? mode === "edit"
                    ? "Edit Event Details"
                    : "Event Details"
                  : "Upload Requirements"}
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
                      <DropdownMenuItem onSelect={() => setModality("Online")}>
                        Online
                      </DropdownMenuItem>
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
                <div className="mb-4">
                  <span className="font-medium">Download Requirement Forms here: </span>
                  <a
                    href="https://drive.google.com/drive/folders/19_zBtUBtKYIaxL-V9b1BLRf6462zn-_u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Google Drive Link
                  </a>
                </div>
                {requiredDocuments[modality].map((doc) => (
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
              <Button onClick={handleNext}>
                {step === 1 ? "Next" : mode === "edit" ? "Update" : "Submit"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}