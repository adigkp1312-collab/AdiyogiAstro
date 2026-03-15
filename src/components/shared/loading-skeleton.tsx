import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

function SkeletonPulse({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-white/5", className)}
      {...props}
    />
  );
}

/**
 * Skeleton for a horoscope card, mimicking a card with zodiac icon,
 * sign name, date range, and short reading text.
 */
export function HoroscopeCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-6">
      {/* Header: Icon + Sign name */}
      <div className="flex items-center gap-3">
        <SkeletonPulse className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <SkeletonPulse className="h-4 w-24" />
          <SkeletonPulse className="h-3 w-32" />
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Reading text lines */}
      <div className="flex flex-col gap-2">
        <SkeletonPulse className="h-3 w-full" />
        <SkeletonPulse className="h-3 w-full" />
        <SkeletonPulse className="h-3 w-4/5" />
      </div>

      {/* Footer: rating or compatibility score */}
      <div className="flex items-center gap-2 pt-2">
        <SkeletonPulse className="h-6 w-16 rounded-full" />
        <SkeletonPulse className="h-6 w-20 rounded-full" />
        <SkeletonPulse className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton for a birth/natal chart visualization area,
 * mimicking a large circular chart with side details.
 */
export function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Chart circle placeholder */}
      <div className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 p-8 lg:w-1/2">
        <SkeletonPulse className="size-64 rounded-full" />
      </div>

      {/* Chart details panel */}
      <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-6">
        {/* Title */}
        <SkeletonPulse className="h-6 w-48" />
        <Separator className="bg-white/5" />

        {/* Planet rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SkeletonPulse className="size-8 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <SkeletonPulse className="h-3.5 w-20" />
                <SkeletonPulse className="h-3 w-28" />
              </div>
            </div>
            <SkeletonPulse className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for a blog post card, mimicking a featured image,
 * title, excerpt, author, and date.
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
      {/* Featured image placeholder */}
      <SkeletonPulse className="h-48 w-full rounded-none" />

      {/* Content area */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category badge */}
        <SkeletonPulse className="h-5 w-20 rounded-full" />

        {/* Title */}
        <SkeletonPulse className="h-5 w-full" />
        <SkeletonPulse className="h-5 w-3/4" />

        {/* Excerpt */}
        <div className="flex flex-col gap-1.5 pt-1">
          <SkeletonPulse className="h-3 w-full" />
          <SkeletonPulse className="h-3 w-full" />
          <SkeletonPulse className="h-3 w-2/3" />
        </div>

        <Separator className="my-1 bg-white/5" />

        {/* Author and date */}
        <div className="flex items-center gap-3">
          <SkeletonPulse className="size-8 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <SkeletonPulse className="h-3 w-24" />
            <SkeletonPulse className="h-2.5 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
