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
  organizationName: string;
  location?: "Iloilo" | "Miagao";
  comment?: string;
  issues?: string[];
  progress?: Record<string, boolean>;
  files?: Record<string, FileData>;
  noa?: FileData; // For approved/disapproved
}

export type EventRequestFormMode = "new" | "edit";

export interface EventRequestDialogProps {
  mode: EventRequestFormMode;
  initialData?: Partial<EventRequest>;
}