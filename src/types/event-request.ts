// types/event-request.ts

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
}

// For modal mode switching (used in EventRequestDialog)
export type EventRequestFormMode = "new" | "edit";

// Props for the EventRequestDialog component
export interface EventRequestDialogProps {
  mode: EventRequestFormMode;
  initialData?: Partial<EventRequest>;
}