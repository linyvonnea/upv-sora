"use client";
import Image from "next/image";
import { FAQCollapse, faqs } from "@/components/faqs-dropdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnlineActivitySection } from "@/components/online-activity-section";
import { OnCampusActivitySection } from "@/components/oncampus-activity-section";
import { OffCampusActivitySection } from "@/components/offcampus-activity-section";
import { FaArrowUp } from "react-icons/fa";

export default function InformationBoardPage() {
  // Helper for scrolling to section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-full relative">
      <div
        id="about"
        className="w-full flex items-center p-[50px] mx-auto justify-center bg-[#8E1537] rounded-lg"
      >
        <div>
          <Image src="/images/logo_white.png" alt="UPV Sora Logo" width={250} height={250} />
        </div>
        <div className="m-[50px]">
          <p className="text-[50px] font-bold text-white">UPV SORA</p>
          <p className="text-gray-100 w-[300px]">
            The UPV SORA (UPV Student Organization Request Assistance) is a web application created
            to assist student organizations of the UPV in processing their requests for events and
            publication materials.
          </p>
        </div>
      </div>

      <div className="w-[1000px] mx-auto mt-10 mb-10">
        <Tabs defaultValue="faqs">
          <TabsList className="text-xl w-full flex justify-center gap-4 text-bold text-[#8E1537]">
            <TabsTrigger value="faqs" onClick={() => scrollToSection("faqs")}>
              FAQs
            </TabsTrigger>
            <TabsTrigger value="online" onClick={() => scrollToSection("online")}>
              Online
            </TabsTrigger>
            <TabsTrigger value="oncampus" onClick={() => scrollToSection("oncampus")}>
              On Campus
            </TabsTrigger>
            <TabsTrigger value="offcampus" onClick={() => scrollToSection("offcampus")}>
              Off Campus
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <FAQCollapse faqs={faqs} />
      <OnlineActivitySection />
      <OnCampusActivitySection />
      <OffCampusActivitySection />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 bg-[#8E1537] text-white p-3 rounded-full shadow-lg hover:bg-[#6c102b] transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}
