import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sortOption: { type: string; order?: string; days?: number }) => void;
}

export default function SortModal({ isOpen, onClose, onApply }: SortModalProps) {
  const [sortType, setSortType] = useState("Request Date");
  const [sortOrder, setSortOrder] = useState<"Latest" | "Oldest">("Latest");
  const [daysBeforeEvent, setDaysBeforeEvent] = useState(1);

  const handleApply = () => {
    if (sortType === "Request Date") {
      onApply({ type: sortType, order: sortOrder });
    } else {
      onApply({ type: sortType, days: daysBeforeEvent });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sort Options</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Sort By</label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Request Date">Request Date</option>
            <option value="Days Before Event">Days Before Event</option>
          </select>
        </div>

        {sortType === "Request Date" && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Order</label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={sortOrder === "Latest" ? "bg-gray-200 font-bold" : ""}
                onClick={() => setSortOrder("Latest")}
              >
                Latest
              </Button>
              <Button
                variant="outline"
                className={sortOrder === "Oldest" ? "bg-gray-200 font-bold" : ""}
                onClick={() => setSortOrder("Oldest")}
              >
                Oldest
              </Button>
            </div>
          </div>
        )}

        {sortType === "Days Before Event" && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Days Before Event</label>
            <select
              value={daysBeforeEvent}
              onChange={(e) => setDaysBeforeEvent(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
