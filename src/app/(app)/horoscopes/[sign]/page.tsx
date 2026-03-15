"use client";

import { use } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Lock,
  Sparkles,
  Heart,
  Briefcase,
  Activity,
  Users,
  Gem,
  Clock,
} from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SignPageProps {
  params: Promise<{ sign: string }>;
}

const luckyData: Record<
  string,
  {
    numbers: number[];
    color: string;
    time: string;
    compatibility: string;
    remedy: string;
    ratings: {
      health: number;
      wealth: number;
      family: number;
      love: number;
      occupation: number;
      marriedLife: number;
    };
  }
> = {
  ARIES: {
    numbers: [9, 18, 27],
    color: "Red",
    time: "2:00 PM - 3:30 PM",
    compatibility: "Leo",
    remedy:
      "Wear red or orange colored clothes today. Chanting the Hanuman Chalisa will bring positive energy and remove obstacles from your path.",
    ratings: { health: 4, wealth: 3, family: 5, love: 4, occupation: 3, marriedLife: 5 },
  },
  TAURUS: {
    numbers: [6, 15, 24],
    color: "Green",
    time: "10:00 AM - 11:30 AM",
    compatibility: "Virgo",
    remedy:
      "Donate white-colored sweets to the needy. Wearing a silver ring on the little finger will enhance Venus energy.",
    ratings: { health: 5, wealth: 4, family: 4, love: 5, occupation: 4, marriedLife: 4 },
  },
  GEMINI: {
    numbers: [5, 14, 23],
    color: "Yellow",
    time: "12:00 PM - 1:30 PM",
    compatibility: "Libra",
    remedy:
      "Feed green vegetables to cows. Wearing an emerald ring will strengthen Mercury and improve communication skills.",
    ratings: { health: 3, wealth: 5, family: 4, love: 3, occupation: 5, marriedLife: 4 },
  },
  CANCER: {
    numbers: [2, 11, 20],
    color: "Silver",
    time: "8:00 AM - 9:30 AM",
    compatibility: "Scorpio",
    remedy:
      "Offer water to the Moon at night. Keeping a silver item in your pocket will strengthen lunar energy and emotional stability.",
    ratings: { health: 4, wealth: 4, family: 5, love: 5, occupation: 3, marriedLife: 5 },
  },
  LEO: {
    numbers: [1, 10, 19],
    color: "Gold",
    time: "1:00 PM - 2:30 PM",
    compatibility: "Aries",
    remedy:
      "Offer water to the Sun in the morning. Wearing a ruby gemstone will strengthen the Sun and boost your confidence.",
    ratings: { health: 5, wealth: 4, family: 4, love: 4, occupation: 5, marriedLife: 4 },
  },
  VIRGO: {
    numbers: [5, 14, 23],
    color: "Navy Blue",
    time: "3:00 PM - 4:30 PM",
    compatibility: "Taurus",
    remedy:
      "Feed soaked green gram to birds. Reciting Mercury mantras will improve analytical abilities and health matters.",
    ratings: { health: 4, wealth: 5, family: 3, love: 4, occupation: 5, marriedLife: 3 },
  },
  LIBRA: {
    numbers: [6, 15, 24],
    color: "Pink",
    time: "11:00 AM - 12:30 PM",
    compatibility: "Gemini",
    remedy:
      "Donate white-colored food items. Wearing a diamond or opal will enhance Venus energy and bring harmony in relationships.",
    ratings: { health: 4, wealth: 3, family: 5, love: 5, occupation: 4, marriedLife: 5 },
  },
  SCORPIO: {
    numbers: [9, 18, 27],
    color: "Crimson",
    time: "9:00 AM - 10:30 AM",
    compatibility: "Cancer",
    remedy:
      "Offer red flowers at a temple. Reciting Mars mantras will channel transformative energy positively and improve resolve.",
    ratings: { health: 3, wealth: 4, family: 4, love: 4, occupation: 4, marriedLife: 4 },
  },
  SAGITTARIUS: {
    numbers: [3, 12, 21],
    color: "Purple",
    time: "4:00 PM - 5:30 PM",
    compatibility: "Aquarius",
    remedy:
      "Apply saffron tilak on your forehead. Wearing a yellow sapphire will strengthen Jupiter and bring wisdom and expansion.",
    ratings: { health: 5, wealth: 5, family: 4, love: 3, occupation: 5, marriedLife: 4 },
  },
  CAPRICORN: {
    numbers: [8, 17, 26],
    color: "Brown",
    time: "6:00 PM - 7:30 PM",
    compatibility: "Pisces",
    remedy:
      "Donate mustard oil on Saturdays. Wearing a blue sapphire will strengthen Saturn and enhance career prospects and discipline.",
    ratings: { health: 4, wealth: 4, family: 5, love: 4, occupation: 4, marriedLife: 5 },
  },
  AQUARIUS: {
    numbers: [4, 13, 22],
    color: "Electric Blue",
    time: "7:00 AM - 8:30 AM",
    compatibility: "Sagittarius",
    remedy:
      "Feed birds and donate iron items. Reciting Rahu mantras will improve innovation and help navigate unexpected changes.",
    ratings: { health: 3, wealth: 4, family: 4, love: 3, occupation: 5, marriedLife: 4 },
  },
  PISCES: {
    numbers: [7, 16, 25],
    color: "Sea Green",
    time: "5:00 PM - 6:30 PM",
    compatibility: "Capricorn",
    remedy:
      "Offer yellow flowers to Lord Vishnu. Wearing a yellow sapphire or cats eye will strengthen spiritual connection and intuition.",
    ratings: { health: 5, wealth: 3, family: 5, love: 5, occupation: 3, marriedLife: 5 },
  },
};

