// app/user/event-requests/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { SearchBar } from "@/components/ui/search-bar";

import { useAuth } from "@/contexts/AuthContext";
import { useUserEventRequests } from "@/hooks/useUserEventRequests";
import { EventRequestDialog } from "@/components/ui/event-request-dialog";
import type { EventRequest } from "@/types/event-request";

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
  const { user } = useAuth();
  const { eventRequests, loading, refetch } = useUserEventRequests();

  const [activeTab, setActiveTab] = useState("All");
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [editData, setEditData] = useState<EventRequest | null>(null);

  const [sortOption, setSortOption] = useState<{ type: string; order?: string; days?: number }>({
    type: "Request Date",
    order: "Latest",
  });

  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    modality: "",
    location: "",
  });

  if (!user) return <p className="p-10">Please login to view event requests.</p>;
  if (loading) return <p className="p-10">Loading event requests...</p>;

  const filteredEvents = eventRequests.filter(
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

      <div className="m-4">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="space-y-4 w-[1000px]">
        {sortedEvents.map((event) => (
          <EventRequestCard key={event.id} event={event} onEdit={(e) => setEditData(e)} />
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

      <EventRequestDialog
        open={editData !== null}
        setOpen={(open) => {
          setEditData(null);
          if (!open) refetch();
        }}
        mode="edit"
        initialData={editData || {}}
      />
    </div>
  );
}