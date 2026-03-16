"use client";

import { useState } from "react";
import { Gem, Star, Shield, Heart, Sparkles, Sun, Moon, Zap } from "lucide-react";

/* ── Zodiac-to-Gemstone mapping (Vedic Astrology based on Rashi Lord) ── */
const gemstoneData: Record<string, {
  primary: { name: string; nameHi: string; planet: string; color: string; benefits: string[]; mantra: string; finger: string; metal: string; weight: string; day: string };
  secondary: { name: string; nameHi: string; color: string; benefits: string[] }[];
  avoid: string[];
}> = {
  Aries: {
    primary: { name: "Red Coral (Moonga)", nameHi: "मूंगा", planet: "Mars", color: "bg-red-500", benefits: ["Boosts courage & confidence", "Protects from enemies", "Improves health & vitality", "Overcomes debts & obstacles"], mantra: "Om Ang Angarakaya Namah", finger: "Ring Finger", metal: "Gold or Copper", weight: "5-9 Carats", day: "Tuesday" },
    secondary: [{ name: "Yellow Sapphire", nameHi: "पुखराज", color: "bg-yellow-400", benefits: ["Wisdom & prosperity", "Good fortune in education"] }, { name: "Ruby", nameHi: "माणिक्य", color: "bg-red-600", benefits: ["Leadership qualities", "Government favor"] }],
    avoid: ["Blue Sapphire", "Diamond", "Emerald"],
  },
  Taurus: {
    primary: { name: "Diamond (Heera)", nameHi: "हीरा", planet: "Venus", color: "bg-cyan-200", benefits: ["Attracts love & luxury", "Enhances creativity", "Brings wealth & prosperity", "Improves relationships"], mantra: "Om Shum Shukraya Namah", finger: "Middle Finger", metal: "Silver or Platinum", weight: "0.5-1 Carat", day: "Friday" },
    secondary: [{ name: "Opal", nameHi: "ओपल", color: "bg-purple-200", benefits: ["Creative inspiration", "Emotional balance"] }, { name: "White Sapphire", nameHi: "सफ़ेद पुखराज", color: "bg-gray-100", benefits: ["Clarity of thought", "Spiritual growth"] }],
    avoid: ["Ruby", "Red Coral", "Yellow Sapphire"],
  },
  Gemini: {
    primary: { name: "Emerald (Panna)", nameHi: "पन्ना", planet: "Mercury", color: "bg-emerald-500", benefits: ["Sharpens intellect & communication", "Success in business", "Improves speech & writing", "Mental peace & clarity"], mantra: "Om Bum Budhaya Namah", finger: "Little Finger", metal: "Gold", weight: "3-6 Carats", day: "Wednesday" },
    secondary: [{ name: "Green Tourmaline", nameHi: "हरा पन्ना", color: "bg-green-400", benefits: ["Calms nervous energy", "Promotes healing"] }, { name: "Peridot", nameHi: "पेरिडॉट", color: "bg-lime-400", benefits: ["Reduces stress", "Attracts abundance"] }],
    avoid: ["Red Coral", "Yellow Sapphire"],
  },
  Cancer: {
    primary: { name: "Pearl (Moti)", nameHi: "मोती", planet: "Moon", color: "bg-gray-100", benefits: ["Emotional balance & peace", "Improves mental health", "Strengthens relationships", "Enhances intuition"], mantra: "Om Som Somaya Namah", finger: "Little Finger", metal: "Silver", weight: "4-6 Carats", day: "Monday" },
    secondary: [{ name: "Moonstone", nameHi: "चंद्रमणि", color: "bg-blue-100", benefits: ["Calms emotions", "Enhances feminine energy"] }, { name: "White Coral", nameHi: "सफ़ेद मूंगा", color: "bg-orange-100", benefits: ["Physical strength", "Protection from negativity"] }],
    avoid: ["Blue Sapphire", "Diamond"],
  },
  Leo: {
    primary: { name: "Ruby (Manik)", nameHi: "माणिक्य", planet: "Sun", color: "bg-red-600", benefits: ["Leadership & authority", "Government favor & fame", "Boosts self-confidence", "Improves father relations"], mantra: "Om Hram Hreem Hroum Sah Suryaya Namah", finger: "Ring Finger", metal: "Gold", weight: "3-6 Carats", day: "Sunday" },
    secondary: [{ name: "Red Garnet", nameHi: "लाल गोमेद", color: "bg-red-700", benefits: ["Energy & passion", "Career success"] }, { name: "Red Spinel", nameHi: "लाल स्पिनेल", color: "bg-rose-600", benefits: ["Vitality & courage", "Positive energy"] }],
    avoid: ["Blue Sapphire", "Diamond", "Emerald"],
  },
  Virgo: {
    primary: { name: "Emerald (Panna)", nameHi: "पन्ना", planet: "Mercury", color: "bg-emerald-500", benefits: ["Analytical thinking", "Business success", "Better communication skills", "Academic excellence"], mantra: "Om Bum Budhaya Namah", finger: "Little Finger", metal: "Gold", weight: "3-6 Carats", day: "Wednesday" },
    secondary: [{ name: "Peridot", nameHi: "पेरिडॉट", color: "bg-lime-400", benefits: ["Healing energy", "Prosperity"] }, { name: "Green Tourmaline", nameHi: "हरा पन्ना", color: "bg-green-400", benefits: ["Mental clarity", "Emotional balance"] }],
    avoid: ["Red Coral", "Ruby"],
  },
  Libra: {
    primary: { name: "Diamond (Heera)", nameHi: "हीरा", planet: "Venus", color: "bg-cyan-200", benefits: ["Harmonious relationships", "Artistic talents", "Luxury & comfort", "Physical beauty & charm"], mantra: "Om Shum Shukraya Namah", finger: "Middle Finger", metal: "Silver or Platinum", weight: "0.5-1 Carat", day: "Friday" },
    secondary: [{ name: "White Sapphire", nameHi: "सफ़ेद पुखराज", color: "bg-gray-100", benefits: ["Wisdom", "Spiritual clarity"] }, { name: "Opal", nameHi: "ओपल", color: "bg-purple-200", benefits: ["Creativity", "Emotional healing"] }],
    avoid: ["Ruby", "Red Coral", "Yellow Sapphire"],
  },
  Scorpio: {
    primary: { name: "Red Coral (Moonga)", nameHi: "मूंगा", planet: "Mars", color: "bg-red-500", benefits: ["Protection from enemies", "Physical strength & stamina", "Overcoming obstacles", "Property & land gains"], mantra: "Om Ang Angarakaya Namah", finger: "Ring Finger", metal: "Gold or Copper", weight: "5-9 Carats", day: "Tuesday" },
    secondary: [{ name: "Yellow Sapphire", nameHi: "पुखराज", color: "bg-yellow-400", benefits: ["Spiritual growth", "Financial prosperity"] }, { name: "Pearl", nameHi: "मोती", color: "bg-gray-100", benefits: ["Emotional stability", "Mental peace"] }],
    avoid: ["Diamond", "Blue Sapphire", "Emerald"],
  },
  Sagittarius: {
    primary: { name: "Yellow Sapphire (Pukhraj)", nameHi: "पुखराज", planet: "Jupiter", color: "bg-yellow-400", benefits: ["Wisdom & knowledge", "Marital bliss", "Wealth & prosperity", "Spiritual advancement"], mantra: "Om Gram Greem Groum Sah Gurave Namah", finger: "Index Finger", metal: "Gold", weight: "3-5 Carats", day: "Thursday" },
    secondary: [{ name: "Citrine", nameHi: "सुनहला", color: "bg-amber-300", benefits: ["Success in career", "Positive energy"] }, { name: "Topaz", nameHi: "पुखराज", color: "bg-yellow-300", benefits: ["Good fortune", "Mental clarity"] }],
    avoid: ["Diamond", "Blue Sapphire", "Emerald"],
  },
  Capricorn: {
    primary: { name: "Blue Sapphire (Neelam)", nameHi: "नीलम", planet: "Saturn", color: "bg-blue-700", benefits: ["Career advancement", "Removes obstacles", "Wealth & property gains", "Protection from evil eye"], mantra: "Om Sham Shanaishcharaya Namah", finger: "Middle Finger", metal: "Silver or Iron", weight: "3-6 Carats", day: "Saturday" },
    secondary: [{ name: "Amethyst", nameHi: "जामुनिया", color: "bg-purple-500", benefits: ["Spiritual awareness", "Calm mind"] }, { name: "Lapis Lazuli", nameHi: "लाजवर्द", color: "bg-blue-800", benefits: ["Wisdom", "Inner truth"] }],
    avoid: ["Ruby", "Red Coral", "Pearl"],
  },
  Aquarius: {
    primary: { name: "Blue Sapphire (Neelam)", nameHi: "नीलम", planet: "Saturn", color: "bg-blue-700", benefits: ["Innovation & originality", "Financial stability", "Career growth", "Social recognition"], mantra: "Om Sham Shanaishcharaya Namah", finger: "Middle Finger", metal: "Silver or Iron", weight: "3-6 Carats", day: "Saturday" },
    secondary: [{ name: "Amethyst", nameHi: "जामुनिया", color: "bg-purple-500", benefits: ["Clarity of vision", "Stress relief"] }, { name: "Turquoise", nameHi: "फ़िरोज़ा", color: "bg-teal-400", benefits: ["Communication", "Protection"] }],
    avoid: ["Ruby", "Red Coral", "Pearl"],
  },
  Pisces: {
    primary: { name: "Yellow Sapphire (Pukhraj)", nameHi: "पुखराज", planet: "Jupiter", color: "bg-yellow-400", benefits: ["Spiritual growth", "Marital happiness", "Financial abundance", "Divine blessings"], mantra: "Om Gram Greem Groum Sah Gurave Namah", finger: "Index Finger", metal: "Gold", weight: "3-5 Carats", day: "Thursday" },
    secondary: [{ name: "Aquamarine", nameHi: "बेरुज", color: "bg-sky-300", benefits: ["Emotional healing", "Courage"] }, { name: "Bloodstone", nameHi: "रक्तमणि", color: "bg-green-800", benefits: ["Physical vitality", "Grounding energy"] }],
    avoid: ["Diamond", "Emerald"],
  },
};

