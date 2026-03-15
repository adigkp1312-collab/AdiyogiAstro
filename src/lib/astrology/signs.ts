import { ZODIAC_SIGNS } from "@/lib/constants";

interface SignDateRange {
  sign: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

const SIGN_DATE_RANGES: SignDateRange[] = [
  { sign: "ARIES", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: "TAURUS", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: "GEMINI", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { sign: "CANCER", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { sign: "LEO", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: "VIRGO", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: "LIBRA", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { sign: "SCORPIO", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  {
    sign: "SAGITTARIUS",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
  },
  {
    sign: "CAPRICORN",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
  },
  { sign: "AQUARIUS", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: "PISCES", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
];

export function getSignFromDate(month: number, day: number): string {
  for (const range of SIGN_DATE_RANGES) {
    if (range.startMonth === range.endMonth) {
      if (month === range.startMonth && day >= range.startDay && day <= range.endDay) {
        return range.sign;
      }
    } else if (range.startMonth > range.endMonth) {
      // Handles Capricorn which wraps around the year boundary
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return range.sign;
      }
    } else {
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return range.sign;
      }
    }
  }

  return "ARIES";
}

export function getSignInfo(sign: string) {
  return ZODIAC_SIGNS[sign] || null;
}

export function getAllSigns() {
  return Object.entries(ZODIAC_SIGNS).map(([key, value]) => ({
    key,
    ...value,
  }));
}
