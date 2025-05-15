import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { EventData } from "@/components/user/event-request/EventRequestCard";

export function EventDetails({ event }: { event: EventData }) {
  return (
    <Card className="p-4 max-w-xl">
      <CardContent className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Event Type:</span> {event.modality || "N/A"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Organization:</span> {event.organizationName || "N/A"}
        </p>

        <div className="text-sm space-y-1 pt-2">
          <p className="font-medium">Submitted Requirements:</p>

          <h2>Request Letter: </h2>
          <Button>
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Request Letter.pdf</span>
            <span className="ml-auto text-xs text-gray-500">200 KB</span>
          </Button>

          <h2>Signed Conforme: </h2>
          <Button>
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Signed Conforme.pdf</span>
            <span className="ml-auto text-xs text-gray-500">200 KB</span>
          </Button>

          <h2>Details of Activity:</h2>
          <p className="text-blue-600 underline text-sm">
            <a href="https://drive.google.com/file/d/" target="_blank" rel="noopener noreferrer">
              Details of Activity
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
