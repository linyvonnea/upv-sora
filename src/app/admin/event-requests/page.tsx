// app/admin/event-requests/page.tsx
"use client";

import * as React from "react";
import { EventRequest } from "@/types/event-request";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { useRouter } from "next/navigation";
import { useAdminEventRequests } from "@/hooks/useAdminEventRequests";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";

type FilterOptions = {
  search: string;
  modality: "" | "Online" | "On-Site";
  location: "" | "Iloilo" | "Miagao";
};

export default function AdminEventRequestsPage() {
  const { eventRequests, loading, error } = useAdminEventRequests();
  const [isSortModalOpen, setSortModalOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<{ type: string; order?: string; days?: number; }>({
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
  const router = useRouter();

  if (loading) return <div className="p-10 text-center">Loading event requests…</div>;
  if (error) return <div className="p-10 text-red-600 text-center">{error}</div>;

  // Filtering logic
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
          {sortedEvents.length === 0 && (
            <div className="text-muted-foreground text-center py-10">No event requests found.</div>
          )}
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/admin/event-requests/${event.id}`)}
              className="cursor-pointer"
            >
              <EventRequestCard event={event} showAccordion={false} showOrgName={true} />
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