import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateBirthChart } from "@/lib/astrology/calculator";

const calculateSchema = z.object({
  date: z.string().transform((val) => new Date(val)),
  time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Birth time must be in HH:MM or HH:MM:SS format"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, latitude, longitude } = calculateSchema.parse(body);

    // Strip seconds if present (calculator expects HH:MM)
    const timeHHMM = time.split(":").slice(0, 2).join(":");
    const chartData = calculateBirthChart(date, timeHHMM, latitude, longitude);

    return NextResponse.json(chartData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Birth chart calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate birth chart" },
      { status: 500 }
    );
  }
}
