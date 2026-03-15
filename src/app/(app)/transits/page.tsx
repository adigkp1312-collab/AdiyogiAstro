"use client";

import { Orbit, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Paywall } from "@/components/shared/paywall";
import { cn } from "@/lib/utils";

interface PlanetTransit {
  planet: string;
  sign: string;
  degree: number;
  retrograde: boolean;
  interpretation: string;
}

interface UpcomingTransit {
  date: string;
  event: string;
  description: string;
  impact: "positive" | "challenging" | "neutral";
}

const currentTransits: PlanetTransit[] = [
  {
    planet: "Sun",
    sign: "Pisces",
    degree: 21.4,
    retrograde: false,
    interpretation:
      "The Sun in Pisces brings a heightened sense of compassion and spiritual awareness. Focus on creative and healing endeavors.",
  },
  {
    planet: "Moon",
    sign: "Leo",
    degree: 14.7,
    retrograde: false,
    interpretation:
      "The Moon in Leo encourages self-expression, dramatic flair, and a need for recognition. A great time for performing or leading.",
  },
  {
    planet: "Mercury",
    sign: "Aries",
    degree: 2.1,
    retrograde: false,
    interpretation:
      "Mercury in Aries quickens the mind and sharpens communication. Thoughts and speech become direct and assertive.",
  },
  {
    planet: "Venus",
    sign: "Aries",
    degree: 18.9,
    retrograde: false,
    interpretation:
      "Venus in Aries brings passion and spontaneity to love and beauty. Impulsive attractions and bold romantic gestures are favored.",
  },
  {
    planet: "Mars",
    sign: "Cancer",
    degree: 8.3,
    retrograde: false,
    interpretation:
      "Mars in Cancer channels energy through emotional motivation. Protective instincts intensify and actions are driven by feelings.",
  },
  {
    planet: "Jupiter",
    sign: "Gemini",
    degree: 15.6,
    retrograde: false,
    interpretation:
      "Jupiter in Gemini expands intellectual horizons and multiplies learning opportunities. Short trips and communication ventures flourish.",
  },
  {
    planet: "Saturn",
    sign: "Pisces",
    degree: 24.8,
    retrograde: false,
    interpretation:
      "Saturn in Pisces asks for discipline in spiritual matters and emotional boundaries. Structured compassion leads to wisdom.",
  },
  {
    planet: "Uranus",
    sign: "Taurus",
    degree: 27.2,
    retrograde: false,
    interpretation:
      "Uranus in Taurus continues to revolutionize values, finances, and material security. Expect unexpected shifts in the economy.",
  },
  {
    planet: "Neptune",
    sign: "Aries",
    degree: 1.5,
    retrograde: false,
    interpretation:
      "Neptune enters Aries, dissolving old paradigms of identity and pioneering new spiritual visions. Dreams become action.",
  },
  {
    planet: "Pluto",
    sign: "Aquarius",
    degree: 5.8,
    retrograde: false,
    interpretation:
      "Pluto in Aquarius transforms society, technology, and collective consciousness. Power structures reshape for the people.",
  },
];

const upcomingTransits: UpcomingTransit[] = [
  {
    date: "Mar 14",
    event: "Full Moon in Virgo",
    description:
      "A powerful Full Moon highlights health, routines, and service. Time to release perfectionist tendencies.",
    impact: "neutral",
  },
  {
    date: "Mar 17",
    event: "Mercury enters Aries",
    description:
      "Thoughts and communication become more direct and assertive. A great time for bold conversations.",
    impact: "positive",
  },
  {
    date: "Mar 20",
    event: "Sun enters Aries (Spring Equinox)",
    description:
      "The astrological new year begins. Set intentions for the next twelve months with cardinal fire energy.",
    impact: "positive",
  },
  {
    date: "Mar 23",
    event: "Venus square Pluto",
    description:
      "Intense emotions in relationships surface. Power dynamics in love require honest examination.",
    impact: "challenging",
  },
  {
    date: "Mar 27",
    event: "Mars trine Neptune",
    description:
      "Actions inspired by compassion and creativity flow effortlessly. Artistic and spiritual pursuits are strongly favored.",
    impact: "positive",
  },
  {
    date: "Mar 29",
    event: "New Moon in Aries",
    description:
      "A fresh start in personal identity and leadership. Plant seeds for bold new beginnings.",
    impact: "positive",
  },
];

const impactColors: Record<string, string> = {
  positive: "bg-emerald-500/15 text-emerald-400",
  challenging: "bg-red-500/15 text-red-400",
  neutral: "bg-sky-500/15 text-sky-400",
};

export default function TransitsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Orbit className="size-8 text-amber-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Transit Tracker
          </h1>
        </div>
        <p className="text-slate-400">
          Track current planetary positions and upcoming celestial events.
          Understand how transiting planets affect your natal chart.
        </p>
      </div>

      <Paywall requiredTier="PREMIUM" currentTier="FREE">
        <div className="space-y-8">
          {/* Current Planetary Positions */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Current Planetary Positions
            </h2>
            <Table className="text-slate-300">
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Planet</TableHead>
                  <TableHead className="text-slate-400">Sign</TableHead>
                  <TableHead className="text-slate-400">Degree</TableHead>
                  <TableHead className="text-slate-400 hidden sm:table-cell">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransits.map((t) => (
                  <TableRow
                    key={t.planet}
                    className="border-white/5 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {t.planet}
                    </TableCell>
                    <TableCell>{t.sign}</TableCell>
                    <TableCell>{t.degree.toFixed(1)}&deg;</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {t.retrograde ? (
                        <Badge className="bg-red-500/15 text-red-400">
                          Retrograde
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-500/15 text-emerald-400">
                          Direct
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Current Transits Interpretations */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Current Transit Interpretations
            </h2>
            <div className="space-y-4">
              {currentTransits.slice(0, 5).map((t) => (
                <div
                  key={t.planet}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-400">
                      {t.planet}
                    </span>
                    <ChevronRight className="size-4 text-slate-600" />
                    <span className="text-slate-300">{t.sign}</span>
                    <span className="text-xs text-slate-500">
                      {t.degree.toFixed(1)}&deg;
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {t.interpretation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Transits Calendar */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Upcoming Transits
            </h2>
            <div className="space-y-3">
              {upcomingTransits.map((t, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  {/* Date */}
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-lg bg-slate-800 py-2 text-center">
                    <span className="text-xs text-slate-400">
                      {t.date.split(" ")[0]}
                    </span>
                    <span className="text-lg font-bold text-white">
                      {t.date.split(" ")[1]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{t.event}</h3>
                      <Badge
                        className={cn(
                          "text-xs",
                          impactColors[t.impact]
                        )}
                      >
                        {t.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Paywall>
    </div>
  );
}
