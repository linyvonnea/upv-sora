
// src/hooks/useAdminEventRequests.ts
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { EventRequest, EventRequestWithOrgName } from "@/types/event-request";


export function useAdminEventRequests() {
  const [eventRequests, setEventRequests] = useState<EventRequestWithOrgName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get all eventRequests
        const eventsSnapshot = await getDocs(collection(db, "eventRequests"));
        const events = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as EventRequest[];

        // 2. Collect unique organizationIds (UIDs)
        const orgUids = Array.from(
          new Set(events.map(e => e.organizationId).filter(Boolean))
        );

        // 3. Fetch all user profiles with those UIDs (to get org names)
        let userProfiles: Record<string, { orgName?: string }> = {};
        if (orgUids.length > 0) {
          // Firestore only allows 10 UIDs per "in" query
          const userDocs: any[] = [];
          for (let i = 0; i < orgUids.length; i += 10) {
            const batch = orgUids.slice(i, i + 10);
            const usersSnapshot = await getDocs(
              query(collection(db, "users"), where("__name__", "in", batch))
            );
            userDocs.push(...usersSnapshot.docs);
          }
          userProfiles = Object.fromEntries(
            userDocs.map(doc => [doc.id, doc.data()])
          );
        }

        // 4. Attach organizationName (from user profile) to each event
        const eventsWithOrgName: EventRequestWithOrgName[] = events.map(event => ({
          ...event,
          organizationName:
            userProfiles[event.organizationId]?.orgName || "Unknown Org",
        }));

        setEventRequests(eventsWithOrgName);
        setError(null);
      } catch (err) {
        setError("Failed to load event requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { eventRequests, loading, error };
}

// // src/hooks/useAdminEventRequests.ts
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { EventRequest, EventRequestWithOrgName } from "@/types/event-request";

// /**
//  * Fetches all event requests, joining each one with org name from users (via UID).
//  */
// export function useAdminEventRequests() {
//   const [eventRequests, setEventRequests] = useState<EventRequestWithOrgName[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1. Get all eventRequests
//         const eventsSnapshot = await getDocs(collection(db, "eventRequests"));
//         const events = eventsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as EventRequest[];

//         // 2. Collect unique organizationIds (UIDs)
//         const orgUids = Array.from(
//           new Set(events.map(e => e.organizationId).filter(Boolean))
//         );

//         // 3. Fetch all user profiles with those UIDs
//         let userProfiles: Record<string, any> = {};
//         if (orgUids.length > 0) {
//           // Firestore only allows 10 UIDs in "in" queries at a time
//           const userDocs: any[] = [];
//           for (let i = 0; i < orgUids.length; i += 10) {
//             const batch = orgUids.slice(i, i + 10);
//             const usersSnapshot = await getDocs(
//               query(collection(db, "users"), where("__name__", "in", batch))
//             );
//             userDocs.push(...usersSnapshot.docs);
//           }
//           userProfiles = Object.fromEntries(
//             userDocs.map(doc => [doc.id, doc.data()])
//           );
//         }

//         // 4. Attach organizationName to each event
//         const eventsWithOrgName = events.map(event => ({
//           ...event,
//           organizationName:
//             userProfiles[event.organizationId]?.orgName ||
//             event.organizationEmail ||
//             "Unknown Org",
//         }));

//         setEventRequests(eventsWithOrgName);
//       } catch (err) {
//         setError("Failed to load event requests.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { eventRequests, loading, error };
// }