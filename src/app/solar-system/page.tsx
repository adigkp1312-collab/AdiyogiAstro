import type { Metadata } from "next";
import Link from "next/link";

import { SolarSystem } from "@/components/shared/solar-system";

export const metadata: Metadata = {
  title: "Solar System · AstroPath",
  description:
    "A physics-based 3D rendering of the solar system, driven by real Keplerian orbital elements.",
};

export default function SolarSystemPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#03020a] text-white">
      <SolarSystem className="absolute inset-0 h-full w-full" />

      {/* Intro card — absolutely positioned so it floats over the canvas
          without capturing pointer events on the rest of the screen. */}
      <div className="pointer-events-none absolute left-4 top-4 max-w-sm sm:left-6 sm:top-6">
        <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/80">
              Live simulation
            </span>
          </div>
          <h1 className="text-xl font-semibold leading-tight">The Solar System</h1>
          <p className="mt-2 text-xs leading-relaxed text-white/60">
            Eight planets orbiting the Sun on their real elliptical paths —
            every position is computed each frame by solving Kepler&apos;s
            equation from the true orbital elements. Drag to orbit, scroll to
            zoom, pinch to pan.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-white/50 transition hover:text-white/90"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
