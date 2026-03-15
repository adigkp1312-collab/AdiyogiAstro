import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ZodiacSign, HoroscopeType } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get("sign") as ZodiacSign | null;
    const type = searchParams.get("type") as HoroscopeType | null;
    const date = searchParams.get("date");

    const session = await auth();
    const userTier = session?.user?.subscriptionTier ?? "FREE";

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (sign) {
      where.sign = sign;
    }

    if (type) {
      where.type = type;
    }

    if (date) {
      where.publishDate = new Date(date);
    }

    const horoscopes = await prisma.horoscope.findMany({
      where,
      orderBy: { publishDate: "desc" },
      take: 50,
    });

    const result = horoscopes.map((horoscope) => {
      const isPremiumUser = userTier === "PREMIUM" || userTier === "PRO";
      return {
        id: horoscope.id,
        sign: horoscope.sign,
        type: horoscope.type,
        title: horoscope.title,
        content: horoscope.content,
        premiumContent: isPremiumUser ? horoscope.premiumContent : null,
        publishDate: horoscope.publishDate,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Horoscopes fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch horoscopes" },
      { status: 500 }
    );
  }
}
