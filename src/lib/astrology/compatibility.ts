import { ZODIAC_SIGNS } from "@/lib/constants";
import { ChartData, PlanetPosition } from "@/types";
import { calculateAspects } from "@/lib/astrology/aspects";

const SIGN_KEYS = Object.keys(ZODIAC_SIGNS);

interface CompatibilityCategory {
  label: string;
  score: number;
  description: string;
}

export interface CompatibilityResult {
  overallScore: number;
  categories: {
    emotional: CompatibilityCategory;
    communication: CompatibilityCategory;
    passion: CompatibilityCategory;
    overall: CompatibilityCategory;
  };
  crossAspects: ReturnType<typeof calculateAspects>;
}

/**
 * Returns the element (Fire, Earth, Air, Water) for a given sign key.
 */
function getElement(sign: string): string {
  return ZODIAC_SIGNS[sign]?.element ?? "Unknown";
}

/**
 * Returns the quality (Cardinal, Fixed, Mutable) for a given sign key.
 */
function getQuality(sign: string): string {
  return ZODIAC_SIGNS[sign]?.quality ?? "Unknown";
}

/**
 * Scores element compatibility between two signs on a 0-100 scale.
 *
 * Same element:       90-100  (natural harmony)
 * Compatible elements: 70-85  (Fire/Air, Earth/Water)
 * Neutral:            40-55   (Fire/Earth, Air/Water — less natural but workable)
 * Challenging:        20-35   (Fire/Water, Earth/Air — fundamental friction)
 */
function elementCompatibility(sign1: string, sign2: string): number {
  const el1 = getElement(sign1);
  const el2 = getElement(sign2);

  if (el1 === el2) return 92;

  const compatible: Record<string, string> = {
    Fire: "Air",
    Air: "Fire",
    Earth: "Water",
    Water: "Earth",
  };

  if (compatible[el1] === el2) return 78;

  const neutral: Record<string, string[]> = {
    Fire: ["Earth"],
    Earth: ["Air"],
    Air: ["Water"],
    Water: ["Fire"],
  };

  if (neutral[el1]?.includes(el2) || neutral[el2]?.includes(el1)) return 48;

  return 30;
}

/**
 * Scores quality compatibility between two signs.
 * Same quality signs can clash (both want the same thing).
 * Cardinal + Mutable = good flexibility.
 * Fixed + Fixed = stubborn stand-offs.
 */
function qualityCompatibility(sign1: string, sign2: string): number {
  const q1 = getQuality(sign1);
  const q2 = getQuality(sign2);

  if (q1 === q2) {
    if (q1 === "Fixed") return 40;
    if (q1 === "Cardinal") return 55;
    return 60; // Mutable + Mutable
  }

  const pair = [q1, q2].sort().join("+");
  switch (pair) {
    case "Cardinal+Mutable":
      return 75;
    case "Fixed+Mutable":
      return 70;
    case "Cardinal+Fixed":
      return 55;
    default:
      return 60;
  }
}

/**
 * Scores the angular relationship between two signs on the zodiac wheel.
 * Conjunct (same sign): high, Trine (4 signs apart): very high,
 * Sextile (2 apart): high, Square (3 apart): challenging, Opposition (6 apart): polarizing.
 */
function signAngleScore(sign1: string, sign2: string): number {
  const i1 = SIGN_KEYS.indexOf(sign1);
  const i2 = SIGN_KEYS.indexOf(sign2);
  if (i1 === -1 || i2 === -1) return 50;

  let diff = Math.abs(i1 - i2);
  if (diff > 6) diff = 12 - diff;

  switch (diff) {
    case 0:
      return 85; // Conjunction (same sign)
    case 1:
      return 50; // Semi-sextile (adjacent signs, little in common)
    case 2:
      return 78; // Sextile (friendly, communicative)
    case 3:
      return 38; // Square (tension, growth through conflict)
    case 4:
      return 90; // Trine (effortless harmony)
    case 5:
      return 45; // Quincunx (adjustment needed)
    case 6:
      return 60; // Opposition (attraction of opposites, balance possible)
    default:
      return 50;
  }
}

/**
 * Scores cross-chart aspects by examining how many harmonious vs. tense
 * aspects form between the two charts.
 */
