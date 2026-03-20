"use client";

import Link from "next/link";
import { Sparkles, Star } from "lucide-react";

const credentials = [
  { label: "20+ Years", desc: "Vedic Practice" },
  { label: "50,000+", desc: "Charts Read" },
  { label: "15+ Countries", desc: "Seekers Guided" },
  { label: "98%", desc: "Accuracy Rate" },
];

const specializations = [
  "Vedic Birth Chart Analysis",
  "Nadi Astrology",
  "Prashna Kundali",
  "Muhurta Selection",
  "Remedial Astrology",
  "Transit Predictions",
];

export function AstrologerSection() {
  return (
    <section id="astrologer" className="relative bg-[var(--color-cosmos-dark)] py-24 sm:py-32">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(201,168,76,0.05)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Visual */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute size-[320px] animate-spin-slow rounded-full border border-[var(--color-celestial-gold)]/10 sm:size-[400px]" />
            <div className="absolute size-[260px] rounded-full border border-[var(--color-celestial-purple)]/10 sm:size-[340px]" style={{ animationDirection: "reverse" }} />

            {/* Portrait placeholder */}
            <div className="relative">
              <div className="relative size-56 overflow-hidden rounded-full border-2 border-[var(--color-celestial-gold)]/30 sm:size-72">
                {/* Gradient avatar placeholder */}
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-cosmos-card)] via-[var(--color-celestial-purple)]/20 to-[var(--color-cosmos-card)]">
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className="size-12 text-[var(--color-celestial-gold)]/60" />
                    <span className="text-xs text-white/30">Master Astrologer</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-4 animate-float rounded-xl border border-[var(--color-celestial-gold)]/20 bg-[var(--color-cosmos-card)]/90 px-3 py-2 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="size-3.5 fill-[var(--color-celestial-gold)] text-[var(--color-celestial-gold)]" />
                  <span className="text-xs font-bold text-white">4.9/5</span>
                </div>
              </div>
              <div className="absolute -left-4 bottom-8 animate-float-slow rounded-xl border border-[var(--color-celestial-purple)]/20 bg-[var(--color-cosmos-card)]/90 px-3 py-2 shadow-lg backdrop-blur-sm">
                <span className="text-xs font-medium text-[var(--color-celestial-violet)]">
                  Jyotish Acharya
                </span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-celestial-gold)]/60">
              Your Cosmic Guide
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Guided by <span className="text-shimmer-gold">Ancient Wisdom</span>,
              <br />
              Illuminated by Experience
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/40">
              Our master astrologer brings two decades of devoted study in Vedic
              Jyotish, blending time-honored Parashari and Jaimini techniques
              with an intuitive understanding of the modern soul&apos;s journey.
              Every reading is a sacred dialogue between the stars and your spirit.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {credentials.map((cred) => (
                <div key={cred.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <p className="text-lg font-bold text-[var(--color-celestial-gold)]">{cred.label}</p>
                  <p className="mt-0.5 text-[11px] text-white/30">{cred.desc}</p>
                </div>
              ))}
            </div>

            {/* Specializations */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
                Specializations
              </p>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-[var(--color-celestial-gold)]/15 bg-[var(--color-celestial-gold)]/5 px-3 py-1.5 text-xs text-[var(--color-celestial-gold)]/80"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="btn-celestial inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest"
              >
                Book a Cosmic Reading
                <svg className="size-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
