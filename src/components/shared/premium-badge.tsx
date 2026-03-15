import { Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  tier: "PREMIUM" | "PRO";
  className?: string;
}

export function PremiumBadge({ tier, className }: PremiumBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tier === "PRO"
          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm shadow-purple-500/25"
          : "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-sm shadow-amber-500/25",
        className
      )}
    >
      {tier === "PRO" ? (
        <Crown className="size-3 fill-current" />
      ) : (
        <Star className="size-3 fill-current" />
      )}
      {tier === "PRO" ? "Pro" : "Premium"}
    </span>
  );
}
