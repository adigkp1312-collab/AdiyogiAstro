"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const astrologers = [
  { name: "पंडित शर्मा जी", nameEn: "Pt. Sharma Ji", rate: 15, img: "/astrologers/pandit-sharma.jpg", ring: "#FF6600" },
  { name: "आचार्य दीपक", nameEn: "Acharya Deepak", rate: 21, img: "/astrologers/acharya-deepak.jpg", ring: "#7C3AED" },
  { name: "ज्योतिषी रेखा", nameEn: "Jyotishi Rekha", rate: 11, img: "/astrologers/jyotishi-rekha.jpg", ring: "#EC4899" },
  { name: "गुरुदेव त्रिपाठी", nameEn: "Gurudev Tripathi", rate: 22, img: "/astrologers/gurudev-tripathi.jpg", ring: "#059669" },
  { name: "महर्षि सूर्य", nameEn: "Maharshi Surya", rate: 17, img: "/astrologers/maharshi-surya.jpg", ring: "#F59E0B" },
  { name: "तांत्रिक विजय", nameEn: "Tantrik Vijay", rate: 25, img: "/astrologers/tantrik-vijay.jpg", ring: "#DC2626" },
  { name: "पंडित रामकृष्ण", nameEn: "Pt. Ramkrishna", rate: 16, img: "/astrologers/pt-ramkrishna.jpg", ring: "#3B82F6" },
  { name: "ज्योतिषी प्रिया", nameEn: "Jyotishi Priya", rate: 11, img: "/astrologers/jyotishi-priya.jpg", ring: "#D946EF" },
  { name: "आचार्य भार्गव", nameEn: "Acharya Bhargav", rate: 19, img: "/astrologers/acharya-bhargav.jpg", ring: "#06B6D4" },
  { name: "गुरु अनिल शास्त्री", nameEn: "Guru Anil Shastri", rate: 22, img: "/astrologers/guru-anil-shastri.jpg", ring: "#F97316" },
  { name: "स्वामी ध्यानानंद", nameEn: "Swami Dhyananand", rate: 30, img: "/astrologers/swami-dhyananand.jpg", ring: "#8B5CF6" },
  { name: "पंडित हरिओम", nameEn: "Pt. Hariom", rate: 14, img: "/astrologers/pt-hariom.jpg", ring: "#22C55E" },
];

export function VedicAiAstrologers() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-white to-orange-50/40 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1">
              <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6600]">
                Live Now
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {t("hero.aiAstrologers")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Chat with expert astrologers instantly</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-[#FF6600] hover:text-[#FF6600] hover:shadow-md"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex size-10 items-center justify-center rounded-full border border-[#FF6600] bg-[#FF6600] text-white shadow-sm transition-all hover:bg-[#e65c00] hover:shadow-md"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {astrologers.map((a) => (
            <button
              key={a.nameEn}
              className="group flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-all hover:border-orange-300 hover:shadow-md"
              style={{ minWidth: 130 }}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className="size-20 overflow-hidden rounded-full transition-transform group-hover:scale-105"
                  style={{ boxShadow: `0 0 0 3px ${a.ring}, 0 4px 12px rgba(0,0,0,0.1)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.img}
                    alt={a.nameEn}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute -right-0.5 bottom-0.5 size-4 rounded-full border-2 border-white bg-green-500" />
              </div>

              {/* Name */}
              <span className="max-w-[120px] truncate text-xs font-bold text-gray-800 group-hover:text-[#FF6600]">
                {a.name}
              </span>
              <span className="max-w-[120px] truncate text-[10px] text-gray-400">
                {a.nameEn}
              </span>

              {/* Rate badge */}
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold text-[#FF6600]">
                ₹{a.rate}/min
              </span>

              {/* Chat button */}
              <span className="mt-1 w-full rounded-lg bg-gradient-to-r from-[#FF6600] to-[#FF8C00] py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
                Chat Now
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
