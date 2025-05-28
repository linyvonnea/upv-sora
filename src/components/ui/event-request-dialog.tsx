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
import { toast } from "@/hooks/use-toast";
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
  const [othersLink, setOthersLink] = React.useState(initialData?.othersLinks || "");

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

      setOthersLink(initialData.othersLinks || "");
    }
  }, [initialData, open]);

  const handleNext = async () => {
    if (step === 1) {
      const missing: string[] = [];
      if (!eventName.trim()) missing.push("Name of Event");
      if (!eventDate) missing.push("Date of Event");

      if (missing.length > 0) {
        toast({
          title: "Required fields missing",
          description: `Please fill in the following: ${missing.join(", ")}`,
          variant: "destructive",
        });
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() + 5);
      if (eventDate && eventDate < minDate) {
        toast({
          title: "Invalid Event Date",
          description: "Event date must be at least 5 days from today.",
          variant: "destructive",
        });
        return;
      }
      if (eventDate && eventDate < today) {
        toast({
          title: "Invalid Event Date",
          description: "Event date cannot be in the past.",
          variant: "destructive",
        });
        return;
      }

      setStep(2);
    } else {
      // Check required file uploads
      const requiredUploads = [
        "Request Letter",
        "Signed Conforme of Adviser",
        "Details of Activity",
      ];
      const missingUploads = requiredUploads.filter(
        (key) => !uploadedFiles[key] || !uploadedFiles[key].url
      );
      if (missingUploads.length > 0) {
        toast({
          title: "Required File Uploads Missing",
          description: `Please upload the following: ${missingUploads.join(", ")}`,
          variant: "destructive",
        });
        return;
      }

      if (!eventDate) {
        toast({
          title: "Event date is missing.",
          variant: "destructive",
        });
        return;
      }
      const eventDateStr = eventDate.toLocaleDateString("en-CA");

      if (mode === "edit") {
        if (!initialData?.id) {
          toast({
            title: "Missing event ID for editing.",
            variant: "destructive",
          });
          return;
        }
        try {
          const cleanedFiles = Object.fromEntries(
            Object.entries(uploadedFiles).filter(([_, value]) => value.url)
          );
          await updateDoc(doc(db, "eventRequests", initialData.id), {
            title: eventName,
            eventDate: eventDateStr,
            modality,
            files: cleanedFiles,
            othersLink,
          });
          toast({
            title: "Request updated successfully!",
            variant: "success",
          });
          setOpen(false);
          setStep(1);
        } catch (err) {
          console.error(err);
          toast({
            title: "Failed to update request.",
            variant: "destructive",
          });
        }
      } else {
        if (!user) {
          toast({
            title: "You must be logged in to submit a request.",
            variant: "destructive",
          });
          return;
        }
        try {
          await addDoc(collection(db, "eventRequests"), {
            title: eventName,
            eventDate: eventDateStr,
            requestDate: new Date().toLocaleDateString("en-CA"),
            modality,
            organizationId: user.uid,
            organizationName: user.orgName || "",
            status: "Awaiting Evaluation",
            files: uploadedFiles,
            othersLink,
            createdAt: serverTimestamp(),
          });
          toast({
            title: "Request submitted successfully!",
            variant: "success",
          });
          setShowSuccess(true);
          setStep(1);
          setEventName("");
          setEventDate(undefined);
          setModality("Online");
          setUploadedFiles({});
          setOthersLink("");
        } catch (err) {
          console.error(err);
          toast({
            title: "Failed to submit request.",
            variant: "destructive",
          });
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
      <Label className="block mb-1" htmlFor={title}>
        {title}
      </Label>
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
        <DialogTitle className="sr-only">Event Request</DialogTitle>
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
                  <DatePicker
                    selected={eventDate}
                    onSelect={setEventDate}
                  />
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
                  <span className="font-medium">Download Requirement Forms </span>
                  <a
                    href="https://drive.google.com/drive/folders/19_zBtUBtKYIaxL-V9b1BLRf6462zn-_u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    here
                  </a>
                </div>
                {requiredDocuments[modality].map((doc) => (
                  <UploadSection key={doc} title={doc} />
                ))}

                {/* Separator with OR */}
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-3 text-gray-500 font-semibold">OR</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                {/* Others Link Field */}
                <div>
                  <Label className="block mb-1" htmlFor="othersLink">
                    Submit Optional Files via Google Drive Link
                  </Label>
                  <Input
                    id="othersLink"
                    placeholder="Paste Google Drive link here"
                    value={othersLink}
                    onChange={(e) => setOthersLink(e.target.value)}
                    type="url"
                  />
                </div>
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
