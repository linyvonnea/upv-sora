"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type EventRequest = {
  modality: string;
  status: string;
};

const statusLabels = [
  "Awaiting Evaluation",
  "Under Evaluation",
  "Forwarded to Offices",
  "Issues Found",
  "Approved",
  "Disapproved",
];

const modalityLabels = ["Online", "On Campus", "Off Campus"];

export default function UserDashboard() {
  const user = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    awaiting: 0,
    underEval: 0,
    forwarded: 0,
    issues: 0,
    approved: 0,
    disapproved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const snapshot = await getDocs(collection(db, "eventRequests"));
      const requests: EventRequest[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.organizationId === user.user.uid) {
          requests.push({
            modality: data.modality,
            status: data.status,
          });
        }
      });

      setStats({
        total: requests.length,
        awaiting: requests.filter((r) => r.status === "Awaiting Evaluation").length,
        underEval: requests.filter((r) => r.status === "Under Evaluation").length,
        forwarded: requests.filter((r) => r.status === "Forwarded to Offices").length,
        issues: requests.filter((r) => r.status === "Issues Found").length,
        approved: requests.filter((r) => r.status === "Approved").length,
        disapproved: requests.filter((r) => r.status === "Disapproved").length,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols md:grid-cols-1 gap-6 mb-6">
          <StatCard label="Total Requests" value={stats.total} />
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard label="Awaiting Evaluation" value={stats.awaiting} />
          <StatCard label="Under Evaluation" value={stats.underEval} />
          <StatCard label="Forwarded to Offices" value={stats.forwarded} />
          <StatCard label="Issues Found" value={stats.issues} />
          <StatCard label="Approved" value={stats.approved} />
          <StatCard label="Disapproved" value={stats.disapproved} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow flex flex-col items-center justify-center">
      <span className="text-lg font-semibold mb-1">{label}</span>
      <span className="text-3xl font-bold text-[#8E1537]">{value}</span>
    </div>
  );
}
