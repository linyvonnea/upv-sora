"use client";
import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQCollapse({ faqs }: { faqs: FAQItem[] }) {
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
