import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const [
      totalUsers,
      freeUsers,
      premiumUsers,
      proUsers,
      totalHoroscopes,
      totalBlogPosts,
      recentMessages,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { subscriptionTier: "FREE" } }),
      prisma.user.count({ where: { subscriptionTier: "PREMIUM" } }),
      prisma.user.count({ where: { subscriptionTier: "PRO" } }),
      prisma.horoscope.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      subscribers: {
        free: freeUsers,
        premium: premiumUsers,
        pro: proUsers,
      },
      totalHoroscopes,
      totalBlogPosts,
      recentMessages,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
