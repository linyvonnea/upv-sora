// src/types/event-request.ts

export interface FileData {
  url: string;
  size: number; // in bytes
}

export interface EventRequest {
  id: string;
  title: string;
  requestDate: string;
  eventDate: string;
  status: string;
  modality: "Online" | "On Campus" | "Off Campus";
  organizationId: string;       
  organizationEmail: string;   
  location?: "Iloilo" | "Miagao";
  comment?: string;
  issues?: string[];
  progress?: {
    soa?: boolean;
    osa?: boolean;
    ovcaa?: boolean;
    chancellor?: boolean;
  };
  files?: Record<string, FileData>;
  noa?: FileData;
  requirementsChecklist?: Record<string, boolean>;
  organizationName?: string; // for joining, optional!

}

export interface EventRequestWithOrgName extends EventRequest {
  organizationName: string; // fetched from users collection, not stored in eventRequests
}

export type EventRequestFormMode = "new" | "edit";

export interface EventRequestDialogProps {
  mode: EventRequestFormMode;
  initialData?: Partial<EventRequest>;
}