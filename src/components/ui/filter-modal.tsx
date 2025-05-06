import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FilterOptions {
  organizationName: string;
  status: string;
  modality: "Online" | "On-Site" | "";
  location: "Iloilo" | "Miagao" | "";
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  statusOptions: string[];
}

export function FilterModal({
  isOpen,
  onClose,
  onApply,
  filters,
  setFilters,
  statusOptions,
}: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Filter By</h2>
          <button onClick={onClose}>
            <ChevronDown className="rotate-180" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Organization Name
          </label>
          <Input
            placeholder="Search for an Organization’s Requests"
            value={filters.organizationName}
            onChange={e => setFilters(f => ({ ...f, organizationName: e.target.value }))}
          />
          {filters.organizationName && (
            <span className="inline-block mt-2 bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-medium">
              {filters.organizationName}{" "}
              <button
                className="ml-1 text-green-900"
                onClick={() => setFilters(f => ({ ...f, organizationName: "" }))}
              >
                ×
              </button>
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-md px-2 py-1"
              value={filters.status}
              onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            >
              <option value="">Any</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          {/* Modality */}
          <div>
            <label className="block text-sm font-medium mb-1">Modality</label>
            <select
              className="w-full border rounded-md px-2 py-1"
              value={filters.modality}
              onChange={e => setFilters(f => ({ ...f, modality: e.target.value as "Online" | "On-Site" | "" }))}
            >
              <option value="">Any</option>
              <option value="Online">Online</option>
              <option value="On-Site">On-Site</option>
            </select>
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full border rounded-md px-2 py-1"
              value={filters.location}
              onChange={e => setFilters(f => ({ ...f, location: e.target.value as "Iloilo" | "Miagao" | "" }))}
            >
              <option value="">Any</option>
              <option value="Iloilo">Iloilo Campus</option>
              <option value="Miagao">Miagao Campus</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
            onClick={() => onApply(filters)}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}