function StarRating({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < count
              ? "fill-[#FF6600] text-[#FF6600]"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </span>
  );
}

export default function SignPage({ params }: SignPageProps) {
  const { sign } = use(params);
  const signKey = sign.toUpperCase();
  const signInfo = ZODIAC_SIGNS[signKey];

  if (!signInfo) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign not found</h1>
        <p className="text-gray-500">
          The zodiac sign &quot;{sign}&quot; does not exist.
        </p>
        <Link
          href="/horoscopes"
          className="text-[#FF6600] underline hover:text-[#FF8C00]"
        >
          Back to Horoscopes
        </Link>
      </div>
    );
  }

  const lucky = luckyData[signKey] ?? luckyData.ARIES;
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
        <Link href="/" className="hover:text-[#FF6600]">
          Home
        </Link>
        <span className="mx-1">&gt;</span>
        <Link href="/horoscopes" className="hover:text-[#FF6600]">
          Horoscope
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-800">
          {signInfo.name} Daily Horoscope
        </span>
      </nav>

      {/* Zodiac Sign Icon Strip */}
      <div className="mb-6 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-3">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">
          {signs.map(([key, info]) => {
            const isActive = key === signKey;
            return (
              <Link
                key={key}
                href={`/horoscopes/${key.toLowerCase()}`}
                className={cn(
                  "group flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-colors min-w-[70px]",
                  isActive ? "bg-[#FF6600]" : "hover:bg-orange-100"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full text-2xl shadow-sm border transition-all",
                    isActive
                      ? "bg-white border-white shadow-md"
                      : "bg-white border-orange-200 group-hover:border-orange-400"
                  )}
                >
                  {info.symbol}
                </div>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    isActive
                      ? "text-white"
                      : "text-gray-700 group-hover:text-[#FF6600]"
                  )}
                >
                  {info.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Main Content */}
        <div className="flex-1 lg:w-[70%]">
          {/* Sign Header */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="flex size-20 items-center justify-center rounded-full bg-orange-50 text-5xl border-2 border-[#FF6600]">
                {signInfo.symbol}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {signInfo.name} Daily Horoscope
                </h1>
                <p className="text-sm text-gray-500">{signInfo.dateRange}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 px-3 py-0.5 text-xs font-medium text-[#FF6600]">
                    {signInfo.element} Sign
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                    {signInfo.quality}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                    Ruler: {signInfo.ruler}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Rating Table */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h2 className="text-sm font-bold text-white">
                {signInfo.name} Horoscope Rating Today - {dateStr}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                {[
                  {
                    label: "Health",
                    value: lucky.ratings.health,
                    icon: Activity,
                  },
                  {
                    label: "Wealth",
                    value: lucky.ratings.wealth,
                    icon: Gem,
                  },
                  {
                    label: "Family",
                    value: lucky.ratings.family,
                    icon: Users,
                  },
                  {
                    label: "Love Matters",
                    value: lucky.ratings.love,
                    icon: Heart,
                  },
                  {
                    label: "Occupation",
                    value: lucky.ratings.occupation,
                    icon: Briefcase,
                  },
                  {
                    label: "Married Life",
                    value: lucky.ratings.marriedLife,
                    icon: Heart,
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center justify-between border-b border-gray-100 px-3 py-2.5",
                      idx % 2 === 0 ? "sm:border-r" : ""
                    )}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <item.icon className="size-4 text-[#FF6600]" />
                      {item.label}
                    </span>
                    <StarRating count={item.value} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lucky Badges */}
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2.5 shadow-sm">
              <Sparkles className="size-4 text-[#FF6600]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Lucky Number
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {lucky.numbers.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2.5 shadow-sm">
              <div
                className="size-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor:
                    lucky.color.toLowerCase() === "electric blue"
                      ? "#007FFF"
                      : lucky.color.toLowerCase() === "sea green"
                        ? "#2E8B57"
                        : lucky.color.toLowerCase() === "navy blue"
                          ? "#000080"
                          : lucky.color.toLowerCase(),
                }}
              />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Lucky Color
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {lucky.color}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2.5 shadow-sm">
              <Clock className="size-4 text-[#FF6600]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Lucky Time
                </p>
                <p className="text-sm font-bold text-gray-900">{lucky.time}</p>
              </div>
            </div>
          </div>

          {/* Horoscope Tabs */}
          <div className="mb-6">
            <Tabs defaultValue="daily">
              <TabsList className="bg-gray-100 rounded-lg">
                <TabsTrigger
                  value="daily"
                  className="data-active:bg-[#FF6600] data-active:text-white rounded-md"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="data-active:bg-[#FF6600] data-active:text-white rounded-md"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-active:bg-[#FF6600] data-active:text-white rounded-md"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>

              {/* Daily Content */}
              <TabsContent value="daily" className="mt-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-1 text-lg font-bold text-gray-900">
                    {signInfo.name} Daily Horoscope - {dateStr}
                  </h2>
                  <p className="mb-4 text-xs text-gray-500">
                    Powered by Vedic & Western Astrology
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                    <p>
                      Today brings a powerful alignment between your ruling
                      planet {signInfo.ruler} and the Moon, creating
                      opportunities for personal growth and meaningful
                      connections. The cosmic energy is especially favorable for
                      introspection and setting new intentions that align with
                      your deepest values. You may find yourself drawn toward
                      activities that nourish your soul and bring a sense of
                      purpose.
                    </p>
                    <p>
                      In matters of the heart, honest communication opens
                      unexpected doors. A conversation with someone close could
                      reveal insights that shift your perspective on a
                      long-standing situation. Trust your intuition -- your{" "}
                      {signInfo.element.toLowerCase()} nature gives you a
                      natural advantage in reading between the lines. Singles may
                      encounter a potential romantic interest through social
                      gatherings or mutual connections.
                    </p>
                    <p>
                      Career-wise, the stars favor bold moves and creative
                      thinking. If you have been considering a new project or
                      approach, now is the time to take the first step. Your{" "}
                      {signInfo.quality.toLowerCase()} energy means you have the
                      tenacity to see things through once you commit. Colleagues
                      and superiors are likely to notice your dedication, which
                      could lead to recognition or advancement opportunities.
                    </p>
                    <p>
                      Health and wellness are positively aspected today. This is
                      an excellent time to begin a new fitness routine or make
                      dietary improvements. Pay special attention to hydration
                      and rest. As the day winds down, take time to recharge.
                      A quiet evening reflecting on your goals will help you
                      prepare for the exciting opportunities ahead.
                    </p>
                    <p>
                      Financial matters look promising, with potential
                      opportunities for additional income through side ventures
                      or investments. However, avoid impulsive spending,
                      especially on luxury items. Focus on building long-term
                      financial security rather than seeking short-term
                      gratification.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Weekly Content - Premium */}
              <TabsContent value="weekly" className="mt-4">
                <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  {/* Blurred preview */}
                  <div className="p-6 blur-sm pointer-events-none select-none">
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      {signInfo.name} Weekly Horoscope
                    </h2>
                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                      <p>
                        This week opens with a powerful New Moon in your sector
                        of communication, bringing clarity to matters that have
                        felt muddled. Conversations that stalled will find new
                        momentum, and creative projects get a burst of
                        inspiration.
                      </p>
                      <p>
                        Mid-week, {signInfo.ruler} forms a harmonious aspect
                        with Jupiter, expanding your horizons in unexpected ways.
                        Travel, education, or philosophical pursuits are strongly
                        favored.
                      </p>
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-3 text-center px-8">
                      <div className="flex size-14 items-center justify-center rounded-full bg-orange-100">
                        <Lock className="size-6 text-[#FF6600]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Premium Content
                      </h3>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Upgrade to Premium to access detailed weekly horoscope
                        readings with career, love, and health predictions.
                      </p>
                      <Link
                        href="/pricing"
                        className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#FF6600] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8C00]"
                      >
                        <Sparkles className="size-4" />
                        Upgrade to Premium
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Monthly Content - Premium */}
              <TabsContent value="monthly" className="mt-4">
                <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  {/* Blurred preview */}
                  <div className="p-6 blur-sm pointer-events-none select-none">
                    <h2 className="mb-1 text-lg font-bold text-gray-900">
                      {signInfo.name} Monthly Horoscope
                    </h2>
                    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                      <p>
                        This month represents a significant turning point for{" "}
                        {signInfo.name}. The planetary alignments are shifting
                        energy toward personal transformation, career
                        advancement, and deeper self-understanding.
                      </p>
                      <p>
                        The first week focuses on financial matters and resource
                        management. Saturn&apos;s influence encourages
                        disciplined budgeting and long-term planning.
                      </p>
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-3 text-center px-8">
                      <div className="flex size-14 items-center justify-center rounded-full bg-orange-100">
                        <Lock className="size-6 text-[#FF6600]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Premium Content
                      </h3>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Upgrade to Premium for in-depth monthly horoscope
                        analysis with retrograde alerts and lunar phase guidance.
                      </p>
                      <Link
                        href="/pricing"
                        className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#FF6600] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8C00]"
                      >
                        <Sparkles className="size-4" />
                        Upgrade to Premium
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Remedy of the Day */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h2 className="text-sm font-bold text-white">
                Remedy of the Day for {signInfo.name}
              </h2>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                {lucky.remedy}
              </p>
            </div>
          </div>

          {/* About This Sign */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-[#FF6600]">
              About {signInfo.name} ({signInfo.dateRange})
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-gray-700">
              {signInfo.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {signInfo.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full space-y-6 lg:w-[300px] lg:shrink-0">
          {/* Today's Luck Summary */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Today&apos;s Luck for {signInfo.name}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Lucky Numbers</p>
                <div className="mt-1 flex gap-2">
                  {lucky.numbers.map((num) => (
                    <span
                      key={num}
                      className="flex size-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-[#FF6600]"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Lucky Color</p>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className="size-5 rounded-full border border-gray-300"
                    style={{
                      backgroundColor:
                        lucky.color.toLowerCase() === "electric blue"
                          ? "#007FFF"
                          : lucky.color.toLowerCase() === "sea green"
                            ? "#2E8B57"
                            : lucky.color.toLowerCase() === "navy blue"
                              ? "#000080"
                              : lucky.color.toLowerCase(),
                    }}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {lucky.color}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Lucky Time</p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {lucky.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Best Compatibility</p>
                <Link
                  href={`/horoscopes/${lucky.compatibility.toLowerCase()}`}
                  className="mt-1 inline-block text-sm font-medium text-[#FF6600] hover:underline"
                >
                  {lucky.compatibility} &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Other Signs */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-lg bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">
                Other Zodiac Signs
              </h3>
            </div>
            <div className="p-2">
              {signs
                .filter(([key]) => key !== signKey)
                .map(([key, info]) => (
                  <Link
                    key={key}
                    href={`/horoscopes/${key.toLowerCase()}`}
                    className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF6600]"
                  >
                    <span className="text-lg">{info.symbol}</span>
                    <span>
                      {info.name} Horoscope
                    </span>
                    <ChevronRight className="ml-auto size-3.5 text-gray-400" />
                  </Link>
                ))}
            </div>
          </div>

          {/* Related Services */}
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
                { label: "Numerology Predictions", href: "/horoscopes" },
                { label: "Tarot Card Reading", href: "/horoscopes" },
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
