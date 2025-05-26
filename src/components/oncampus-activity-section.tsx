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

export function OnCampusActivitySection() {
  return (
    <div id="oncampus" className="mx-auto my-12 w-full max-w-[1000px]">
      <h2 className="text-xl font-semibold mb-4 text-[#8E1537]">On Campus Activity</h2>
      <div className="bg-white rounded-lg shadow p-6 border w-full">
        <h3 className="text-xl font-semibold text-[#8E1537] mb-2">Requirements</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Request Letter</li>
          <li>Signed Conforme of Adviser</li>
          <li>
            Details of the Activity
            <span className="italic block text-xs text-gray-500 pl-[15px]">
              With Activity Flow, Speakers, etc.
            </span>
          </li>
          <li>Security Plan</li>
          <li>Application Form For Use of UPV Facilities</li>
          <li>Publication Materials (if any)</li>
          <li>Letter of Partnership (if any)</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border w-full mt-10">
        <h3 className="text-xl font-semibold text-[#8E1537] mb-2">Process</h3>
        <div className="italic text-s text-gray-500 mb-2">
          Duration: 7 days and 2 minutes <br /> File permits and requests at least five (5) working
          days prior to the activity.
        </div>
        <ul className="list-none text-gray-700 space-y-1">
          <li className="flex items-center gap-2">
            <Bs1CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Submit accomplished forms/request letter, conforme, publicity materials, and other
              required documents.
              <div className="italic text-xs text-gray-500">Person Responsible: Client</div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs2CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Receives application forms and checks completeness of requirements and nature of
              activity.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs3CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Forwards application to SOA Coordinator for recommending approval.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs4CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Recommends approval and endorses application for approval of OSA Director.
              <div className="italic text-xs text-gray-500">
                Person Responsible: SOA Coordinator
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs5CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Approves/Disapproves application to hold activities.
              <div className="italic text-xs text-gray-500">Person Responsible: OSA Director</div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs6CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Logs important details of approved/disapproved activity.
              <div className="italic text-xs text-gray-500">Person Responsible: OSA Director</div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs7CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Releases the approved/disapproved application form with the NOA.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs8CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Receive the approved/disapproved application.
              <div className="italic text-xs text-gray-500">Person Responsible: Client</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