function crossAspectScore(
  aspects: ReturnType<typeof calculateAspects>
): number {
  if (aspects.length === 0) return 50;

  let total = 0;
  for (const aspect of aspects) {
    switch (aspect.type) {
      case "Conjunction":
        total += 80;
        break;
      case "Trine":
        total += 90;
        break;
      case "Sextile":
        total += 75;
        break;
      case "Square":
        total += 35;
        break;
      case "Opposition":
        total += 50;
        break;
      default:
        total += 50;
    }
  }

  return Math.min(100, Math.max(0, Math.round(total / aspects.length)));
}

/**
 * Generates a text interpretation for a numeric score in a given category.
 */
function interpret(category: string, score: number): string {
  if (score >= 80) {
    switch (category) {
      case "emotional":
        return "Your emotional wavelengths are deeply attuned. You naturally understand each other's needs and provide the comfort and security that fosters lasting intimacy.";
      case "communication":
        return "Conversation flows effortlessly between you. Ideas spark easily, and you feel genuinely heard and intellectually stimulated by each other.";
      case "passion":
        return "There is a powerful magnetic attraction between you. Physical chemistry and shared desire create an exciting, vibrant dynamic.";
      case "overall":
        return "This is a highly compatible pairing with strong potential for a fulfilling, lasting relationship built on mutual respect and shared values.";
      default:
        return "Excellent compatibility in this area.";
    }
  } else if (score >= 60) {
    switch (category) {
      case "emotional":
        return "You share a solid emotional foundation with room for growth. While some feelings may need more explicit expression, the warmth between you is genuine.";
      case "communication":
        return "You communicate well on most topics, though some subjects may require extra patience. Learning each other's conversational style will strengthen your bond.";
      case "passion":
        return "Attraction is present and can deepen over time. Exploring each other's desires with openness will unlock greater physical connection.";
      case "overall":
        return "A good match with meaningful compatibility. Differences exist but can be bridged with mutual effort and understanding.";
      default:
        return "Good compatibility with room for growth.";
    }
  } else if (score >= 40) {
    switch (category) {
      case "emotional":
        return "Emotional connection requires conscious effort. You may process feelings differently, but this contrast can teach valuable lessons about empathy and vulnerability.";
      case "communication":
        return "Misunderstandings may arise from different communication styles. Patience and active listening will be key to navigating conversations smoothly.";
      case "passion":
        return "Physical chemistry may build gradually rather than ignite instantly. Patience and mutual exploration can uncover deeper layers of attraction.";
      case "overall":
        return "A moderately compatible pairing that can work with dedication. The differences between you offer opportunities for significant personal growth.";
      default:
        return "Moderate compatibility that benefits from effort.";
    }
  } else {
    switch (category) {
      case "emotional":
        return "Emotional rhythms differ significantly. Building understanding will require deliberate effort, but the contrast can lead to profound personal transformation.";
      case "communication":
        return "Communication styles may clash, leading to frequent misunderstandings. Establishing clear, compassionate dialogue practices early on is essential.";
      case "passion":
        return "Physical connection may feel unpredictable. The tension between you can be channeled into a dynamic, if sometimes challenging, attraction.";
      case "overall":
        return "A challenging pairing that demands significant compromise. While difficult, these relationships can be the most transformative when both partners commit to growth.";
      default:
        return "Challenging compatibility that requires commitment.";
    }
  }
}

/**
 * Builds cross-chart planet positions by combining planets from both charts
 * into a single array tagged with person identifiers so calculateAspects
 * can find inter-chart aspects.
 */
function buildCrossChartPositions(
  chart1: ChartData,
  chart2: ChartData
): PlanetPosition[] {
  const planets = [
    "sun", "moon", "mercury", "venus", "mars",
    "jupiter", "saturn", "uranus", "neptune", "pluto",
  ] as const;

  const positions: PlanetPosition[] = [];
  for (const p of planets) {
    const pos1 = chart1[p];
    positions.push({ ...pos1, planet: `P1_${pos1.planet}` });
  }
  for (const p of planets) {
    const pos2 = chart2[p];
    positions.push({ ...pos2, planet: `P2_${pos2.planet}` });
  }
  return positions;
}

/**
 * Filters aspects to only include cross-chart aspects (P1 planet to P2 planet).
 */
