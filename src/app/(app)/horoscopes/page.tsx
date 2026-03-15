"use client";

import * as React from "react";
import Link from "next/link";
import { Stars, Mail, ArrowRight, ChevronRight } from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const dailyPreviews: Record<string, string> = {
  ARIES:
    "Today is a day of bold action, Aries. Mars energizes your ambitions and a surprise opportunity may arise at work. Stay focused and trust your instincts -- the stars are aligned in your favor for new beginnings.",
  TAURUS:
    "Financial matters come into focus today, Taurus. Venus brings harmony to your relationships, and a practical decision regarding investments could pay off. Take time to enjoy the simple pleasures around you.",
  GEMINI:
    "Communication is your superpower today, Gemini. Mercury sharpens your wit and you may receive important news. A short trip or meaningful conversation could change your perspective on a lingering issue.",
  CANCER:
    "Emotional depth defines your day, Cancer. The Moon highlights your domestic sphere and family bonds strengthen. Trust your intuition when making decisions -- your inner voice is especially clear right now.",
  LEO:
    "The spotlight is on you today, Leo. The Sun boosts your confidence and creative projects flourish. Romance is in the air, and your generous spirit attracts admiration from those around you.",
  VIRGO:
    "Organization and health take center stage, Virgo. Mercury helps you sort through complex details with ease. A wellness routine started today could have lasting benefits. Pay attention to dietary choices.",
  LIBRA:
    "Balance and beauty guide your day, Libra. Venus enhances your social charm and partnerships thrive. An artistic endeavor brings unexpected joy. Seek harmony in all your interactions today.",
  SCORPIO:
    "Transformation is the theme today, Scorpio. Pluto deepens your resolve and hidden truths may surface. Financial gains through joint ventures are indicated. Trust the process of change unfolding around you.",
  SAGITTARIUS:
    "Adventure calls you today, Sagittarius. Jupiter expands your horizons and travel plans gain momentum. A philosophical discussion could spark a new interest. Embrace optimism and aim your arrow high.",
  CAPRICORN:
    "Career advancement is highlighted today, Capricorn. Saturn rewards your discipline and authority figures take notice. A long-term project reaches a milestone. Stay grounded and keep building steadily.",
  AQUARIUS:
    "Innovation defines your day, Aquarius. Uranus sparks brilliant ideas and community involvement brings fulfillment. Technology plays a key role in your progress. Embrace your unique vision for the future.",
  PISCES:
    "Spiritual insights flow freely today, Pisces. Neptune heightens your creativity and dreams carry meaningful messages. Artistic pursuits are strongly favored. Let your compassion guide your actions.",
};

