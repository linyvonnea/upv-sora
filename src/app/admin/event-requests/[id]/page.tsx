// app/admin/event-requests/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminEventStatusPanel } from "@/components/admin/update-event-request/AdminEventStatusPanel";
import { EventRequest } from "@/types/event-request";
import { Download, Eye } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

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
  const params = useParams();
  const id = params?.id;

  const [event, setEvent] = useState<EventRequest | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [issues, setIssues] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<{ url: string; label: string } | null>(null);

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
  const fileEntries = event.files ? Object.entries(event.files) : [];

  const handleCheck = (req: string) => {
    setChecked((prev) => (prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]));
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div className="flex gap-8 p-8 max-w-6xl mx-auto">
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <p className="text-sm text-muted-foreground">
          <b>Event Date:</b> {event.eventDate} | <b>Request Date:</b> {event.requestDate}
        </p>
        <p className="text-sm">
          <b>Modality:</b> {event.modality}
        </p>

        <div>
          <h3 className="font-semibold mb-2">Submitted Files</h3>
          <div className="space-y-2">
            {fileEntries.map(([label, file]) => (
              <div key={label}>
                <p className="text-muted-foreground mb-1">{label}:</p>
                <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-700" />
                    <a
                      href={file.url}
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
                      {((file.size || 0) / 1024).toFixed(0)} KB
                    </span>
                    <Eye
                      className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                      onClick={() => setPreviewFile({ label, url: file.url })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
