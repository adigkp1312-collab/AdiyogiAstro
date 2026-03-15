"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ZodiacWheel } from "@/components/astrology/zodiac-wheel";
import { Paywall } from "@/components/shared/paywall";
import type { ChartData } from "@/types";

interface ChartPageProps {
  params: Promise<{ id: string }>;
}

// Placeholder chart data
const placeholderChartData: ChartData = {
  sun: { planet: "Sun", sign: "Gemini", degree: 24.5, house: 10 },
  moon: { planet: "Moon", sign: "Pisces", degree: 12.3, house: 6 },
  mercury: { planet: "Mercury", sign: "Cancer", degree: 3.8, house: 11 },
  venus: { planet: "Venus", sign: "Taurus", degree: 18.1, house: 9 },
  mars: { planet: "Mars", sign: "Leo", degree: 7.6, house: 12 },
  jupiter: { planet: "Jupiter", sign: "Sagittarius", degree: 22.0, house: 4 },
  saturn: { planet: "Saturn", sign: "Pisces", degree: 1.4, house: 6, retrograde: true },
  uranus: { planet: "Uranus", sign: "Aquarius", degree: 15.9, house: 5 },
  neptune: { planet: "Neptune", sign: "Capricorn", degree: 27.2, house: 5, retrograde: true },
  pluto: { planet: "Pluto", sign: "Scorpio", degree: 29.7, house: 3 },
  ascendant: { sign: "Virgo", degree: 8.4 },
  midheaven: { sign: "Gemini", degree: 5.1 },
  houses: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
  aspects: [
    { planet1: "Sun", planet2: "Moon", type: "Square", angle: 90, orb: 2.2 },
    { planet1: "Sun", planet2: "Jupiter", type: "Opposition", angle: 180, orb: 2.5 },
    { planet1: "Moon", planet2: "Saturn", type: "Conjunction", angle: 0, orb: 3.1 },
    { planet1: "Venus", planet2: "Jupiter", type: "Trine", angle: 120, orb: 1.9 },
    { planet1: "Mars", planet2: "Pluto", type: "Square", angle: 90, orb: 4.1 },
    { planet1: "Mercury", planet2: "Neptune", type: "Sextile", angle: 60, orb: 3.4 },
    { planet1: "Jupiter", planet2: "Uranus", type: "Sextile", angle: 60, orb: 5.9 },
  ],
};

const placeholderMeta = {
  name: "My Birth Chart",
  birthDate: "June 15, 1995",
  birthTime: "14:30",
  birthPlace: "New York, NY",
};

const aspectColors: Record<string, string> = {
  Conjunction: "text-amber-400",
  Sextile: "text-sky-400",
  Square: "text-red-400",
  Trine: "text-emerald-400",
  Opposition: "text-orange-400",
};

