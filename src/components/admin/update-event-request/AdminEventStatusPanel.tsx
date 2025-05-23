"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePondUploader } from "@/components/ui/filepond-uploader";

const officeSteps = [
  { key: "soa", label: "SOA Coordinator" },        // Always present
  { key: "osa", label: "OSA Director" },
  { key: "ovcaa", label: "OVCA/OVCAA" },
  { key: "chancellor", label: "Chancellor" },
];

export function AdminEventStatusPanel({
  status,
  onStatusChange,
  onSubmit,
  initialData = {},
}: {
  status: string;
  onStatusChange: (status: string) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}) {
  const [comment, setComment] = useState(initialData.comment || "");
  const [issues, setIssues] = useState<string[]>(initialData.issues || []);
  const [issueInput, setIssueInput] = useState("");
  const [progress, setProgress] = useState<{ [k: string]: boolean }>(
    initialData.progress || {}
  );
  const [noa, setNoa] = useState<{ url: string; size: number } | null>(initialData.noa || null);

  // Add issue
  const handleAddIssue = () => {
    if (issueInput.trim()) {
      setIssues([...issues, issueInput.trim()]);
      setIssueInput("");
    }
  };

  // Remove issue
  const handleRemoveIssue = (idx: number) => {
    setIssues((prev) => prev.filter((_, i) => i !== idx));
  };

  // Toggle office progress step
  const handleProgressChange = (key: string) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Status Dropdown */}
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

      {/* Comments and NOA upload for terminal states */}
      {(status === "Disapproved" || status === "Approved") && (
        <>
          <label className="block font-medium">Comments/Notes</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comments or notes here..."
          />
          <label className="block font-medium mt-2">
            {status === "Disapproved"
              ? "Notice of Disapproval File (PDF)"
              : "Notice of Approval File (PDF)"}
          </label>
          <FilePondUploader
            initialUrl={noa?.url}
            onUpload={({ url, size }) => setNoa({ url, size })}
            onRemove={() => setNoa(null)}
          />
        </>
      )}

      {/* Issues block */}
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
              <li key={idx} className="flex items-center justify-between">
                {issue}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-red-600 ml-2"
                  onClick={() => handleRemoveIssue(idx)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Progress tracker for forwarding */}
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

      {/* Submit button */}
      <Button
        className="w-full bg-[#284b3e] hover:bg-[#284b3e]/90"
        onClick={() =>
          onSubmit({
            status,
            comment,
            issues: issues ?? [],
            progress: progress ?? {},
            noa: (status === "Approved" || status === "Disapproved") ? noa : undefined,
          })
        }
      >
        Save Changes
      </Button>
    </div>
  );
}