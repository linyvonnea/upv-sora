import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

export interface EventData {
  id: string;
  title: string;
  requestDate: string;
  eventDate: string;
  status: string;
  modality: string;
  location?: string;
  organizationName: string;
}

export function useUserEventRequests() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const q = query(
          collection(db, "eventRequests"),
          where("organizationId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const result: EventData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<EventData, "id">),
        }));
        setEvents(result);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  return { events, loading };
}