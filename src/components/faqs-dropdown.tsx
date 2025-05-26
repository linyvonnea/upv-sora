"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "What is UPV SORA?",
    answer:
      "UPV SORA (UPV Student Organization Request Assistance) is a web application designed to help student organizations of UPV process their requests for events and publication materials efficiently.",
  },
  {
    question: "Who can use UPV SORA?",
    answer:
      "All University-wide recognized student organizations of the University of the Philippines Visayas can use UPV SORA to submit and track their requests.",
  },
  {
    question: "How do I submit an event request?",
    answer:
      "Log in to UPV SORA, go to the Event Requests section, fill out the required forms, and submit your request. You can track the status of your request within the platform.",
  },
  {
    question: "What documents are required for an event request?",
    answer:
      "Required documents typically include a request letter, signed conforme of adviser, details of the activity, and other supporting documents depending on the type of event.",
  },
  {
    question: "How will I know if my request is approved?",
    answer:
      "You will receive a notification in UPV SORA once your request has been reviewed and approved or if further action is needed.",
  },
];

export function FAQCollapse({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div id="faqs" className="mx-auto my-12 w-full max-w-[1000px] font-sans">
      <h2 className="text-xl font-bold mb-4 text-[#8E1537]">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full font-sans">
        {faqs.map((faq, idx) => (
          <AccordionItem value={`faq-${idx}`} key={idx}>
            <AccordionTrigger className="text-left font-sans">{faq.question}</AccordionTrigger>
            <AccordionContent className="font-sans">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
