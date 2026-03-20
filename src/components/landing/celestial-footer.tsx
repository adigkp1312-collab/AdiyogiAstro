"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Birth Chart", href: "/birth-chart/new" },
    { label: "Daily Horoscope", href: "/horoscopes" },
    { label: "Transit Forecasts", href: "/transits" },
    { label: "Panchang", href: "/panchang" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Festivals", href: "/festivals" },
  ],
  learn: [
    { label: "Astrology Blog", href: "/blog" },
    { label: "Zodiac Signs", href: "/horoscopes" },
    { label: "Planetary Transits", href: "/transits" },
    { label: "Moon Phases", href: "/panchang" },
    { label: "Gemstone Guide", href: "/blog" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

export function CelestialFooter() {
  return (
    <footer className="relative border-t border-[var(--color-celestial-gold)]/10 bg-[var(--color-cosmos-deeper)]">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Receive Cosmic <span className="text-shimmer-gold">Insights</span>
            </h3>
            <p className="mt-2 text-sm text-white/40">
              Weekly celestial updates, transit alerts, and personalized horoscope
              delivered to your inbox.
            </p>
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-celestial-gold)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--color-celestial-gold)]/20"
              />
              <button className="btn-celestial shrink-0 rounded-full px-6 text-sm font-bold uppercase tracking-wider">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Sparkles className="size-6 text-[var(--color-celestial-gold)]" />
              <span className="text-lg font-bold tracking-wider text-white">
                Astro<span className="text-shimmer-gold">Path</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/30">
              Bridging ancient Vedic wisdom with modern cosmic understanding.
              Your trusted companion on the path to celestial self-discovery
              and spiritual alignment.
            </p>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {["Twitter", "Instagram", "YouTube", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-[var(--color-celestial-gold)]/30 hover:text-[var(--color-celestial-gold)]"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-celestial-gold)]/60">
              Explore
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 transition-colors hover:text-[var(--color-celestial-gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-celestial-gold)]/60">
              Learn
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 transition-colors hover:text-[var(--color-celestial-gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-celestial-gold)]/60">
              Company
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 transition-colors hover:text-[var(--color-celestial-gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zodiac signs strip */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {zodiacSigns.map((sign, i) => (
              <Link
                key={sign}
                href={`/horoscopes/${sign.toLowerCase()}`}
                className="text-xs text-white/20 transition-colors hover:text-[var(--color-celestial-gold)]"
              >
                {sign}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="celestial-divider mt-8" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} AstroPath. All rights reserved.
          </p>
          <p className="text-[10px] text-white/15">
            For entertainment and spiritual guidance purposes. Not a substitute for professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
