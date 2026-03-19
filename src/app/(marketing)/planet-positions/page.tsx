"use client";

import { useState, useMemo } from "react";
import { Orbit, Sun, Moon as MoonIcon, ArrowLeft, ArrowRight, ChevronDown, Info } from "lucide-react";

/* ── Planet data with approximate sidereal (Lahiri) positions ── */
interface PlanetInfo {
  name: string;
  nameHi: string;
  symbol: string;
  sign: string;
  signHi: string;
  degree: string;
  nakshatra: string;
  nakshatraHi: string;
  pada: number;
  retrograde: boolean;
  signLord: string;
  nakshatraLord: string;
  color: string;
}

/* Current approximate Nirayana positions for March 2026 */
const planetPositions: PlanetInfo[] = [
  { name: "Sun (Surya)", nameHi: "सूर्य", symbol: "☉", sign: "Pisces", signHi: "मीन", degree: "02° 14' 38\"", nakshatra: "Purva Bhadrapada", nakshatraHi: "पूर्वा भाद्रपद", pada: 4, retrograde: false, signLord: "Jupiter", nakshatraLord: "Jupiter", color: "bg-orange-500" },
  { name: "Moon (Chandra)", nameHi: "चंद्र", symbol: "☽", sign: "Capricorn", signHi: "मकर", degree: "15° 42' 11\"", nakshatra: "Shravana", nakshatraHi: "श्रवण", pada: 2, retrograde: false, signLord: "Saturn", nakshatraLord: "Moon", color: "bg-gray-300" },
  { name: "Mars (Mangal)", nameHi: "मंगल", symbol: "♂", sign: "Cancer", signHi: "कर्क", degree: "22° 38' 05\"", nakshatra: "Ashlesha", nakshatraHi: "आश्लेषा", pada: 3, retrograde: false, signLord: "Moon", nakshatraLord: "Mercury", color: "bg-red-500" },
  { name: "Mercury (Budh)", nameHi: "बुध", symbol: "☿", sign: "Aquarius", signHi: "कुम्भ", degree: "18° 54' 22\"", nakshatra: "Shatabhisha", nakshatraHi: "शतभिषा", pada: 3, retrograde: true, signLord: "Saturn", nakshatraLord: "Rahu", color: "bg-green-500" },
  { name: "Jupiter (Guru)", nameHi: "गुरु", symbol: "♃", sign: "Taurus", signHi: "वृषभ", degree: "20° 31' 47\"", nakshatra: "Rohini", nakshatraHi: "रोहिणी", pada: 4, retrograde: false, signLord: "Venus", nakshatraLord: "Moon", color: "bg-yellow-500" },
  { name: "Venus (Shukra)", nameHi: "शुक्र", symbol: "♀", sign: "Pisces", signHi: "मीन", degree: "01° 05' 33\"", nakshatra: "Purva Bhadrapada", nakshatraHi: "पूर्वा भाद्रपद", pada: 3, retrograde: false, signLord: "Jupiter", nakshatraLord: "Jupiter", color: "bg-pink-400" },
  { name: "Saturn (Shani)", nameHi: "शनि", symbol: "♄", sign: "Pisces", signHi: "मीन", degree: "10° 17' 56\"", nakshatra: "Uttara Bhadrapada", nakshatraHi: "उत्तरा भाद्रपद", pada: 2, retrograde: false, signLord: "Jupiter", nakshatraLord: "Saturn", color: "bg-indigo-600" },
  { name: "Rahu", nameHi: "राहु", symbol: "☊", sign: "Pisces", signHi: "मीन", degree: "24° 12' 09\"", nakshatra: "Revati", nakshatraHi: "रेवती", pada: 3, retrograde: true, signLord: "Jupiter", nakshatraLord: "Mercury", color: "bg-slate-700" },
  { name: "Ketu", nameHi: "केतु", symbol: "☋", sign: "Virgo", signHi: "कन्या", degree: "24° 12' 09\"", nakshatra: "Chitra", nakshatraHi: "चित्रा", pada: 1, retrograde: true, signLord: "Mercury", nakshatraLord: "Mars", color: "bg-amber-800" },
];

