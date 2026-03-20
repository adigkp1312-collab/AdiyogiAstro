"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const zodiacSigns = [
  { symbol: "\u2648", name: "Aries", key: "aries", dates: "Mar 21 - Apr 19", element: "Fire", emoji: "🔥" },
  { symbol: "\u2649", name: "Taurus", key: "taurus", dates: "Apr 20 - May 20", element: "Earth", emoji: "🌍" },
  { symbol: "\u264A", name: "Gemini", key: "gemini", dates: "May 21 - Jun 20", element: "Air", emoji: "💨" },
  { symbol: "\u264B", name: "Cancer", key: "cancer", dates: "Jun 21 - Jul 22", element: "Water", emoji: "💧" },
  { symbol: "\u264C", name: "Leo", key: "leo", dates: "Jul 23 - Aug 22", element: "Fire", emoji: "🔥" },
  { symbol: "\u264D", name: "Virgo", key: "virgo", dates: "Aug 23 - Sep 22", element: "Earth", emoji: "🌍" },
  { symbol: "\u264E", name: "Libra", key: "libra", dates: "Sep 23 - Oct 22", element: "Air", emoji: "💨" },
  { symbol: "\u264F", name: "Scorpio", key: "scorpio", dates: "Oct 23 - Nov 21", element: "Water", emoji: "💧" },
  { symbol: "\u2650", name: "Sagittarius", key: "sagittarius", dates: "Nov 22 - Dec 21", element: "Fire", emoji: "🔥" },
  { symbol: "\u2651", name: "Capricorn", key: "capricorn", dates: "Dec 22 - Jan 19", element: "Earth", emoji: "🌍" },
  { symbol: "\u2652", name: "Aquarius", key: "aquarius", dates: "Jan 20 - Feb 18", element: "Air", emoji: "💨" },
  { symbol: "\u2653", name: "Pisces", key: "pisces", dates: "Feb 19 - Mar 20", element: "Water", emoji: "💧" },
];

const elementColors: Record<string, { bg: string; text: string; border: string }> = {
  Fire: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  Earth: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  Air: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
  Water: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
};

export function VedicZodiac() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-orange-50/60 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1">
            <span className="text-sm">&#x2648;</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6600]">
              {t("horoscope.dailyTitle")}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Find Your <span className="text-gradient-vedic">Zodiac Sign</span>
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Explore your daily, weekly, and yearly horoscope through the ancient wisdom of Vedic astrology.
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {zodiacSigns.map((sign) => {
            const ec = elementColors[sign.element];
            return (
              <Link
                key={sign.key}
                href={`/horoscopes/${sign.key}`}
                className="vedic-card group flex flex-col items-center p-5 text-center"
              >
                {/* Symbol */}
                <span className="text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:vedic-glow">
                  {sign.symbol}
                </span>

                {/* Name */}
                <span className="mt-3 text-sm font-bold text-gray-800 transition-colors group-hover:text-[#FF6600]">
                  {t(`zodiac.${sign.key}`)}
                </span>

                {/* Dates */}
                <span className="mt-0.5 text-[10px] text-gray-400">
                  {sign.dates}
                </span>

                {/* Element badge */}
                <span className={`mt-2 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${ec.bg} ${ec.text} ${ec.border}`}>
                  {sign.emoji} {sign.element}
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/horoscopes"
            className="btn-vedic-outline inline-flex items-center gap-2 px-7 py-3 text-sm uppercase tracking-wider"
          >
            {t("horoscope.viewAll")}
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
