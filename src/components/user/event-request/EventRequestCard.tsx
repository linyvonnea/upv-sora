"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Eye, Pencil, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventRequest } from "@/types/event-request";
import { ProgressTracker } from "@/components/user/event-request/ProgressTracker";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function EventRequestCard({
  event,
  showAccordion = true,
  onEdit,
  showOrgName = false,
}: {
  event: EventRequest;
  showAccordion?: boolean;
  onEdit?: (event: EventRequest) => void;
  showOrgName?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ url: string; label: string } | null>(null);

  const statusColors: Record<string, string> = {
    "Awaiting Evaluation": "bg-yellow-100 text-yellow-800",
    "Under Evaluation": "bg-blue-100 text-blue-800",
    "Forwarded to Offices": "bg-purple-100 text-purple-800",
    "Issues Found": "bg-red-100 text-red-800",
    Approved: "bg-green-100 text-green-800",
    Disapproved: "bg-gray-100 text-gray-800",
  };

  const fileEntries = event.files ? Object.entries(event.files) : [];
  const othersLink: string = event.othersLinks || "";

  return (
    <div
      className={cn(
        "border rounded-xl p-6 transition bg-white shadow-sm",
        showAccordion ? "cursor-pointer" : "",
        open && "bg-muted/40"
      )}
      onClick={showAccordion ? () => setOpen((prev) => !prev) : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-xl font-bold">{event.title}</h3>
            {showOrgName && (
              <span className="inline-block px-3 py-0.5 bg-[#800000]/75 text-white text-xs rounded-full font-medium border border-[#800000]">
                {event.organizationName || "Unknown Org"}
              </span>
            )}
          </div>
          <p className="text-sm">
            <span className="font-medium">Event Date:</span> {event.eventDate || "N/A"}
            <span className="mx-2">|</span>
            <span className="font-medium">Request Date:</span> {event.requestDate || "N/A"}
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">Event Type:</span> {event.modality || "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "text-sm px-3 py-1 rounded-full font-medium",
              statusColors[event.status] || "bg-gray-200 text-gray-800"
            )}
          >
            {event.status}
          </div>
          {showAccordion && (
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          )}
        </div>
      </div>

      {showAccordion && open && (
        <div className="grid md:grid-cols-2 gap-6 border-t pt-6 text-sm">
          {/* Left Side: Requirements */}
          <div className="space-y-2">
            <p className="font-semibold">Submitted Requirements:</p>
            {fileEntries.map(([label, fileObj]) => (
              <div key={label} className="space-y-1">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewFile({ label, url: fileObj.url });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Others Link Section */}
            {othersLink && (
              <div className="space-y-1 mt-2">
                <p className="text-muted-foreground">Others:</p>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                  <LinkIcon className="w-4 h-4 text-blue-700" />
                  <a
                    href={othersLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline break-all"
                  >
                    {othersLink}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Status, Action, and NOA */}
          <div className="space-y-2">
            {event.status === "Awaiting Evaluation" && (
              <>
                <p className="mb-4 text-muted-foreground">
                  Your request has been submitted and is waiting to be reviewed.
                </p>
                <Button
                  className="bg-[#284b3e] hover:bg-[#284b3e]/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(event);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Request
                </Button>
              </>
            )}
            {event.status === "Under Evaluation" && <p>No action needed at this time.</p>}
            {event.status === "Forwarded to Offices" && (
              <div>
                <p className="font-semibold mb-2">Progress Tracker</p>
                <ProgressTracker
                  steps={[
                    { label: "SOA Coordinator", completed: !!event.progress?.soa },
                    { label: "OSA Director", completed: !!event.progress?.osa },
                    { label: "OVCA/OVCAA", completed: !!event.progress?.ovcaa },
                    { label: "Chancellor", completed: !!event.progress?.chancellor },
                  ]}
                />
              </div>
            )}
            {event.status === "Issues Found" && (
              <>
                <p className="font-bold mb-2">Issues found in your request:</p>
                <ul className="list-disc ml-6 mb-4">
                  {(event.issues || []).map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
                <Button
                  className="bg-[#284b3e] hover:bg-[#284b3e]/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(event);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit Request
                </Button>
              </>
            )}

            {(event.status === "Approved" || event.status === "Disapproved") && (
              <>
                <p className="mb-2">
                  <span className="font-semibold">Admin feedback:</span>{" "}
                  <i className="text-muted-foreground">{event.comment || "-"}</i>
                </p>
                {/* NOA block - same style as requirements */}
                {event.noa && (
                  <div className="space-y-1 mt-3">
                    <p className="text-muted-foreground font-semibold">
                      Notice of {event.status === "Approved" ? "Approval" : "Disapproval"}:
                    </p>
                    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-green-700" />
                        <a
                          href={event.noa.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="text-sm font-medium underline"
                        >
                          NOA.pdf
                        </a>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {((event.noa.size || 0) / 1024).toFixed(0)} KB
                        </span>
                        <Eye
                          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewFile({ label: "NOA", url: event.noa!.url });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
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
