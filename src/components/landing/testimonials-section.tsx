"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya M.",
    location: "Mumbai",
    text: "The birth chart reading was astonishingly accurate. It explained patterns in my life I had never understood before. Truly a transformative experience.",
    rating: 5,
    service: "Birth Chart Reading",
    avatar: "PM",
  },
  {
    name: "Arjun K.",
    location: "Bangalore",
    text: "The transit forecast warned me about a challenging period at work. I was prepared and turned it into an opportunity. The guidance was invaluable.",
    rating: 5,
    service: "Transit Forecast",
    avatar: "AK",
  },
  {
    name: "Kavya S.",
    location: "Delhi",
    text: "The moon ritual guidance changed my spiritual practice completely. Every full moon now feels like a sacred ceremony. I feel more aligned than ever.",
    rating: 5,
    service: "Moon Rituals",
    avatar: "KS",
  },
  {
    name: "Deepak R.",
    location: "Pune",
    text: "After years of consulting different astrologers, I finally found one that resonates with depth and precision. The compatibility reading saved my relationship.",
    rating: 5,
    service: "Compatibility Report",
    avatar: "DR",
  },
  {
    name: "Neha T.",
    location: "Hyderabad",
    text: "I was skeptical at first, but the career guidance based on my chart proved remarkably accurate. I made a career shift that has brought me so much joy.",
    rating: 5,
    service: "Career Guidance",
    avatar: "NT",
  },
  {
    name: "Rohit V.",
    location: "Chennai",
    text: "The gemstone recommendation based on my chart brought a noticeable shift in my energy. The level of detail and care in every reading is extraordinary.",
    rating: 5,
    service: "Gemstone Consultation",
    avatar: "RV",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-[var(--color-cosmos-deeper)] py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(67,56,202,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-celestial-gold)]/60">
            Soul Journeys
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Voices from the <span className="text-shimmer-gold">Cosmos</span>
          </h2>
          <p className="mt-4 text-base text-white/40">
            Real stories from seekers who found clarity, purpose, and alignment
            through their cosmic readings.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass-card glass-card-hover group rounded-2xl p-6 transition-all duration-500 sm:p-8"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="size-3.5 fill-[var(--color-celestial-gold)] text-[var(--color-celestial-gold)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-white/50">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Service tag */}
              <div className="mt-4">
                <span className="rounded-full border border-[var(--color-celestial-purple)]/20 bg-[var(--color-celestial-purple)]/10 px-2.5 py-1 text-[10px] font-medium text-[var(--color-celestial-violet)]">
                  {t.service}
                </span>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-celestial-gold)]/20 to-[var(--color-celestial-purple)]/20 text-sm font-bold text-[var(--color-celestial-gold)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">{t.name}</p>
                  <p className="text-xs text-white/30">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
