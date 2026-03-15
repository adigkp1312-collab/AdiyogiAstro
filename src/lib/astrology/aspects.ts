import { ASPECTS, ZODIAC_SIGNS } from "@/lib/constants";
import { PlanetPosition, Aspect } from "@/types";

const SIGN_KEYS = Object.keys(ZODIAC_SIGNS);

/**
 * Converts a PlanetPosition (sign key + degree within sign) to an absolute
 * ecliptic longitude in degrees (0-360).
 */
function toAbsoluteDegree(position: PlanetPosition): number {
  const signIndex = SIGN_KEYS.indexOf(position.sign);
  if (signIndex === -1) return position.degree;
  return signIndex * 30 + position.degree;
}

/**
 * Calculates the smallest angular difference between two ecliptic longitudes.
 * The result is always in the range [0, 180].
 */
function angleDifference(a: number, b: number): number {
  let diff = Math.abs(a - b) % 360;
  if (diff > 180) {
    diff = 360 - diff;
  }
  return diff;
}

/**
 * Compares every pair of planet positions and checks whether the angular
 * difference between them falls within the orb of any known aspect type.
 * Returns a list of all aspects found.
 */
export function calculateAspects(positions: PlanetPosition[]): Aspect[] {
  const aspects: Aspect[] = [];

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const pos1 = positions[i];
      const pos2 = positions[j];

      const deg1 = toAbsoluteDegree(pos1);
      const deg2 = toAbsoluteDegree(pos2);
      const diff = angleDifference(deg1, deg2);

      for (const [, aspectDef] of Object.entries(ASPECTS)) {
        const orb = Math.abs(diff - aspectDef.angle);
        if (orb <= aspectDef.orb) {
          aspects.push({
            planet1: pos1.planet,
            planet2: pos2.planet,
            type: aspectDef.name,
            angle: parseFloat(diff.toFixed(2)),
            orb: parseFloat(orb.toFixed(2)),
          });
          break; // a pair can only form one aspect (take the closest match)
        }
      }
    }
  }

  return aspects;
}
