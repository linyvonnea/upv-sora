"use client";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Q1",
    answer: "A1",
  },
  {
    question: "Q2",
    answer: "A2",
  },
];

function FAQCollapse() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="faqs" className="m-[18px] scroll-mt-24">
      <h2 className="text-xl font-semibold mb-4 text-[#8E1537]">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              <span>{openIndex === idx ? "▲" : "▼"}</span>
            </button>
            {openIndex === idx && <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Request Letter</li>
              <li>Signed Conforme of Adviser</li>
              <li>Details of the Activity</li>
              <span className="italic first-letter:block text-xs text-gray-500 pl-[15px]">
                With Activity Flow, Speakers, etc.
              </span>
              <li>Security Plan</li>
              <li>Detailed Medical Arrangement with First Aid Kit</li>
              <li>Coordination with Concerned Offices</li>
              <span className=" italic block text-xs text-gray-500 pl-[15px]">
                (HSU/Security/Local PNP/Brgy. Officials/Principals)
              </span>
              <li>Waivers or Student Participation Agreement</li>
              <li>Barangay/Municipal Clearance to allow Activity Conduction</li>
              <li>List of Participants</li>
              <span className="italic block text-xs text-gray-500 pl-[15px]">
                with Emergency Contact
              </span>
              <li>Itinerary of Travel</li>
              <li>Publication Materials (if any)</li>
              <li>Letter of Partnership (if any)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sections */}
      <FAQCollapse />
    </div>
  );
}
