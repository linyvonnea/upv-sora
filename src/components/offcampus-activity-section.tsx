import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  Bs5CircleFill,
  Bs6CircleFill,
  Bs7CircleFill,
  Bs8CircleFill,
  Bs9CircleFill,
} from "react-icons/bs";

export function OffCampusActivitySection() {
  return (
    <div id="offcampus" className="mb-[10px] mx-auto my-12 w-full max-w-[1000px]">
      <h2 className="text-xl font-semibold mb-4 text-[#8E1537]">Off Campus Activity</h2>
      <div className="bg-white rounded-lg shadow p-6 border w-full">
        <h3 className="text-xl font-semibold text-[#8E1537] mb-2">Requirements</h3>
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
      <div className="bg-white rounded-lg shadow p-6 border w-full mt-10 mb-10">
        <h3 className="text-xl font-semibold text-[#8E1537] mb-2">Process</h3>
        <div className="italic text-s text-gray-500 mb-2">
          Duration: 5 days and 55 minutes <br /> File permits and requests at least ten (10) working
          days prior to the activity.
        </div>
        <ul className="list-none text-gray-700 space-y-1">
          <li className="flex items-center gap-2">
            <Bs1CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Submit request letter and other requirements.
              <div className="italic text-xs text-gray-500">Person Responsible: Client</div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs2CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Receives request letter and checks completeness of requirements and nature of
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
              If documents are incomplete, gives instructions regarding lacking requirements for
              compliance.{" "}
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs4CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              If documents are already complete, forwards application to SOA Coordinator for
              recommending approval.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs5CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              SOA Coordinator recommends approval and endorses application for approval of OSA
              Director.
              <div className="italic text-xs text-gray-500">
                Person Responsible: SOA Coordinator
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs6CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Evaluates requests, checks requirements, specifies conditions and recommends approval.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs7CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Logs details of activity and forwards documents to the OVCAA for recommending approval
              of the Vice Chancellor for Academic Affairs and final approval of the Chancellor.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs8CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Follows up approval from the Office of Chancellor.
              <div className="italic text-xs text-gray-500">Person Responsible: Client</div>
            </div>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <Bs9CircleFill className="text-[#38715c] min-w-10 min-h-10 mb-5 mt-5" />
            <div>
              Facilitates approval of request from the OVCAA and/or Office of the Chancellor.
              <div className="italic text-xs text-gray-500">
                Person Responsible: University Ext. Associate
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
