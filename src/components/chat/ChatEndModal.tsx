'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface ChatEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration: string;
  messagesCount: number;
  amountCharged: number;
  onSubmitFeedback: (rating: number, comment?: string) => void;
}

export default function ChatEndModal({
  isOpen,
  onClose,
  duration,
  messagesCount,
  amountCharged,
  onSubmitFeedback,
}: ChatEndModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    await onSubmitFeedback(rating, comment.trim() || undefined);
    setIsSubmitting(false);
  };

  const handleSkip = () => {
    onClose();
  };

  const activeRating = hoveredStar || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-surface-card rounded-card border border-border/40 overflow-hidden shadow-elevated animate-slide-up">
        {/* Cosmic gradient header */}
        <div className="relative bg-gradient-to-br from-primary/30 via-purple-900/40 to-indigo-900/30 px-6 pt-6 pb-8 text-center">
          {/* Decorative stars */}
          <div className="absolute top-3 left-6 w-1 h-1 bg-accent rounded-full animate-pulse" />
          <div className="absolute top-5 right-10 w-1.5 h-1.5 bg-primary-light rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
          <div className="absolute bottom-4 left-12 w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1000ms' }} />

          {/* Checkmark icon */}
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-positive/20 border-2 border-positive/40 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-positive"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary">Session Complete</h3>
          <p className="text-xs text-text-secondary mt-1">Your cosmic consultation has ended</p>
        </div>

        {/* Session summary */}
        <div className="px-6 -mt-4">
          <div className="bg-surface-elevated rounded-button border border-border/30 p-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-text-primary">{duration}</p>
              <p className="text-[10px] text-text-secondary mt-0.5">Duration</p>
            </div>
            <div className="border-x border-border/30">
              <p className="text-lg font-bold text-text-primary">{messagesCount}</p>
              <p className="text-[10px] text-text-secondary mt-0.5">Messages</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">
                {amountCharged > 0 ? formatCurrency(amountCharged) : 'Free'}
              </p>
              <p className="text-[10px] text-text-secondary mt-0.5">Charged</p>
            </div>
          </div>
        </div>

        {/* Rating section */}
        <div className="px-6 pt-5 pb-2">
          <p className="text-sm font-semibold text-text-primary text-center mb-3">
            Rate This Session
          </p>

          {/* Star rating */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <svg
                  className={`w-9 h-9 transition-colors duration-200 ${
                    star <= activeRating
                      ? 'text-accent drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]'
                      : 'text-text-secondary/30'
                  }`}
                  viewBox="0 0 24 24"
                  fill={star <= activeRating ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Comment textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)..."
            rows={3}
            className="w-full bg-surface-elevated/60 border border-border/40 rounded-button px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 resize-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200"
          />
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 pt-3 flex gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={handleSkip}
            className="text-text-secondary"
          >
            Skip
          </Button>
          <Button
            variant="cosmic"
            size="md"
            fullWidth
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Submitting</span>
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
