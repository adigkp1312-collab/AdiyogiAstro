"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Users, Shield } from "lucide-react";

export function VedicHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50/50 to-white">
      {/* Decorative mandala circles */}
      <div
        className="absolute -right-32 -top-32 size-[500px] rounded-full border border-orange-200/30 opacity-40"
        style={{ animation: "spin 25s linear infinite" }}
      />
      <div
        className="absolute -right-24 -top-24 size-[400px] rounded-full border border-orange-300/20 opacity-30"
        style={{ animation: "spin 35s linear infinite reverse" }}
      />
      <div className="absolute -left-40 bottom-0 size-[400px] rounded-full bg-gradient-to-tr from-orange-100/40 to-transparent opacity-50" />

      {/* Floating vedic symbols */}
      <div className="absolute left-[10%] top-[20%] text-4xl text-orange-300/20 select-none" style={{ animation: "float 5s ease-in-out infinite" }}>&#x2609;</div>
      <div className="absolute right-[15%] top-[30%] text-3xl text-amber-300/20 select-none" style={{ animation: "float-slow 7s ease-in-out infinite" }}>&#x263D;</div>
      <div className="absolute left-[20%] bottom-[25%] text-5xl text-orange-200/15 select-none" style={{ animation: "float 5s ease-in-out infinite 1s" }}>&#x2648;</div>
      <div className="absolute right-[25%] bottom-[20%] text-4xl text-amber-200/15 select-none" style={{ animation: "float-slow 7s ease-in-out infinite 2s" }}>&#x2649;</div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 shadow-sm"
              style={{ animation: "fade-up 0.7s ease-out both" }}
            >
              <span className="size-1.5 animate-pulse rounded-full bg-[#FF6600]" />
              <span className="text-xs font-semibold tracking-wide text-[#FF6600]">
                Vedic Astrology &bull; Trusted by 50,000+
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}
            >
              Discover Your
              <br />
              <span className="text-gradient-vedic">Cosmic Blueprint</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500"
              style={{ animation: "fade-up 0.7s ease-out 0.2s both" }}
            >
              Unlock the ancient wisdom of Vedic astrology. Personalized birth chart
              readings, planetary transit forecasts, and sacred rituals to illuminate
              your life&apos;s true path.
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
              style={{ animation: "fade-up 0.7s ease-out 0.3s both" }}
            >
              <Link
                href="/birth-chart/new"
                className="btn-vedic group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider"
              >
                {t("hero.getKundli")}
                <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/horoscopes"
                className="btn-vedic-outline inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm uppercase tracking-wider"
              >
                {t("horoscope.viewAll")}
              </Link>
            </div>

            {/* Trust indicators */}
            <div
              className="mt-10 flex flex-wrap items-center gap-6"
              style={{ animation: "fade-up 0.7s ease-out 0.4s both" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-orange-100">
                  <Star className="size-4 text-[#FF6600]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">50,000+</p>
                  <p className="text-[11px] text-gray-400">Charts Read</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-orange-100">
                  <Users className="size-4 text-[#FF6600]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">10,000+</p>
                  <p className="text-[11px] text-gray-400">Happy Seekers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-orange-100">
                  <Shield className="size-4 text-[#FF6600]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">98%</p>
                  <p className="text-[11px] text-gray-400">Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Decorative Vedic Visual */}
          <div className="relative flex items-center justify-center" style={{ animation: "fade-up 0.7s ease-out 0.2s both" }}>
            {/* Outer mandala rings */}
            <div className="absolute size-[340px] rounded-full border border-[#FF6600]/15 sm:size-[420px]" style={{ animation: "spin 25s linear infinite" }} />
            <div className="absolute size-[280px] rounded-full border border-[#FF6600]/10 sm:size-[350px]" style={{ animation: "spin 30s linear infinite reverse" }} />
            <div className="absolute size-[220px] rounded-full border border-[#FF6600]/8 opacity-60 sm:size-[280px]" />

            {/* Central sun/kundli visual */}
            <div className="relative flex size-56 items-center justify-center rounded-full border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg shadow-orange-100/50 sm:size-72">
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-6xl sm:text-7xl" style={{ filter: "drop-shadow(0 0 8px rgba(255,102,0,0.3))" }}>&#x2609;</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600]">
                  Your Kundli
                </span>
                <span className="text-[10px] text-gray-400">Awaits Discovery</span>
              </div>

              {/* Floating planet badges */}
              <div className="absolute -right-3 top-6 rounded-xl border border-orange-200 bg-white px-3 py-2 shadow-md" style={{ animation: "float 5s ease-in-out infinite" }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">&#x2643;</span>
                  <span className="text-[11px] font-bold text-gray-700">Jupiter</span>
                </div>
              </div>
              <div className="absolute -left-4 bottom-10 rounded-xl border border-orange-200 bg-white px-3 py-2 shadow-md" style={{ animation: "float-slow 7s ease-in-out infinite" }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">&#x2644;</span>
                  <span className="text-[11px] font-bold text-gray-700">Saturn</span>
                </div>
              </div>
              <div className="absolute -right-2 bottom-16 rounded-xl border border-orange-200 bg-white px-3 py-2 shadow-md" style={{ animation: "float 5s ease-in-out infinite 1.5s" }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">&#x263D;</span>
                  <span className="text-[11px] font-bold text-gray-700">Moon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0 60V30C240 5 480 0 720 15C960 30 1200 35 1440 20V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
