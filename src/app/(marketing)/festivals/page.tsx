"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Filter,
  Search,
} from "lucide-react";
import {
  getFestivalsForYear,
  groupByMonth,
  TYPE_COLORS,
  type Festival,
  type FestivalType,
} from "@/lib/festivals";

const YEARS = Array.from({ length: 74 }, (_, i) => 2026 + i); // 2026–2099

const TYPE_LABELS: Record<FestivalType, string> = {
  national: "National",
  hindu: "Hindu",
  sikh: "Sikh",
  buddhist: "Buddhist",
  jain: "Jain",
  islamic: "Islamic",
  christian: "Christian",
  regional: "Regional",
};

function FestivalCard({ festival }: { festival: Festival }) {
  const d = new Date(festival.date + "T00:00:00Z");
  const day = d.getUTCDate();
  const weekday = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  const colors = TYPE_COLORS[festival.type];

  return (
    <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      {/* Date badge */}
      <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-b from-[#FF6600] to-[#FF8C00] text-white">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-[10px] font-medium uppercase">{weekday}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-bold text-gray-900">{festival.name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg} ${colors.text}`}
          >
            {TYPE_LABELS[festival.type]}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">
          {festival.description}
        </p>
        {festival.region && (
          <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
            <MapPin className="size-3" />
            {festival.region}
          </div>
        )}
      </div>
    </div>
  );
}

function MonthSection({
  month,
  festivals,
  defaultOpen,
}: {
  month: string;
  festivals: Festival[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-t-lg bg-gradient-to-r from-orange-50 to-white px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-[#FF6600]" />
          <span className="text-sm font-bold text-gray-900">{month}</span>
          <span className="rounded-full bg-[#FF6600] px-2 py-0.5 text-[10px] font-bold text-white">
            {festivals.length}
          </span>
        </div>
        {open ? (
          <ChevronUp className="size-4 text-gray-400" />
        ) : (
          <ChevronDown className="size-4 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          {festivals.map((f) => (
            <FestivalCard key={`${f.name}-${f.date}`} festival={f} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FestivalsPage() {
  const [year, setYear] = React.useState(2026);
  const [filterType, setFilterType] = React.useState<FestivalType | "all">("all");
  const [search, setSearch] = React.useState("");

  const allFestivals = React.useMemo(() => getFestivalsForYear(year), [year]);

  const filtered = React.useMemo(() => {
    let list = allFestivals;
    if (filterType !== "all") {
      list = list.filter((f) => f.type === filterType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allFestivals, filterType, search]);

  const grouped = React.useMemo(() => groupByMonth(filtered), [filtered]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FF6600]">Home</Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-800">Indian Festival Calendar</span>
      </nav>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className="text-[#FF6600]">Indian Festival Calendar</span> — {year}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
          Complete list of Indian festivals, holidays, and important dates for {year}.
          Includes Hindu, Sikh, Buddhist, Jain, Christian, and national holidays with
          dates calculated using the traditional lunar (Panchang) calendar.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 lg:w-[70%]">
          {/* Controls Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-orange-200 bg-orange-50/50 p-3">
            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-gray-700">Year:</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="h-8 rounded border border-gray-300 bg-white px-2 text-sm font-semibold text-[#FF6600] focus:border-[#FF6600] focus:outline-none focus:ring-1 focus:ring-orange-200"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="size-3.5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FestivalType | "all")}
                className="h-8 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-[#FF6600] focus:outline-none focus:ring-1 focus:ring-orange-200"
              >
                <option value="all">All Types</option>
                {(Object.keys(TYPE_LABELS) as FestivalType[]).map((t) => (
                  <option key={t} value={t}>{TYPE_LABELS[t]}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search festivals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full min-w-[160px] rounded border border-gray-300 bg-white pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-1 focus:ring-orange-200"
              />
            </div>

            {/* Count */}
            <span className="shrink-0 text-xs font-medium text-gray-500">
              {filtered.length} festivals
            </span>
          </div>

          {/* Festival List by Month */}
          {grouped.length > 0 ? (
            <div className="space-y-3">
              {grouped.map((g, idx) => (
                <MonthSection
                  key={g.month}
                  month={g.month}
                  festivals={g.festivals}
                  defaultOpen={idx < 3}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-sm text-gray-500">No festivals found matching your filters.</p>
            </div>
          )}

          {/* Year Navigation */}
          <div className="mt-6 flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/50 p-3">
            <button
              onClick={() => setYear(Math.max(2026, year - 1))}
              disabled={year <= 2026}
              className="rounded px-3 py-1.5 text-sm font-semibold text-[#FF6600] hover:bg-white disabled:opacity-40"
            >
              &larr; {year - 1}
            </button>
            <span className="text-sm font-bold text-gray-900">{year}</span>
            <button
              onClick={() => setYear(Math.min(2099, year + 1))}
              disabled={year >= 2099}
              className="rounded px-3 py-1.5 text-sm font-semibold text-[#FF6600] hover:bg-white disabled:opacity-40"
            >
              {year + 1} &rarr;
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-5 lg:w-[300px] lg:shrink-0">
          {/* Quick Year Jump */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Quick Year Jump</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3">
              {[2026, 2027, 2028, 2029, 2030, 2035, 2040, 2050, 2060, 2070, 2080, 2090, 2099].map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                    year === y
                      ? "bg-[#FF6600] text-white"
                      : "bg-orange-50 text-gray-700 hover:bg-orange-100"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Types Legend */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Festival Types</h3>
            </div>
            <div className="space-y-1.5 p-3">
              {(Object.entries(TYPE_LABELS) as [FestivalType, string][]).map(([type, label]) => {
                const colors = TYPE_COLORS[type];
                const count = allFestivals.filter((f) => f.type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(filterType === type ? "all" : type)}
                    className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors hover:bg-orange-50 ${
                      filterType === type ? "ring-1 ring-[#FF6600]" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 font-semibold ${colors.bg} ${colors.text}`}>
                        {label}
                      </span>
                    </span>
                    <span className="font-bold text-gray-500">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">About This Calendar</h3>
            </div>
            <div className="space-y-2 p-4 text-sm leading-relaxed text-gray-600">
              <p>
                Festival dates for Hindu, Sikh, Buddhist, and Jain festivals are
                calculated using the traditional Panchang (Hindu lunar calendar)
                system based on astronomical moon-phase algorithms.
              </p>
              <p>
                Lunar festival dates may vary by ±1 day depending on local moonrise
                times and regional traditions. For precise muhurat timings, consult
                a local pandit or panchang.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Related Pages</h3>
            </div>
            <div className="p-2">
              {[
                { label: "Today's Panchang", href: "/panchang" },
                { label: "Daily Horoscope", href: "/horoscopes" },
                { label: "Free Kundli", href: "/birth-chart/new" },
                { label: "Horoscope Matching", href: "/compatibility" },
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
