"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Step2Props {
    eventType: "on-campus" | "online" | "off-campus";
    formData: {
      title: string;
      date: Date | undefined;
      description: string;
      modality: string;
    };
    onSubmit: () => void;
  }

export function EventRequestStep2({ eventType, formData, onSubmit }: Step2Props) {
  const [files, setFiles] = useState({
    requestLetter: null as File | null,
    conforme: null as File | null,
  });
  const [links, setLinks] = useState({
    detailsOfActivity: "",
    itineraryOrBudget: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof files) => {
    if (e.target.files?.[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof links) => {
    setLinks({ ...links, [key]: e.target.value });
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="text-lg font-semibold capitalize">Requirements for {formData.modality} event</h2>

      {/* Common Fields */}
      <div className="space-y-1">
        <Label>Request Letter (PDF)</Label>
        <Input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "requestLetter")} />
      </div>

      {eventType !== "online" && (
        <div className="space-y-1">
          <Label>Signed Conforme (PDF)</Label>
          <Input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "conforme")} />
        </div>
      )}

      <div className="space-y-1">
        <Label>Details of Activity (Google Drive Link)</Label>
        <Input
          type="url"
          placeholder="https://drive.google.com/..."
          value={links.detailsOfActivity}
          onChange={(e) => handleLinkChange(e, "detailsOfActivity")}
        />
      </div>

      {eventType === "off-campus" && (
        <div className="space-y-1">
          <Label>Itinerary / Budget Proposal (Google Drive Link)</Label>
          <Input
            type="url"
            placeholder="https://drive.google.com/..."
            value={links.itineraryOrBudget}
            onChange={(e) => handleLinkChange(e, "itineraryOrBudget")}
          />
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" className="w-full bg-[#284b3e] hover:bg-[#284b3e]/90">
          Submit Request
        </Button>
      </div>
    </form>
  );
}
