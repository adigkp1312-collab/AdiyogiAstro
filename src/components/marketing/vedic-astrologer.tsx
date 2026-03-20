"use client";

import Link from "next/link";
import { Star, CheckCircle, MessageCircle } from "lucide-react";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "50K+", label: "Charts Read" },
  { value: "15+", label: "Countries" },
  { value: "4.9/5", label: "Rating" },
];

const expertise = [
  "Vedic Birth Chart (Kundli)",
  "Nadi & Prashna Astrology",
  "Muhurta & Transit Analysis",
  "Gemstone & Remedial Guidance",
];

export function VedicAstrologer() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Visual */}
          <div className="relative flex items-center justify-center">
            {/* Decorative rings */}
            <div className="absolute size-[300px] mandala-ring animate-spin-slow sm:size-[380px]" />
            <div className="absolute size-[240px] mandala-ring sm:size-[310px]" />

            {/* Astrologer card */}
            <div className="relative w-72 overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-xl shadow-orange-100/40 sm:w-80">
              {/* Header gradient */}
              <div className="h-28 bg-gradient-to-br from-[#FF6600] to-[#FF8C00] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute left-4 top-4 text-5xl">&#x2609;</div>
                  <div className="absolute right-6 top-8 text-3xl">&#x263D;</div>
                  <div className="absolute left-1/2 bottom-2 text-4xl">&#x2648;</div>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 flex justify-center">
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-100 to-amber-100 shadow-lg">
                  <span className="text-4xl">&#x1F9D8;</span>
                </div>
              </div>

              {/* Info */}
              <div className="px-6 pb-6 pt-3 text-center">
                <h3 className="text-lg font-bold text-gray-900">Jyotish Acharya</h3>
                <p className="text-sm text-gray-400">Master Vedic Astrologer</p>

                {/* Rating */}
                <div className="mt-3 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-gray-700">4.9</span>
                </div>

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-lg bg-orange-50 p-2">
                      <p className="text-sm font-bold text-[#FF6600]">{s.value}</p>
                      <p className="text-[10px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-2 top-1/3 animate-float rounded-xl border border-orange-200 bg-white px-3 py-2 shadow-lg sm:right-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-[11px] font-bold text-gray-700">Online Now</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
              <Star className="size-3 text-[#FF6600]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6600]">
                Your Guide
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Guided by <span className="text-gradient-vedic">Ancient Wisdom</span>,
              <br />Powered by Experience
            </h2>

            <p className="mt-5 text-base leading-relaxed text-gray-500">
              With over two decades of devoted practice in Vedic Jyotish, our master astrologer
              blends time-honored Parashari and Jaimini techniques with an intuitive understanding
              of modern life challenges. Every reading is a sacred dialogue between the stars and
              your soul.
            </p>

            {/* Expertise */}
            <div className="mt-6 space-y-3">
              {expertise.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="size-5 shrink-0 text-[#FF6600]" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-vedic inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wider"
              >
                <MessageCircle className="size-4" />
                Talk to Astrologer
              </Link>
              <Link
                href="/birth-chart/new"
                className="btn-vedic-outline inline-flex items-center justify-center px-7 py-3 text-sm uppercase tracking-wider"
              >
                Get Free Kundli
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
