"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Can I try AstroPath for free?",
    answer:
      "Yes! Our Free tier gives you access to daily horoscopes, a basic birth chart, and community features. No credit card required to get started.",
  },
  {
    question: "What is included in the Premium plan?",
    answer:
      "Premium includes everything in Free plus weekly and monthly horoscopes, full birth chart analysis with all planet positions and aspects, detailed natal reports, transit tracking, and exclusive articles from our expert astrologers.",
  },
  {
    question: "How does the yearly billing discount work?",
    answer:
      "When you choose yearly billing, you save 20% compared to paying monthly. You will be billed once per year at the discounted rate, and your subscription remains active for the full 12 months.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Absolutely. You can upgrade your plan at any time and the price difference will be prorated. If you downgrade, the change takes effect at the end of your current billing period.",
  },
  {
    question: "What are compatibility reports?",
    answer:
      "Compatibility reports (available on Pro) analyze the birth charts of two people to reveal how your planetary placements interact. This includes synastry aspects, composite charts, and detailed relationship insights.",
  },
  {
    question: "How accurate are the birth chart calculations?",
    answer:
      "We use precise astronomical data based on the Swiss Ephemeris for our planetary calculations. For the most accurate chart, we recommend entering your exact birth time and location.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. If you are not satisfied with your subscription, you can request a full refund within 14 days of your initial purchase. Contact our support team for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through our secure payment processor, Stripe. We also support Apple Pay and Google Pay.",
  },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={cn(
              "rounded-xl border bg-white transition-colors duration-200",
              isOpen ? "border-orange-200" : "border-gray-200"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-sm font-medium text-gray-900 pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 transition-transform duration-200",
                  isOpen ? "rotate-180 text-[#FF6600]" : "text-gray-400"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-[#FAFAF5]">
      {/* Header */}
      <section className="relative overflow-hidden pt-24 sm:pt-32">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple,{" "}
            <span className="text-[#FF6600]">Transparent</span>{" "}
            Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Choose the plan that fits your cosmic journey. Start free and
            upgrade when you are ready.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <PricingCards />

      {/* FAQ section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about AstroPath subscriptions.
            </p>
          </div>

          <FaqAccordion items={faqs} />

          {/* Still have questions? */}
          <div className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-[#FF6600]">
              Still have questions?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Our support team is here to help. Reach out anytime.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center rounded-lg bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
