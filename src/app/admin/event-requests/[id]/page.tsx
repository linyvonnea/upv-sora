"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EventDetailsWithRequirements } from "@/components/user/event-request/EventDetailsWithRequirements";
import { AdminEventStatusPanel } from "@/components/admin/update-event-request/AdminEventStatusPanel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EventRequest } from "@/types/event-request";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";

type Params = { id: string };

const REQUIREMENTS: Record<EventRequest["modality"], string[]> = {
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

// Helper to make objects serializable for Firestore
const toPlainObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export default function AdminEventRequestExpandedPage() {
  const router = useRouter();
  const params = useParams() as Params;
  const id = params.id;

  // Toast hook: ***must be INSIDE component***
  const { toast } = useToast();

  const [event, setEvent] = useState<EventRequest | null>(null);
  const [requesterEmail, setRequesterEmail] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | undefined>("");
  const [requirementsChecklist, setRequirementsChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getDoc(doc(db, "eventRequests", String(id)))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<EventRequest, "id">;
          const fetchedEvent: EventRequest = { id: docSnap.id, ...data };
          setEvent(fetchedEvent);
          setStatus(fetchedEvent.status);
          setRequirementsChecklist(fetchedEvent.requirementsChecklist || {});
          getRequesterNameAndEmail(fetchedEvent.organizationId);
        } else {
          setEvent(null);
        }
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Checklist toggling handler
  const toggleChecklist = (req: string) => {
    setRequirementsChecklist((prev) => {
      const updated = { ...prev, [req]: !prev[req] };
      // Auto-switch to "Under Evaluation" if any box is checked
      if (
        status === "Awaiting Evaluation" &&
        Object.values(updated).some((v) => v)
      ) {
        setStatus("Under Evaluation");
      }
      return updated;
    });
  };

  const getRequesterNameAndEmail = async (organizationId: string) => {
    try {
      const orgDoc = await getDoc(doc(db, "users", organizationId));
      if (orgDoc.exists()) {
        setRequesterEmail(orgDoc.data()?.email);
        setOrgName(orgDoc.data()?.orgName || "Unknown Organization");
      } else {
        setRequesterEmail("");
        setOrgName("");
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
      return null;
    }
  }

  const handleStatusPanelSubmit = async (data: Partial<EventRequest>) => {
    if (!event) return;
    setEvent({ ...event, ...data, requirementsChecklist } as EventRequest);
    setStatus(data.status || status);

    function stripUndefined(obj: Record<string, any>) {
      return JSON.parse(
        JSON.stringify(obj, (key, value) => (value === undefined ? undefined : value))
      );
    }

    const cleanData = stripUndefined({
      ...data,
      status: data.status || status,
      requirementsChecklist: toPlainObject(requirementsChecklist),
      ...(data.noa ? { noa: data.noa } : {}),
    });

    try {
      await updateDoc(doc(db, "eventRequests", event.id), cleanData);
      toast({
        title: "Request Updated",
        description: "The event request was updated successfully.",
        variant: "success",
      });

      const mailData = {
        to: [requesterEmail],
        template: {
          name: "autonotif-event-update",
          data: {
            orgName: orgName || "Unknown Organization",
            title: event.title || "Unknown Event",
          }
        }
      }

      await addDoc(collection(db, "mail"), mailData);

    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading event…</div>;
  if (!event) return <div>Event not found</div>;

  const requirementsList = REQUIREMENTS[event.modality] || [];

  return (
    <div className="flex gap-8 p-8 max-w-5xl mx-auto">
      {/* LEFT: Details and requirements */}
      <div className="flex-1">
        <EventDetailsWithRequirements event={event} />
      </div>
      {/* RIGHT: Checklist, status panel, NOA, back btn */}
      <div className="flex-1 space-y-8">
        {(status === "Awaiting Evaluation" || status === "Under Evaluation") && (
          <div>
            <h2 className="font-bold mb-2">Requirements Checklist</h2>
            <ul className="space-y-2">
              {requirementsList.map((req) => (
                <li key={req} className="flex items-center gap-2">
                  <Checkbox
                    checked={!!requirementsChecklist[req]}
                    onCheckedChange={() => toggleChecklist(req)}
                  />
                  <span className={!!event.files?.[req] ? "" : "text-gray-400"}>
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Status/Issues/Progress/NOA Panel */}
        <AdminEventStatusPanel
          status={status || ""}
          onStatusChange={setStatus}
          onSubmit={handleStatusPanelSubmit}
          initialData={event}
        />

        {/* NOA Download/Preview - only if present */}
        {(status === "Approved" || status === "Disapproved") && event.noa && (
          <div className="mt-2">
            <a
              href={event.noa.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline text-sm"
            >
              View NOA here
            </a>
            <span className="text-xs text-gray-400 ml-2">
              {event.noa.size ? `${(event.noa.size / 1024).toFixed(0)} KB` : ""}
            </span>
          </div>
        )}

        <Button variant="secondary" onClick={() => router.back()}>
          Back to List
        </Button>
      </div>
    </div>
  );
}