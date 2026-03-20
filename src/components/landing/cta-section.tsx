"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cosmos-dark)] py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(123,47,190,0.06)_0%,_transparent_40%)]" />

      {/* Decorative orbits */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="size-[600px] animate-spin-slow rounded-full border border-[var(--color-celestial-gold)]/30" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Decorative element */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="size-16 animate-pulse-glow rounded-full border border-[var(--color-celestial-gold)]/30 bg-[var(--color-celestial-gold)]/5 p-4">
              <svg viewBox="0 0 32 32" fill="none" className="size-full text-[var(--color-celestial-gold)]">
                <circle cx="16" cy="16" r="3" fill="currentColor" />
                <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <circle cx="16" cy="2" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="30" cy="16" r="1" fill="currentColor" opacity="0.4" />
                <circle cx="16" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Align with
          <br />
          <span className="text-celestial-gradient">Your Cosmic Destiny?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg">
          The universe has been waiting to share its secrets with you.
          Begin your journey of self-discovery and spiritual transformation today.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/birth-chart/new"
            className="btn-celestial group inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest"
          >
            <span>Begin Your Journey</span>
            <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="btn-celestial-outline inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm uppercase tracking-widest"
          >
            Speak to an Astrologer
          </Link>
        </div>

        {/* Trust note */}
        <p className="mt-8 text-xs text-white/20">
          Free birth chart analysis included. No commitment required.
        </p>
      </div>
    </section>
  );
}
