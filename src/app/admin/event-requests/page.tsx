// app/admin/event-requests/page.tsx
"use client";

import * as React from "react";
import { SearchBar } from "@/components/ui/search-bar";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminEventRequests } from "@/hooks/useAdminEventRequests";
import { EventRequestTabs } from "@/components/user/event-request/EventRequestTabs";
import { EventRequestCard } from "@/components/user/event-request/EventRequestCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type FilterOptions = {
  search: string;
  modality: "" | "Online" | "On Campus" | "Off Campus";
  location: "" | "Iloilo" | "Miagao";
};

export default function AdminEventRequestsPage() {
  const { eventRequests, loading, error } = useAdminEventRequests();
  const [filters, setFilters] = React.useState<FilterOptions>({
    search: "",
    modality: "",
    location: "",
  });
  const [activeTab, setActiveTab] = React.useState("All");
  const [sortBy, setSortBy] = React.useState<"Event Date" | "Request Date">("Request Date");
  const [sortOrder, setSortOrder] = React.useState<"Latest" | "Earliest">("Latest");
  const [modalityFilter, setModalityFilter] = React.useState<
    "" | "Online" | "On Campus" | "Off Campus"
  >("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;
  const router = useRouter();

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortOrder, activeTab]);

  if (loading) return <div className="p-10 text-center">Loading event requests…</div>;
  if (error) return <div className="p-10 text-red-600 text-center">{error}</div>;

  // Filtering logic
  const filteredEvents = eventRequests.filter(
    (event) =>
      [event.organizationName, event.title].some((field) =>
        field?.toLowerCase().includes(filters.search.toLowerCase())
      ) &&
      (modalityFilter === "" || event.modality === modalityFilter) &&
      (!filters.location || event.location === filters.location)
  );

  const tabFilteredEvents =
    activeTab === "All" ? filteredEvents : filteredEvents.filter((e) => e.status === activeTab);

  // Sorting logic
  const sortedEvents = [...tabFilteredEvents].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedEvents.length / pageSize);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left">Event Requests</h1>
      <div className="flex items-center gap-4 w-full max-w-[1000px]">
        <div className="flex-grow">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
            placeholder="Search by Organization or Event Request"
            label="Organization/Request Title"
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

      <div className="mb-4 flex justify-center">
        <EventRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-5 space-y-4 w-[1000px]">
          {sortedEvents.length === 0 && (
            <div className="text-muted-foreground text-center py-10">No event requests found.</div>
          )}
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/admin/event-requests/${event.id}`)}
              className="cursor-pointer"
            >
              <EventRequestCard event={event} showAccordion={false} showOrgName={true} />
            </div>
          ))}
        </div>
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
    </div>
  );
}
