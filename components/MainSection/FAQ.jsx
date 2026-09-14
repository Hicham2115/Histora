"use client";

import { useState } from "react";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Noto_Sans,
} from "next/font/google";
import { Plus } from "lucide-react";
import SplitText from "@/components/SplitText";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders within Morocco arrive in 2–4 business days. International orders typically take 7–14 business days, depending on customs.",
  },
  {
    question: "What's your return policy?",
    answer:
      "You have 14 days from delivery to request a return or exchange. Items must be unworn, unwashed, and in their original packaging.",
  },
  {
    question: "Do you offer custom or made-to-order pieces?",
    answer:
      "Yes — reach out through the contact form with your idea and we'll get back to you with options, timelines, and pricing.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page includes a full measurement guide. If you're between sizes, we recommend sizing up for a relaxed fit.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery across Morocco, along with major debit and credit cards at checkout.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes — once your order ships, you'll receive a confirmation with tracking details by email.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className={`${notoSans.className} relative px-8 py-24 md:px-24`}
    >
      <p className="mb-6 text-center text-xs tracking-[0.3em] text-stone-400 uppercase">
        Questions
      </p>

      <div className="text-center">
        <SplitText
          text="Before You Write"
          tag="h2"
          className={`${sairaStencil.className} text-[clamp(2.2rem,6vw,4.5rem)] text-stone-900`}
          delay={40}
          duration={1.1}
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="block h-px w-16 bg-stone-300" />
        <span className="block h-1.5 w-1.5 rounded-full bg-stone-400" />
        <span className="block h-px w-16 bg-stone-300" />
      </div>

      <p
        className={`${cormorant.className} mx-auto mt-6 max-w-lg text-center text-lg font-light text-stone-600 italic`}
      >
        A few things people usually ask before reaching out.
      </p>

      <div className="mx-auto mt-16 max-w-3xl divide-y divide-stone-200 border-y border-stone-200">
        {faqs.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`${
                    isOpen ? "text-stone-900" : "text-stone-600"
                  } text-sm tracking-[0.05em] uppercase transition-colors duration-300 sm:text-base`}
                >
                  {item.question}
                </span>
                <Plus
                  className={`h-4 w-4 shrink-0 text-stone-400 transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-[#b8874f]" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className={` max-w-2xl pb-6 text-base font-light text-black`}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
