import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import type { EventRequest } from "@/types/event-request";

export function useUserEventRequests() {
  const { user } = useAuth();
  const [eventRequests, setEventRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRequests = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const q = query(collection(db, "eventRequests"), where("organizationId", "==", user.uid));
      const snapshot = await getDocs(q);

      const data: EventRequest[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<EventRequest, "id">),
      }));

      setEventRequests(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserRequests();
  }, [fetchUserRequests]);

  return { eventRequests, loading, error, refetch: fetchUserRequests };
}