"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaceAutocomplete } from "@/components/shared/place-autocomplete";
import { ZodiacWheel } from "@/components/astrology/zodiac-wheel";
import type { ChartData } from "@/types";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const faqs = [
  {
    q: "What is Kundli or Birth Chart?",
    a: "A Kundli (also known as a birth chart, natal chart, or horoscope chart) is an astrological diagram that maps the exact positions of celestial bodies -- the Sun, Moon, and planets -- at the precise moment and location of your birth. In Vedic astrology, the Kundli is divided into 12 houses, each representing different aspects of life such as personality, wealth, siblings, mother, children, enemies, spouse, longevity, fortune, career, gains, and losses.",
  },
  {
    q: "Why is birth time important for Kundli?",
    a: "Birth time is crucial because the Ascendant (Lagna) changes approximately every two hours. Even a few minutes difference can alter your Ascendant sign, which affects the placement of all houses in your chart. An accurate birth time ensures the correct positioning of the Moon, which moves about 13 degrees per day, making it essential for precise Dasha predictions and Moon sign determination.",
  },
  {
    q: "What can I learn from my birth chart?",
    a: "Your birth chart reveals your personality traits, strengths, weaknesses, career aptitude, relationship patterns, financial prospects, health tendencies, and spiritual inclinations. It shows planetary Dashas (time periods) that indicate when specific life events are likely to occur. You can also understand Yogas (special planetary combinations) that confer specific results like wealth, fame, or challenges.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "If you do not know your exact birth time, you can still generate a partial birth chart. However, the Ascendant and house placements may not be accurate. Some astrologers use birth time rectification techniques to estimate the correct time based on life events. For the most accurate results, try to obtain your birth time from hospital records, birth certificate, or family members.",
  },
  {
    q: "What is the difference between Vedic and Western birth charts?",
    a: "Vedic (Sidereal) astrology uses the actual astronomical positions of constellations and accounts for the precession of equinoxes, making it approximately 23 degrees different from Western (Tropical) astrology. Vedic astrology emphasizes the Moon sign and Dasha system for predictions, while Western astrology focuses on the Sun sign and transits. Both systems offer valuable insights but from different perspectives.",
  },
  {
    q: "How accurate is an online Kundli?",
    a: "Online Kundli generators use the same Swiss Ephemeris astronomical data used by professional astrologers, making the planetary calculations highly accurate. The accuracy of predictions, however, depends on the correctness of your birth details -- especially birth time and place. Our system uses precise geographical coordinates and timezone data to ensure maximum accuracy for your birth chart calculations.",
  },
];

