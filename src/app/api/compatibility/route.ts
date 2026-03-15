import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateCompatibility } from "@/lib/astrology/compatibility";
import type { ChartData } from "@/types";

const compatibilitySchema = z.object({
  chart1Id: z.string().min(1, "Chart 1 ID is required"),
  chart2Id: z.string().min(1, "Chart 2 ID is required"),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (session.user.subscriptionTier !== "PRO") {
      return NextResponse.json(
        { error: "PRO subscription required for compatibility reports" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { chart1Id, chart2Id } = compatibilitySchema.parse(body);

    const [chart1, chart2] = await Promise.all([
      prisma.birthChart.findUnique({ where: { id: chart1Id } }),
      prisma.birthChart.findUnique({ where: { id: chart2Id } }),
    ]);

    if (!chart1 || !chart2) {
      return NextResponse.json(
        { error: "One or both birth charts not found" },
        { status: 404 }
      );
    }

    const chart1Data = chart1.chartData as unknown as ChartData;
    const chart2Data = chart2.chartData as unknown as ChartData;

    const compatibilityResult = calculateCompatibility(chart1Data, chart2Data);

    const report = await prisma.compatibilityReport.create({
      data: {
        userId: session.user.id,
        chart1Id,
        chart2Id,
        reportData: JSON.parse(JSON.stringify(compatibilityResult)),
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Compatibility report error:", error);
    return NextResponse.json(
      { error: "Failed to generate compatibility report" },
      { status: 500 }
    );
  }
}
