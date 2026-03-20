"use client";

import Link from "next/link";

const zodiacSigns = [
  { symbol: "\u2648", name: "Aries", dates: "Mar 21 - Apr 19", element: "Fire", href: "/horoscopes/aries" },
  { symbol: "\u2649", name: "Taurus", dates: "Apr 20 - May 20", element: "Earth", href: "/horoscopes/taurus" },
  { symbol: "\u264A", name: "Gemini", dates: "May 21 - Jun 20", element: "Air", href: "/horoscopes/gemini" },
  { symbol: "\u264B", name: "Cancer", dates: "Jun 21 - Jul 22", element: "Water", href: "/horoscopes/cancer" },
  { symbol: "\u264C", name: "Leo", dates: "Jul 23 - Aug 22", element: "Fire", href: "/horoscopes/leo" },
  { symbol: "\u264D", name: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth", href: "/horoscopes/virgo" },
  { symbol: "\u264E", name: "Libra", dates: "Sep 23 - Oct 22", element: "Air", href: "/horoscopes/libra" },
  { symbol: "\u264F", name: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water", href: "/horoscopes/scorpio" },
  { symbol: "\u2650", name: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire", href: "/horoscopes/sagittarius" },
  { symbol: "\u2651", name: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth", href: "/horoscopes/capricorn" },
  { symbol: "\u2652", name: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air", href: "/horoscopes/aquarius" },
  { symbol: "\u2653", name: "Pisces", dates: "Feb 19 - Mar 20", element: "Water", href: "/horoscopes/pisces" },
];

const elementColors: Record<string, string> = {
  Fire: "var(--color-celestial-gold)",
  Earth: "#6B8E6B",
  Air: "var(--color-celestial-violet)",
  Water: "#5B9BD5",
};

export function ZodiacStripSection() {
  return (
    <section id="zodiac" className="relative bg-[var(--color-cosmos-dark)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.04)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-celestial-gold)]/60">
            The Zodiac Wheel
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find Your <span className="text-shimmer-gold">Celestial Sign</span>
          </h2>
          <p className="mt-4 text-base text-white/40">
            Explore your daily, weekly, and yearly horoscope through the ancient wisdom of the zodiac.
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {zodiacSigns.map((sign) => (
            <Link
              key={sign.name}
              href={sign.href}
              className="glass-card glass-card-hover group flex flex-col items-center rounded-xl p-5 text-center transition-all duration-500"
            >
              {/* Symbol */}
              <span
                className="text-4xl transition-transform duration-500 group-hover:scale-125"
                style={{ filter: `drop-shadow(0 0 8px ${elementColors[sign.element]}40)` }}
              >
                {sign.symbol}
              </span>
              {/* Name */}
              <span className="mt-3 text-sm font-bold text-white/80 group-hover:text-[var(--color-celestial-gold)]">
                {sign.name}
              </span>
              {/* Dates */}
              <span className="mt-1 text-[10px] text-white/30">
                {sign.dates}
              </span>
              {/* Element badge */}
              <span
                className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  color: elementColors[sign.element],
                  backgroundColor: `${elementColors[sign.element]}15`,
                  border: `1px solid ${elementColors[sign.element]}25`,
                }}
              >
                {sign.element}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/horoscopes"
            className="btn-celestial-outline inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm uppercase tracking-widest"
          >
            View All Horoscopes
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