const zodiacSigns = [
  { name: "Aries", nameHi: "मेष", symbol: "♈", dateRange: "Mar 21 - Apr 19" },
  { name: "Taurus", nameHi: "वृषभ", symbol: "♉", dateRange: "Apr 20 - May 20" },
  { name: "Gemini", nameHi: "मिथुन", symbol: "♊", dateRange: "May 21 - Jun 20" },
  { name: "Cancer", nameHi: "कर्क", symbol: "♋", dateRange: "Jun 21 - Jul 22" },
  { name: "Leo", nameHi: "सिंह", symbol: "♌", dateRange: "Jul 23 - Aug 22" },
  { name: "Virgo", nameHi: "कन्या", symbol: "♍", dateRange: "Aug 23 - Sep 22" },
  { name: "Libra", nameHi: "तुला", symbol: "♎", dateRange: "Sep 23 - Oct 22" },
  { name: "Scorpio", nameHi: "वृश्चिक", symbol: "♏", dateRange: "Oct 23 - Nov 21" },
  { name: "Sagittarius", nameHi: "धनु", symbol: "♐", dateRange: "Nov 22 - Dec 21" },
  { name: "Capricorn", nameHi: "मकर", symbol: "♑", dateRange: "Dec 22 - Jan 19" },
  { name: "Aquarius", nameHi: "कुम्भ", symbol: "♒", dateRange: "Jan 20 - Feb 18" },
  { name: "Pisces", nameHi: "मीन", symbol: "♓", dateRange: "Feb 19 - Mar 20" },
];