export function BirthChartForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [gender, setGender] = React.useState<"male" | "female">(
    (searchParams.get("gender") as "male" | "female") || "male"
  );
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  // Form fields - pre-populate from URL search params (from hero form)
  const [name, setName] = React.useState(searchParams.get("name") || "");
  const [day, setDay] = React.useState(searchParams.get("day") || "");
  const [month, setMonth] = React.useState(searchParams.get("month") || "");
  const [year, setYear] = React.useState(searchParams.get("year") || "");
  const [hours, setHours] = React.useState(searchParams.get("hour") || "");
  const [minutes, setMinutes] = React.useState(searchParams.get("minute") || "");
  const [seconds, setSeconds] = React.useState("");
  const [birthPlace, setBirthPlace] = React.useState(searchParams.get("place") || "");
  const [latitude, setLatitude] = React.useState<number | null>(
    searchParams.get("lat") ? parseFloat(searchParams.get("lat")!) : null
  );
  const [longitude, setLongitude] = React.useState<number | null>(
    searchParams.get("lon") ? parseFloat(searchParams.get("lon")!) : null
  );
  const [chartResult, setChartResult] = React.useState<ChartData | null>(null);
  const chartRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (latitude === null || longitude === null) {
        setSubmitError("Please select a birth place from the suggestions to get accurate coordinates.");
        setIsSubmitting(false);
        return;
      }

      const monthNum = month.padStart(2, "0");
      const dayNum = day.padStart(2, "0");
      const birthDate = `${year}-${monthNum}-${dayNum}`;
      const birthTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${(seconds || "0").padStart(2, "0")}`;

      const calcResponse = await fetch("/api/birth-chart/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: birthDate,
          time: birthTime,
          latitude,
          longitude,
        }),
      });

      if (!calcResponse.ok) {
        const errData = await calcResponse.json().catch(() => null);
        throw new Error(errData?.error || "Failed to calculate birth chart positions.");
      }

      const chartData: ChartData = await calcResponse.json();
      setChartResult(chartData);

      // Scroll to chart results
      setTimeout(() => {
        chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FF6600]">
          Home
        </Link>
        <span className="mx-1">&gt;</span>
        <Link href="/birth-chart" className="hover:text-[#FF6600]">
          Birth Chart
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-800">Free Online Kundli</span>
      </nav>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className="text-[#FF6600]">Kundli</span> - Free Online Birth
          Chart
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 max-w-3xl">
          Generate your free Kundli (birth chart) online based on Vedic
          astrology. A Kundli is an astrological chart that maps the positions of
          the Sun, Moon, and planets at the exact time of your birth. It provides
          deep insights into your personality, career, relationships, health, and
          spiritual path. Enter your birth details below to get your detailed
          Kundli with planetary positions, Dasha periods, and Yoga analysis.
        </p>
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Main Content */}
        <div className="flex-1 lg:w-[70%]">
          {/* Form Section */}
          <div className="mb-8 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-5 py-3">
              <h2 className="text-base font-bold text-white">
                Get Your Kundli by Date of Birth
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-0">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={cn(
                      "px-6 py-2 text-sm font-medium border transition-colors rounded-l-md",
                      gender === "male"
                        ? "bg-[#FF6600] text-white border-[#FF6600]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={cn(
                      "px-6 py-2 text-sm font-medium border border-l-0 transition-colors rounded-r-md",
                      gender === "female"
                        ? "bg-[#FF6600] text-white border-[#FF6600]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Day
                    </label>
                    <input
                      type="number"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      placeholder="DD"
                      min={1}
                      max={31}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Month
                    </label>
                    <input
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      placeholder="MM"
                      min={1}
                      max={12}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Year
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="YYYY"
                      min={1900}
                      max={2026}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                </div>
              </div>

              {/* Birth Time */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Birth Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Hours
                    </label>
                    <input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="HH"
                      min={0}
                      max={23}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Minutes
                    </label>
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      placeholder="MM"
                      min={0}
                      max={59}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Seconds
                    </label>
                    <input
                      type="number"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      placeholder="SS"
                      min={0}
                      max={59}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Use 24-hour format (e.g., 14:30 for 2:30 PM). If seconds are
                  unknown, leave as 00.
                </p>
              </div>

              {/* Birth Place */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Birth Place <span className="text-red-500">*</span>
                </label>
                <PlaceAutocomplete
                  value={birthPlace}
                  onChange={(val) => {
                    setBirthPlace(val);
                    // Clear coordinates when user types manually
                    if (val !== birthPlace) {
                      setLatitude(null);
                      setLongitude(null);
                    }
                  }}
                  onPlaceSelect={(place) => {
                    setBirthPlace(place.name);
                    setLatitude(place.latitude);
                    setLongitude(place.longitude);
                  }}
                  placeholder="e.g., New Delhi, India"
                  required
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  {latitude !== null && longitude !== null ? (
                    <span className="text-green-600">
                      Location found: {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
                    </span>
                  ) : (
                    "Start typing and select a place from suggestions for accurate coordinates."
                  )}
                </p>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-2 rounded-lg bg-orange-50 border border-orange-200 px-4 py-3 text-sm text-gray-700">
                <Info className="mt-0.5 size-4 shrink-0 text-[#FF6600]" />
                <p>
                  Accurate birth time and place are essential for a precise
                  Kundli. The Ascendant (Lagna) changes every 2 hours, so even
                  small variations can affect your chart significantly.
                </p>
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-md bg-[#FF6600] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#FF8C00] flex items-center justify-center gap-2",
                  isSubmitting && "opacity-60 cursor-not-allowed"
                )}
              >
                <Sparkles className="size-5" />
                {isSubmitting ? "Generating Kundli..." : "GET KUNDLI"}
              </button>
            </form>
          </div>

          {/* Chart Results */}
          {chartResult && (
            <div ref={chartRef} className="mb-8 space-y-6">
              {/* Results Header */}
              <div className="rounded-lg border-2 border-[#FF6600] bg-white shadow-sm">
                <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
                  <h2 className="text-base font-bold text-white">
                    Your Kundli — Birth Chart Results
                  </h2>
                </div>
                <div className="p-5">
                  {/* Summary Badges */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-[#FF6600]">
                      Sun in {chartResult.sun.sign}
                    </span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      Moon in {chartResult.moon.sign}
                    </span>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      Ascendant {chartResult.ascendant.sign}
                    </span>
                  </div>

                  {/* Zodiac Wheel + Planet Table */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Zodiac Wheel */}
                    <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <ZodiacWheel chartData={chartResult} size={360} />
                    </div>

                    {/* Planet Positions Table */}
                    <div>
                      <h3 className="mb-3 text-sm font-bold text-gray-900">
                        Planetary Positions
                      </h3>
                      <div className="overflow-hidden rounded-lg border border-orange-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#FF6600] text-white">
                              <th className="px-3 py-2 text-left font-semibold">Planet</th>
                              <th className="px-3 py-2 text-left font-semibold">Sign</th>
                              <th className="px-3 py-2 text-left font-semibold">Degree</th>
                              <th className="px-3 py-2 text-left font-semibold">House</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              chartResult.sun,
                              chartResult.moon,
                              chartResult.mercury,
                              chartResult.venus,
                              chartResult.mars,
                              chartResult.jupiter,
                              chartResult.saturn,
                              chartResult.uranus,
                              chartResult.neptune,
                              chartResult.pluto,
                            ].map((pos, idx) => (
                              <tr
                                key={pos.planet}
                                className={idx % 2 === 0 ? "bg-orange-50/50" : "bg-white"}
                              >
                                <td className="border-b border-orange-100 px-3 py-2 font-medium text-gray-900">
                                  {pos.planet}
                                  {pos.retrograde && (
                                    <span className="ml-1 text-xs font-bold text-red-500">R</span>
                                  )}
                                </td>
                                <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                  {pos.sign}
                                </td>
                                <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                  {pos.degree.toFixed(1)}&deg;
                                </td>
                                <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                  {pos.house ?? "—"}
                                </td>
                              </tr>
                            ))}
                            {/* Ascendant & Midheaven */}
                            <tr className="bg-orange-50">
                              <td className="border-b border-orange-100 px-3 py-2 font-bold text-[#FF6600]">
                                Ascendant
                              </td>
                              <td className="border-b border-orange-100 px-3 py-2 font-medium text-gray-900">
                                {chartResult.ascendant.sign}
                              </td>
                              <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                {chartResult.ascendant.degree.toFixed(1)}&deg;
                              </td>
                              <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                1
                              </td>
                            </tr>
                            <tr className="bg-orange-50">
                              <td className="px-3 py-2 font-bold text-[#FF6600]">
                                Midheaven
                              </td>
                              <td className="px-3 py-2 font-medium text-gray-900">
                                {chartResult.midheaven.sign}
                              </td>
                              <td className="px-3 py-2 text-gray-700">
                                {chartResult.midheaven.degree.toFixed(1)}&deg;
                              </td>
                              <td className="px-3 py-2 text-gray-700">10</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aspects Table */}
              {chartResult.aspects.length > 0 && (
                <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
                  <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
                    <h3 className="text-sm font-bold text-white">
                      Planetary Aspects
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="overflow-hidden rounded-lg border border-orange-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-orange-50">
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Planet 1</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Aspect</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Planet 2</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Orb</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chartResult.aspects.map((aspect, idx) => (
                            <tr
                              key={`${aspect.planet1}-${aspect.planet2}-${idx}`}
                              className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}
                            >
                              <td className="border-b border-orange-100 px-3 py-2 font-medium text-gray-900">
                                {aspect.planet1}
                              </td>
                              <td className={cn(
                                "border-b border-orange-100 px-3 py-2 font-semibold",
                                aspect.type === "Conjunction" && "text-amber-600",
                                aspect.type === "Trine" && "text-green-600",
                                aspect.type === "Sextile" && "text-blue-600",
                                aspect.type === "Square" && "text-red-600",
                                aspect.type === "Opposition" && "text-orange-600",
                              )}>
                                {aspect.type}
                              </td>
                              <td className="border-b border-orange-100 px-3 py-2 font-medium text-gray-900">
                                {aspect.planet2}
                              </td>
                              <td className="border-b border-orange-100 px-3 py-2 text-gray-700">
                                {aspect.orb.toFixed(1)}&deg;
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FAQ Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                Frequently Asked Questions about Kundli
              </h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === idx ? null : idx)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {faq.q}
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp className="size-4 text-[#FF6600] shrink-0" />
                    ) : (
                      <ChevronDown className="size-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-gray-100 px-4 py-3">
                      <p className="text-sm leading-relaxed text-gray-600">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                Understanding Your Birth Chart
              </h2>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700 space-y-3">
              <p>
                A birth chart consists of 12 houses, each governing specific
                areas of life. The 1st house (Ascendant/Lagna) represents your
                personality and physical appearance. The 7th house governs
                marriage and partnerships. The 10th house indicates career and
                public reputation.
              </p>
              <p>
                The nine planets (Navagraha) in Vedic astrology -- Sun, Moon,
                Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu -- each
                occupy specific signs and houses in your chart. Their positions,
                aspects, and conjunctions create unique Yogas that shape your
                life experiences.
              </p>
              <p>
                The Dasha system in Vedic astrology provides a timeline for when
                different planetary energies will be most active in your life.
                The Vimshottari Dasha system, spanning 120 years, is the most
                widely used method for timing predictions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full space-y-6 lg:w-[300px] lg:shrink-0">
          {/* Related Services */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Related Services
              </h3>
            </div>
            <div className="p-2">
              {[
                {
                  label: "Kundli Matching / Compatibility",
                  href: "/compatibility",
                },
                { label: "Daily Horoscope", href: "/horoscopes" },
                { label: "Planetary Transits", href: "/transits" },
                { label: "Mangal Dosha Check", href: "/birth-chart" },
                { label: "Sade Sati Analysis", href: "/birth-chart" },
                { label: "Dasha Predictions", href: "/birth-chart" },
                { label: "Lal Kitab Kundli", href: "/birth-chart" },
                { label: "KP System Chart", href: "/birth-chart" },
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

          {/* What's Included */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                What&apos;s in Your Kundli
              </h3>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                "Birth Chart (Lagna Kundli)",
                "Moon Chart (Chandra Kundli)",
                "Navamsa Chart (D9)",
                "Planetary Positions Table",
                "Vimshottari Dasha Periods",
                "Yoga Analysis",
                "Ascendant & House Details",
                "Planetary Aspects",
                "Divisional Charts (D1-D60)",
                "Remedial Suggestions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="size-1.5 rounded-full bg-[#FF6600]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Why AstroPath?</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                {
                  title: "100% Accurate Calculations",
                  desc: "Swiss Ephemeris data for precise planetary positions",
                },
                {
                  title: "Vedic & Western Systems",
                  desc: "Get charts in both Vedic and Western astrology formats",
                },
                {
                  title: "Detailed Interpretations",
                  desc: "AI-powered readings with expert astrological insights",
                },
                {
                  title: "Free Forever",
                  desc: "Basic Kundli generation is completely free, no signup required",
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Popular Astrology Tools
              </h3>
            </div>
            <div className="p-2">
              {[
                { label: "Daily Horoscope", href: "/horoscopes" },
                { label: "Kundli Matching", href: "/compatibility" },
                { label: "Numerology Calculator", href: "/" },
                { label: "Panchang Today", href: "/" },
                { label: "Gemstone Recommendation", href: "/" },
                { label: "Baby Name Finder", href: "/" },
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
        </aside>
      </div>
    </div>
  );
}
