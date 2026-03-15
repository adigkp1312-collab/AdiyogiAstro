"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Clock,
  AlertTriangle,
  Star,
  Calendar,
} from "lucide-react";
import { calculatePanchang, type PanchangData } from "@/lib/astrology/panchang";

const faqs = [
  {
    q: "What is Panchang?",
    a: "Panchang (also called Panchangam) is the traditional Hindu calendar and almanac. The word 'Panchangam' is derived from Sanskrit — 'Pancha' meaning five and 'Anga' meaning limb. It represents five key elements: Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (luni-solar combination), and Karana (half of Tithi). Panchang is essential for determining auspicious times for important activities like marriages, house-warming ceremonies, and new ventures.",
  },
  {
    q: "What is Tithi?",
    a: "Tithi is the lunar day in the Hindu calendar. It is defined as the time taken for the longitudinal angle between the Moon and the Sun to increase by 12 degrees. There are 30 Tithis in a lunar month — 15 in the Shukla Paksha (waxing phase from new moon to full moon) and 15 in the Krishna Paksha (waning phase from full moon to new moon). Tithis are important for determining fasting days, festivals, and auspicious timings.",
  },
  {
    q: "What is Nakshatra?",
    a: "Nakshatra (also called lunar mansion or asterism) is the position of the Moon in one of the 27 divisions of the sky. Each Nakshatra spans 13 degrees 20 minutes of the ecliptic. The Moon takes approximately one day to pass through each Nakshatra. Nakshatras are fundamental in Vedic astrology for birth chart analysis, muhurta selection, and compatibility matching (Nakshatra matching for marriage).",
  },
  {
    q: "What is Rahukaal?",
    a: "Rahukaal (also spelled Rahu Kaal or Rahu Kalam) is a period of approximately 1.5 hours every day considered inauspicious in Hindu astrology. It is one of the 8 segments of the day ruled by different planets. Activities started during Rahukaal are believed to face obstacles and delays. The timing of Rahukaal varies each day of the week and depends on the sunrise time of the location.",
  },
  {
    q: "What is Yoga in Panchang?",
    a: "Yoga in Panchang is one of the five elements of the Hindu calendar. It is calculated by adding the longitudes of the Sun and Moon and dividing by 13 degrees 20 minutes. There are 27 Yogas, each spanning 13°20'. Some Yogas like Siddhi, Shubha, and Amrit are considered highly auspicious, while others like Vishkumbha, Atiganda, and Vyaghata are considered inauspicious for starting new activities.",
  },
  {
    q: "What is Abhijit Muhurta?",
    a: "Abhijit Muhurta is a universally auspicious time period that occurs every day around midday. It is the 8th muhurta of the day (out of 15 daytime muhurtas) and lasts approximately 48 minutes. Abhijit Muhurta is considered so powerful that it can nullify many other inauspicious influences. It is recommended for starting important activities, especially when no other auspicious muhurta is available.",
  },
];

