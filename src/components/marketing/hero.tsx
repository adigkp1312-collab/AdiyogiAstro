"use client";

import dynamic from "next/dynamic";

const SolarSystem = dynamic(
  () => import("@/components/landing/solar-system").then((m) => m.default),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="bg-void px-4 pb-8 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.15] bg-deep shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_25px_80px_-20px_rgba(0,0,0,0.8),0_0_100px_-30px_rgba(201,162,39,0.15),inset_0_0_80px_rgba(0,0,0,0.3)] md:aspect-[2.39/1]">
          {/* Bezel effect */}
          <div
            className="pointer-events-none absolute inset-0 z-[100] rounded-2xl p-px"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Screen reflection */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-[99] h-[40%] bg-gradient-to-b from-white/[0.02] to-transparent" />

          {/* Solar System */}
          <SolarSystem className="absolute inset-0 h-full w-full" />

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,3,10,0.4)_70%,rgba(4,3,10,0.8)_100%)]" />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 z-[3] rounded-2xl shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />

          {/* Content */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <p className="mb-4 animate-fade-up text-xs font-medium uppercase tracking-[0.4em] text-gold delay-100">
              Ancient Wisdom • Modern Intelligence
            </p>
            <h1 className="mb-4 animate-fade-up font-display text-4xl font-normal leading-[0.95] text-[#f0ebe3] shadow-[0_4px_30px_rgba(0,0,0,0.5)] delay-200 sm:text-5xl md:text-6xl lg:text-7xl">
              Daivik Vani
            </h1>
            <p className="animate-fade-up font-display text-base font-light italic text-white/70 delay-300 sm:text-lg md:max-w-[450px]">
              The all-seeing cosmic intelligence bridging millennia of Vedic knowledge with artificial minds.
            </p>
          </div>

          {/* Controls */}
          <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 animate-fade-up items-center gap-3 rounded-full border border-white/[0.08] bg-black/50 px-4 py-2 text-[10px] uppercase tracking-widest text-white/45 backdrop-blur-md delay-500 sm:flex">
            <span>Drag to rotate</span>
            <span className="flex items-center gap-1 before:h-1 before:w-1 before:rounded-full before:bg-gold">Scroll to zoom</span>
            <span className="flex items-center gap-1 before:h-1 before:w-1 before:rounded-full before:bg-gold">Click planets</span>
          </div>
        </div>
      </div>
    </section>
  );
}
