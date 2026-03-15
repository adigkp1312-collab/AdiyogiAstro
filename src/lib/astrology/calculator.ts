import { ChartData, PlanetPosition } from "@/types";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { calculateAspects } from "@/lib/astrology/aspects";

const SIGN_KEYS = Object.keys(ZODIAC_SIGNS);

/**
 * Converts an ecliptic longitude (0-360 degrees) to the zodiac sign key and
 * the degree within that sign (0-29).
 */
export function getSignFromDegree(degree: number): { sign: string; degree: number } {
  const normalized = ((degree % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const degreeInSign = normalized % 30;
  return {
    sign: SIGN_KEYS[signIndex],
    degree: parseFloat(degreeInSign.toFixed(2)),
  };
}

/**
 * Calculates the Julian Day Number for a given date at a given fractional hour (UT).
 */
function toJulianDay(year: number, month: number, day: number, hourUT: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    hourUT / 24 +
    B -
    1524.5
  );
}

/**
 * Calculates centuries since J2000.0 epoch.
 */
function julianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Normalizes an angle to the range [0, 360).
 */
function normalizeDegrees(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * Converts degrees to radians.
 */
function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 */
function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Approximate mean orbital elements for simplified planetary longitude.
 * Each entry has: L0 (mean longitude at epoch), L1 (rate in degrees per century),
 * and an optional eccentricity-based correction amplitude.
 * These are rough but produce recognizable chart positions.
 */
const PLANET_ELEMENTS: Record<string, { L0: number; L1: number; corrAmp: number; corrPeriod: number }> = {
  Sun:     { L0: 280.4664567, L1: 36000.76983,   corrAmp: 1.9148,  corrPeriod: 35999.05 },
  Moon:    { L0: 218.3165,    L1: 481267.8813,    corrAmp: 6.2888,  corrPeriod: 477198.8676 },
  Mercury: { L0: 252.2509,    L1: 149472.6746,    corrAmp: 23.4400, corrPeriod: 149472.515 },
  Venus:   { L0: 181.9798,    L1: 58517.8157,     corrAmp: 0.7758,  corrPeriod: 58517.8039 },
  Mars:    { L0: 355.4330,    L1: 19140.2993,     corrAmp: 10.6912, corrPeriod: 19139.858 },
  Jupiter: { L0: 34.3515,     L1: 3034.9057,      corrAmp: 5.5549,  corrPeriod: 3034.687 },
  Saturn:  { L0: 50.0774,     L1: 1222.1138,      corrAmp: 6.3585,  corrPeriod: 1222.114 },
  Uranus:  { L0: 314.055,     L1: 428.4677,       corrAmp: 5.3042,  corrPeriod: 428.469 },
  Neptune: { L0: 304.349,     L1: 218.4862,       corrAmp: 3.6291,  corrPeriod: 218.462 },
  Pluto:   { L0: 238.929,     L1: 145.2078,       corrAmp: 28.3150, corrPeriod: 145.178 },
};

/**
 * Calculates a simplified ecliptic longitude for a planet given Julian centuries T.
 */
function planetLongitude(planet: string, T: number): number {
  const el = PLANET_ELEMENTS[planet];
  if (!el) return 0;

  const meanLongitude = el.L0 + el.L1 * T;
  const meanAnomaly = el.corrPeriod * T;
  const correction = el.corrAmp * Math.sin(toRadians(meanAnomaly));
  return normalizeDegrees(meanLongitude + correction);
}

/**
 * Determines a rough retrograde flag for outer planets by comparing the
 * planet's daily motion direction. Inner planets (Sun, Moon) are never retrograde.
 */
function isRetrograde(planet: string, T: number): boolean {
  if (planet === "Sun" || planet === "Moon") return false;
  const delta = 0.0000274; // ~1 day in centuries
  const lon1 = planetLongitude(planet, T);
  const lon2 = planetLongitude(planet, T + delta);
  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

/**
 * Calculates the Local Sidereal Time in degrees for a given Julian Day and
 * geographic longitude.
 */
function localSiderealTime(jd: number, longitudeDeg: number): number {
  const T = julianCenturies(jd);
  // Greenwich Mean Sidereal Time in degrees
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;
  return normalizeDegrees(gmst + longitudeDeg);
}

/**
 * Calculates the Ascendant degree given the Local Sidereal Time (in degrees)
 * and the observer's latitude. Uses the standard formula:
 *   ASC = atan2(-cos(RAMC), sin(RAMC) * cos(obliquity) + tan(lat) * sin(obliquity))
 * where RAMC is the right ascension of the midheaven (= LST).
 */
function calculateAscendant(lstDeg: number, latitudeDeg: number): number {
  const obliquity = toRadians(23.4393); // approximate mean obliquity
  const ramc = toRadians(lstDeg);
  const lat = toRadians(latitudeDeg);

  const y = -Math.cos(ramc);
  const x = Math.sin(ramc) * Math.cos(obliquity) + Math.tan(lat) * Math.sin(obliquity);
  let asc = toDegrees(Math.atan2(y, x));
  return normalizeDegrees(asc);
}

/**
 * Builds a PlanetPosition for a given planet name and Julian centuries value.
 */
function buildPlanetPosition(planet: string, T: number): PlanetPosition {
  const longitude = planetLongitude(planet, T);
  const signData = getSignFromDegree(longitude);
  return {
    planet,
    sign: signData.sign,
    degree: signData.degree,
    retrograde: isRetrograde(planet, T),
  };
}

/**
 * Assigns each planet to a house (1-12) based on its ecliptic longitude
 * and the house cusp array. Uses the equal house system.
 */
function assignHouses(positions: PlanetPosition[], houseCusps: number[]): void {
  for (const pos of positions) {
    const planetLon = getAbsoluteDegree(pos.sign, pos.degree);
    let house = 12;
    for (let i = 0; i < 12; i++) {
      const nextIndex = (i + 1) % 12;
      const cuspStart = houseCusps[i];
      const cuspEnd = houseCusps[nextIndex];

      if (cuspStart <= cuspEnd) {
        if (planetLon >= cuspStart && planetLon < cuspEnd) {
          house = i + 1;
          break;
        }
      } else {
        // Wraps around 360
        if (planetLon >= cuspStart || planetLon < cuspEnd) {
          house = i + 1;
          break;
        }
      }
    }
    pos.house = house;
  }
}

/**
 * Converts a sign key and degree-within-sign back to absolute ecliptic longitude.
 */
function getAbsoluteDegree(sign: string, degree: number): number {
  const index = SIGN_KEYS.indexOf(sign);
  if (index === -1) return degree;
  return index * 30 + degree;
}

/**
 * Calculates equal house cusps starting from the Ascendant degree.
 * Returns an array of 12 cusp longitudes.
 */
function calculateHouseCusps(ascendantDeg: number): number[] {
  const cusps: number[] = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(normalizeDegrees(ascendantDeg + i * 30));
  }
  return cusps;
}

/**
 * Main function: calculates a simplified birth chart.
 *
 * @param birthDate  - The birth date as a JavaScript Date object
 * @param birthTime  - The birth time in "HH:MM" 24-hour format
 * @param latitude   - Geographic latitude of birth location
 * @param longitude  - Geographic longitude of birth location
 * @returns A complete ChartData object
 */
export function calculateBirthChart(
  birthDate: Date,
  birthTime: string,
  latitude: number,
  longitude: number
): ChartData {
  const [hours, minutes] = birthTime.split(":").map(Number);
  const hourUT = hours + minutes / 60;

  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const jd = toJulianDay(year, month, day, hourUT);
  const T = julianCenturies(jd);

  // Calculate planet positions
  const sun = buildPlanetPosition("Sun", T);
  const moon = buildPlanetPosition("Moon", T);
  const mercury = buildPlanetPosition("Mercury", T);
  const venus = buildPlanetPosition("Venus", T);
  const mars = buildPlanetPosition("Mars", T);
  const jupiter = buildPlanetPosition("Jupiter", T);
  const saturn = buildPlanetPosition("Saturn", T);
  const uranus = buildPlanetPosition("Uranus", T);
  const neptune = buildPlanetPosition("Neptune", T);
  const pluto = buildPlanetPosition("Pluto", T);

  // Calculate Ascendant and Midheaven
  const lst = localSiderealTime(jd, longitude);
  const ascDeg = calculateAscendant(lst, latitude);
  const mcDeg = normalizeDegrees(lst); // MC is approximately the LST

  const ascSign = getSignFromDegree(ascDeg);
  const mcSign = getSignFromDegree(mcDeg);

  // Calculate house cusps (equal house system)
  const houseCusps = calculateHouseCusps(ascDeg);

  // Build the position array for house assignment and aspect calculation
  const allPositions: PlanetPosition[] = [
    sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto,
  ];

  // Assign houses to each planet
  assignHouses(allPositions, houseCusps);

  // Calculate aspects between all planets
  const aspects = calculateAspects(allPositions);

  return {
    sun,
    moon,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    ascendant: { sign: ascSign.sign, degree: ascSign.degree },
    midheaven: { sign: mcSign.sign, degree: mcSign.degree },
    houses: houseCusps,
    aspects,
  };
}
