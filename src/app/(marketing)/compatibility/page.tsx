"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceAutocomplete } from "@/components/shared/place-autocomplete";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

interface PersonForm {
  name: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  place: string;
  latitude: number | null;
  longitude: number | null;
}

const emptyPerson: PersonForm = {
  name: "",
  day: "",
  month: "",
  year: "",
  hour: "",
  minute: "",
  place: "",
  latitude: null,
  longitude: null,
};

interface PersonSummary {
  sunSign: string;
  moonSign: string;
  ascendant: string;
}

interface CompatibilityCategory {
  label: string;
  score: number;
  description: string;
}

interface CompatibilityResult {
  compatibility: {
    overallScore: number;
    categories: {
      emotional: CompatibilityCategory;
      communication: CompatibilityCategory;
      passion: CompatibilityCategory;
      overall: CompatibilityCategory;
    };
    crossAspects: Array<{
      planet1: string;
      planet2: string;
      type: string;
      angle: number;
      orb: number;
    }>;
  };
  person1Summary: PersonSummary;
  person2Summary: PersonSummary;
}

const faqs = [
  {
    q: "What is Horoscope Matching (Kundli Milan)?",
    a: "Horoscope matching, also known as Kundli Milan or Gun Milan, is a traditional Vedic astrology practice used to assess compatibility between two individuals, especially before marriage. It examines how their birth charts align across emotional, communication, passion, and long-term potential dimensions.",
  },
  {
    q: "How is compatibility calculated?",
    a: "Our compatibility calculator analyzes both birth charts by comparing planetary positions, sign elements (Fire, Earth, Air, Water), sign qualities (Cardinal, Fixed, Mutable), and cross-chart aspects between key planets like Sun, Moon, Venus, Mars, and Mercury. Each category is scored and weighted to produce an overall compatibility percentage.",
  },
  {
    q: "What does the Emotional Compatibility score mean?",
    a: "The emotional compatibility score measures how well two people connect on an emotional and nurturing level. It primarily examines the Moon-Moon relationship (how your emotional natures align), Moon-Sun cross aspects (how emotions interact with core identity), and the element compatibility of both Moons.",
  },
  {
    q: "What does the Passion score indicate?",
    a: "The passion score reflects the physical and romantic chemistry between two people. It evaluates the Venus-Mars cross aspects (romantic and physical attraction), Sun-Sun element compatibility (core energy alignment), and Mars-Mars relationship (how your drives and desires interact).",
  },
  {
    q: "Is a low score a bad sign?",
    a: "Not necessarily. A lower score indicates areas where more conscious effort and communication may be needed. Many successful relationships have challenging aspects that promote growth and transformation. The scores should be seen as a guide for understanding dynamics, not as a definitive judgment.",
  },
];

function ScoreCircle({ score, size = 160 }: { score: number; size?: number }) {
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const center = size / 2;

  let color = "#ef4444"; // red for low
  if (score >= 70) color = "#22c55e"; // green for high
  else if (score >= 50) color = "#f59e0b"; // amber for medium

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth="10"
          stroke="#fed7aa"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth="10"
          stroke={color}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-900">{score}%</span>
        <span className="text-xs font-medium text-gray-500">Overall Match</span>
      </div>
    </div>
  );
}

