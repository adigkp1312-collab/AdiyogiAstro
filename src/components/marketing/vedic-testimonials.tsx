"use client";

import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "Priya Mehta",
    location: "Mumbai",
    text: "The birth chart reading was astonishingly accurate. It explained patterns in my life I had never understood. Truly transformative!",
    rating: 5,
    service: "Birth Chart Reading",
    avatar: "PM",
  },
  {
    name: "Arjun Kapoor",
    location: "Bangalore",
    text: "The transit forecast warned me about a challenging period at work. I was prepared and turned it into a huge opportunity.",
    rating: 5,
    service: "Transit Forecast",
    avatar: "AK",
  },
  {
    name: "Kavya Sharma",
    location: "Delhi",
    text: "Kundli matching saved my relationship. The detailed compatibility analysis gave us so much clarity and confidence.",
    rating: 5,
    service: "Kundli Matching",
    avatar: "KS",
  },
  {
    name: "Deepak Rathi",
    location: "Pune",
    text: "After years of consulting different astrologers, I finally found one that resonates with genuine depth and precision.",
    rating: 5,
    service: "Career Guidance",
    avatar: "DR",
  },
  {
    name: "Neha Trivedi",
    location: "Hyderabad",
    text: "The gemstone recommendation based on my chart brought a noticeable shift in my energy within weeks. Remarkable!",
    rating: 5,
    service: "Gemstone Consultation",
    avatar: "NT",
  },
  {
    name: "Rohit Verma",
    location: "Chennai",
    text: "The Panchang guidance for my wedding date was perfect. Everything went smoothly on the most auspicious muhurta.",
    rating: 5,
    service: "Muhurta Selection",
    avatar: "RV",
  },
];

export function VedicTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1">
            <Quote className="size-3.5 text-[#FF6600]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6600]">
              Testimonials
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What Our <span className="text-gradient-vedic">Seekers</span> Say
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Real stories from people who found clarity and transformation through Vedic astrology.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="vedic-card group p-6"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-gray-500">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Service tag */}
              <div className="mt-3">
                <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-[#FF6600]">
                  {t.service}
                </span>
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6600] to-[#FF8C00] text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
