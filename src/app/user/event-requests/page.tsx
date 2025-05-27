// app/user/event-requests/page.tsx
"use client";

import { useState, useEffect } from "react";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";
import SortModal from "@/components/ui/SortModal";
import { FilterModal } from "@/components/ui/filter-modal";
import { SearchBar } from "@/components/ui/search-bar";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
  const [sortBy, setSortBy] = useState<"Event Date" | "Request Date">("Request Date");
  const [sortOrder, setSortOrder] = useState<"Latest" | "Earliest">("Latest");
  const [modalityFilter, setModalityFilter] = useState<"" | "Online" | "On Campus" | "Off Campus">(
    ""
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortOrder, activeTab]);

  if (!user) return <p className="p-10">Please login to view event requests.</p>;
  if (loading) return <p className="p-10">Loading event requests...</p>;

  // Filtering logic
  const filteredEvents = eventRequests.filter(
    (event) =>
      event.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (modalityFilter === "" || event.modality === modalityFilter) &&
      (filters.location === "" || event.location === filters.location) &&
      (activeTab === "All" || event.status === activeTab)
  );

  // Sorting logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let dateA: Date, dateB: Date;
    if (sortBy === "Event Date") {
      dateA = new Date(a.eventDate);
      dateB = new Date(b.eventDate);
    } else {
      dateA = new Date(a.requestDate);
      dateB = new Date(b.requestDate);
    }
    return sortOrder === "Latest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  // Calculate paginated events
  const totalPages = Math.ceil(sortedEvents.length / pageSize);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">Event Requests History</h1>
      <div className="flex flex-col gap-2 w-full max-w-[1000px]">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-2 w-full">
          <div className="flex-grow">
            <SearchBar
              value={filters.search}
              onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
              placeholder="Search by Event Request Title"
              label="Request Title"
            />
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium text-sm">Filter By:</span>
            <select
              className="border rounded px-2 py-1"
              value={modalityFilter}
              onChange={(e) =>
                setModalityFilter(e.target.value as "" | "Online" | "On Campus" | "Off Campus")
              }
            >
              <option value="">Modality</option>
              <option value="Online">Online</option>
              <option value="On Campus">On Campus</option>
              <option value="Off Campus">Off Campus</option>
            </select>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium text-sm">Sort By:</span>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "Event Date" | "Request Date")}
            >
              <option value="Event Date">Event Date</option>
              <option value="Request Date">Request Date</option>
            </select>
            <button
              type="button"
              className="ml-1 text-lg flex items-center"
              onClick={() => setSortOrder((prev) => (prev === "Latest" ? "Earliest" : "Latest"))}
              aria-label="Toggle sort order"
            >
              {sortOrder === "Latest" ? (
                <ArrowDownWideNarrow className="w-5 h-5" />
              ) : (
                <ArrowUpNarrowWide className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-9 flex justify-center">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="space-y-4 w-[1000px]">
        {paginatedEvents.map((event) => (
          <EventRequestCard key={event.id} event={event} onEdit={(e) => setEditData(e)} />
        ))}
        {paginatedEvents.length === 0 && (
          <div className="text-muted-foreground text-center py-10">No event requests found.</div>
        )}
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

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={currentPage === idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
