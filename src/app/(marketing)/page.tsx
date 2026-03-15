import Link from "next/link";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { TrendingProducts } from "@/components/marketing/trending-products";

const zodiacSigns = [
  { symbol: "\u2648", name: "Aries", dates: "Mar 21 - Apr 19", href: "/horoscopes/aries" },
  { symbol: "\u2649", name: "Taurus", dates: "Apr 20 - May 20", href: "/horoscopes/taurus" },
  { symbol: "\u264A", name: "Gemini", dates: "May 21 - Jun 20", href: "/horoscopes/gemini" },
  { symbol: "\u264B", name: "Cancer", dates: "Jun 21 - Jul 22", href: "/horoscopes/cancer" },
  { symbol: "\u264C", name: "Leo", dates: "Jul 23 - Aug 22", href: "/horoscopes/leo" },
  { symbol: "\u264D", name: "Virgo", dates: "Aug 23 - Sep 22", href: "/horoscopes/virgo" },
  { symbol: "\u264E", name: "Libra", dates: "Sep 23 - Oct 22", href: "/horoscopes/libra" },
  { symbol: "\u264F", name: "Scorpio", dates: "Oct 23 - Nov 21", href: "/horoscopes/scorpio" },
  { symbol: "\u2650", name: "Sagittarius", dates: "Nov 22 - Dec 21", href: "/horoscopes/sagittarius" },
  { symbol: "\u2651", name: "Capricorn", dates: "Dec 22 - Jan 19", href: "/horoscopes/capricorn" },
  { symbol: "\u2652", name: "Aquarius", dates: "Jan 20 - Feb 18", href: "/horoscopes/aquarius" },
  { symbol: "\u2653", name: "Pisces", dates: "Feb 19 - Mar 20", href: "/horoscopes/pisces" },
];

function ZodiacStrip() {
  return (
    <section className="border-y border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#FF6600] sm:text-xl">
            Daily Horoscope - March 12, 2026
          </h2>
          <Link
            href="/horoscopes"
            className="text-sm font-semibold text-[#FF6600] hover:text-orange-700"
          >
            View All Horoscopes &rarr;
          </Link>
        </div>

        {/* Zodiac Cards - horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-6 sm:overflow-visible lg:grid-cols-12">
          {zodiacSigns.map((sign) => (
            <Link
              key={sign.name}
              href={sign.href}
              className="flex min-w-[100px] shrink-0 flex-col items-center rounded-lg border border-orange-200 bg-white px-3 py-3 shadow-sm transition-all hover:border-[#FF6600] hover:shadow-md sm:min-w-0"
            >
              <span className="text-2xl sm:text-3xl">{sign.symbol}</span>
              <span className="mt-1 text-xs font-bold text-gray-800">
                {sign.name}
              </span>
              <span className="mt-0.5 text-[10px] text-gray-500">
                {sign.dates}
              </span>
              <span className="mt-1.5 text-[11px] font-semibold text-[#FF6600]">
                Read More &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ZodiacStrip />
      <Features />
      <Testimonials />
      <PricingCards />
      <TrendingProducts />
    </>
  );
}
