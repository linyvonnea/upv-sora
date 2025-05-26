"use client";
import Image from "next/image";
import { FAQCollapse, FAQItem } from "@/components/faqs-dropdown";

const faqs: FAQItem[] = [
  {
    question: "Q1",
    answer: "A1",
  },
  {
    question: "Q2",
    answer: "A2",
  },
];

export default function InformationBoardPage() {
  return (
    <div className="w-full h-full">
      {/* About Section */}
      <div
        id="about"
        className="w-full max-w-3xl flex items-center gap-6 mb-6 mx-auto justify-center"
      >
        <div>
          <Image src="/images/logo_maroon.png" alt="UPV Sora Logo" width={250} height={250} />
        </div>
        <div className="m-[50px]">
          <p className="text-xl font-bold text-[#8E1537]">UPV SORA</p>
          <p className="text-gray-700 w-[300px]">
            The UPV SORA (UPV Student Organization Request Assistance) is a web application created
            to assist student organizations of the UPV in processing their requests for events and
            publication materials.
          </p>
        </div>
      </div>

      {/* Horizontal Navbar */}
      <nav className="w-full max-w-3xl mx-auto mb-8">
        <ul className="flex justify-center gap-8 border-b pb-2">
          <li>
            <a href="#process" className="text-[#8E1537] font-medium hover:underline transition">
              Process
            </a>
          </li>
          <li>
            <a href="#reqs" className="text-[#8E1537] font-medium hover:underline transition">
              Requirements
            </a>
          </li>
          <li>
            <a href="#faqs" className="text-[#8E1537] font-medium hover:underline transition">
              FAQs
            </a>
          </li>
        </ul>
      </nav>

      <div id="reqs" className="mt-8">
        <div className="w-[1000px] mx-auto mb-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold mb-4 text-[#8E1537]">Requirements</h2>
          <div className="bg-white rounded-lg shadow p-6 border w-full">
            <h3 className="text-lg font-semibold text-[#8E1537] mb-2">Online</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Request Letter</li>
              <li>Signed Conforme of Adviser</li>
              <li>
                Details of the Activity
                <span className="block text-xs text-gray-500 pl-[15px]">
                  With Activity Flow, Speakers, etc.
                </span>
              </li>
              <li>Social Media Pages Links</li>
              <li>Publication Materials (if any)</li>
              <li>Letter of Partnership (if any)</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border w-full">
            <h3 className="text-lg font-semibold text-[#8E1537] mb-2">On Campus</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Request Letter</li>
              <li>Signed Conforme of Adviser</li>
              <li>Details of the Activity</li>
              <span className=" italic block text-xs text-gray-500 pl-[15px]">
                With Activity Flow, Speakers, etc.
              </span>
              <li>Security Plan</li>
              <li>Application Form For Use of UPV Facilities</li>
              <li>Publication Materials (if any)</li>
              <li>Letter of Partnership (if any)</li>
            </ul>
          </div>
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
                <span className="block text-xs text-gray-500 pl-[15px]">
                  With Emergency Contact
                </span>
              </li>
              <li>Itinerary of Travel</li>
              <li>Publication Materials (if any)</li>
              <li>Letter of Partnership (if any)</li>
            </ul>
          </div>
        </div>
      </div>

      <FAQCollapse faqs={faqs} />
    </div>
  );
}
