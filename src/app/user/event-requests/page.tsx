"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard, EventData } from "@/components/user/event-request/EventRequestCard";
import SortModal from "@/components/ui/SortModal";

const mockEvents: EventData[] = [
  { id: 1, status: "Awaiting Evaluation", title: "Event Title", requestDate: "April 1, 2025" },
  { id: 2, status: "Under Evaluation", title: "Event Title", requestDate: "April 2, 2025" },
  { id: 3, status: "Forwarded to Offices", title: "Event Title", requestDate: "April 3, 2025" },
  { id: 4, status: "Issues Found", title: "Event Title", requestDate: "April 4, 2025" },
  { id: 5, status: "Approved", title: "Event Title", requestDate: "April 5, 2025" },
  { id: 6, status: "Disapproved", title: "Event Title", requestDate: "April 6, 2025" },
];

export default function EventRequestPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<{ type: string; order?: string; days?: number }>({
    type: "Request Date",
    order: "Latest",
  });

  const filteredEvents =
    activeTab === "All" ? mockEvents : mockEvents.filter((e) => e.status === activeTab);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption.type === "Request Date") {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return sortOption.order === "Latest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }
    // Need to Add here the logic for "Days Before Event" sorting
    return 0;
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Event Requests History</h1>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Button
          variant="outline"
          className="ml-auto bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
          onClick={() => setSortModalOpen(true)}
        >
          Sort By <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {sortedEvents.map((event) => (
          <EventRequestCard key={event.id} event={event} />
        ))}
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setSortModalOpen(false)}
        onApply={(option) => setSortOption(option)}
      />
    </div>
  );
}
