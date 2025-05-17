// components/admin/update-event-request/AdminEventStatusPanel.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploadForm from "@/components/ui/file-upload-form";
import { Checkbox } from "@/components/ui/checkbox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const officeSteps = [
  { key: "osa", label: "Forwarded to OSA Director" },
  { key: "ovcaa", label: "Forwarded to OVCA/OVCAA" },
  { key: "chancellor", label: "Forwarded to Chancellor" },
];

export function AdminEventStatusPanel({
  eventId,
  status,
  onStatusChange,
  onSubmit,
  initialData = {},
}: {
  eventId: string;
  status: string;
  onStatusChange: (status: string) => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
}) {
  const [comment, setComment] = useState(initialData.comment || "");
  const [issues, setIssues] = useState<string[]>(initialData.issues || []);
  const [issueInput, setIssueInput] = useState("");
  const [progress, setProgress] = useState<{ [k: string]: boolean }>(
    initialData.progress || {}
  );
  const [saving, setSaving] = useState(false);

  const handleAddIssue = () => {
    if (issueInput.trim()) {
      setIssues([...issues, issueInput.trim()]);
      setIssueInput("");
    }
  };

  const handleProgressChange = (key: string) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const ref = doc(db, "eventRequests", eventId);
      await updateDoc(ref, {
        status,
        comment,
        issues,
        progress,
      });
      if (onSubmit) {
        onSubmit({ status, comment, issues, progress });
      }
      alert("Changes saved successfully!");
    } catch (err) {
      alert("Failed to save changes: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium mb-1">Update Status</label>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="Awaiting Evaluation">Awaiting Evaluation</option>
        <option value="Under Evaluation">Under Evaluation</option>
        <option value="Forwarded to Offices">Forwarded to Offices</option>
        <option value="Issues Found">Issues Found</option>
        <option value="Approved">Approved</option>
        <option value="Disapproved">Disapproved</option>
      </select>

      {(status === "Disapproved" || status === "Approved") && (
        <>
          <label className="block font-medium">Comments/Notes</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comments or notes here..."
          />
        </>
      )}

      {status === "Issues Found" && (
        <>
          <label className="block font-medium">List Issues</label>
          <div className="flex gap-2">
            <Input
              value={issueInput}
              onChange={(e) => setIssueInput(e.target.value)}
              placeholder="Describe an issue"
            />
            <Button type="button" onClick={handleAddIssue}>
              Add
            </Button>
          </div>
          <ul className="list-disc ml-6">
            {issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </>
      )}

      {status === "Forwarded to Offices" && (
        <>
          <label className="block font-medium">Progress</label>
          <div className="space-y-2">
            {officeSteps.map((step) => (
              <div key={step.key} className="flex items-center gap-2">
                <Checkbox
                  checked={!!progress[step.key]}
                  onCheckedChange={() => handleProgressChange(step.key)}
                  id={step.key}
                />
                <label htmlFor={step.key}>{step.label}</label>
              </div>
            ))}
          </div>
        </>
      )}

      <Button
        className="w-full bg-[#284b3e] hover:bg-[#284b3e]/90"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}