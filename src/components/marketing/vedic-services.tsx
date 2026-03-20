"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CircleDot, Heart, Briefcase, Calendar,
  Orbit, BookOpen, Gem, Star, Moon, Sun,
} from "lucide-react";

const services = [
  {
    icon: CircleDot,
    key: "features.kundli",
    desc: "Complete Vedic birth chart with planetary positions, houses & dasha periods",
    href: "/birth-chart/new",
    color: "#FF6600",
    bg: "bg-orange-50",
  },
  {
    icon: Heart,
    key: "features.horoscopeMatching",
    desc: "Gun Milan and compatibility analysis for harmonious relationships",
    href: "/compatibility",
    color: "#E11D48",
    bg: "bg-rose-50",
  },
  {
    icon: Orbit,
    key: "features.transitReport",
    desc: "Real-time planetary transit analysis for timing life decisions",
    href: "/transits",
    color: "#7C3AED",
    bg: "bg-violet-50",
  },
  {
    icon: Calendar,
    key: "features.horoscope2026",
    desc: "Detailed yearly predictions for career, love, health & finance",
    href: "/horoscopes",
    color: "#0891B2",
    bg: "bg-cyan-50",
  },
  {
    icon: Moon,
    key: "features.dailyPanchang",
    desc: "Tithi, Nakshatra, Yoga, Karana with auspicious timings daily",
    href: "/panchang",
    color: "#D97706",
    bg: "bg-amber-50",
  },
  {
    icon: Gem,
    key: "features.gemstones",
    desc: "Personalized gemstone recommendations based on your birth chart",
    href: "/birth-chart/new",
    color: "#059669",
    bg: "bg-emerald-50",
  },
  {
    icon: Briefcase,
    key: "features.careerCounselling",
    desc: "Career path insights aligned with your planetary strengths",
    href: "/horoscopes",
    color: "#2563EB",
    bg: "bg-blue-50",
  },
  {
    icon: BookOpen,
    key: "features.learnAstrology",
    desc: "Deep-dive articles, tutorials, and courses on Vedic Jyotish",
    href: "/blog",
    color: "#0D9488",
    bg: "bg-teal-50",
  },
];

export function VedicServices() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1">
            <Sun className="size-3.5 text-[#FF6600]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6600]">
              {t("features.title")}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for
            <span className="text-gradient-vedic"> Cosmic Clarity</span>
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Link
              key={service.key}
              href={service.href}
              className="vedic-card group p-6"
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl ${service.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon className="size-6" style={{ color: service.color }} />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#FF6600] transition-colors">
                {t(service.key)}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {service.desc}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#FF6600] opacity-0 transition-all group-hover:opacity-100">
                Explore
                <svg className="size-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
