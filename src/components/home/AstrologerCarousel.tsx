'use client';

import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockAstrologers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function AstrologerCarousel() {
  return (
    <div className="overflow-x-auto scrollbar-hide px-4">
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        {mockAstrologers.map((astrologer) => (
          <div
            key={astrologer.id}
            className="bg-surface-card rounded-card shadow-card p-3 w-[160px] flex-shrink-0 border border-border/40 hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300"
          >
            {/* Free chat badge for AI */}
            {astrologer.is_ai && (
              <div className="bg-gradient-to-r from-positive to-emerald-400 text-white text-[9px] font-bold text-center py-0.5 -mx-3 -mt-3 rounded-t-card mb-2">
                1 CHAT FREE!
              </div>
            )}

            {/* Discount badge */}
            {astrologer.discount_percent > 0 && !astrologer.is_ai && (
              <div className="flex justify-end -mt-1 mb-1">
                <Badge variant="discount" size="sm">{astrologer.discount_percent}% OFF</Badge>
              </div>
            )}

            <div className="flex flex-col items-center">
              <Avatar
                name={astrologer.name}
                size="lg"
                isAI={astrologer.is_ai}
              />
              <div className="flex items-center gap-1 mt-2">
                <h4 className="text-xs font-semibold text-text-primary text-center line-clamp-1">
                  {astrologer.name}
                </h4>
                {astrologer.is_verified && (
                  <svg className="w-3.5 h-3.5 text-primary-light flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L13.09 4.26L15.5 3.42L14.68 5.82L17 6.5L15.5 8.5L17.5 10.5L15 11L15.5 13.5L13.09 12.68L12 15L10.91 12.68L8.5 13.5L9 11L6.5 10.5L8.5 8.5L7 6.5L9.32 5.82L8.5 3.42L10.91 4.26L12 2Z" />
                  </svg>
                )}
              </div>
              <p className="text-[10px] text-text-secondary text-center mt-0.5">
                {astrologer.specializations.join(', ')}
              </p>
              {astrologer.experience_years && (
                <p className="text-[10px] text-text-secondary">
                  {astrologer.experience_years} Yrs Exp
                </p>
              )}

              {/* Pricing */}
              <div className="mt-1.5 text-center">
                {astrologer.price_per_min ? (
                  <div>
                    {astrologer.discount_percent > 0 && (
                      <span className="text-[10px] text-text-secondary line-through mr-1">
                        Rs.{Math.round(astrologer.price_per_min / (1 - astrologer.discount_percent / 100))}
                      </span>
                    )}
                    <span className="text-xs font-bold text-accent">
                      {formatCurrency(astrologer.price_per_min)}/min
                    </span>
                  </div>
                ) : (
                  <div>
                    {astrologer.discount_percent === 100 ? (
                      <span className="text-xs font-bold text-positive">FREE</span>
                    ) : (
                      <span className="text-xs font-bold text-accent">
                        {formatCurrency(astrologer.price_per_chat || 0)}/chat
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5 mt-2 w-full">
                {astrologer.price_per_min && (
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] py-1">
                    <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.69 2.36a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.76.33 1.55.56 2.36.68A2 2 0 0122 16.92z" />
                    </svg>
                    Call
                  </Button>
                )}
                <Button variant="primary" size="sm" className="flex-1 text-[10px] py-1">
                  <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                  </svg>
                  Chat
                </Button>
              </div>

              {/* Orders count */}
              <p className="text-[9px] text-text-secondary mt-1.5">
                {astrologer.total_orders > 0
                  ? `${astrologer.total_orders}+ orders`
                  : `${(astrologer as unknown as { total_chats?: number }).total_chats || 0}+ chats`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
