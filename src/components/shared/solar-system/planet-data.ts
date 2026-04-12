/**
 * Real orbital elements for the Sun + 8 planets (+ Earth's Moon).
 *
 * Sources: JPL / NASA planetary fact sheets, J2000 epoch values.
 * Distances are stored in both AU (for reference) and in "display units",
 * which are the scene units we feed Three.js. We deliberately compress
 * distance and radius scales — a fully true-to-scale solar system is
 * unwatchable (Neptune would be ~50,000 pixels off-screen, Earth 0.3 px).
 *
 * The orbital *shape* (ellipse eccentricity, inclination, precession angles)
 * and the *timing* (periods, rotation rates, axial tilts) are real.
 */

import type { OrbitalElements } from "./kepler";

const DEG = Math.PI / 180;

/**
 * Convert semi-major axis from AU to scene units.
 * sqrt compression keeps the outer planets visible without completely
 * crushing the inner planets.
 */
const DISTANCE_SCALE = 9;
const toDisplayA = (aAU: number) => Math.sqrt(aAU) * DISTANCE_SCALE;

/** Convert a rotation period in days to years (sim-time units). */
const daysToYears = (d: number) => d / 365.25;

export interface PlanetData {
  id: string;
  name: string;
  /** Base albedo / body colour. */
  color: string;
  /** Optional slight emissive tint so dark sides aren't pure black. */
  emissive?: string;
  /** Sphere radius in scene units. */
  displayRadius: number;
  /** Self-rotation period in years. Negative = retrograde. */
  rotationPeriod: number;
  /** Axial tilt, radians. */
  axialTilt: number;
  /** Classical orbital elements (display-space a). */
  orbit: OrbitalElements;
  /** Saturn gets rings. */
  rings?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
    opacity: number;
  };
  /** For hover tooltips. */
  fact: string;
}

export const SUN = {
  displayRadius: 2.6,
  color: "#ffe08a",
  emissive: "#ffb347",
  /** Sun rotates (differential rotation averaged to ~25.4 days at equator). */
  rotationPeriod: daysToYears(25.4),
} as const;

/**
 * Mean anomaly at J2000 epoch, radians. Using real starting phases means
 * the planets start in astronomically plausible positions relative to each
 * other — not all bunched together.
 */