export default function PanchangPage() {
  const [panchang, setPanchang] = React.useState<PanchangData | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  React.useEffect(() => {
    setPanchang(calculatePanchang(new Date()));
  }, []);

  if (!panchang) {
    return (
      <div className="mx-auto max-w-7xl py-12 text-center">
        <div className="animate-pulse text-gray-500">Loading Panchang...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FF6600]">Home</Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-800">Panchang Today</span>
      </nav>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className="text-[#FF6600]">Today&apos;s Panchang</span> — Hindu Calendar
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
          Get today&apos;s Panchang details including Tithi, Nakshatra, Yoga, Karana,
          sunrise and sunset timings, Rahukaal, and other auspicious times based on
          Vedic astrology calculations for your location.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 lg:w-[70%]">
          {/* Date Banner */}
          <div className="mb-6 rounded-lg border-2 border-[#FF6600] bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-6 py-4 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{panchang.date}</p>
                <p className="text-sm font-medium text-white/80">
                  {panchang.day} ({panchang.dayHindi})
                </p>
              </div>
              <Calendar className="size-10 text-white/40" />
            </div>
          </div>

          {/* Panchang Five Elements */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
              <h2 className="text-base font-bold text-white">
                Panchangam — Five Elements
              </h2>
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Tithi (Lunar Day)", value: `${panchang.paksha} ${panchang.tithi}`, icon: <Moon className="size-4 text-[#FF6600]" /> },
                    { label: "Nakshatra (Star)", value: panchang.nakshatra, icon: <Star className="size-4 text-[#FF6600]" /> },
                    { label: "Yoga", value: panchang.yoga, icon: <Sun className="size-4 text-[#FF6600]" /> },
                    { label: "Karana", value: panchang.karana, icon: <Clock className="size-4 text-[#FF6600]" /> },
                    { label: "Vara (Day)", value: `${panchang.day} (${panchang.dayHindi})`, icon: <Calendar className="size-4 text-[#FF6600]" /> },
                  ].map((item, idx) => (
                    <tr key={item.label} className={idx % 2 === 0 ? "bg-orange-50/50" : "bg-white"}>
                      <td className="flex items-center gap-2 border-b border-orange-100 px-5 py-3 font-semibold text-gray-700">
                        {item.icon}
                        {item.label}
                      </td>
                      <td className="border-b border-orange-100 px-5 py-3 font-medium text-gray-900">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sunrise / Sunset / Signs */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
              <h2 className="text-base font-bold text-white">
                Sun &amp; Moon Details
              </h2>
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Sunrise", value: panchang.sunrise, icon: <Sunrise className="size-4 text-amber-500" /> },
                    { label: "Sunset", value: panchang.sunset, icon: <Sunset className="size-4 text-orange-500" /> },
                    { label: "Moon Sign (Rashi)", value: panchang.moonSign, icon: <Moon className="size-4 text-blue-500" /> },
                    { label: "Sun Sign (Rashi)", value: panchang.sunSign, icon: <Sun className="size-4 text-yellow-500" /> },
                  ].map((item, idx) => (
                    <tr key={item.label} className={idx % 2 === 0 ? "bg-orange-50/50" : "bg-white"}>
                      <td className="flex items-center gap-2 border-b border-orange-100 px-5 py-3 font-semibold text-gray-700">
                        {item.icon}
                        {item.label}
                      </td>
                      <td className="border-b border-orange-100 px-5 py-3 font-medium text-gray-900">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inauspicious Times */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-white">
                <AlertTriangle className="size-4" />
                Inauspicious Timings (Avoid for New Activities)
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {[
                { label: "Rahukaal", value: panchang.rahukaal, desc: "Ruled by Rahu — avoid new ventures" },
                { label: "Yamaganda", value: panchang.yamaganda, desc: "Ruled by Yama — inauspicious period" },
                { label: "Gulika Kaal", value: panchang.gulika, desc: "Ruled by Saturn's son — avoid starts" },
                { label: "Abhijit Muhurta", value: panchang.abhijitMuhurta, desc: "Universally auspicious — good for all activities", auspicious: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`border-b border-r border-orange-100 p-4 last:border-r-0 sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(4)]:border-r-0 ${
                    item.auspicious ? "bg-green-50/50" : "bg-red-50/30"
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wide ${item.auspicious ? "text-green-700" : "text-red-700"}`}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{item.value}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                Frequently Asked Questions about Panchang
              </h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="size-4 shrink-0 text-[#FF6600]" />
                    ) : (
                      <ChevronDown className="size-4 shrink-0 text-gray-400" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-gray-100 px-4 py-3">
                      <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-6 lg:w-[300px] lg:shrink-0">
          {/* Quick Summary Card */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Quick Panchang Summary</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: "Tithi", value: `${panchang.paksha} ${panchang.tithi}` },
                { label: "Nakshatra", value: panchang.nakshatra },
                { label: "Yoga", value: panchang.yoga },
                { label: "Karana", value: panchang.karana },
                { label: "Moon Sign", value: panchang.moonSign },
                { label: "Rahukaal", value: panchang.rahukaal },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Related Services</h3>
            </div>
            <div className="p-2">
              {[
                { label: "Free Kundli", href: "/birth-chart/new" },
                { label: "Daily Horoscope", href: "/horoscopes" },
                { label: "Horoscope Matching", href: "/compatibility" },
                { label: "Planetary Transits", href: "/transits" },
                { label: "Astrology Blog", href: "/blog" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF6600]"
                >
                  <ChevronRight className="size-3.5 text-[#FF6600]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About Panchang */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">About Panchang</h3>
            </div>
            <div className="p-4 text-sm leading-relaxed text-gray-600 space-y-2">
              <p>
                Panchang is the Vedic Hindu calendar system used to determine
                auspicious timings for ceremonies, festivals, and daily activities.
              </p>
              <p>
                Our Panchang is calculated using precise astronomical algorithms
                that track the positions of the Sun and Moon to determine all five
                elements of the traditional Panchangam.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
