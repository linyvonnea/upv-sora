"use client";
import Image from "next/image";
import { FAQCollapse, FAQItem } from "@/components/faqs-dropdown";
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
import { OnlineActivitySection } from "@/components/online-activity-section";
import { OffCampusActivitySection } from "@/components/offcampus-activity-section";
import { OnCampusActivitySection } from "@/components/oncampus-activity-section";
import { FaArrowUp } from "react-icons/fa";

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
    <div className="w-full h-full relative">
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
            <a href="#online" className="text-[#8E1537] font-medium hover:underline transition">
              Online
            </a>
          </li>
          <li>
            <a href="#oncampus" className="text-[#8E1537] font-medium hover:underline transition">
              On Campus
            </a>
          </li>
          <li>
            <a href="#offcampus" className="text-[#8E1537] font-medium hover:underline transition">
              Off Campus
            </a>
          </li>
        </ul>
      </nav>

      <OnlineActivitySection />
      <OnCampusActivitySection />
      <OffCampusActivitySection />

      <FAQCollapse faqs={faqs} />

      <button
        onClick={() => {
          const el = document.getElementById("main-content");
          if (el) {
            el.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 right-6 z-50 bg-[#8E1537] text-white p-3 rounded-full shadow-lg hover:bg-[#6c102b] transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}