const PHASES_J2000: Record<string, number> = {
  mercury: 174.796 * DEG,
  venus: 50.115 * DEG,
  earth: 357.529 * DEG,
  mars: 19.373 * DEG,
  jupiter: 20.02 * DEG,
  saturn: 317.02 * DEG,
  uranus: 142.955 * DEG,
  neptune: 256.228 * DEG,
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#9c9189",
    displayRadius: 0.22,
    rotationPeriod: daysToYears(58.646),
    axialTilt: 0.034 * DEG,
    fact: "Closest planet to the Sun · 88-day year",
    orbit: {
      a: toDisplayA(0.3871),
      e: 0.2056,
      i: 7.005 * DEG,
      omega: 29.124 * DEG,
      Omega: 48.331 * DEG,
      period: 0.2408,
      phase: PHASES_J2000.mercury,
    },
  },
  {
    id: "venus",
    name: "Venus",
    color: "#e8c27a",
    emissive: "#3a2a10",
    displayRadius: 0.42,
    // Venus rotates retrograde (negative) and very slowly.
    rotationPeriod: -daysToYears(243.018),
    axialTilt: 177.36 * DEG,
    fact: "Hottest planet · retrograde rotation",
    orbit: {
      a: toDisplayA(0.7233),
      e: 0.0068,
      i: 3.394 * DEG,
      omega: 54.884 * DEG,
      Omega: 76.68 * DEG,
      period: 0.6152,
      phase: PHASES_J2000.venus,
    },
  },
  {
    id: "earth",
    name: "Earth",
    color: "#3b7dd1",
    emissive: "#0a1a2e",
    displayRadius: 0.44,
    rotationPeriod: daysToYears(0.99726968),
    axialTilt: 23.4393 * DEG,
    fact: "Only known world with life",
    orbit: {
      a: toDisplayA(1.0),
      e: 0.0167,
      i: 0.0 * DEG,
      omega: 114.207 * DEG,
      Omega: 348.74 * DEG,
      period: 1.0,
      phase: PHASES_J2000.earth,
    },
  },
  {
    id: "mars",
    name: "Mars",
    color: "#c1502a",
    emissive: "#2a0e07",
    displayRadius: 0.3,
    rotationPeriod: daysToYears(1.02595675),
    axialTilt: 25.19 * DEG,
    fact: "Iron oxide surface · largest volcano in the solar system",
    orbit: {
      a: toDisplayA(1.5237),
      e: 0.0934,
      i: 1.85 * DEG,
      omega: 286.502 * DEG,
      Omega: 49.558 * DEG,
      period: 1.8809,
      phase: PHASES_J2000.mars,
    },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#d9b38c",
    emissive: "#2b1d12",
    displayRadius: 1.35,
    rotationPeriod: daysToYears(0.41354),
    axialTilt: 3.13 * DEG,
    fact: "Gas giant · Great Red Spot is a 350-year-old storm",
    orbit: {
      a: toDisplayA(5.2026),
      e: 0.0484,
      i: 1.303 * DEG,
      omega: 273.867 * DEG,
      Omega: 100.464 * DEG,
      period: 11.862,
      phase: PHASES_J2000.jupiter,
    },
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#e0c28a",
    emissive: "#2a1e10",
    displayRadius: 1.15,
    rotationPeriod: daysToYears(0.44401),
    axialTilt: 26.73 * DEG,
    fact: "Famous rings · least dense planet (floats in water)",
    rings: {
      innerRadius: 1.5,
      outerRadius: 2.4,
      color: "#d4b26a",
      opacity: 0.75,
    },
    orbit: {
      a: toDisplayA(9.5549),
      e: 0.0539,
      i: 2.485 * DEG,
      omega: 339.392 * DEG,
      Omega: 113.665 * DEG,
      period: 29.4571,
      phase: PHASES_J2000.saturn,
    },
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#9fd9d9",
    emissive: "#0a1c1c",
    displayRadius: 0.78,
    // Uranus is tipped on its side and rotates retrograde.
    rotationPeriod: -daysToYears(0.71833),
    axialTilt: 97.77 * DEG,
    fact: "Rotates on its side · ice giant",
    orbit: {
      a: toDisplayA(19.2184),
      e: 0.0473,
      i: 0.773 * DEG,
      omega: 96.998 * DEG,
      Omega: 74.006 * DEG,
      period: 84.0205,
      phase: PHASES_J2000.uranus,
    },
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#4b70d9",
    emissive: "#0a1130",
    displayRadius: 0.76,
    rotationPeriod: daysToYears(0.6713),
    axialTilt: 28.32 * DEG,
    fact: "Farthest planet · supersonic winds",
    orbit: {
      a: toDisplayA(30.11),
      e: 0.0086,
      i: 1.77 * DEG,
      omega: 276.336 * DEG,
      Omega: 131.784 * DEG,
      period: 164.8,
      phase: PHASES_J2000.neptune,
    },
  },
];

/**
 * Earth's Moon — modelled as a child of Earth in a local circular orbit.
 * The real Moon is a 4 × 10⁻³ AU sliver off Earth, which would be invisible
 * at scene scale; we use a tuned local radius instead.
 */
export const MOON = {
  /** Local orbital radius in Earth's own frame (scene units). */
  localRadius: 1.1,
  displayRadius: 0.12,
  /** 27.32 days in years. */
  period: daysToYears(27.3217),
  color: "#c8c8c8",
  /** Moon orbit tilt (~5.145° to ecliptic). */
  inclination: 5.145 * DEG,
} as const;