export default function HoroscopesPage() {
  const signs = Object.entries(ZODIAC_SIGNS);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="text-gray-800 font-medium">Horoscope</span>
      </nav>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className="text-[#FF6600]">Daily Horoscope</span> - {dateStr}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Read your free daily horoscope for today. Find out what the stars have
          in store for your zodiac sign with accurate astrological predictions
          covering love, career, health, and finances.
        </p>
      </div>

      {/* Zodiac Sign Icon Strip */}
      <div className="mb-8 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">
          {signs.map(([key, info]) => (
            <Link
              key={key}
              href={`/horoscopes/${key.toLowerCase()}`}
              className="group flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-colors hover:bg-orange-100 min-w-[70px]"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-2xl shadow-sm border border-orange-200 group-hover:border-orange-400 group-hover:shadow-md transition-all">
                {info.symbol}
              </div>
              <span className="text-[11px] font-medium text-gray-700 group-hover:text-[#FF6600]">
                {info.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Main Content (70%) */}
        <div className="flex-1 lg:w-[70%]">
          {/* Daily Horoscope Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <Stars className="size-5 text-[#FF6600]" />
              <h2 className="text-xl font-bold text-[#FF6600]">
                Today&apos;s Daily Horoscope
              </h2>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Select your zodiac sign below to read your complete daily
              horoscope. Our expert astrologers provide detailed predictions
              based on planetary transits and lunar phases for each sign.
            </p>

            {/* Sign Horoscope Previews */}
            <div className="space-y-4">
              {signs.map(([key, info]) => (
                <div
                  key={key}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/horoscopes/${key.toLowerCase()}`}
                      className="flex flex-col items-center gap-1 min-w-[80px]"
                    >
                      <div className="flex size-14 items-center justify-center rounded-full bg-orange-50 text-3xl border border-orange-200">
                        {info.symbol}
                      </div>
                      <span className="text-xs font-bold text-[#FF6600]">
                        {info.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {info.dateRange}
                      </span>
                    </Link>
                    <div className="flex-1">
                      <Link href={`/horoscopes/${key.toLowerCase()}`}>
                        <h3 className="mb-1 text-base font-bold text-gray-900 hover:text-[#FF6600]">
                          {info.name} Daily Horoscope
                        </h3>
                      </Link>
                      <p className="mb-2 text-sm leading-relaxed text-gray-600">
                        {dailyPreviews[key]}
                      </p>
                      <Link
                        href={`/horoscopes/${key.toLowerCase()}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6600] hover:text-[#FF8C00]"
                      >
                        Read Full Horoscope
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info Sections */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                About Daily Horoscope
              </h2>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700 space-y-3">
              <p>
                A horoscope is an astrological forecast based on the positions
                of celestial bodies at the time of your birth. Daily horoscopes
                provide guidance on love, career, health, and finances by
                analyzing the current planetary transits relative to your natal
                chart.
              </p>
              <p>
                Our daily horoscope predictions are prepared by experienced
                Vedic and Western astrologers who analyze the movement of the
                Sun, Moon, and planets through the twelve zodiac signs. Each
                day brings unique cosmic energies that influence different
                areas of your life.
              </p>
              <p>
                For more personalized predictions, consider generating your
                free birth chart (Kundli) which provides a detailed analysis
                based on your exact date, time, and place of birth.
              </p>
            </div>
          </div>

          {/* Horoscope Types Grid */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                Types of Horoscopes
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Daily Horoscope",
                  desc: "Get day-to-day predictions for love, career, and health. Updated every morning.",
                },
                {
                  title: "Weekly Horoscope",
                  desc: "Plan your week ahead with detailed weekly astrological forecasts for all zodiac signs.",
                },
                {
                  title: "Monthly Horoscope",
                  desc: "Long-range monthly predictions covering major planetary transits and their effects.",
                },
                {
                  title: "Yearly Horoscope",
                  desc: "Annual forecasts to help you understand the big themes and opportunities of the year.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <h3 className="mb-1 font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (30%) */}
        <aside className="w-full space-y-6 lg:w-[300px] lg:shrink-0">
          {/* Personalized Horoscope Form */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Personalized Horoscope
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-500">
                Get your personalized daily horoscope based on your birth
                details.
              </p>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked
                      className="accent-[#FF6600]"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="accent-[#FF6600]"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="DD"
                    min={1}
                    max={31}
                    className="rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                  <input
                    type="number"
                    placeholder="MM"
                    min={1}
                    max={12}
                    className="rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    min={1900}
                    max={2026}
                    className="rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>
              <button className="w-full rounded bg-[#FF6600] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#FF8C00]">
                Get Personalized Horoscope
              </button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Mail className="size-4" />
                Daily Horoscope Newsletter
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600">
                Get your daily horoscope delivered to your inbox every morning.
                Free and unsubscribe anytime!
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <button className="w-full rounded bg-[#FF6600] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#FF8C00]">
                Subscribe Free
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Related Services
              </h3>
            </div>
            <div className="p-2">
              {[
                { label: "Free Kundli / Birth Chart", href: "/birth-chart/new" },
                { label: "Kundli Matching", href: "/compatibility" },
                { label: "Planetary Transits", href: "/transits" },
                { label: "Weekly Horoscope", href: "/horoscopes" },
                { label: "Monthly Horoscope", href: "/horoscopes" },
                { label: "Chinese Horoscope", href: "/horoscopes" },
                { label: "Numerology", href: "/horoscopes" },
                { label: "Tarot Reading", href: "/horoscopes" },
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

          {/* Zodiac Elements */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Zodiac by Element
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                {
                  element: "Fire Signs",
                  signs: "Aries, Leo, Sagittarius",
                  color: "text-red-600",
                  bg: "bg-red-50",
                },
                {
                  element: "Earth Signs",
                  signs: "Taurus, Virgo, Capricorn",
                  color: "text-green-700",
                  bg: "bg-green-50",
                },
                {
                  element: "Air Signs",
                  signs: "Gemini, Libra, Aquarius",
                  color: "text-sky-600",
                  bg: "bg-sky-50",
                },
                {
                  element: "Water Signs",
                  signs: "Cancer, Scorpio, Pisces",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
              ].map((group) => (
                <div
                  key={group.element}
                  className={cn("rounded p-2.5", group.bg)}
                >
                  <p className={cn("text-xs font-bold", group.color)}>
                    {group.element}
                  </p>
                  <p className="text-xs text-gray-600">{group.signs}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
