// app/user/home/page.tsx
"use client";

import * as React from "react";
import { EventRequestDialog } from "@/components/ui/event-request-dialog";
import { Button } from "@/components/ui/button"; 
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/user/event-request/UserDashboard";

export default function UserHomePage() {
  const user = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to UPV-SORA, { user.profile.orgName }!</h1>

      <UserDashboard/>

      <Button
        className="bg-[#284b3e] hover:bg-[#284b3e]/90 text-white px-6 py-3"
        onClick={() => setOpenDialog(true)}
      >
        Request an Event
      </Button>

      <EventRequestDialog open={openDialog} setOpen={setOpenDialog} mode="new" />
    </div>
  );
}
