"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statuses = [
  "All",
  "Awaiting Evaluation",
  "Under Evaluation",
  "Forwarded to Offices",
  "Issues Found",
  "Approved",
  "Disapproved",
]

export function EventRequestTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-muted">
        {statuses.map((status) => (
          <TabsTrigger key={status} value={status} className="px-4 py-2">
            {status}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}