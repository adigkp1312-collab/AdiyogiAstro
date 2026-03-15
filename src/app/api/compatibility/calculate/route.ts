import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateBirthChart } from "@/lib/astrology/calculator";
import { calculateCompatibility } from "@/lib/astrology/compatibility";

const personSchema = z.object({
  date: z.string().transform((val) => new Date(val)),
  time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Birth time must be in HH:MM or HH:MM:SS format"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const compatibilitySchema = z.object({
  person1: personSchema,
  person2: personSchema,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { person1, person2 } = compatibilitySchema.parse(body);

    // Calculate birth charts for both persons
    const time1 = person1.time.split(":").slice(0, 2).join(":");
    const time2 = person2.time.split(":").slice(0, 2).join(":");

    const chart1 = calculateBirthChart(person1.date, time1, person1.latitude, person1.longitude);
    const chart2 = calculateBirthChart(person2.date, time2, person2.latitude, person2.longitude);

    // Calculate compatibility
    const result = calculateCompatibility(chart1, chart2);

    return NextResponse.json({
      compatibility: result,
      person1Summary: {
        sunSign: chart1.sun.sign,
        moonSign: chart1.moon.sign,
        ascendant: chart1.ascendant.sign,
      },
      person2Summary: {
        sunSign: chart2.sun.sign,
        moonSign: chart2.moon.sign,
        ascendant: chart2.ascendant.sign,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Compatibility calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate compatibility" },
      { status: 500 }
    );
  }
}
