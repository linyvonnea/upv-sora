// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
// import type { EventData } from "@/components/user/event-request/EventRequestCard";

// export function EventDetails({ event }: { event: EventData }) {
//   const fileEntries = event.files ? Object.entries(event.files) : [];

//   return (
//     <Card className="p-4 w-full">
//       <CardContent className="space-y-2">
//         <p className="text-sm">
//           <span className="font-medium">Event Type:</span> {event.modality || "N/A"}
//         </p>
//         <p className="text-sm">
//           <span className="font-medium">Organization:</span> {event.organizationName || "N/A"}
//         </p>

//         {fileEntries.length > 0 && (
//           <div className="text-sm space-y-2 pt-4">
//             <p className="font-medium">Submitted Requirements:</p>
//             {fileEntries.map(([label, url]) => (
//               <div key={label} className="flex items-center gap-2">
//                 <Button asChild className="gap-2 bg-black hover:bg-black/80 text-white text-sm">
//                   <a href={url} target="_blank" rel="noopener noreferrer" download>
//                     <Download className="w-4 h-4" />
//                     {label}.pdf
//                   </a>
//                 </Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
