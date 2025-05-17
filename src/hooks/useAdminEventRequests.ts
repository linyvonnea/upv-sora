// src/hooks/useAdminEventRequests.ts
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { EventRequest } from "@/types/event-request";

export function useAdminEventRequests() {
  const [eventRequests, setEventRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "eventRequests"));
        const events: EventRequest[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<EventRequest, "id">),
        }));
        setEventRequests(events);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load event requests");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { eventRequests, loading, error };
}