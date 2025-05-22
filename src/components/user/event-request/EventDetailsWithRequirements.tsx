// src/components/user/event-request/EventDetailsWithRequirements.tsx
"use client";

import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { EventRequest } from "@/types/event-request";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function EventDetailsWithRequirements({ event }: { event: EventRequest }) {
  const [previewFile, setPreviewFile] = useState<{ url: string; label: string } | null>(null);
  const fileEntries = event.files ? Object.entries(event.files) : [];

  return (
    <div>
      {/* Event Details */}
      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Event Date:</span> {event.eventDate || "N/A"}
        <span className="mx-2">|</span>
        <span className="font-medium">Request Date:</span> {event.requestDate || "N/A"}
      </p>
      <p className="text-sm mt-1">
        <span className="font-medium">Event Type:</span> {event.modality || "N/A"}
      </p>
      {/* Show organization name, fallback to email if orgName is missing */}
      <p className="text-sm mt-1">
        <span className="font-medium">Organization:</span>{" "}
        {event.organizationName || event.organizationEmail || "N/A"}
      </p>

      {/* Submitted Requirements */}
      <div className="mt-6">
        <p className="font-semibold mb-2">Submitted Requirements:</p>
        {fileEntries.length === 0 ? (
          <p className="text-muted-foreground italic">No files uploaded.</p>
        ) : (
          fileEntries.map(([label, fileObj]) => (
            <div key={label} className="mb-2">
              <p className="text-muted-foreground">{label}:</p>
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-green-700" />
                  <a
                    href={fileObj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-sm font-medium underline"
                  >
                    {label}.pdf
                  </a>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {((fileObj.size || 0) / 1024).toFixed(0)} KB
                  </span>
                  <Eye
                    className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                    onClick={() => setPreviewFile({ label, url: fileObj.url })}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {previewFile && (
        <FilePreviewModal
          title={previewFile.label}
          url={previewFile.url}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
}