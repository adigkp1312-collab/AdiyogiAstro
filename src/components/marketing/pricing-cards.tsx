"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with essential astrology tools and daily guidance.",
    features: [
      "Daily horoscope (brief)",
      "Basic birth chart (limited)",
      "Community access",
    ],
    cta: "Get Started Free",
    href: "/login",
  },
  {
    name: "Premium",
    monthlyPrice: 9.99,
    yearlyPrice: 95.90,
    description:
      "Unlock full charts, detailed reports, and exclusive content.",
    features: [
      "Everything in Free",
      "Weekly & monthly horoscopes",
      "Full birth chart analysis",
      "Detailed natal reports",
      "Transit tracker",
      "Exclusive articles",
    ],
    cta: "Subscribe to Premium",
    href: "#",
    popular: true,
  },
  {
    name: "Pro",
    monthlyPrice: 19.99,
    yearlyPrice: 191.90,
    description:
      "The ultimate astrology experience with priority support and early access.",
    features: [
      "Everything in Premium",
      "Compatibility reports",
      "Personalized transit alerts",
      "Priority support",
      "Early access to features",
    ],
    cta: "Go Pro",
    href: "#",
  },
];

function formatPrice(price: number): string {
  if (price === 0) return "$0";
  return `$${price.toFixed(2)}`;
}

export function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-2 inline-block border-b-2 border-[#FF6600] pb-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
              Pricing
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start free and upgrade as you explore deeper into the cosmos.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-1 rounded-lg bg-gray-100 p-1 sm:mx-auto sm:w-fit">
          <button
            type="button"
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "rounded-md px-5 py-2 text-sm font-medium transition-colors",
              billingPeriod === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "rounded-md px-5 py-2 text-sm font-medium transition-colors",
              billingPeriod === "yearly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Yearly
            <span className="ml-2 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => {
            const price =
              billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
            const period = billingPeriod === "monthly" ? "/mo" : "/yr";

            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-xl border-2 p-6 transition-all duration-300 lg:p-8",
                  tier.popular
                    ? "border-[#FF6600] bg-white shadow-lg shadow-orange-100"
                    : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-1 text-xs font-bold text-white shadow-sm">
                      <Sparkles className="size-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-6">
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      tier.popular ? "text-[#FF6600]" : "text-gray-900"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    {price > 0 && (
                      <span className="text-sm text-gray-500">{period}</span>
                    )}
                  </div>
                  {price === 0 && (
                    <p className="mt-1 text-sm text-gray-500">Free forever</p>
                  )}
                  {billingPeriod === "yearly" && tier.monthlyPrice > 0 && (
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="text-gray-400 line-through">
                        {formatPrice(tier.monthlyPrice * 12)}
                      </span>{" "}
                      billed annually
                    </p>
                  )}
                </div>

                {/* Features list */}
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-gray-700"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.popular ? "text-[#FF6600]" : "text-green-600"
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link href={tier.href} className="mt-auto">
                  <Button
                    className={cn(
                      "h-11 w-full text-sm font-bold",
                      tier.popular
                        ? "bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white shadow-md hover:from-[#e65c00] hover:to-[#e07800] hover:shadow-lg"
                        : tier.name === "Pro"
                        ? "border-2 border-[#FF6600] bg-white text-[#FF6600] hover:bg-orange-50"
                        : "border-2 border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:text-[#FF6600]"
                    )}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
