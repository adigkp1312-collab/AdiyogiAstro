"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function VedicCta() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6600] to-[#FF8C00] py-20 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 size-[300px] rounded-full border border-white/10" />
      <div className="absolute -right-16 -bottom-16 size-[400px] rounded-full border border-white/10" />
      <div className="absolute left-1/4 top-10 text-6xl text-white/5 select-none">&#x2609;</div>
      <div className="absolute right-1/4 bottom-10 text-5xl text-white/5 select-none">&#x263D;</div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-white/[0.03] select-none">&#x2648;</div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
          <span className="text-3xl">&#x2609;</span>
        </div>

        <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Ready to Unlock Your
          <br />
          Cosmic Destiny?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          The universe has been waiting to share its secrets with you. Begin your
          journey of self-discovery and spiritual transformation today.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/birth-chart/new"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#FF6600] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("hero.getKundli")}
            <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/50"
          >
            Talk to Astrologer
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/40">
          Free birth chart analysis &bull; No commitment required
        </p>
      </div>
    </section>
  );
}

export function VedicMidCta() {
  return (
    <section className="bg-orange-50/60 py-14 sm:py-16">
      <div className="vedic-divider" />
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6600]/70">
          Begin Your Transformation
        </p>
        <h3 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Every great journey starts with a
          <span className="text-gradient-vedic"> cosmic question</span>
        </h3>
        <div className="mt-6">
          <Link
            href="/birth-chart/new"
            className="btn-vedic inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider"
          >
            Get Your Free Kundli
          </Link>
        </div>
      </div>
      <div className="vedic-divider" />
    </section>
  );
}
