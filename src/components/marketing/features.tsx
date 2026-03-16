"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CircleDot,
  Heart,
  HelpCircle,
  Briefcase,
  FileText,
  Calendar,
  Orbit,
  HeartHandshake,
  BookOpen,
  Hash,
  Gem,
  Star,
  Globe,
  Layers,
  Hand,
  Users,
} from "lucide-react";

const services = [
  [
    { icon: CircleDot, key: "features.kundli", href: "/birth-chart/new", color: "text-orange-600" },
    { icon: Heart, key: "features.horoscopeMatching", href: "/compatibility", color: "text-pink-600" },
    { icon: HeartHandshake, key: "features.compatibility", href: "/compatibility", color: "text-red-500" },
    { icon: HelpCircle, key: "features.askQuestion", href: "/contact", color: "text-blue-600" },
  ],
  [
    { icon: Briefcase, key: "features.careerCounselling", href: "/horoscopes", color: "text-green-600" },
    { icon: FileText, key: "features.birthChartAnalysis", href: "/birth-chart/new", color: "text-purple-600" },
    { icon: Calendar, key: "features.horoscope2026", href: "/horoscopes", color: "text-orange-500" },
    { icon: Orbit, key: "features.transitReport", href: "/transits", color: "text-indigo-600" },
  ],
  [
    { icon: HeartHandshake, key: "features.loveHoroscope", href: "/horoscopes", color: "text-rose-500" },
    { icon: BookOpen, key: "features.learnAstrology", href: "/blog", color: "text-teal-600" },
    { icon: Hash, key: "features.numerology", href: "/birth-chart/new", color: "text-amber-600" },
    { icon: Gem, key: "features.gemstones", href: "/birth-chart/new", color: "text-emerald-600" },
  ],
  [
    { icon: Users, key: "features.celebrity", href: "/horoscopes", color: "text-violet-600" },
    { icon: Globe, key: "features.chinese", href: "/horoscopes", color: "text-red-600" },
    { icon: Layers, key: "features.tarot", href: "/contact", color: "text-purple-500" },
    { icon: Hand, key: "features.palmistry", href: "/contact", color: "text-orange-700" },
  ],
];

export function Features() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white py-8 sm:py-10">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-24 top-10 size-56 rounded-full bg-gradient-to-bl from-orange-100/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 size-48 rounded-full bg-gradient-to-tr from-amber-100/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 celestial-dots opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 border-b-2 border-[#FF6600] pb-2">
          <h2 className="text-xl font-bold text-[#FF6600] sm:text-2xl">
            {t("features.title")}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="overflow-hidden rounded-lg border border-orange-200">
          {services.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-2 sm:grid-cols-4 ${
                rowIndex % 2 === 0 ? "bg-amber-50/60" : "bg-white"
              }`}
            >
              {row.map((service) => (
                <Link
                  key={service.key}
                  href={service.href}
                  className="flex items-center gap-3 border-b border-r border-orange-100 px-4 py-3.5 transition-colors hover:bg-orange-50 last:border-r-0 sm:[&:nth-child(4)]:border-r-0"
                >
                  <service.icon
                    className={`size-5 shrink-0 ${service.color}`}
                  />
                  <span className="text-sm font-medium text-gray-800 hover:text-[#FF6600]">
                    {t(service.key)}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Additional Quick Links */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link href="/panchang" className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center transition-colors hover:border-[#FF6600] hover:bg-orange-100">
            <Star className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">{t("features.dailyPanchang")}</p>
          </Link>
          <Link href="/panchang" className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center transition-colors hover:border-[#FF6600] hover:bg-orange-100">
            <Calendar className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">{t("features.festivalCalendar")}</p>
          </Link>
          <Link href="/birth-chart/new" className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center transition-colors hover:border-[#FF6600] hover:bg-orange-100">
            <Orbit className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">{t("features.planetPositions")}</p>
          </Link>
          <div className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center">
            <Gem className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">{t("features.luckyGemstones")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
