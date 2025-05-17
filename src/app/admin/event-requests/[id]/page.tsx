// app/admin/event-requests/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventDetails } from "@/components/left-event-details";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminEventStatusPanel } from "@/components/admin/update-event-request/AdminEventStatusPanel";
import { EventRequest } from "@/types/event-request";

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

export default function AdminEventRequestExpandedPage() {
  const router = useRouter();
  const { id } = useParams();

  const [event, setEvent] = useState<EventRequest | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const ref = doc(db, "eventRequests", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as EventRequest & {
          progress?: Record<string, boolean>;
          comment?: string;
          issues?: string[];
        };
        setEvent({ ...data, id: snap.id });
        setStatus(data.status);
        setComment(data.comment || "");
        setIssues(data.issues || []);
        setProgress(data.progress || {});
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const requirements = REQUIREMENTS[event.modality || "Online"] || [];

  const handleCheck = (req: string) => {
    setChecked((prev) => (prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]));
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div className="flex gap-8 p-8 max-w-5xl mx-auto">
      <div className="flex-1">
        <EventDetails event={event} />
      </div>

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

        <AdminEventStatusPanel
          eventId={id as string}
          status={status}
          onStatusChange={handleStatusChange}
          onSubmit={(data) => {
            setStatus(data.status);
            alert("Changes saved! (Stub)");
          }}
          initialData={{ comment, issues, progress }}
        />

        <Button variant="secondary" onClick={() => router.back()}>
          Back to List
        </Button>
      </div>
    </div>
  );
}
