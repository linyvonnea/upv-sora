"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ProgressTracker } from "./ProgressTracker";
import { EventDetails } from "@/components/left-event-details";

export interface EventData {
  id: number;
  title: string;
  requestDate: string;
  eventDate: string;
  status: string;
  organizationName?: string;
  modality?: "Online" | "On-Site";
  location?: "Iloilo" | "Miagao";
}

interface EventRequestCardProps {
  event: EventData;
  showAccordion?: boolean;
}

export function EventRequestCard({ event, showAccordion = true }: EventRequestCardProps) {
  const [open, setOpen] = useState(false);

  // Map status to background/text color
  const statusColors: Record<string, string> = {
    "Awaiting Evaluation": "bg-yellow-100 text-yellow-800",
    "Under Evaluation": "bg-blue-100 text-blue-800",
    "Forwarded to Offices": "bg-purple-100 text-purple-800",
    "Issues Found": "bg-red-100 text-red-800",
    Approved: "bg-green-100 text-green-800",
    Disapproved: "bg-gray-100 text-gray-800",
  };

  // Detect if this is the admin side by checking for showAccordion === false
  const isAdmin = showAccordion === false;

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
          {/* Organization Name on top (Admin Side only) */}
          {isAdmin && event.organizationName && (
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
          {/* Accordion button only if showAccordion is true */}
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

      {/* Accordion content */}
      {showAccordion && open && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-sm">
          {/* Shared info */}
          <div className="space-y-2">
            <EventDetails event={event} />
          </div>

          {/* Status-based display */}
          <div>
            {event.status === "Awaiting Evaluation" && (
              <>
                <div className="max-w-xs">
                  <p className="mb-4 break-words whitespace-normal w-full">
                    Your request has been submitted and is waiting to be reviewed by the appropriate
                    staff.
                  </p>
                </div>
                <Button className="bg-[#284b3e] hover:bg-[#284b3e]/90">Edit Request</Button>
              </>
            )}
            {event.status === "Under Evaluation" && (
              <div>
                <p>Your request is undergoing detailed evaluation procedure.</p>
                <p>No action needed at this time.</p>
              </div>
            )}
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
                  <li>Issue 1</li>
                  <li>Issue 2</li>
                </ul>
                <Button className="bg-[#284b3e] hover:bg-[#284b3e]/90">Edit Request</Button>
              </>
            )}
            {event.status === "Approved" && (
              <>
                <p className="font-semibold mb-2">
                  Your request has met all requirements and is officially approved.{" "}
                </p>
                <p className="italic text-muted-foreground mb-4">Admin feedback: Great job!</p>
                <p>
                  <b>Download NOA:</b>
                </p>
                <a className="text-blue-600 underline" href="#">
                  NOA.pdf
                </a>
              </>
            )}
            {event.status === "Disapproved" && (
              <>
                <p className="font-semibold mb-2">
                  Unfortunately, your request has been rejected. You may review the feedback and
                  reapply
                </p>
                <p className="italic text-muted-foreground mb-4">
                  Reason: Missing advisor signature.
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