export default function ViewChartPage({ params }: ChartPageProps) {
  const { id } = use(params);

  const chartData = placeholderChartData;
  const meta = placeholderMeta;

  const planetPositions = [
    { ...chartData.sun, planet: "Sun" },
    { ...chartData.moon, planet: "Moon" },
    { ...chartData.mercury, planet: "Mercury" },
    { ...chartData.venus, planet: "Venus" },
    { ...chartData.mars, planet: "Mars" },
    { ...chartData.jupiter, planet: "Jupiter" },
    { ...chartData.saturn, planet: "Saturn" },
    { ...chartData.uranus, planet: "Uranus" },
    { ...chartData.neptune, planet: "Neptune" },
    { ...chartData.pluto, planet: "Pluto" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Back Link */}
      <Link
        href="/birth-chart"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to Birth Charts
      </Link>

      {/* Chart Header */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-slate-900 p-6">
        <h1 className="text-2xl font-bold text-white">{meta.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4 text-slate-400" />
            {meta.birthDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-slate-400" />
            {meta.birthTime}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4 text-slate-400" />
            {meta.birthPlace}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="bg-amber-500/15 text-amber-400">
            Sun in {chartData.sun.sign}
          </Badge>
          <Badge className="bg-indigo-500/15 text-indigo-400">
            Moon in {chartData.moon.sign}
          </Badge>
          <Badge className="bg-purple-500/15 text-purple-400">
            Rising {chartData.ascendant.sign}
          </Badge>
        </div>
      </div>

      {/* Chart Visualization & Planet Table */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SVG Wheel */}
        <div className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 p-6">
          <ZodiacWheel chartData={chartData} size={420} />
        </div>

        {/* Planet Positions Table */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Planet Positions
          </h2>
          <Table className="text-slate-300">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-400">Planet</TableHead>
                <TableHead className="text-slate-400">Sign</TableHead>
                <TableHead className="text-slate-400">Degree</TableHead>
                <TableHead className="text-slate-400">House</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planetPositions.map((pos) => (
                <TableRow
                  key={pos.planet}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">
                    {pos.planet}
                    {pos.retrograde && (
                      <span className="ml-1 text-xs text-red-400">R</span>
                    )}
                  </TableCell>
                  <TableCell>{pos.sign}</TableCell>
                  <TableCell>{pos.degree.toFixed(1)}&deg;</TableCell>
                  <TableCell>{pos.house ?? "---"}</TableCell>
                </TableRow>
              ))}
              {/* Ascendant & Midheaven */}
              <TableRow className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium text-amber-400">
                  Ascendant
                </TableCell>
                <TableCell>{chartData.ascendant.sign}</TableCell>
                <TableCell>
                  {chartData.ascendant.degree.toFixed(1)}&deg;
                </TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium text-amber-400">
                  Midheaven
                </TableCell>
                <TableCell>{chartData.midheaven.sign}</TableCell>
                <TableCell>
                  {chartData.midheaven.degree.toFixed(1)}&deg;
                </TableCell>
                <TableCell>10</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Aspects Table */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Aspects</h2>
        <Table className="text-slate-300">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-slate-400">Planet 1</TableHead>
              <TableHead className="text-slate-400">Aspect</TableHead>
              <TableHead className="text-slate-400">Planet 2</TableHead>
              <TableHead className="text-slate-400">Orb</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.aspects.map((aspect, i) => (
              <TableRow
                key={i}
                className="border-white/5 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">
                  {aspect.planet1}
                </TableCell>
                <TableCell>
                  <span className={aspectColors[aspect.type] ?? "text-slate-300"}>
                    {aspect.type}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-white">
                  {aspect.planet2}
                </TableCell>
                <TableCell>{aspect.orb.toFixed(1)}&deg;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Detailed Report - Paywalled */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Detailed Report
        </h2>
        <Paywall requiredTier="PREMIUM" currentTier="FREE">
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-amber-400">
              Sun in {chartData.sun.sign} -- Your Core Identity
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              With your Sun placed in {chartData.sun.sign} at{" "}
              {chartData.sun.degree.toFixed(1)} degrees in the{" "}
              {chartData.sun.house ? `${chartData.sun.house}th` : "---"} house,
              your core identity is shaped by intellectual curiosity and
              versatile communication. You thrive in environments that
              challenge your mind and offer variety.
            </p>
            <h3 className="text-lg font-semibold text-amber-400">
              Moon in {chartData.moon.sign} -- Your Emotional World
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Your Moon in {chartData.moon.sign} reveals a deeply empathetic
              and intuitive emotional nature. You absorb the feelings of
              those around you and need regular periods of solitude to
              recharge your emotional batteries.
            </p>
            <h3 className="text-lg font-semibold text-amber-400">
              {chartData.ascendant.sign} Rising -- Your Public Persona
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              With {chartData.ascendant.sign} on the ascendant, others
              perceive you as analytical, detail-oriented, and helpful.
              You approach new situations with a careful eye and a desire
              to be of service to those around you.
            </p>
          </div>
        </Paywall>
      </div>
    </div>
  );
}
