"use client";

import * as React from "react";
import { EventRequestCard, EventData } from "@/components/user/event-request/EventRequestCard";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";

type FilterOptions = {
  search: string;
  modality: "" | "Online" | "On-Site";
  location: "" | "Iloilo" | "Miagao";
};

const adminEvents: EventData[] = [
  {
    id: 1,
    title: "Event1",
    requestDate: "April 1, 2025",
    eventDate: "April 10, 2025",
    status: "Awaiting Evaluation",
    organizationName: "Organization Name",
    modality: "Online",
    location: "Iloilo",
  },
  {
    id: 2,
    title: "Event2",
    requestDate: "April 5, 2025",
    eventDate: "April 15, 2025",
    status: "Issues Found",
    organizationName: "Komsai.Org",
    modality: "Online",
    location: "Iloilo",
  },
  {
    id: 3,
    title: "Event3",
    requestDate: "April 20, 2025",
    eventDate: "April 25, 2025",
    status: "Disapproved",
    organizationName: "Miagao Valley",
    modality: "Online",
    location: "Iloilo",
  },
  // ...other events
];

const statusOptions = [
  "Awaiting Evaluation",
  "Under Evaluation",
  "Forwarded to Offices",
  "Issues Found",
  "Approved",
  "Disapproved",
];

export default function AdminEventRequestsPage() {
  const [isSortModalOpen, setSortModalOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<{
    type: string;
    order?: string;
    days?: number;
  }>({
    type: "Request Date",
    order: "Latest",
  });
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterOptions>({
    search: "",
    modality: "",
    location: "",
  });
  const [activeTab, setActiveTab] = React.useState("All");

  // Filtering logic
  const filteredEvents = adminEvents.filter(
    (event) =>
      [event.organizationName, event.title].some((field) =>
        field?.toLowerCase().includes(filters.search.toLowerCase())
      ) &&
      (!filters.modality || event.modality === filters.modality) &&
      (!filters.location || event.location === filters.location)
  );

  const tabFilteredEvents =
    activeTab === "All" ? filteredEvents : filteredEvents.filter((e) => e.status === activeTab);

  // Sorting logic (same as user side)
  const sortedEvents = [...tabFilteredEvents].sort((a, b) => {
    if (sortOption.type === "Request Date") {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return sortOption.order === "Latest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }
    // Add logic for "Days Before Event" if needed
    return 0;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Requests</h1>
      <div className="flex items-center gap-4 mb-6 w-full max-w-[1000px]">
        <div className="max-w-3xl w-full">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
            placeholder="Search by Organization or Event Request"
            label="Organization/Request Title"
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
      <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col items-center">
        <div className="space-y-4 w-[1000px]">
          {sortedEvents.map((event) => (
            <EventRequestCard key={event.id} event={event} showAccordion={false} />
          ))}
        </div>
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
        mode="admin"
      />
    </div>
  );
}
