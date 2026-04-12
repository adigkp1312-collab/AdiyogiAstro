/**
 * Keplerian orbital mechanics.
 *
 * Given classical orbital elements and simulation time, compute a body's
 * heliocentric position. We solve Kepler's equation
 *
 *     M = E - e * sin(E)
 *
 * with Newton–Raphson, derive the true anomaly and orbital-plane coordinates,
 * then rotate into the reference frame using (ω, i, Ω).
 *
 * Coordinate convention: the function returns a position mapped to Three.js
 * space where Y is up and the mean reference plane (ecliptic) lies in XZ.
 */

export interface OrbitalElements {
  /** semi-major axis, in scene units (already scaled from AU). */
  a: number;
  /** eccentricity, 0 = circle, < 1 = ellipse. */
  e: number;
  /** inclination to the reference plane, radians. */
  i: number;
  /** argument of perihelion, radians. */
  omega: number;
  /** longitude of ascending node, radians. */
  Omega: number;
  /** orbital period, in simulation-time units (we use years). */
  period: number;
  /** mean anomaly at epoch t=0, radians. */
  phase: number;
}

/**
 * Solve Kepler's equation `M = E - e*sin(E)` for the eccentric anomaly E.
 * Uses Newton–Raphson — for planetary eccentricities (e < 0.25) this
 * converges to double precision in ~4 iterations.
 */
export function solveKepler(M: number, e: number, maxIter = 8): number {
  // Wrap M into [-π, π] for numerical stability of the initial guess.
  const twoPi = Math.PI * 2;
  let Mn = M % twoPi;
  if (Mn > Math.PI) Mn -= twoPi;
  else if (Mn < -Math.PI) Mn += twoPi;

  // Smart seed: works well even for moderately eccentric orbits.
  let E = Mn + e * Math.sin(Mn);

  for (let k = 0; k < maxIter; k++) {
    const f = E - e * Math.sin(E) - Mn;
    const fp = 1 - e * Math.cos(E);
    const dE = f / fp;
    E -= dE;
    if (Math.abs(dE) < 1e-10) break;
  }
  return E;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Heliocentric position of a body at simulation time `t` (in years).
 * Returned in Three.js world coordinates (Y up, ecliptic in XZ plane).
 */
export function keplerPosition(orb: OrbitalElements, t: number): Vec3 {
  // Mean anomaly advances linearly with time.
  const M = (2 * Math.PI * t) / orb.period + orb.phase;

  // Solve for eccentric anomaly, then compute orbital-plane coords.
  const E = solveKepler(M, orb.e);
  const cosE = Math.cos(E);
  const sinE = Math.sin(E);

  // Standard form: the focus (Sun) sits at the origin because of the
  // `- e` offset on x'.
  const xp = orb.a * (cosE - orb.e);
  const yp = orb.a * Math.sqrt(1 - orb.e * orb.e) * sinE;

  // 1. Rotate by argument of perihelion ω within the orbital plane.
  const cosw = Math.cos(orb.omega);
  const sinw = Math.sin(orb.omega);
  const x1 = xp * cosw - yp * sinw;
  const y1 = xp * sinw + yp * cosw;

  // 2. Tilt by inclination i around the x-axis of the orbital frame.
  const cosi = Math.cos(orb.i);
  const sini = Math.sin(orb.i);
  const x2 = x1;
  const y2 = y1 * cosi;
  const z2 = y1 * sini;

  // 3. Rotate by longitude of ascending node Ω around the reference-frame z.
  const cosO = Math.cos(orb.Omega);
  const sinO = Math.sin(orb.Omega);
  const Xref = x2 * cosO - y2 * sinO;
  const Yref = x2 * sinO + y2 * cosO;
  const Zref = z2;

  // Reference frame is Z-up; Three.js is Y-up, so swap axes.
  return { x: Xref, y: Zref, z: Yref };
}

/**
 * Sample `count` points along the orbit for rendering a static orbit path.
 * We sweep uniformly in mean anomaly rather than true anomaly, which is what
 * a real body does — giving a visually "correct" ellipse regardless of eccentricity.
 */
export function sampleOrbit(orb: OrbitalElements, count = 256): Vec3[] {
  const points: Vec3[] = [];
  // Use a temporary element set where we sweep one full period starting at phase 0.
  const sweep: OrbitalElements = { ...orb, period: 1, phase: 0 };
  for (let k = 0; k <= count; k++) {
    const t = k / count;
    points.push(keplerPosition(sweep, t));
  }
  return points;
}
