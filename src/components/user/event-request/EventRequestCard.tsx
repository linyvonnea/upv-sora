"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { ProgressTracker } from "./ProgressTracker"

export interface EventData {
  id: number
  title: string
  requestDate: string
  status: string
}

export function EventRequestCard({ event }: { event: EventData }) {
  const [open, setOpen] = useState(false)

  // Map status to background/text color
  const statusColors: Record<string, string> = {
    "Awaiting Evaluation": "bg-yellow-100 text-yellow-800",
    "Under Evaluation": "bg-blue-100 text-blue-800",
    "Forwarded to Offices": "bg-purple-100 text-purple-800",
    "Issues Found": "bg-red-100 text-red-800",
    "Approved": "bg-green-100 text-green-800",
    "Disapproved": "bg-gray-100 text-gray-800",
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition",
        open && "bg-muted/40"
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p className="text-sm text-muted-foreground">Request Date: {event.requestDate}</p>
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
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </div>
      </div>

      {open && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-sm">
          {/* Shared info */}
          <div className="space-y-2">
            <p><b>Event Date:</b> April 25, 2025</p>
            <p><b>Event Type:</b> Online</p>
            <p><b>Submitted Requirements:</b></p>
            <ul className="pl-4 list-disc">
              <li><b>Request Letter:</b> <a href="#" className="text-blue-600 underline">Request Letter.pdf</a></li>
              <li><b>Conforme Letter:</b> <a href="#" className="text-blue-600 underline">Signed Conforme.pdf</a></li>
              <li><b>Details of Activity:</b> <a href="#" className="text-blue-600 underline">https://drive.google.com/...</a></li>
            </ul>
          </div>

          {/* Status-based display */}
          <div>
            {event.status === "Awaiting Evaluation" && (
              <>
                <p className="mb-4">Your request is awaiting evaluation by SOA.</p>
                <Button className="bg-[#284b3e] hover:bg-[#284b3e]/90">Edit Request</Button>
              </>
            )}
            {event.status === "Under Evaluation" && (
              <p>Your request is currently under review. Please wait for updates.</p>
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
                <p className="mb-2">Issues found in your request:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Issue 1</li>
                  <li>Issue 2</li>
                </ul>
                <Button className="bg-[#284b3e] hover:bg-[#284b3e]/90">Edit Request</Button>
              </>
            )}
            {event.status === "Approved" && (
              <>
                <p className="mb-2">Your request is approved.</p>
                <p className="italic text-muted-foreground mb-4">Admin feedback: Great job!</p>
                <p><b>Download NOA:</b></p>
                <a className="text-blue-600 underline" href="#">NOA.pdf</a>
              </>
            )}
            {event.status === "Disapproved" && (
              <>
                <p className="mb-2">Your request has been rejected.</p>
                <p className="italic text-muted-foreground mb-4">Reason: Missing advisor signature.</p>
                <p><b>Download NOA:</b></p>
                <a className="text-blue-600 underline" href="#">NOA.pdf</a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}