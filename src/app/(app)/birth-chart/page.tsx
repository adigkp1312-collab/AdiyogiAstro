"use client";

import Link from "next/link";
import { Circle, Plus, Eye, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SavedChart {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  sunSign: string;
  sunSymbol: string;
}

const sampleCharts: SavedChart[] = [
  {
    id: "chart-1",
    name: "My Birth Chart",
    birthDate: "1995-06-15",
    birthTime: "14:30",
    birthPlace: "New York, NY",
    sunSign: "Gemini",
    sunSymbol: "\u264A",
  },
  {
    id: "chart-2",
    name: "Partner's Chart",
    birthDate: "1993-11-02",
    birthTime: "08:15",
    birthPlace: "Los Angeles, CA",
    sunSign: "Scorpio",
    sunSymbol: "\u264F",
  },
  {
    id: "chart-3",
    name: "Mom's Chart",
    birthDate: "1968-03-21",
    birthTime: "22:45",
    birthPlace: "Chicago, IL",
    sunSign: "Aries",
    sunSymbol: "\u2648",
  },
];

export default function BirthChartListPage() {
  const charts = sampleCharts; // Replace with real data later

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Circle className="size-8 text-amber-400" />
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Birth Charts
            </h1>
          </div>
          <p className="text-slate-400">
            View and manage your saved natal charts. Each chart maps the
            celestial positions at the moment of birth.
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500"
          render={<Link href="/birth-chart/new" />}
        >
          <Plus className="size-4" />
          Create New Chart
        </Button>
      </div>

      {/* Charts Grid */}
      {charts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-6 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/15 text-2xl ring-1 ring-indigo-500/20">
                  {chart.sunSymbol}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-white">{chart.name}</h3>
                  <Badge className="mt-1 w-fit bg-indigo-500/15 text-indigo-400">
                    {chart.sunSign} Sun
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-slate-500" />
                  <span>
                    {new Date(chart.birthDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {" at "}
                    {chart.birthTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-slate-500" />
                  <span>{chart.birthPlace}</span>
                </div>
              </div>

              {/* Action */}
              <Button
                variant="outline"
                className="mt-auto gap-2 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
                render={<Link href={`/birth-chart/${chart.id}`} />}
              >
                <Eye className="size-4" />
                View Chart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-white/10 py-20">
          <div className="flex size-20 items-center justify-center rounded-full bg-slate-800 text-4xl">
            &#x2609;
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              No birth charts yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              Create your first natal chart to discover the unique celestial
              blueprint that was written in the stars at the moment of your
              birth.
            </p>
          </div>
          <Button
            className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500"
            size="lg"
            render={<Link href="/birth-chart/new" />}
          >
            <Plus className="size-4" />
            Create Your First Chart
          </Button>
        </div>
      )}
    </div>
  );
}
