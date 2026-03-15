"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceAutocomplete } from "@/components/shared/place-autocomplete";
import { calculatePanchang, type PanchangData } from "@/lib/astrology/panchang";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export function Hero() {
  const router = useRouter();
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    setPanchangData(calculatePanchang(new Date()));
  }, []);

  function handleGetKundli() {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (gender) params.set("gender", gender);
    if (day) params.set("day", day);
    if (month) params.set("month", month);
    if (year) params.set("year", year);
    if (hour) params.set("hour", hour);
    if (minute) params.set("minute", minute);
    if (birthPlace) params.set("place", birthPlace);
    if (latitude !== null) params.set("lat", latitude.toString());
    if (longitude !== null) params.set("lon", longitude.toString());
    const query = params.toString();
    router.push(`/birth-chart/new${query ? `?${query}` : ""}`);
  }

  return (
    <section className="bg-orange-50/50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT: Kundli / Birth Chart Quick Form */}
          <div className="rounded-lg border-2 border-orange-400 bg-white shadow-sm">
            {/* Header */}
            <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-2.5">
              <h2 className="text-lg font-bold text-white">
                Free Kundli - Birth Chart
              </h2>
            </div>

            {/* Form Body */}
            <div className="space-y-4 p-4 sm:p-5">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`rounded-l-md border px-5 py-1.5 text-sm font-medium transition-colors ${
                      gender === "male"
                        ? "border-[#FF6600] bg-[#FF6600] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`rounded-r-md border px-5 py-1.5 text-sm font-medium transition-colors ${
                      gender === "female"
                        ? "border-[#FF6600] bg-[#FF6600] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">Month</option>
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Time of Birth
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">Hrs</option>
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">Min</option>
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Birth Place */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Birth Place
                </label>
                <PlaceAutocomplete
                  value={birthPlace}
                  onChange={(val) => {
                    setBirthPlace(val);
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
                  placeholder="Enter birth place (e.g., New Delhi)"
                  className="h-9"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleGetKundli}
                className="h-11 w-full rounded-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-base font-bold text-white shadow-md hover:from-[#e65c00] hover:to-[#e07800] hover:shadow-lg"
              >
                GET KUNDLI
              </Button>
            </div>
          </div>

          {/* RIGHT: Today's Panchang */}
          <div className="rounded-lg border-2 border-orange-400 bg-white shadow-sm">
            {/* Header */}
            <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-2.5">
              <h2 className="text-lg font-bold text-white">
                TODAY&apos;S PANCHANG
              </h2>
            </div>

            {/* Panchang Body */}
            <div className="p-4 sm:p-5">
              {panchangData ? (
                <>
                  {/* Date Display */}
                  <div className="mb-4 rounded-md bg-orange-50 px-4 py-3 text-center">
                    <p className="text-lg font-bold text-[#FF6600]">
                      {panchangData.date}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {panchangData.day} ({panchangData.dayHindi})
                    </p>
                  </div>

                  {/* Panchang Details Table */}
                  <div className="overflow-hidden rounded-md border border-orange-200">
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          { label: "Tithi", value: `${panchangData.paksha} ${panchangData.tithi}` },
                          { label: "Nakshatra", value: panchangData.nakshatra },
                          { label: "Yoga", value: panchangData.yoga },
                          { label: "Karana", value: panchangData.karana },
                          { label: "Sunrise", value: panchangData.sunrise },
                          { label: "Sunset", value: panchangData.sunset },
                          { label: "Moon Sign", value: panchangData.moonSign },
                          { label: "Sun Sign", value: panchangData.sunSign },
                        ].map((item, index) => (
                          <tr
                            key={item.label}
                            className={
                              index % 2 === 0 ? "bg-orange-50/50" : "bg-white"
                            }
                          >
                            <td className="border-b border-orange-100 px-4 py-2.5 font-semibold text-gray-700">
                              {item.label}
                            </td>
                            <td className="border-b border-orange-100 px-4 py-2.5 text-gray-900">
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-orange-200 bg-orange-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Rahukaal
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.rahukaal}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-orange-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Yamaganda
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.yamaganda}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-orange-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Gulika
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.gulika}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-green-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-green-700">
                        Abhijit Muhurta
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.abhijitMuhurta}
                      </p>
                    </div>
                  </div>

                  {/* View Full Panchang link */}
                  <a
                    href="/panchang"
                    className="mt-4 block rounded-md border border-[#FF6600] py-2 text-center text-sm font-bold text-[#FF6600] transition-colors hover:bg-[#FF6600] hover:text-white"
                  >
                    View Full Panchang Details →
                  </a>
                </>
              ) : (
                <div className="py-12 text-center text-sm text-gray-400 animate-pulse">
                  Loading Panchang...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Astrologers Carousel */}
        <AiAstrologersCarousel />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Astrologers Carousel                                            */
/* ------------------------------------------------------------------ */

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

function AiAstrologersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">AI Astrologers</h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-[#FF6600] hover:text-[#FF6600]"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex size-8 items-center justify-center rounded-full border border-[#FF6600] bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00]"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {astrologers.map((a) => (
          <button
            key={a.nameEn}
            className="group flex shrink-0 flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-orange-50"
            style={{ minWidth: 100 }}
          >
            {/* Avatar photo */}
            <div
              className="size-[72px] overflow-hidden rounded-full shadow-md transition-transform group-hover:scale-105"
              style={{ boxShadow: `0 0 0 3px ${a.ring}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.img}
                alt={a.nameEn}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Name */}
            <span className="max-w-[100px] truncate text-xs font-semibold text-gray-700 group-hover:text-[#FF6600]">
              {a.name}
            </span>
            {/* Rate */}
            <span className="text-[11px] font-bold text-[#FF6600]">₹{a.rate}/min</span>
          </button>
        ))}
      </div>
    </div>
  );
}

