"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

/**
 * The Canvas is imported with `ssr: false` because Three.js reads `window`
 * at module load time. This also keeps the Three.js bundle out of the
 * server build entirely.
 */
const SolarSystemCanvas = dynamic(() => import("./canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#03020a] text-xs uppercase tracking-widest text-white/40">
      Loading orbits…
    </div>
  ),
});

export interface SolarSystemProps {
  /** Extra classes for the outer wrapper. Defaults to full-viewport height. */
  className?: string;
  /**
   * Simulated years per real second. 0.15 makes Earth finish an orbit in
   * ~6.7 real seconds; Jupiter ~80s; Neptune ~1100s. Users can change it live.
   */
  initialSpeed?: number;
  /** Show the on-screen controls overlay (speed slider + toggles). */
  showControls?: boolean;
  /** Initial state for orbit path lines. */
  showOrbits?: boolean;
  /** Initial state for planet name labels. */
  showLabels?: boolean;
  /** Auto-rotate the camera around the Sun. */
  autoRotate?: boolean;
  /** Initial camera distance from the Sun (scene units). */
  cameraDistance?: number;
}

/**
 * A reusable, physics-based solar system renderer.
 *
 * Planet motion comes from real Keplerian orbital elements (semi-major axis,
 * eccentricity, inclination, argument of perihelion, longitude of ascending
 * node, orbital period) — solved per frame via Kepler's equation. Axial tilts
 * and rotation rates are real. Distances and body radii are compressed so the
 * whole system is watchable.
 *
 * @example
 * ```tsx
 * <SolarSystem className="h-[80vh] w-full" />
 * ```
 */
export function SolarSystem({
  className = "relative h-screen w-full",
  initialSpeed = 0.15,
  showControls = true,
  showOrbits: initialShowOrbits = true,
  showLabels: initialShowLabels = true,
  autoRotate = false,
  cameraDistance = 70,
}: SolarSystemProps) {
  const [speed, setSpeed] = useState(initialSpeed);
  const [showOrbits, setShowOrbits] = useState(initialShowOrbits);
  const [showLabels, setShowLabels] = useState(initialShowLabels);
  const [paused, setPaused] = useState(false);

  return (
    <div className={className}>
      <SolarSystemCanvas
        speed={paused ? 0 : speed}
        showOrbits={showOrbits}
        showLabels={showLabels}
        autoRotate={autoRotate}
        cameraDistance={cameraDistance}
      />

      {showControls && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
          <div className="pointer-events-auto flex flex-wrap items-center gap-4 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-xs text-white/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-full border border-white/15 px-3 py-1 uppercase tracking-widest transition hover:bg-white/10"
              aria-label={paused ? "Resume" : "Pause"}
            >
              {paused ? "Play" : "Pause"}
            </button>

            <label className="flex items-center gap-2">
              <span className="uppercase tracking-widest text-white/50">Speed</span>
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="h-1 w-28 cursor-pointer accent-amber-300"
                aria-label="Simulation speed"
              />
              <span className="w-10 tabular-nums text-white/40">
                {speed.toFixed(2)}×
              </span>
            </label>

            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                checked={showOrbits}
                onChange={(e) => setShowOrbits(e.target.checked)}
                className="accent-amber-300"
              />
              <span className="uppercase tracking-widest text-white/50">Orbits</span>
            </label>

            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="accent-amber-300"
              />
              <span className="uppercase tracking-widest text-white/50">Labels</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