function CategoryBar({ label, score, colorClass }: { label: string; score: number; colorClass: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function PersonFormSection({
  label,
  person,
  onChange,
  icon,
}: {
  label: string;
  person: PersonForm;
  onChange: (p: PersonForm) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-2 border-b-2 border-[#FF6600] pb-1.5">
        {icon}
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF6600]">
          {label}
        </h3>
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-700">Name</label>
        <Input
          type="text"
          placeholder="Enter name"
          value={person.name}
          onChange={(e) => onChange({ ...person, name: e.target.value })}
          className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-700">Date of Birth</label>
        <div className="grid grid-cols-3 gap-1.5">
          <select
            value={person.day}
            onChange={(e) => onChange({ ...person, day: e.target.value })}
            className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={person.month}
            onChange={(e) => onChange({ ...person, month: e.target.value })}
            className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
          >
            <option value="">Month</option>
            {months.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Year"
            value={person.year}
            onChange={(e) => onChange({ ...person, year: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/30"
          />
        </div>
      </div>

      {/* Time of Birth */}
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-700">Time of Birth</label>
        <div className="grid grid-cols-2 gap-1.5">
          <select
            value={person.hour}
            onChange={(e) => onChange({ ...person, hour: e.target.value })}
            className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
          >
            <option value="">Hrs</option>
            {hours.map((h) => (
              <option key={h} value={h}>{h.toString().padStart(2, "0")}</option>
            ))}
          </select>
          <select
            value={person.minute}
            onChange={(e) => onChange({ ...person, minute: e.target.value })}
            className="h-9 rounded border border-gray-300 bg-white px-2 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
          >
            <option value="">Min</option>
            {minutes.map((m) => (
              <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Birth Place */}
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-700">Birth Place</label>
        <PlaceAutocomplete
          value={person.place}
          onChange={(val) => {
            onChange({
              ...person,
              place: val,
              ...(val !== person.place ? { latitude: null, longitude: null } : {}),
            });
          }}
          onPlaceSelect={(place) => {
            onChange({
              ...person,
              place: place.name,
              latitude: place.latitude,
              longitude: place.longitude,
            });
          }}
          placeholder="Enter birth place"
          className="h-9"
        />
        {person.latitude !== null && person.longitude !== null && (
          <p className="mt-1 text-xs text-green-600">
            Location found: {person.latitude.toFixed(2)}°, {person.longitude.toFixed(2)}°
          </p>
        )}
      </div>
    </div>
  );
}

export default function CompatibilityPage() {
  const [person1, setPerson1] = React.useState<PersonForm>({ ...emptyPerson });
  const [person2, setPerson2] = React.useState<PersonForm>({ ...emptyPerson });
  const [result, setResult] = React.useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const resultRef = React.useRef<HTMLDivElement>(null);

  function isPersonValid(p: PersonForm): boolean {
    return !!(p.day && p.month && p.year && p.hour !== "" && p.minute !== "" && p.latitude !== null && p.longitude !== null);
  }

  async function handleCalculate() {
    if (!isPersonValid(person1) || !isPersonValid(person2)) {
      setError("Please fill in all birth details for both persons, including selecting a birth place from the dropdown.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formatDate = (p: PersonForm) =>
        `${p.year}-${p.month.padStart(2, "0")}-${p.day.padStart(2, "0")}`;
      const formatTime = (p: PersonForm) =>
        `${p.hour.padStart(2, "0")}:${p.minute.padStart(2, "0")}`;

      const res = await fetch("/api/compatibility/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person1: {
            date: formatDate(person1),
            time: formatTime(person1),
            latitude: person1.latitude,
            longitude: person1.longitude,
          },
          person2: {
            date: formatDate(person2),
            time: formatTime(person2),
            latitude: person2.latitude,
            longitude: person2.longitude,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to calculate compatibility");
      }

      const data: CompatibilityResult = await res.json();
      setResult(data);

      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FF6600]">Home</Link>
        <span className="mx-1">&gt;</span>
        <span className="font-medium text-gray-800">Horoscope Matching</span>
      </nav>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className="text-[#FF6600]">Horoscope Matching</span> — Kundli Milan
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
          Check the astrological compatibility between two people based on their birth
          charts. Our calculator analyzes emotional connection, communication style,
          passion, and overall harmony using Vedic and Western astrology techniques.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 lg:w-[70%]">
          {/* Input Forms */}
          <div className="mb-6 rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-5 py-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-white">
                <Heart className="size-5" />
                Enter Birth Details
              </h2>
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <PersonFormSection
                  label="Person 1 (Boy)"
                  person={person1}
                  onChange={setPerson1}
                  icon={<User className="size-4 text-[#FF6600]" />}
                />
                <PersonFormSection
                  label="Person 2 (Girl)"
                  person={person2}
                  onChange={setPerson2}
                  icon={<User className="size-4 text-[#FF6600]" />}
                />
              </div>

              {error && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button
                type="button"
                onClick={handleCalculate}
                disabled={loading}
                className="mt-5 h-11 w-full rounded-md bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-base font-bold text-white shadow-md hover:from-[#e65c00] hover:to-[#e07800] hover:shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="size-5" />
                    CHECK COMPATIBILITY
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div ref={resultRef} className="space-y-6">
              {/* Person Summaries */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-sm font-bold text-[#FF6600]">
                    {person1.name || "Person 1"}&apos;s Chart
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sun Sign</span>
                      <span className="font-semibold text-gray-900">{result.person1Summary.sunSign}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moon Sign</span>
                      <span className="font-semibold text-gray-900">{result.person1Summary.moonSign}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ascendant</span>
                      <span className="font-semibold text-gray-900">{result.person1Summary.ascendant}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-sm font-bold text-[#FF6600]">
                    {person2.name || "Person 2"}&apos;s Chart
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sun Sign</span>
                      <span className="font-semibold text-gray-900">{result.person2Summary.sunSign}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moon Sign</span>
                      <span className="font-semibold text-gray-900">{result.person2Summary.moonSign}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ascendant</span>
                      <span className="font-semibold text-gray-900">{result.person2Summary.ascendant}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
                <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
                  <h2 className="text-base font-bold text-white">
                    Compatibility Score
                  </h2>
                </div>
                <div className="flex flex-col items-center gap-4 p-6">
                  <ScoreCircle score={result.compatibility.overallScore} />
                  <p className="max-w-lg text-center text-sm leading-relaxed text-gray-600">
                    {result.compatibility.categories.overall.description}
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
                <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
                  <h2 className="text-base font-bold text-white">
                    Category Breakdown
                  </h2>
                </div>
                <div className="space-y-5 p-5">
                  <CategoryBar
                    label="Emotional Connection"
                    score={result.compatibility.categories.emotional.score}
                    colorClass="bg-gradient-to-r from-pink-400 to-rose-500"
                  />
                  <p className="text-xs leading-relaxed text-gray-500">{result.compatibility.categories.emotional.description}</p>

                  <CategoryBar
                    label="Communication"
                    score={result.compatibility.categories.communication.score}
                    colorClass="bg-gradient-to-r from-sky-400 to-cyan-500"
                  />
                  <p className="text-xs leading-relaxed text-gray-500">{result.compatibility.categories.communication.description}</p>

                  <CategoryBar
                    label="Passion & Attraction"
                    score={result.compatibility.categories.passion.score}
                    colorClass="bg-gradient-to-r from-orange-400 to-red-500"
                  />
                  <p className="text-xs leading-relaxed text-gray-500">{result.compatibility.categories.passion.description}</p>
                </div>
              </div>

              {/* Cross Aspects */}
              {result.compatibility.crossAspects.length > 0 && (
                <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
                  <div className="rounded-t-md bg-[#FF6600] px-5 py-3">
                    <h2 className="text-base font-bold text-white">
                      Cross-Chart Aspects
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-orange-50">
                          <th className="border-b border-orange-200 px-4 py-2.5 text-left font-semibold text-gray-700">Person 1</th>
                          <th className="border-b border-orange-200 px-4 py-2.5 text-left font-semibold text-gray-700">Aspect</th>
                          <th className="border-b border-orange-200 px-4 py-2.5 text-left font-semibold text-gray-700">Person 2</th>
                          <th className="border-b border-orange-200 px-4 py-2.5 text-right font-semibold text-gray-700">Orb</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.compatibility.crossAspects.slice(0, 15).map((aspect, idx) => {
                          const isHarmonious = ["Trine", "Sextile", "Conjunction"].includes(aspect.type);
                          return (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/50"}>
                              <td className="border-b border-orange-100 px-4 py-2 capitalize text-gray-800">{aspect.planet1}</td>
                              <td className={`border-b border-orange-100 px-4 py-2 font-medium ${isHarmonious ? "text-green-700" : "text-red-600"}`}>
                                {aspect.type}
                              </td>
                              <td className="border-b border-orange-100 px-4 py-2 capitalize text-gray-800">{aspect.planet2}</td>
                              <td className="border-b border-orange-100 px-4 py-2 text-right text-gray-600">{aspect.orb.toFixed(1)}°</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FAQ Section */}
          <div className="mb-8 mt-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-[#FF6600] pb-2">
              <h2 className="text-xl font-bold text-[#FF6600]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="size-4 shrink-0 text-[#FF6600]" />
                    ) : (
                      <ChevronDown className="size-4 shrink-0 text-gray-400" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-gray-100 px-4 py-3">
                      <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-6 lg:w-[300px] lg:shrink-0">
          {/* About Matching */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">About Kundli Matching</h3>
            </div>
            <div className="space-y-2 p-4 text-sm leading-relaxed text-gray-600">
              <p>
                Kundli matching is a time-honored tradition in Vedic astrology
                that compares two birth charts to determine compatibility for
                marriage and partnership.
              </p>
              <p>
                Our system analyzes planetary positions, elements, qualities,
                and cross-chart aspects to provide a comprehensive compatibility
                report across emotional, communication, and passion dimensions.
              </p>
            </div>
          </div>

          {/* Related Services */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Related Services</h3>
            </div>
            <div className="p-2">
              {[
                { label: "Free Kundli", href: "/birth-chart/new" },
                { label: "Daily Horoscope", href: "/horoscopes" },
                { label: "Today's Panchang", href: "/panchang" },
                { label: "Planetary Transits", href: "/transits" },
                { label: "Astrology Blog", href: "/blog" },
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

          {/* Score Guide */}
          <div className="rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="rounded-t-md bg-[#FF6600] px-4 py-2.5">
              <h3 className="text-sm font-bold text-white">Score Guide</h3>
            </div>
            <div className="space-y-2 p-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-gray-700">70-100% — Highly Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-gray-700">50-69% — Good Match</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-gray-700">Below 50% — Needs Effort</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
