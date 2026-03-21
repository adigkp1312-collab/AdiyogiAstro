import { SignInfo } from "@/types";

export const ZODIAC_SIGNS: Record<string, SignInfo> = {
  ARIES: {
    name: "Aries",
    symbol: "\u2648",
    element: "Fire",
    quality: "Cardinal",
    ruler: "Mars",
    dateRange: "March 21 - April 19",
    description:
      "Aries is the bold trailblazer of the zodiac, driven by courage, enthusiasm, and an unstoppable desire to lead.",
    traits: ["Courageous", "Energetic", "Competitive", "Impulsive"],
  },
  TAURUS: {
    name: "Taurus",
    symbol: "\u2649",
    element: "Earth",
    quality: "Fixed",
    ruler: "Venus",
    dateRange: "April 20 - May 20",
    description:
      "Taurus is the steadfast stabilizer of the zodiac, grounded in loyalty, sensuality, and an appreciation for life's pleasures.",
    traits: ["Reliable", "Patient", "Stubborn", "Sensual"],
  },
  GEMINI: {
    name: "Gemini",
    symbol: "\u264A",
    element: "Air",
    quality: "Mutable",
    ruler: "Mercury",
    dateRange: "May 21 - June 20",
    description:
      "Gemini is the curious communicator of the zodiac, fueled by intellectual versatility and a love of social connection.",
    traits: ["Adaptable", "Curious", "Witty", "Restless"],
  },
  CANCER: {
    name: "Cancer",
    symbol: "\u264B",
    element: "Water",
    quality: "Cardinal",
    ruler: "Moon",
    dateRange: "June 21 - July 22",
    description:
      "Cancer is the nurturing protector of the zodiac, guided by deep emotional intuition and a fierce devotion to home and family.",
    traits: ["Nurturing", "Intuitive", "Protective", "Moody"],
  },
  LEO: {
    name: "Leo",
    symbol: "\u264C",
    element: "Fire",
    quality: "Fixed",
    ruler: "Sun",
    dateRange: "July 23 - August 22",
    description:
      "Leo is the radiant performer of the zodiac, shining with confidence, generosity, and a natural magnetism that commands attention.",
    traits: ["Confident", "Generous", "Dramatic", "Loyal"],
  },
  VIRGO: {
    name: "Virgo",
    symbol: "\u264D",
    element: "Earth",
    quality: "Mutable",
    ruler: "Mercury",
    dateRange: "August 23 - September 22",
    description:
      "Virgo is the meticulous analyst of the zodiac, dedicated to service, precision, and the pursuit of practical perfection.",
    traits: ["Analytical", "Diligent", "Modest", "Perfectionist"],
  },
  LIBRA: {
    name: "Libra",
    symbol: "\u264E",
    element: "Air",
    quality: "Cardinal",
    ruler: "Venus",
    dateRange: "September 23 - October 22",
    description:
      "Libra is the graceful diplomat of the zodiac, seeking harmony, beauty, and balance in all relationships and surroundings.",
    traits: ["Diplomatic", "Charming", "Indecisive", "Fair-minded"],
  },
  SCORPIO: {
    name: "Scorpio",
    symbol: "\u264F",
    element: "Water",
    quality: "Fixed",
    ruler: "Pluto",
    dateRange: "October 23 - November 21",
    description:
      "Scorpio is the intense transformer of the zodiac, wielding emotional depth, determination, and a powerful will to uncover hidden truths.",
    traits: ["Passionate", "Resourceful", "Secretive", "Determined"],
  },
  SAGITTARIUS: {
    name: "Sagittarius",
    symbol: "\u2650",
    element: "Fire",
    quality: "Mutable",
    ruler: "Jupiter",
    dateRange: "November 22 - December 21",
    description:
      "Sagittarius is the adventurous philosopher of the zodiac, inspired by a boundless optimism and an insatiable thirst for knowledge and exploration.",
    traits: ["Optimistic", "Adventurous", "Philosophical", "Blunt"],
  },
  CAPRICORN: {
    name: "Capricorn",
    symbol: "\u2651",
    element: "Earth",
    quality: "Cardinal",
    ruler: "Saturn",
    dateRange: "December 22 - January 19",
    description:
      "Capricorn is the ambitious architect of the zodiac, building success through discipline, responsibility, and relentless perseverance.",
    traits: ["Ambitious", "Disciplined", "Pragmatic", "Reserved"],
  },
  AQUARIUS: {
    name: "Aquarius",
    symbol: "\u2652",
    element: "Air",
    quality: "Fixed",
    ruler: "Uranus",
    dateRange: "January 20 - February 18",
    description:
      "Aquarius is the visionary innovator of the zodiac, championing independence, humanitarian ideals, and unconventional thinking.",
    traits: ["Independent", "Innovative", "Humanitarian", "Detached"],
  },
  PISCES: {
    name: "Pisces",
    symbol: "\u2653",
    element: "Water",
    quality: "Mutable",
    ruler: "Neptune",
    dateRange: "February 19 - March 20",
    description:
      "Pisces is the empathic dreamer of the zodiac, navigating life through imagination, compassion, and a profound connection to the spiritual realm.",
    traits: ["Compassionate", "Artistic", "Intuitive", "Escapist"],
  },
};

export const PLANETS: string[] = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

export const ASPECTS: Record<
  string,
  { name: string; angle: number; orb: number }
> = {
  Conjunction: { name: "Conjunction", angle: 0, orb: 8 },
  Sextile: { name: "Sextile", angle: 60, orb: 6 },
  Square: { name: "Square", angle: 90, orb: 7 },
  Trine: { name: "Trine", angle: 120, orb: 8 },
  Opposition: { name: "Opposition", angle: 180, orb: 8 },
};

export const HOUSES: string[] = [
  "Self & Identity",
  "Possessions & Values",
  "Communication & Learning",
  "Home & Family",
  "Creativity & Romance",
  "Health & Service",
  "Partnerships & Marriage",
  "Transformation & Shared Resources",
  "Philosophy & Travel",
  "Career & Public Image",
  "Friendships & Community",
  "Spirituality & the Subconscious",
];

export const ELEMENTS: string[] = ["Fire", "Earth", "Air", "Water"];

export const QUALITIES: string[] = ["Cardinal", "Fixed", "Mutable"];

export const CHAT_POLL_INTERVAL_MS = 5000;
