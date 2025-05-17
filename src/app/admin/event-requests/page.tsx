// app/admin/event-requests/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminEventRequests } from "@/hooks/useAdminEventRequests";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";

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

export default function AdminEventRequestsPage() {
  const { eventRequests, loading } = useAdminEventRequests();
  const [activeTab, setActiveTab] = useState("All");
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<{ type: string; order?: string }>({
    type: "Request Date",
    order: "Latest",
  });
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    modality: "",
    location: "",
  });
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  const filteredEvents = eventRequests.filter(
    (event) =>
      [event.organizationName, event.title].some((field) =>
        field?.toLowerCase().includes(filters.search.toLowerCase())
      ) &&
      (!filters.modality || event.modality === filters.modality) &&
      (!filters.location || event.location === filters.location)
  );

  const tabFilteredEvents =
    activeTab === "All" ? filteredEvents : filteredEvents.filter((e) => e.status === activeTab);

  const sortedEvents = [...tabFilteredEvents].sort((a, b) => {
    const dateA = new Date(a.requestDate);
    const dateB = new Date(b.requestDate);
    return sortOption.order === "Latest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
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
        <div className="mt-5 space-y-4 w-[1000px]">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/admin/event-requests/${event.id}`)}
              className="cursor-pointer"
            >
              <EventRequestCard event={event} showAccordion={false} />
            </div>
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