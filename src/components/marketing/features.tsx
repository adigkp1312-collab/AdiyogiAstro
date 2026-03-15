import Link from "next/link";
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
    { icon: CircleDot, label: "Kundli (Birth Chart)", href: "/birth-chart/new", color: "text-orange-600" },
    { icon: Heart, label: "Horoscope Matching", href: "/compatibility", color: "text-pink-600" },
    { icon: HeartHandshake, label: "Compatibility", href: "/compatibility", color: "text-red-500" },
    { icon: HelpCircle, label: "Ask a Question", href: "/contact", color: "text-blue-600" },
  ],
  [
    { icon: Briefcase, label: "Career Counselling", href: "/horoscopes", color: "text-green-600" },
    { icon: FileText, label: "Birth Chart Analysis", href: "/birth-chart/new", color: "text-purple-600" },
    { icon: Calendar, label: "Horoscope 2026", href: "/horoscopes", color: "text-orange-500" },
    { icon: Orbit, label: "Transit Report", href: "/transits", color: "text-indigo-600" },
  ],
  [
    { icon: HeartHandshake, label: "Love Horoscope", href: "/horoscopes", color: "text-rose-500" },
    { icon: BookOpen, label: "Learn Astrology", href: "/blog", color: "text-teal-600" },
    { icon: Hash, label: "Numerology Calculator", href: "/birth-chart/new", color: "text-amber-600" },
    { icon: Gem, label: "Gemstones Report", href: "/birth-chart/new", color: "text-emerald-600" },
  ],
  [
    { icon: Users, label: "Celebrity Horoscope", href: "/horoscopes", color: "text-violet-600" },
    { icon: Globe, label: "Chinese Astrology", href: "/horoscopes", color: "text-red-600" },
    { icon: Layers, label: "Tarot Reading", href: "/contact", color: "text-purple-500" },
    { icon: Hand, label: "Palmistry", href: "/contact", color: "text-orange-700" },
  ],
];

export function Features() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 border-b-2 border-[#FF6600] pb-2">
          <h2 className="text-xl font-bold text-[#FF6600] sm:text-2xl">
            Free Horoscope and Astrology Services
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Explore our comprehensive collection of free astrology tools and services
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
                  key={service.label}
                  href={service.href}
                  className="flex items-center gap-3 border-b border-r border-orange-100 px-4 py-3.5 transition-colors hover:bg-orange-50 last:border-r-0 sm:[&:nth-child(4)]:border-r-0"
                >
                  <service.icon
                    className={`size-5 shrink-0 ${service.color}`}
                  />
                  <span className="text-sm font-medium text-gray-800 hover:text-[#FF6600]">
                    {service.label}
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
            <p className="text-xs font-semibold text-gray-700">Daily Panchang</p>
          </Link>
          <Link href="/panchang" className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center transition-colors hover:border-[#FF6600] hover:bg-orange-100">
            <Calendar className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">Festival Calendar</p>
          </Link>
          <Link href="/birth-chart/new" className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center transition-colors hover:border-[#FF6600] hover:bg-orange-100">
            <Orbit className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">Planet Positions</p>
          </Link>
          <div className="rounded-md border border-orange-200 bg-orange-50 p-3 text-center">
            <Gem className="mx-auto mb-1 size-6 text-[#FF6600]" />
            <p className="text-xs font-semibold text-gray-700">Lucky Gemstones</p>
          </div>
        </div>
      </div>
    </section>
  );
}
