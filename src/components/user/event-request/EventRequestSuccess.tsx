"use client";

import { Button } from "@/components/ui/button";

export function EventRequestSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center space-y-4 py-10 px-4">
      <h2 className="text-2xl font-bold">Event Request Submitted!</h2>
      <p className="text-muted-foreground">
        Your event request has been received. We’ll review the documents and notify you of the
        status soon.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          className="bg-[#284b3e] hover:bg-[#284b3e]/90"
          onClick={() => (window.location.href = "/user/event-requests")}
        >
          View my Requests
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
