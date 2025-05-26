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
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-full max-w-5xl mx-auto">
      <div className="w-full bg-[#8E1537] rounded-2xl p-10 mx-auto mb-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow mb-2">
            Welcome to UPV SORA, {user.profile.orgName}!
          </h1>
          <h2 className="text-2xl font-semibold text-white mt-10 mb-2">
            Want to request an event?
          </h2>
          <p className="text-white mb-6 max-w-xl">
            Click the button below to start your event request process!
          </p>
          <Button
            className="bg-white hover:bg-gray-100 !text-[#284b3e] font-bold px-6 drop-shadow"
            onClick={() => setOpenDialog(true)}
          >
            Request an Event
          </Button>
        </div>
        <EventRequestDialog open={openDialog} setOpen={setOpenDialog} mode="new" />
      </div>
      <h1 className="text-3xl font-bold text-[#284b3e] mb-2 text-left w-full ">User Dashboard</h1>
      <UserDashboard />
    </div>
  );
}
