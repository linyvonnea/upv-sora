// app/admin/event-requests/page.tsx
"use client";

import { useState } from "react";
import { useAdminEventRequests } from "@/hooks/useAdminEventRequests";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";
import { SearchBar } from "@/components/ui/search-bar";
import { FilterModal } from "@/components/ui/filter-modal";
import SortModal from "@/components/ui/SortModal";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminEventRequestsPage() {
  const { eventRequests, loading } = useAdminEventRequests();
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  if (loading) return <p className="p-10">Loading event requests...</p>;

  const filtered = eventRequests.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Event Requests</h1>
      <div className="flex items-center gap-4 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title"
          label="Title"
        />
        <Button
          variant="outline"
          onClick={() => setFilterOpen(true)}
          className="bg-[#284b3e] text-white"
        >
          Filter <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setSortOpen(true)}
          className="bg-[#284b3e] text-white"
        >
          Sort <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {filtered.map((event) => (
          <EventRequestCard
            key={event.id}
            event={event}
            showAccordion={false}
            onEdit={() => {
              window.location.href = `/admin/event-requests/${event.id}`;
            }}
          />
        ))}
      </div>

      <SortModal isOpen={sortOpen} onClose={() => setSortOpen(false)} onApply={() => {}} />
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => {}}
        filters={{ search: "", modality: "", location: "" }}
        setFilters={() => {}}
        mode="admin"
      />
    </div>
  );
}
