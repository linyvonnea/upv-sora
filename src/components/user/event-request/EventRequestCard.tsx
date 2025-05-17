// components/user/event-request/EventRequestCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventRequestDialog } from "@/components/ui/event-request-dialog";
import { EventRequest } from "@/types/event-request";
import { ProgressTracker } from "@/components/user/event-request/ProgressTracker";
import { EventDetails } from "@/components/left-event-details";

export function EventRequestCard({
  event,
  showAccordion = true,
  onEdit,
}: {
  event: EventRequest;
  showAccordion?: boolean;
  onEdit?: (event: EventRequest) => void;
}) {
  const [open, setOpen] = useState(false);
  const isAdmin = showAccordion === false;

  const statusColors: Record<string, string> = {
    "Awaiting Evaluation": "bg-yellow-100 text-yellow-800",
    "Under Evaluation": "bg-blue-100 text-blue-800",
    "Forwarded to Offices": "bg-purple-100 text-purple-800",
    "Issues Found": "bg-red-100 text-red-800",
    Approved: "bg-green-100 text-green-800",
    Disapproved: "bg-gray-100 text-gray-800",
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-4 transition",
        showAccordion ? "cursor-pointer" : "",
        open && "bg-muted/40"
      )}
      onClick={showAccordion ? () => setOpen((prev) => !prev) : undefined}
    >
      <div className="flex justify-between items-center">
        <div>
          {!showAccordion && event.organizationName && (
            <div className="mb-1">
              <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-medium">
                {event.organizationName}
              </span>
            </div>
          )}
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p className="text-sm text-muted-foreground">
            <b>Request Date:</b> {event.requestDate}
          </p>
          {event.eventDate && (
            <p className="text-sm text-muted-foreground">
              <b>Event Date:</b> {event.eventDate}
            </p>
          )}
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-sm">
          <div className="space-y-2">
            <EventDetails event={event} />
          </div>

          <div>
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
                    { label: "SOA Coordinator", completed: true },
                    { label: "OSA Director", completed: true },
                    { label: "OVCAA", completed: false },
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
                <p className="italic text-muted-foreground mb-4">
                  Admin feedback: {event.comment || "-"}
                </p>
                <p>
                  <b>Download NOA:</b>
                </p>
                <a className="text-blue-600 underline" href="#">
                  NOA.pdf
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
