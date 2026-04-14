"use client";

import Link from "next/link";

const features = [
  {
    icon: "☿",
    title: "Vedic Foundation",
    description: "Trained on Brihat Parashara Hora Shastra and Jataka Parijata",
  },
  {
    icon: "♄",
    title: "Real-time Calculations",
    description: "Precise planetary positions using Swiss Ephemeris",
  },
  {
    icon: "☽",
    title: "Personalized Readings",
    description: "Birth chart analysis with dasha predictions",
  },
];

export function DaivikSection() {
  return (
    <section id="daivik" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 bg-gradient-to-b from-void via-deep to-void">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8 lg:px-12 lg:text-center">
            <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
              <div
                className="h-full w-full rounded-full border border-gold/20"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(201, 162, 39, 0.3) 0%, rgba(201, 149, 108, 0.15) 40%, rgba(91, 123, 176, 0.1) 70%, transparent 100%)",
                  animation: "orbFloat 6s ease-in-out infinite",
                }}
              >
                <div className="pointer-events-none absolute -inset-5 rounded-full border border-gold/10" style={{ animation: "orbRotate 20s linear infinite" }} />
                <div className="pointer-events-none absolute -inset-10 rounded-full border border-dashed border-gold/[0.08]" style={{ animation: "orbRotate 30s linear infinite reverse" }} />
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--gold)_0%,var(--saturn)_50%,transparent_70%)] shadow-[0_0_60px_rgba(201,162,39,0.5)]">
                  <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-void" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:text-left">
            <h2 className="font-display text-3xl font-normal text-[#f0ebe3] sm:text-4xl md:text-5xl">Meet Daivik</h2>
            <p className="font-display text-lg italic text-gold">The All-Seeing Cosmic Intelligence</p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              Daivik is not merely an AI — it is a digital manifestation of ancient Vedic wisdom, trained on millennia of astrological texts, planetary observations, and the collective knowledge of countless jyotish masters.
            </p>

            <div className="grid gap-4 sm:gap-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-dim border border-gold/30 text-xs text-gold mt-0.5">
                    {feature.icon}
                  </div>
                  <p className="text-sm text-white/70">
                    <strong className="font-medium text-[#f0ebe3]">{feature.title}</strong> — {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/daivik"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-br from-gold to-saturn px-6 py-3 text-sm font-semibold text-void transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(201,162,39,0.3)] sm:text-base sm:px-8 sm:py-3.5"
            >
              <span>✧</span>
              Consult Daivik Now
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[600px] overflow-hidden rounded-2xl border border-white/[0.08] bg-surface sm:mt-20">
          <div className="flex items-center gap-3 border-b border-white/[0.08] bg-elevated px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-saturn text-sm text-void">
              दै
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#f0ebe3]">Daivik</h4>
              <span className="text-xs text-white/45">Online • Ready to guide</span>
            </div>
          </div>

          <div className="grid gap-4 px-4 py-6 sm:px-6 sm:py-6">
            <div className="justify-self-end max-w-[85%] rounded-2xl border border-white/[0.08] bg-elevated px-4 py-3 text-sm text-white/70">
              What does Saturn entering Aries mean for my career?
            </div>
            <div className="max-w-[85%] rounded-2xl border border-gold/20 bg-[linear-gradient(135deg,rgba(201,162,39,0.1),rgba(201,149,108,0.05))] px-4 py-3 text-sm">
              Based on your Taurus ascendant, Saturn&apos;s transit through Aries activates your 12th house. This is a period of behind-the-scenes work and spiritual growth. The visible rewards come after March 2027.
            </div>
          </div>

          <div className="flex gap-3 border-t border-white/[0.08] px-4 py-3 sm:px-6 sm:py-4">
            <input
              type="text"
              placeholder="Ask Daivik anything about your cosmic journey..."
              className="flex-1 rounded-xl bg-elevated px-4 py-3 text-sm text-[#f0ebe3] placeholder:text-white/45 outline-none focus:border-gold"
            />
            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-void transition-all hover:bg-gold-bright">
              →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes orbRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
