"use client";

import Link from "next/link";

const offerings = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="size-12">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="4" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="44" r="2.5" fill="currentColor" opacity="0.7" />
        <circle cx="4" cy="24" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: "Birth Chart Reading",
    subtitle: "Your Celestial DNA",
    description:
      "A deeply personal map of the heavens at the exact moment of your birth. Discover your sun, moon, rising signs, planetary houses, and the cosmic forces that shape your destiny.",
    href: "/birth-chart/new",
    cta: "Discover Your Chart",
    color: "var(--color-celestial-gold)",
    gradient: "from-[var(--color-celestial-gold)]/10 to-transparent",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="size-12">
        <path d="M24 4v40M4 24h40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M10 10l28 28M38 10L10 38" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M24 6a18 18 0 010 36" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="24" cy="6" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="38" cy="16" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="36" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    title: "Transit Forecasts",
    subtitle: "Planetary Weather Report",
    description:
      "Stay ahead of cosmic currents. Real-time planetary transit analysis reveals upcoming opportunities, challenges, and transformative windows aligned with your unique chart.",
    href: "/transits",
    cta: "Align Your Stars",
    color: "var(--color-celestial-purple)",
    gradient: "from-[var(--color-celestial-purple)]/10 to-transparent",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="size-12">
        <path d="M24 4c-6 8-12 12-12 20a12 12 0 0024 0c0-8-6-12-12-20z" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.8" />
        <path d="M18 16c0 0 3 4 6 4s6-4 6-4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="16" cy="22" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="32" cy="22" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: "Guided Moon Rituals",
    subtitle: "Lunar Sacred Practice",
    description:
      "Harness the moon's transformative energy through personalized rituals for new moons, full moons, and eclipses. Intention setting, release ceremonies, and manifestation practices.",
    href: "/panchang",
    cta: "Begin Your Ritual",
    color: "var(--color-celestial-violet)",
    gradient: "from-[var(--color-celestial-violet)]/10 to-transparent",
  },
];

export function CosmicOfferings() {
  return (
    <section id="offerings" className="relative bg-[var(--color-cosmos-dark)] py-24 sm:py-32">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(123,47,190,0.06)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-celestial-gold)]/60">
            Sacred Offerings
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Illuminate Your <span className="text-shimmer-gold">Soul&apos;s Journey</span>
          </h2>
          <p className="mt-4 text-base text-white/40 sm:text-lg">
            Three pillars of cosmic wisdom, each a doorway to deeper self-understanding
            and spiritual alignment.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {offerings.map((offering, i) => (
            <div
              key={offering.title}
              className="glass-card glass-card-hover group relative rounded-2xl p-8 transition-all duration-500 sm:p-10"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Top gradient accent */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${offering.gradient}`} />

              {/* Icon */}
              <div className="mb-6 transition-transform duration-500 group-hover:scale-110" style={{ color: offering.color }}>
                {offering.icon}
              </div>

              {/* Subtitle */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: offering.color }}>
                {offering.subtitle}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {offering.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-white/40">
                {offering.description}
              </p>

              {/* CTA */}
              <Link
                href={offering.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all group-hover:gap-3"
                style={{ color: offering.color }}
              >
                {offering.cta}
                <svg className="size-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
