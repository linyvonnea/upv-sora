"use client";

import * as React from "react";

import { EventRequestDialog } from "@/components/ui/event-request-dialog";
import { EventDetails } from "@/components/left-event-details";


export default function UserHomePage() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">

      <EventRequestDialog open={open} setOpen={setOpen} />
    </div> 

  );
}

// revamped, calendar still not working tho

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { EventRequestDialog } from "@/components/user/request-events/event-request-dialog";

// export default function UserHomePage() {
//   const [openDialog, setOpenDialog] = useState(false);

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-6">Welcome!</h1>

//       <div className="flex gap-4">
//         <Button
//           className="bg-[#284b3e] text-white hover:bg-[#284b3e]/90"
//           onClick={() => setOpenDialog(true)}
//         >
//           Request an Event
//         </Button>
//         <Button variant="outline">Request a Pubmat</Button>
//       </div>

//       <EventRequestDialog open={openDialog} onOpenChange={setOpenDialog} />
//     </div>
//   );
// }