function filterCrossAspects(
  aspects: ReturnType<typeof calculateAspects>
): ReturnType<typeof calculateAspects> {
  return aspects.filter((a) => {
    const p1IsChart1 = a.planet1.startsWith("P1_");
    const p2IsChart2 = a.planet2.startsWith("P2_");
    const p1IsChart2 = a.planet1.startsWith("P2_");
    const p2IsChart1 = a.planet2.startsWith("P1_");
    return (p1IsChart1 && p2IsChart2) || (p1IsChart2 && p2IsChart1);
  }).map((a) => ({
    ...a,
    planet1: a.planet1.replace(/^P[12]_/, ""),
    planet2: a.planet2.replace(/^P[12]_/, ""),
  }));
}

/**
 * Calculates the compatibility between two birth charts.
 *
 * The result includes an overall score (0-100), per-category scores with
 * descriptions, and the list of cross-chart aspects found.
 */
export function calculateCompatibility(
  chart1: ChartData,
  chart2: ChartData
): CompatibilityResult {
  // --- Emotional score (Moon-Moon, Moon-Sun cross-aspects, element compatibility of Moons) ---
  const moonMoonElement = elementCompatibility(chart1.moon.sign, chart2.moon.sign);
  const moonMoonAngle = signAngleScore(chart1.moon.sign, chart2.moon.sign);
  const moonSunCross1 = signAngleScore(chart1.moon.sign, chart2.sun.sign);
  const moonSunCross2 = signAngleScore(chart2.moon.sign, chart1.sun.sign);
  const emotionalRaw = (moonMoonElement * 0.3 + moonMoonAngle * 0.3 + moonSunCross1 * 0.2 + moonSunCross2 * 0.2);
  const emotionalScore = Math.round(emotionalRaw);

  // --- Communication score (Mercury-Mercury, Mercury-Sun, quality compatibility) ---
  const mercMercElement = elementCompatibility(chart1.mercury.sign, chart2.mercury.sign);
  const mercMercAngle = signAngleScore(chart1.mercury.sign, chart2.mercury.sign);
  const mercSunCross1 = signAngleScore(chart1.mercury.sign, chart2.sun.sign);
  const mercSunCross2 = signAngleScore(chart2.mercury.sign, chart1.sun.sign);
  const qualityScore = qualityCompatibility(chart1.sun.sign, chart2.sun.sign);
  const communicationRaw =
    mercMercElement * 0.25 +
    mercMercAngle * 0.25 +
    mercSunCross1 * 0.15 +
    mercSunCross2 * 0.15 +
    qualityScore * 0.2;
  const communicationScore = Math.round(communicationRaw);

  // --- Passion score (Venus-Mars cross aspects, Sun-Sun element, Mars-Mars) ---
  const venusMars1 = signAngleScore(chart1.venus.sign, chart2.mars.sign);
  const venusMars2 = signAngleScore(chart2.venus.sign, chart1.mars.sign);
  const sunSunElement = elementCompatibility(chart1.sun.sign, chart2.sun.sign);
  const marsMarsAngle = signAngleScore(chart1.mars.sign, chart2.mars.sign);
  const passionRaw =
    venusMars1 * 0.3 + venusMars2 * 0.3 + sunSunElement * 0.2 + marsMarsAngle * 0.2;
  const passionScore = Math.round(passionRaw);

  // --- Cross-chart aspects score ---
  const allCrossPositions = buildCrossChartPositions(chart1, chart2);
  const allAspects = calculateAspects(allCrossPositions);
  const crossAspects = filterCrossAspects(allAspects);
  const aspectScore = crossAspectScore(crossAspects);

  // --- Overall score: weighted combination ---
  const overallRaw =
    emotionalScore * 0.3 +
    communicationScore * 0.2 +
    passionScore * 0.25 +
    aspectScore * 0.25;
  const overallScore = Math.round(overallRaw);

  return {
    overallScore,
    categories: {
      emotional: {
        label: "Emotional",
        score: emotionalScore,
        description: interpret("emotional", emotionalScore),
      },
      communication: {
        label: "Communication",
        score: communicationScore,
        description: interpret("communication", communicationScore),
      },
      passion: {
        label: "Passion",
        score: passionScore,
        description: interpret("passion", passionScore),
      },
      overall: {
        label: "Overall",
        score: overallScore,
        description: interpret("overall", overallScore),
      },
    },
    crossAspects,
  };
}
