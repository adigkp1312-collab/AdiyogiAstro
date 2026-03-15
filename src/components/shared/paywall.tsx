"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubscriptionTier = "FREE" | "PREMIUM" | "PRO";

interface PaywallProps {
  requiredTier: "PREMIUM" | "PRO";
  currentTier: string;
  children: React.ReactNode;
}

const tierRank: Record<string, number> = {
  FREE: 0,
  PREMIUM: 1,
  PRO: 2,
};

function hasSufficientTier(
  currentTier: string,
  requiredTier: "PREMIUM" | "PRO"
): boolean {
  const currentRank = tierRank[currentTier] ?? 0;
  const requiredRank = tierRank[requiredTier] ?? 0;
  return currentRank >= requiredRank;
}

export function Paywall({ requiredTier, currentTier, children }: PaywallProps) {
  if (hasSufficientTier(currentTier, requiredTier)) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Blurred Content Preview */}
      <div className="pointer-events-none select-none blur-md" aria-hidden="true">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
        <div className="flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-10 text-center shadow-2xl shadow-indigo-500/10">
          {/* Lock Icon */}
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 ring-1 ring-white/10">
            <Lock className="size-7 text-amber-400" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold text-white">
              {requiredTier === "PRO" ? "Pro" : "Premium"} Content
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Unlock this content with a{" "}
              <span className="font-medium text-amber-400">
                {requiredTier === "PRO" ? "Pro" : "Premium"}
              </span>{" "}
              subscription to access in-depth astrological insights.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            className="mt-2 gap-2 bg-gradient-to-r from-amber-500 to-amber-600 px-6 text-slate-900 hover:from-amber-400 hover:to-amber-500"
            size="lg"
            render={<Link href="/pricing" />}
          >
            <Sparkles className="size-4" />
            Unlock with {requiredTier === "PRO" ? "Pro" : "Premium"}
          </Button>

          {/* Current tier indicator */}
          <p className="text-xs text-slate-500">
            Current plan:{" "}
            <span className="font-medium text-slate-400">
              {currentTier || "Free"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
