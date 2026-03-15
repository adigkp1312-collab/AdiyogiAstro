import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";

const articles = [
  {
    title: "Mercury Rise In Aquarius: Effects & Predictions For All Signs",
    date: "March 12, 2026",
    category: "Planetary Transit",
  },
  {
    title: "Weekly Horoscope March 9-15, 2026: What The Stars Have In Store",
    date: "March 9, 2026",
    category: "Weekly Horoscope",
  },
  {
    title: "Saturn In Pisces 2026: Career & Financial Impact Analysis",
    date: "March 11, 2026",
    category: "Saturn Transit",
  },
  {
    title: "Holi 2026: Auspicious Timings, Puja Vidhi & Astrological Significance",
    date: "March 10, 2026",
    category: "Festival",
  },
  {
    title: "Venus Retrograde 2026: How It Affects Your Love Life",
    date: "March 8, 2026",
    category: "Venus Transit",
  },
  {
    title: "Numerology Predictions For March 2026: Your Lucky Numbers Revealed",
    date: "March 7, 2026",
    category: "Numerology",
  },
  {
    title: "Full Moon In Virgo March 2026: Emotional Healing & Transformation",
    date: "March 6, 2026",
    category: "Moon Phase",
  },
  {
    title: "Jupiter-Neptune Conjunction: Spiritual Awakening & Opportunities",
    date: "March 5, 2026",
    category: "Planetary Aspect",
  },
  {
    title: "Rahu-Ketu Transit 2026: Major Life Changes For All Moon Signs",
    date: "March 4, 2026",
    category: "Rahu-Ketu",
  },
  {
    title: "Best Gemstones To Wear In March 2026 Based On Your Birth Chart",
    date: "March 3, 2026",
    category: "Gemstones",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#FF6600] pb-2">
          <div className="flex items-center gap-2">
            <Newspaper className="size-5 text-[#FF6600]" />
            <h2 className="text-xl font-bold text-[#FF6600] sm:text-2xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm font-semibold text-[#FF6600] transition-colors hover:text-orange-700"
          >
            View All Articles
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {/* Articles List */}
        <div className="overflow-hidden rounded-lg border border-orange-200 bg-white">
          {articles.map((article, index) => (
            <Link
              key={article.title}
              href="/blog"
              className={`flex items-start gap-3 border-b border-orange-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-orange-50 ${
                index % 2 === 0 ? "bg-white" : "bg-amber-50/40"
              }`}
            >
              <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#FF6600]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 hover:text-[#FF6600]">
                  {article.title}
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-[#FF6600]">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 rounded-md border border-[#FF6600] px-5 py-2 text-sm font-semibold text-[#FF6600] transition-colors hover:bg-[#FF6600] hover:text-white"
          >
            View All Articles
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
