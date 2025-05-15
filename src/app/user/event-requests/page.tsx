"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard, EventData } from "@/components/user/event-request/EventRequestCard";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { SearchBar } from "@/components/ui/search-bar";

const mockEvents: EventData[] = [
  {
    id: 1,
    status: "Awaiting Evaluation",
    title: "Event1",
    requestDate: "April 1, 2025",
    eventDate: "April 18, 2025",
    modality: "Online",
    organizationName: "Org 1",
  },
  {
    id: 2,
    status: "Under Evaluation",
    title: "Event2",
    requestDate: "April 2, 2025",
    eventDate: "April 20, 2025",
    modality: "Online",
    organizationName: "Org 2",
  },
  {
    id: 3,
    status: "Forwarded to Offices",
    title: "Event3",
    requestDate: "April 3, 2025",
    eventDate: "April 21, 2025",
    modality: "Online",
    organizationName: "Org 3",
  },
  {
    id: 4,
    status: "Issues Found",
    title: "Event4",
    requestDate: "April 4, 2025",
    eventDate: "April 25, 2025",
    modality: "Online",

    organizationName: "Org 4",
  },
  {
    id: 5,
    status: "Approved",
    title: "Event5",
    requestDate: "April 5, 2025",
    eventDate: "April 27, 2025",
    modality: "Online",
    organizationName: "Org 5",
  },
  {
    id: 6,
    status: "Disapproved",
    title: "Event6",
    requestDate: "April 6, 2025",
    eventDate: "April 30, 2025",
    modality: "Online",

    organizationName: "Org 6",
  },
];

const statusOptions = [
  "Awaiting Evaluation",
  "Under Evaluation",
  "Forwarded to Offices",
  "Issues Found",
  "Approved",
  "Disapproved",
];

type FilterOptions = {
  search: string;
  modality: "" | "Online" | "On-Site";
  location: "" | "Iloilo" | "Miagao";
};

export default function EventRequestPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<{ type: string; order?: string; days?: number }>({
    type: "Request Date",
    order: "Latest",
  });
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    modality: "",
    location: "",
  });

  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.modality === "" || event.modality === filters.modality) &&
      (filters.location === "" || event.location === filters.location)
  );

  const tabFilteredEvents =
    activeTab === "All" ? filteredEvents : filteredEvents.filter((e) => e.status === activeTab);

  const sortedEvents = [...tabFilteredEvents].sort((a, b) => {
    if (sortOption.type === "Request Date") {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return sortOption.order === "Latest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }
    return 0;
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Event Requests History</h1>
      <div className="flex items-center gap-4 mb-6 w-full max-w-[1000px]">
        <div className="flex-1">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
            placeholder="Search by Event Request Title"
            label="Request Title"
          />
        </div>
        <Button
          variant="outline"
          className="bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
          onClick={() => setFilterOpen(true)}
        >
          Filter <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
          onClick={() => setSortModalOpen(true)}
        >
          Sort By <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="m-4 ">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="space-y-4 w-[1000px]">
        {sortedEvents.map((event) => (
          <EventRequestCard key={event.id} event={event} />
        ))}
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setSortModalOpen(false)}
        onApply={(option) => setSortOption(option)}
      />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        filters={filters}
        setFilters={setFilters}
        mode="user"
      />
    </div>
  );
}
