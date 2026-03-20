"use client";

import Link from "next/link";

export function MidCta() {
  return (
    <section className="relative bg-[var(--color-cosmos-dark)] py-16">
      <div className="celestial-divider" />
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-celestial-gold)]/50">
          Your Transformation Awaits
        </p>
        <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Every great journey starts with a single <span className="text-shimmer-gold">cosmic question</span>
        </h3>
        <div className="mt-8">
          <Link
            href="/birth-chart/new"
            className="btn-celestial inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest"
          >
            Align Your Stars
          </Link>
        </div>
      </div>
      <div className="celestial-divider" />
    </section>
  );
}
