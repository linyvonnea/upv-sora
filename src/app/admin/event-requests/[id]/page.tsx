"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { EventDetails } from "@/components/left-event-details";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { EventData } from "@/components/user/event-request/EventRequestCard";
import { AdminEventStatusPanel } from "@/components/admin/update-event-request/AdminEventStatusPanel";

const adminEvents: EventData[] = [
  {
    id: 1,
    status: "Awaiting Evaluation",
    title: "Event1",
    requestDate: "April 1, 2025",
    eventDate: "April 18, 2025",
    modality: "Online",
    organizationName: "Org 1",
  },
  {
    id: 2,
    status: "Under Evaluation",
    title: "Event2",
    requestDate: "April 2, 2025",
    eventDate: "April 20, 2025",
    modality: "Online",
    organizationName: "Org 2",
  },
  {
    id: 3,
    status: "Forwarded to Offices",
    title: "Event3",
    requestDate: "April 3, 2025",
    eventDate: "April 21, 2025",
    modality: "Online",
    organizationName: "Org 3",
  },
  {
    id: 4,
    status: "Issues Found",
    title: "Event4",
    requestDate: "April 4, 2025",
    eventDate: "April 25, 2025",
    modality: "Online",

    organizationName: "Org 4",
  },
  {
    id: 5,
    status: "Approved",
    title: "Event5",
    requestDate: "April 5, 2025",
    eventDate: "April 27, 2025",
    modality: "Online",
    organizationName: "Org 5",
  },
  {
    id: 6,
    status: "Disapproved",
    title: "Event6",
    requestDate: "April 6, 2025",
    eventDate: "April 30, 2025",
    modality: "Online",

    organizationName: "Org 6",
  },
];

const STATUS_OPTIONS = [
  "Under Evaluation",
  "Forwarded to Offices",
  "Issues Found",
  "Approved",
  "Disapproved",
];

const REQUIREMENTS: Record<string, string[]> = {
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
    "Coordination with Concerned Offices",
    "Waivers/Student Participation Agreement",
    "List of Participants with Emergency Contact Details",
    "Itinerary of Travel",
  ],
};

// Main component for the expanded view of an event request
export default function AdminEventRequestExpandedPage() {
  const router = useRouter(); // Navigation hook
  const { id } = useParams(); // Gets event ID from URL
  const event = adminEvents.find((e: any) => String(e.id) === String(id)); // Find the event by ID
  const [status, setStatus] = useState(event?.status || ""); // Track event status
  const [checked, setChecked] = useState<string[]>([]); // Track checked requirements

  // This is to show fallback if event does not exist
  if (!event) return <div>Event not found</div>;

  // To get the list of requirements based on event modality
  const requirements = REQUIREMENTS[event.modality || "Online"];

  // Toggle a requirement's checked state
  const handleCheck = (req: string) => {
    setChecked((prev) => (prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]));
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // TODO: Update status in backend/db and trigger revalidation if needed
  };

  return (
    <div className="flex gap-8 p-8 max-w-5xl mx-auto">
      {/* Left: Event Details */}
      <div className="flex-1">
        <EventDetails event={event} />
      </div>

      {/* Right Column: Requirements checklist and status update panel */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="font-bold mb-2">Requirements Checklist</h2>
          <ul className="space-y-2">
            {requirements.map((req) => (
              <li key={req} className="flex items-center gap-2">
                <Checkbox
                  checked={checked.includes(req)}
                  onCheckedChange={() => handleCheck(req)}
                />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <AdminEventStatusPanel
            status={status}
            onStatusChange={handleStatusChange}
            onSubmit={(data) => {
              // TODO: Save data to backend
              setStatus(data.status);
              alert("Changes saved! (Stub)");
            }}
          />
        </div>

        {/* Back Button */}
        <Button variant="secondary" onClick={() => router.back()}>
          Back to List
        </Button>
      </div>
    </div>
  );
}
