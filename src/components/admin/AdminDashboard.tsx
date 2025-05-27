"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type EventRequest = {
  modality: string;
  status: string;
  organizationId: string;
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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    awaiting: 0,
    underEval: 0,
    forwarded: 0,
    issues: 0,
    approved: 0,
    disapproved: 0,
    online: 0,
    onCampus: 0,
    offCampus: 0,
    orgCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const snapshot = await getDocs(collection(db, "eventRequests"));
      const requests: EventRequest[] = [];
      const orgIds = new Set<string>();
      snapshot.forEach((doc) => {
        const data = doc.data();
        requests.push({
          modality: data.modality,
          status: data.status,
          organizationId: data.organizationId,
        });
        if (data.organizationId) orgIds.add(data.organizationId);
      });

      setStats({
        total: requests.length,
        awaiting: requests.filter((r) => r.status === "Awaiting Evaluation").length,
        underEval: requests.filter((r) => r.status === "Under Evaluation").length,
        forwarded: requests.filter((r) => r.status === "Forwarded to Offices").length,
        issues: requests.filter((r) => r.status === "Issues Found").length,
        approved: requests.filter((r) => r.status === "Approved").length,
        disapproved: requests.filter((r) => r.status === "Disapproved").length,
        online: requests.filter((r) => r.modality === "Online").length,
        onCampus: requests.filter((r) => r.modality === "On Campus").length,
        offCampus: requests.filter((r) => r.modality === "Off Campus").length,
        orgCount: orgIds.size,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  // Data for donut chart
  const donutData = [
    { name: "Online", value: stats.online },
    { name: "On Campus", value: stats.onCampus },
    { name: "Off Campus", value: stats.offCampus },
  ];
  const donutColors = ["#8E1537", "#38715c", "#fbbf24"];

  // Data for bar chart (request status)
  const barData = [
    { name: "Awaiting", value: stats.awaiting },
    { name: "Under Eval", value: stats.underEval },
    { name: "Forwarded", value: stats.forwarded },
    { name: "Issues", value: stats.issues },
    { name: "Approved", value: stats.approved },
    { name: "Disapproved", value: stats.disapproved },
  ];

  return (
    <div className="w-full">
      <div className="w-full bg-[#8E1537] rounded-lg p-[50px] mx-auto mb-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Six Stat Cards (2 columns, 3 rows) */}
          <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-6">
            <StatCard label="Total Requests" value={stats.total} />
            <StatCard label="Organizations" value={stats.orgCount} />
            <StatCard label="Awaiting Evaluation" value={stats.awaiting} />
            <StatCard label="Under Evaluation" value={stats.underEval} />
            <StatCard label="Forwarded to Offices" value={stats.forwarded} />
            <StatCard label="Issues Found" value={stats.issues} />
          </div>
          {/* Right: Two Stat Cards on top, Donut Chart below */}
          <div className="flex-1 flex flex-col gap-6 items-center">
            <div className="w-full grid grid-cols-2 gap-6">
              <StatCard label="Approved" value={stats.approved} />
              <StatCard label="Disapproved" value={stats.disapproved} />
            </div>
            {!loading && (
              <div className="w-full flex flex-col items-center">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-full">
                  <span className="text-lg font-semibold mb-2 text-[#8E1537]">
                    Event Modality Distribution
                  </span>
                  <ResponsiveContainer width={220} height={220}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                      >
                        {donutData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={donutColors[idx % donutColors.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {donutData.map((entry, idx) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: donutColors[idx % donutColors.length] }}
                        ></span>
                        <span className="text-sm">
                          {entry.name}: <span className="font-bold">{entry.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
