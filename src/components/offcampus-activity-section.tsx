import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  Bs5CircleFill,
  Bs6CircleFill,
  Bs7CircleFill,
  Bs8CircleFill,
} from "react-icons/bs";

export function OffCampusActivitySection() {
  return (
    <div id="offcampus" className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#8E1537]">Off Campus Activity</h2>
      <div className="bg-white rounded-lg shadow p-6 border w-full">
        <h3 className="text-lg font-semibold text-[#8E1537] mb-2">Off Campus</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <li>Request Letter</li>
          <li>Signed Conforme of Adviser</li>
          <li>
            Details of the Activity
            <span className="block text-xs text-gray-500 pl-[15px]">
              With Activity Flow, Speakers, etc.
            </span>
          </li>
          <li>
            Coordination with Concerned Offices
            <span className="block text-xs text-gray-500 pl-[15px]">
              (HSU/Security/Local PNP/Brgy. Officials/Principals)
            </span>
          </li>
          <li>Security Plan</li>
          <li>Detailed Medical Arrangement with First Aid Kit</li>
          <li>Waivers or Student Participation Agreement</li>
          <li>Barangay/Municipal Clearance to allow Activity Conduction</li>
          <li>
            List of Participants
            <span className="block text-xs text-gray-500 pl-[15px]">With Emergency Contact</span>
          </li>
          <li>Itinerary of Travel</li>
          <li>Publication Materials (if any)</li>
          <li>Letter of Partnership (if any)</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border w-full">
        <h3 className="text-lg font-semibold text-[#8E1537] mb-2">Process</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            {" "}
            Submits accomplished forms/request letter, conforme, publicity materials, and other
            required documents.
          </li>
          <li>
            {" "}
            Receives application forms and checks completeness of requirements and nature of
            activity.
          </li>
          <li> Forwards application to SOA Coordinator for recommending approval.</li>
          <li> Recommends approval and endorses application for approval of OSA Director</li>
          <li> Approves/Disapproves application to hold activities</li>
          <li> Logs important details of approved/disapproved activity.</li>
          <li> Received approved/disapproved application. </li>
        </ul>
      </div>
    </div>
  );
}
