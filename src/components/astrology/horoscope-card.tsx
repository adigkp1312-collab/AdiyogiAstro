import Link from "next/link";
import { cn } from "@/lib/utils";

interface HoroscopeCardProps {
  sign: string;
  name: string;
  symbol: string;
  element: string;
  dateRange: string;
  excerpt: string;
}

const elementColors: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  Fire: {
    bg: "from-red-500/10 to-orange-500/10",
    border: "border-red-500/20 hover:border-red-500/40",
    text: "text-red-400",
    badge: "bg-red-500/15 text-red-400 ring-red-500/20",
    glow: "group-hover:shadow-red-500/10",
  },
  Earth: {
    bg: "from-emerald-500/10 to-amber-700/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    text: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/10",
  },
  Air: {
    bg: "from-sky-500/10 to-cyan-500/10",
    border: "border-sky-500/20 hover:border-sky-500/40",
    text: "text-sky-400",
    badge: "bg-sky-500/15 text-sky-400 ring-sky-500/20",
    glow: "group-hover:shadow-sky-500/10",
  },
  Water: {
    bg: "from-blue-500/10 to-purple-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    text: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
    glow: "group-hover:shadow-blue-500/10",
  },
};

export function HoroscopeCard({
  sign,
  name,
  symbol,
  element,
  dateRange,
  excerpt,
}: HoroscopeCardProps) {
  const colors = elementColors[element] ?? elementColors.Fire;

  return (
    <Link
      href={`/horoscopes/${sign.toLowerCase()}`}
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-gradient-to-br p-6 transition-all duration-300",
        colors.border,
        colors.bg,
        "shadow-lg group-hover:shadow-xl",
        colors.glow
      )}
    >
      {/* Header: Symbol + Name */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-2xl ring-1",
            colors.badge
          )}
        >
          {symbol}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-xs text-slate-400">{dateRange}</p>
        </div>
      </div>

      {/* Element Badge */}
      <span
        className={cn(
          "w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
          colors.badge
        )}
      >
        {element}
      </span>

      {/* Excerpt */}
      <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">
        {excerpt}
      </p>

      {/* Read More */}
      <span
        className={cn(
          "mt-auto text-sm font-medium transition-colors",
          colors.text,
          "group-hover:underline"
        )}
      >
        Read More &rarr;
      </span>
    </Link>
  );
}
