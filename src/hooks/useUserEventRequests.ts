import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import type { EventRequest } from "@/types/event-request";

export function useUserEventRequests() {
  const { user } = useAuth();
  const [eventRequests, setEventRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setEventRequests([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "eventRequests"),
      where("organizationId", "==", user.uid) // id
    );

    // Listen for live updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const data: EventRequest[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<EventRequest, "id">),
        }));
        setEventRequests(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError((err as Error).message);
        setLoading(false);
      }
    );

    // Cleanup the listener on unmount or user change
    return () => unsubscribe();
  }, [user]);

  // refetch is kept for API compatibility, but with onSnapshot it's rarely needed
  const refetch = () => {};

  return { eventRequests, loading, error, refetch };
}