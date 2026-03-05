'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { exploreFeatures } from '@/lib/mock-data';

export default function ExploreMoreGrid() {
  return (
    <div className="mx-4 grid grid-cols-2 gap-3">
      {exploreFeatures.map((feature) => {
        const content = (
          <div
            className={`relative bg-gradient-to-br ${feature.gradient} rounded-card p-4 h-[140px] flex flex-col justify-between overflow-hidden ${
              feature.comingSoon ? 'opacity-80' : 'hover:shadow-elevated transition-shadow cursor-pointer'
            }`}
          >
            {/* Colored Icon */}
            <div className={`absolute right-2 top-2 w-11 h-11 ${feature.iconBg || 'bg-white/20'} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
              {feature.icon}
            </div>

            <div className="pr-12">
              <h3 className="text-white font-bold text-sm">{feature.title}</h3>
              <p className="text-white/80 text-xs mt-0.5">{feature.subtitle}</p>
            </div>

            <div>
              {feature.comingSoon ? (
                <Badge variant="info" size="sm">Coming Soon</Badge>
              ) : feature.badge ? (
                <Badge variant="free" size="sm">{feature.badge}</Badge>
              ) : null}
            </div>
          </div>
        );

        if (feature.href && !feature.comingSoon) {
          return (
            <Link key={feature.title} href={feature.href}>
              {content}
            </Link>
          );
        }

        return <div key={feature.title}>{content}</div>;
      })}
    </div>
  );
}
