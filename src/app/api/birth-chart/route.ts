import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const birthChartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().transform((val) => new Date(val)),
  birthTime: z.string().optional(),
  birthPlace: z.string().min(1, "Birth place is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  chartData: z.record(z.string(), z.unknown()),
});

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const birthCharts = await prisma.birthChart.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(birthCharts);
  } catch (error) {
    console.error("Birth chart fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch birth charts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = birthChartSchema.parse(body);

    const birthChart = await prisma.birthChart.create({
      data: {
        userId: session.user.id,
        name: data.name,
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
        latitude: data.latitude,
        longitude: data.longitude,
        chartData: data.chartData as object,
      },
    });

    return NextResponse.json(birthChart, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Birth chart creation error:", error);
    return NextResponse.json(
      { error: "Failed to create birth chart" },
      { status: 500 }
    );
  }
}
