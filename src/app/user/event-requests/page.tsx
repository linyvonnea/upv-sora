"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs"
import { EventRequestCard, EventData } from "@/components/user/event-request/EventRequestCard"

const mockEvents: EventData[] = [
  { id: 1, status: "Awaiting Evaluation", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 2, status: "Under Evaluation", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 3, status: "Forwarded to Offices", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 4, status: "Issues Found", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 5, status: "Approved", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 6, status: "Disapproved", title: "Event Title", requestDate: "April 1, 2025" },
]

export default function EventRequestPage() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredEvents =
    activeTab === "All" ? mockEvents : mockEvents.filter((e) => e.status === activeTab)

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Event Requests History</h1>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Button variant="outline" className="ml-auto bg-[#284b3e] text-white hover:bg-[#284b3e]/90">
          Sort By <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventRequestCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}