export default function GemstonesPage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const data = selectedSign ? gemstoneData[selectedSign] : null;
  const sign = zodiacSigns.find((z) => z.name === selectedSign);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-10" style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b3e 40%, #0a2342 70%, #1a0533 100%)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(1px 1px at 20px 30px, white, transparent), radial-gradient(1px 1px at 60px 80px, white, transparent), radial-gradient(1px 1px at 100px 10px, white, transparent), radial-gradient(1.5px 1.5px at 150px 60px, gold, transparent), radial-gradient(1px 1px at 200px 90px, white, transparent)" , backgroundSize: "200px 100px" }} />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5">
            <Gem className="size-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Vedic Gemstone Predictions</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">Gemstone Recommendation</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-300">
            Discover your lucky gemstones based on Vedic astrology. Select your Rashi (zodiac sign) to get personalized gemstone recommendations with wearing instructions and mantras.
          </p>
        </div>
      </section>

      {/* Zodiac Sign Selector */}
      <section className="py-8" style={{ backgroundColor: "#FFF5E6" }}>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
            <Sun className="mb-1 mr-2 inline size-5 text-orange-500" />
            Select Your Rashi (Zodiac Sign)
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {zodiacSigns.map((z) => (
              <button
                key={z.name}
                onClick={() => setSelectedSign(z.name)}
                className={`group flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all hover:scale-105 hover:shadow-lg ${
                  selectedSign === z.name
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "border-orange-200 bg-white text-gray-700 hover:border-orange-400 hover:bg-orange-50"
                }`}
              >
                <span className="text-2xl">{z.symbol}</span>
                <span className="text-[10px] font-bold leading-tight">{z.name}</span>
                <span className="text-[9px] leading-tight opacity-70">{z.nameHi}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      {data && sign && (
        <section className="py-8" style={{ backgroundColor: "#FFF5E6" }}>
          <div className="mx-auto max-w-6xl px-4">
            {/* Header */}
            <div className="mb-8 rounded-2xl border border-orange-200 bg-white p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                  {sign.symbol}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{sign.name} ({sign.nameHi}) - Gemstone Report</h2>
                  <p className="text-sm text-gray-500">{sign.dateRange} | Ruling Planet: {data.primary.planet}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Primary Gemstone */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border-2 border-orange-300 bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex size-12 items-center justify-center rounded-full ${data.primary.color} shadow-lg`}>
                      <Gem className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Primary Gemstone</h3>
                      <p className="text-lg font-semibold text-orange-600">{data.primary.name} ({data.primary.nameHi})</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-5">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
                      <Star className="size-4 text-amber-500" /> Benefits
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {data.primary.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-green-50 p-2.5">
                          <Sparkles className="mt-0.5 size-4 shrink-0 text-green-600" />
                          <span className="text-sm text-gray-700">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wearing Instructions */}
                  <div className="rounded-xl bg-amber-50 p-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                      <Shield className="size-4 text-orange-600" /> Wearing Instructions
                    </h4>
                    <div className="grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-3">
                      <div className="rounded-lg bg-white p-2.5 shadow-sm">
                        <span className="text-xs font-medium text-gray-500">Finger</span>
                        <p className="font-semibold text-gray-800">{data.primary.finger}</p>
                      </div>
                      <div className="rounded-lg bg-white p-2.5 shadow-sm">
                        <span className="text-xs font-medium text-gray-500">Metal</span>
                        <p className="font-semibold text-gray-800">{data.primary.metal}</p>
                      </div>
                      <div className="rounded-lg bg-white p-2.5 shadow-sm">
                        <span className="text-xs font-medium text-gray-500">Weight</span>
                        <p className="font-semibold text-gray-800">{data.primary.weight}</p>
                      </div>
                      <div className="rounded-lg bg-white p-2.5 shadow-sm">
                        <span className="text-xs font-medium text-gray-500">Day to Wear</span>
                        <p className="font-semibold text-gray-800">{data.primary.day}</p>
                      </div>
                      <div className="col-span-full rounded-lg bg-white p-2.5 shadow-sm sm:col-span-2">
                        <span className="text-xs font-medium text-gray-500">Mantra (Chant 108 times)</span>
                        <p className="font-semibold text-orange-700">{data.primary.mantra}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Secondary Gemstones */}
                <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-md">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <Moon className="size-5 text-blue-500" /> Alternative Gemstones
                  </h3>
                  {data.secondary.map((gem, i) => (
                    <div key={i} className="mb-3 rounded-xl border border-gray-100 bg-gray-50 p-3 last:mb-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <div className={`size-4 rounded-full ${gem.color} shadow`} />
                        <span className="font-semibold text-gray-800">{gem.name}</span>
                        <span className="text-xs text-gray-500">({gem.nameHi})</span>
                      </div>
                      <ul className="space-y-1">
                        {gem.benefits.map((b, j) => (
                          <li key={j} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Heart className="size-3 text-pink-400" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Gemstones to Avoid */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-md">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-800">
                    <Zap className="size-5 text-red-500" /> Gemstones to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {data.avoid.map((gem, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-red-700">
                        <span className="flex size-5 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-700">!</span>
                        {gem}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-red-600/80">
                    These gemstones may have adverse effects for {sign.name} ascendant. Consult an astrologer before wearing any gemstone.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
                  <p className="font-semibold">Disclaimer:</p>
                  <p className="mt-1">Gemstone recommendations are based on general Vedic astrology principles. For accurate predictions, consult with our expert astrologers who can analyze your complete birth chart.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* If no sign selected */}
      {!selectedSign && (
        <section className="py-16" style={{ backgroundColor: "#FFF5E6" }}>
          <div className="mx-auto max-w-2xl px-4 text-center">
            <Gem className="mx-auto mb-4 size-16 text-orange-300" />
            <h3 className="mb-2 text-xl font-bold text-gray-700">Select Your Zodiac Sign Above</h3>
            <p className="text-gray-500">Choose your Rashi to get personalized gemstone recommendations based on Vedic astrology principles.</p>
          </div>
        </section>
      )}
    </div>
  );
}
