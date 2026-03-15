"use client";

import * as React from "react";
import Link from "next/link";
import {
  Star,
  Stars,
  Circle,
  Heart,
  BookOpen,
  ArrowRight,
  Crown,
  Sparkles,
  Orbit,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const userPlaceholder = {
  name: "Emma",
  sunSign: "Aries",
  sunSymbol: "\u2648",
  tier: "FREE",
};

const dailyHoroscope = {
  sign: "Aries",
  symbol: "\u2648",
  date: "March 12, 2026",
  content:
    "Today brings a surge of creative energy, Aries. With the Sun illuminating your first house, your confidence is at an all-time high. A conversation with a colleague could spark an exciting new idea. Trust your instincts when making decisions this afternoon -- your intuition is especially sharp right now. Romance looks promising in the evening hours.",
  luckyNumber: 7,
  mood: "Energized",
  compatibility: "Leo",
};

const recentCharts = [
  {
    id: "1",
    name: "My Birth Chart",
    date: "Feb 28, 2026",
    sunSign: "Aries",
    moonSign: "Cancer",
    rising: "Scorpio",
    symbol: "\u2648",
  },
  {
    id: "2",
    name: "Partner Compatibility",
    date: "Mar 5, 2026",
    sunSign: "Leo",
    moonSign: "Pisces",
    rising: "Gemini",
    symbol: "\u264C",
  },
  {
    id: "3",
    name: "Solar Return 2026",
    date: "Mar 10, 2026",
    sunSign: "Aries",
    moonSign: "Libra",
    rising: "Capricorn",
    symbol: "\u2648",
  },
];

const currentTransits = [
  {
    planet: "Mercury",
    sign: "Pisces",
    symbol: "\u2653",
    aspect: "Sextile your Sun",
    effect: "Enhanced communication and clarity",
    icon: Sparkles,
    color: "text-blue-400",
  },
  {
    planet: "Venus",
    sign: "Aries",
    symbol: "\u2648",
    aspect: "Conjunct your Sun",
    effect: "Heightened charisma and attraction",
    icon: Heart,
    color: "text-pink-400",
  },
  {
    planet: "Mars",
    sign: "Cancer",
    symbol: "\u264B",
    aspect: "Square your Sun",
    effect: "Dynamic tension driving action",
    icon: Zap,
    color: "text-red-400",
  },
  {
    planet: "Jupiter",
    sign: "Cancer",
    symbol: "\u264B",
    aspect: "Trine your Moon",
    effect: "Emotional growth and abundance",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
];

const quickActions = [
  {
    label: "View Horoscopes",
    description: "Daily, weekly & monthly readings",
    href: "/horoscopes",
    icon: Stars,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    hoverBorder: "hover:border-amber-500/20",
  },
  {
    label: "Create Chart",
    description: "Generate a birth chart",
    href: "/birth-chart",
    icon: Circle,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    hoverBorder: "hover:border-indigo-500/20",
  },
  {
    label: "Check Compatibility",
    description: "Compare with another sign",
    href: "/compatibility",
    icon: Heart,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBorder: "hover:border-pink-500/20",
  },
  {
    label: "Read Blog",
    description: "Astrology articles & guides",
    href: "/blog",
    icon: BookOpen,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    hoverBorder: "hover:border-emerald-500/20",
  },
];

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              Welcome back, {userPlaceholder.name}{" "}
              <span className="text-2xl">{userPlaceholder.sunSymbol}</span>
            </h1>
            <p className="mt-1 text-slate-400">
              Here&apos;s your cosmic overview for today
            </p>
          </div>

          {/* Top Row: Daily Horoscope + Subscription */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Daily Horoscope Card */}
            <Card className="border-white/10 bg-slate-900/50 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dailyHoroscope.symbol}</span>
                    <div>
                      <CardTitle className="text-slate-100">
                        Your Daily Horoscope
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {dailyHoroscope.sign} -- {dailyHoroscope.date}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-400">
                    <Calendar className="mr-1 size-3" />
                    Today
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-300">
                  {dailyHoroscope.content}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5">
                    <Sparkles className="size-3.5 text-amber-400" />
                    <span className="text-xs text-slate-400">
                      Lucky Number:{" "}
                      <span className="font-medium text-slate-200">
                        {dailyHoroscope.luckyNumber}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5">
                    <Zap className="size-3.5 text-purple-400" />
                    <span className="text-xs text-slate-400">
                      Mood:{" "}
                      <span className="font-medium text-slate-200">
                        {dailyHoroscope.mood}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5">
                    <Heart className="size-3.5 text-pink-400" />
                    <span className="text-xs text-slate-400">
                      Best Match:{" "}
                      <span className="font-medium text-slate-200">
                        {dailyHoroscope.compatibility}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/horoscopes">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      Read Full Horoscope
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="border-white/10 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-slate-100">Your Plan</CardTitle>
                <CardDescription className="text-slate-400">
                  Current subscription status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-slate-800">
                      <Star className="size-6 text-slate-400" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-slate-200">
                        Free Plan
                      </span>
                      <p className="text-xs text-slate-500">
                        Basic access to horoscopes
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Crown className="size-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-400">
                        Upgrade to Premium
                      </span>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-slate-400">
                      Unlock premium horoscope content, detailed birth chart
                      analysis, compatibility reports, and personalized transit
                      alerts.
                    </p>
                    <Link href="/pricing">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500"
                      >
                        <Crown className="size-3" />
                        Upgrade Now
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="size-1 rounded-full bg-emerald-500" />
                      Daily horoscopes (basic)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-1 rounded-full bg-emerald-500" />
                      1 birth chart generation
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-1 rounded-full bg-slate-600" />
                      <span className="text-slate-600">
                        Premium content (locked)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-1 rounded-full bg-slate-600" />
                      <span className="text-slate-600">
                        Transit alerts (locked)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <div
                    className={`group flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/50 p-4 transition-all ${action.hoverBorder} hover:bg-slate-900`}
                  >
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg ${action.bgColor}`}
                    >
                      <action.icon className={`size-5 ${action.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">
                        {action.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {action.description}
                      </span>
                    </div>
                    <ArrowRight className="ml-auto size-4 text-slate-600 transition-colors group-hover:text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row: Birth Charts + Transits */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Birth Charts */}
            <Card className="border-white/10 bg-slate-900/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-100">
                      Your Birth Charts
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Recently generated charts
                    </CardDescription>
                  </div>
                  <Link href="/birth-chart">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {recentCharts.map((chart) => (
                    <div
                      key={chart.id}
                      className="flex items-center gap-4 rounded-lg border border-white/5 bg-slate-800/30 p-3 transition-colors hover:bg-slate-800/50"
                    >
                      <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/10">
                        <span className="text-lg">{chart.symbol}</span>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm font-medium text-slate-200">
                          {chart.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {chart.date}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-500">Sun:</span>
                          <Badge className="bg-amber-500/10 text-xs text-amber-400">
                            {chart.sunSign}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-500">Moon:</span>
                          <Badge className="bg-slate-500/10 text-xs text-slate-400">
                            {chart.moonSign}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Transits */}
            <Card className="border-white/10 bg-slate-900/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-100">
                      Current Transits
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Planetary aspects affecting your chart
                    </CardDescription>
                  </div>
                  <Link href="/transits">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      <Orbit className="size-4" />
                      All Transits
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {currentTransits.map((transit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-white/5 bg-slate-800/30 p-3"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
                        <transit.icon className={`size-4 ${transit.color}`} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-200">
                            {transit.planet} in {transit.sign}
                          </span>
                          <span className="text-sm">{transit.symbol}</span>
                        </div>
                        <span className="text-xs text-amber-400/80">
                          {transit.aspect}
                        </span>
                        <span className="text-xs text-slate-500">
                          {transit.effect}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
