import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploadForm from "@/components/ui/file-upload-form";
import { Checkbox } from "@/components/ui/checkbox";

// Steps used when status is "Forwarded to Offices"
const officeSteps = [
  { key: "osa", label: "Forwarded to OSA Director" },
  { key: "ovcaa", label: "Forwarded to OVCA/OVCAA" },
  { key: "chancellor", label: "Forwarded to Chancellor" },
];

// Main component for updating an event's status in the admin panel
export function AdminEventStatusPanel({
  status, // current status value
  onStatusChange, // callback to update status
  onSubmit, // callback for submitting the updated data
  initialData = {}, // optional initial values (for editing an existing item)
}: {
  status: string;
  onStatusChange: (status: string) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}) {
  // Local state for comment/note input
  const [comment, setComment] = useState(initialData.comment || "");
  // State for uploaded file (if any)
  const [file, setFile] = useState<File | null>(null);
  // List of issues entered by the user
  const [issues, setIssues] = useState<string[]>(initialData.issues || []);
  // Current text input for a new issue
  const [issueInput, setIssueInput] = useState("");
  // Tracks checkbox progress for each office step
  const [progress, setProgress] = useState<{ [k: string]: boolean }>(
    initialData.progress || {}
  );

  // Adds the issue from the input to the issues list
  const handleAddIssue = () => {
    if (issueInput.trim()) {
      setIssues([...issues, issueInput.trim()]);
      setIssueInput("");
    }
  };

  // Toggles the progress checkbox for a given office step
  const handleProgressChange = (key: string) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // UI rendering starts here
  return (
    <div className="space-y-4">
      {/* Dropdown for selecting status */}
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

      {/* Show comments and file upload for terminal states */}
      {(status === "Disapproved" || status === "Approved") && (
        <>
          <label className="block font-medium">Comments/Notes</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comments or notes here..."
          />
          {/* File upload depending on approval type */}
          <label className="block font-medium mt-2">
            {status === "Disapproved"
              ? "Notice of Disapproval File"
              : "Notice of Approval File"}
          </label>
          <FileUploadForm />
        </>
      )}

      {/* Show dynamic list of issues for status "Issues Found" */}
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

      {/* Show progress checkboxes for status "Forwarded to Offices" */}
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

      {/* Submit button that triggers onSubmit with all the collected data */}
      <Button
        className="w-full bg-[#284b3e] hover:bg-[#284b3e]/90"
        onClick={() =>
          onSubmit({
            status,
            comment,
            file,
            issues,
            progress,
          })
        }
      >
        Save Changes
      </Button>
    </div>
  );
}
