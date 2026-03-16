"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceAutocomplete } from "@/components/shared/place-autocomplete";
import { calculatePanchang, type PanchangData } from "@/lib/astrology/panchang";
import { useLanguage } from "@/contexts/LanguageContext";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export function Hero() {
  const router = useRouter();
  const { t } = useLanguage();
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
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/60 to-white py-6 sm:py-8">
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-gradient-to-br from-orange-200/30 to-amber-100/20 blur-3xl" style={{ animation: "orb-float-1 12s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -right-16 top-1/3 size-60 rounded-full bg-gradient-to-br from-amber-200/25 to-orange-100/15 blur-3xl" style={{ animation: "orb-float-2 15s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-48 rounded-full bg-gradient-to-t from-orange-100/20 to-transparent blur-2xl" style={{ animation: "orb-float-3 10s ease-in-out infinite" }} />
      {/* Subtle sacred geometry lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 15% 85%, #FF6600 1.5px, transparent 1.5px), radial-gradient(circle at 85% 15%, #FF8C00 1.5px, transparent 1.5px), radial-gradient(circle at 50% 50%, #FFA500 1px, transparent 1px)", backgroundSize: "50px 50px, 70px 70px, 90px 90px" }} />
      {/* Decorative corner mandalas */}
      <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border border-orange-200/30 opacity-40" />
      <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full border border-orange-300/20 opacity-30" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full border border-orange-200/25 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_220px]">
          {/* LEFT: Kundli / Birth Chart Quick Form */}
          <div className="rounded-lg border-2 border-orange-400 bg-white shadow-sm">
            {/* Header */}
            <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-2.5">
              <h2 className="text-lg font-bold text-white">
                {t("hero.freeKundli")}
              </h2>
            </div>

            {/* Form Body */}
            <div className="space-y-4 p-4 sm:p-5">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  {t("hero.name")}
                </label>
                <Input
                  type="text"
                  placeholder={t("hero.enterName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  {t("hero.gender")}
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
                    {t("hero.male")}
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
                    {t("hero.female")}
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  {t("hero.dob")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">{t("hero.day")}</option>
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
                    <option value="">{t("hero.month")}</option>
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    placeholder={t("hero.year")}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  {t("hero.tob")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                  >
                    <option value="">{t("hero.hrs")}</option>
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
                    <option value="">{t("hero.min")}</option>
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
                  {t("hero.birthPlace")}
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
                  placeholder={t("hero.enterBirthPlace")}
                  className="h-9"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleGetKundli}
                className="h-11 w-full rounded-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-base font-bold text-white shadow-md hover:from-[#e65c00] hover:to-[#e07800] hover:shadow-lg"
              >
                {t("hero.getKundli")}
              </Button>
            </div>
          </div>

          {/* RIGHT: Today's Panchang */}
          <div className="rounded-lg border-2 border-orange-400 bg-white shadow-sm">
            {/* Header */}
            <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-2.5">
              <h2 className="text-lg font-bold text-white">
                {t("panchang.title")}
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
                          { label: t("panchang.tithi"), value: `${panchangData.paksha} ${panchangData.tithi}` },
                          { label: t("panchang.nakshatra"), value: panchangData.nakshatra },
                          { label: t("panchang.yoga"), value: panchangData.yoga },
                          { label: t("panchang.karana"), value: panchangData.karana },
                          { label: t("panchang.sunrise"), value: panchangData.sunrise },
                          { label: t("panchang.sunset"), value: panchangData.sunset },
                          { label: t("panchang.moonSign"), value: panchangData.moonSign },
                          { label: t("panchang.sunSign"), value: panchangData.sunSign },
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
                        {t("panchang.rahukaal")}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.rahukaal}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-orange-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        {t("panchang.yamaganda")}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.yamaganda}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-orange-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        {t("panchang.gulika")}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-800">
                        {panchangData.gulika}
                      </p>
                    </div>
                    <div className="rounded-md border border-orange-200 bg-green-50/50 p-3 text-center">
                      <p className="text-xs font-semibold uppercase text-green-700">
                        {t("panchang.abhijitMuhurta")}
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
                    {t("panchang.viewFull")}
                  </a>
                </>
              ) : (
                <div className="py-12 text-center text-sm text-gray-400 animate-pulse">
                  {t("panchang.loading")}
                </div>
              )}
            </div>
          </div>
          {/* RIGHT: AI Astrologers vertical list */}
          <AiAstrologersCarousel />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Astrologers Carousel                                            */
/* ------------------------------------------------------------------ */

const astrologers = [
  { name: "पंडित शर्मा जी", nameEn: "Pt. Sharma Ji", rate: 15, img: "/astrologers/pandit-sharma.jpg", ring: "#FF6600", faceZoom: true },
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
  const { t } = useLanguage();

  return (
    <div className="rounded-lg border-2 border-orange-400 bg-white shadow-sm flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-3 py-2.5">
        <h2 className="text-sm font-bold text-white text-center">{t("hero.aiAstrologers")}</h2>
      </div>
      {/* Scrollable list */}
      <div
        className="flex-1 overflow-y-auto p-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-col gap-2">
          {astrologers.map((a) => (
            <button
              key={a.nameEn}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-orange-50 w-full"
            >
              {/* Avatar photo */}
              <div
                className="size-14 shrink-0 overflow-hidden rounded-full shadow-md transition-transform group-hover:scale-105"
                style={{ boxShadow: `0 0 0 2px ${a.ring}` }}
              >
                <Image
                  src={a.img}
                  alt={a.nameEn}
                  width={200}
                  height={200}
                  className="size-full object-cover object-top"
                  style={a.faceZoom ? { transform: `scale(${(a as any).faceScale || 1.5})`, transformOrigin: (a as any).faceOrigin || "center 25%" } : undefined}
                  quality={95}
                  unoptimized
                />
              </div>
              {/* Info */}
              <div className="flex flex-col items-start min-w-0">
                <span className="truncate text-xs font-semibold text-gray-700 group-hover:text-[#FF6600] max-w-[120px]">
                  {a.name}
                </span>
                <span className="text-[11px] font-bold text-[#FF6600]">₹{a.rate}/min</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