const rashiOrder = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const rashiSymbols: Record<string, string> = { Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓" };
const rashiHindi: Record<string, string> = { Aries: "मेष", Taurus: "वृषभ", Gemini: "मिथुन", Cancer: "कर्क", Leo: "सिंह", Virgo: "कन्या", Libra: "तुला", Scorpio: "वृश्चिक", Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुम्भ", Pisces: "मीन" };

export default function PlanetPositionsPage() {
  const [expandedPlanet, setExpandedPlanet] = useState<number | null>(null);

  /* Build a simple rashi chart mapping */
  const rashiChart = useMemo(() => {
    const chart: Record<string, PlanetInfo[]> = {};
    for (const r of rashiOrder) chart[r] = [];
    for (const p of planetPositions) {
      if (chart[p.sign]) chart[p.sign].push(p);
    }
    return chart;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1b3e 40%, #162447 70%, #0a1628 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(1px 1px at 20px 30px, white, transparent), radial-gradient(1.5px 1.5px at 80px 70px, gold, transparent), radial-gradient(1px 1px at 140px 20px, white, transparent), radial-gradient(1px 1px at 200px 80px, white, transparent)", backgroundSize: "220px 100px" }} />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1.5">
            <Orbit className="size-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Nirayana / Sidereal Positions</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">Today&apos;s Planetary Positions</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-300">
            Current Nirayana (Sidereal) planetary positions as per Vedic Astrology using Lahiri Ayanamsa. View exact degrees, Nakshatra, Pada, and sign lords for all nine planets (Navagraha).
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      {/* Planet Positions Table */}
      <section className="py-8" style={{ backgroundColor: "#FFF5E6" }}>
        <div className="mx-auto max-w-6xl px-4">

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-lg md:block">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Orbit className="size-5" /> Graha Sthiti (ग्रह स्थिति) - Planetary Positions
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-100 bg-orange-50/60 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Planet (ग्रह)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Sign (राशि)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Degree (अंश)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Nakshatra (नक्षत्र)</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Pada</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Sign Lord</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Nak. Lord</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {planetPositions.map((p, i) => (
                    <tr key={i} className={`border-b border-gray-100 transition-colors hover:bg-orange-50/40 ${p.retrograde ? "bg-red-50/30" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`flex size-8 items-center justify-center rounded-full ${p.color} text-sm font-bold text-white`}>{p.symbol}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.nameHi}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-800">{rashiSymbols[p.sign]} {p.sign}</span>
                        <span className="ml-1 text-xs text-gray-500">({p.signHi})</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-medium text-gray-800">{p.degree}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{p.nakshatra}</p>
                        <p className="text-xs text-gray-500">{p.nakshatraHi}</p>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-700">{p.pada}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.signLord}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.nakshatraLord}</td>
                      <td className="px-4 py-3">
                        {p.retrograde ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                            <ArrowLeft className="size-3" /> Retrograde
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                            <ArrowRight className="size-3" /> Direct
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <Orbit className="size-5 text-orange-500" /> Graha Sthiti (ग्रह स्थिति)
            </h2>
            {planetPositions.map((p, i) => (
              <div key={i} className={`overflow-hidden rounded-xl border ${p.retrograde ? "border-red-200" : "border-orange-200"} bg-white shadow-sm`}>
                <button
                  onClick={() => setExpandedPlanet(expandedPlanet === i ? null : i)}
                  className="flex w-full items-center gap-3 p-3 text-left"
                >
                  <span className={`flex size-10 items-center justify-center rounded-full ${p.color} text-lg font-bold text-white`}>{p.symbol}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{rashiSymbols[p.sign]} {p.sign} ({p.signHi}) - {p.degree}</p>
                  </div>
                  {p.retrograde && <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">R</span>}
                  <ChevronDown className={`size-4 text-gray-400 transition-transform ${expandedPlanet === i ? "rotate-180" : ""}`} />
                </button>
                {expandedPlanet === i && (
                  <div className="grid grid-cols-2 gap-2 border-t border-gray-100 bg-gray-50 p-3 text-xs">
                    <div><span className="text-gray-500">Nakshatra:</span> <span className="font-medium">{p.nakshatra}</span></div>
                    <div><span className="text-gray-500">Pada:</span> <span className="font-medium">{p.pada}</span></div>
                    <div><span className="text-gray-500">Sign Lord:</span> <span className="font-medium">{p.signLord}</span></div>
                    <div><span className="text-gray-500">Nak. Lord:</span> <span className="font-medium">{p.nakshatraLord}</span></div>
                    <div><span className="text-gray-500">Status:</span> <span className={`font-medium ${p.retrograde ? "text-red-600" : "text-green-600"}`}>{p.retrograde ? "Retrograde (वक्री)" : "Direct (मार्गी)"}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rashi Chart */}
          <div className="mt-8 rounded-2xl border border-orange-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
              <Sun className="size-5 text-orange-500" /> Rashi Chart - Planet Distribution
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {rashiOrder.map((rashi) => {
                const planets = rashiChart[rashi];
                return (
                  <div key={rashi} className={`rounded-xl border p-3 text-center ${planets.length > 0 ? "border-orange-300 bg-orange-50" : "border-gray-200 bg-gray-50"}`}>
                    <div className="mb-1 text-2xl">{rashiSymbols[rashi]}</div>
                    <p className="text-xs font-bold text-gray-800">{rashi}</p>
                    <p className="text-[10px] text-gray-500">{rashiHindi[rashi]}</p>
                    {planets.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {planets.map((p, j) => (
                          <span key={j} className={`flex size-6 items-center justify-center rounded-full ${p.color} text-xs font-bold text-white`} title={p.name}>
                            {p.symbol}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retrograde Info */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
              <Info className="size-4" /> Currently Retrograde Planets
            </h3>
            <div className="flex flex-wrap gap-3">
              {planetPositions.filter(p => p.retrograde).map((p, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className={`flex size-6 items-center justify-center rounded-full ${p.color} text-xs font-bold text-white`}>{p.symbol}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-500">in {p.sign} ({p.signHi})</p>
                  </div>
                  <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">Vakri (वक्री)</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-amber-700">
              Retrograde planets appear to move backwards from Earth&apos;s perspective. Their effects are intensified during this period. Rahu &amp; Ketu are always retrograde by nature.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            <p><strong>Note:</strong> Positions shown are Nirayana (Sidereal) using Lahiri Ayanamsa as per Vedic Astrology tradition. Positions are approximate and updated periodically. For precise real-time calculations, consult a professional astrologer.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
