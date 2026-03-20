export type Role = "USER" | "ADMIN";
export type SubscriptionTier = "FREE" | "PRO" | "PREMIUM";
export type ZodiacSign = 
  | "ARIES" | "TAURUS" | "GEMINI" | "CANCER" | "LEO" | "VIRGO"
  | "LIBRA" | "SCORPIO" | "SAGITTARIUS" | "CAPRICORN" | "AQUARIUS" | "PISCES";
export type HoroscopeType = "DAILY" | "WEEKLY" | "MONTHLY";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      subscriptionTier: string;
    };
  }
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house?: number;
  retrograde?: boolean;
}

export interface ChartData {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  ascendant: { sign: string; degree: number };
  midheaven: { sign: string; degree: number };
  houses: number[];
  aspects: Aspect[];
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}

export interface SignInfo {
  name: string;
  symbol: string;
  element: string;
  quality: string;
  ruler: string;
  dateRange: string;
  description: string;
  traits: string[];
}
