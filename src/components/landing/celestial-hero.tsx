"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initStars() {
      stars.length = 0;
      const count = Math.min(200, Math.floor((canvas!.offsetWidth * canvas!.offsetHeight) / 3000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.offsetWidth,
          y: Math.random() * canvas!.offsetHeight,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const star of stars) {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) star.twinkleSpeed *= -1;
        star.y += star.speed;
        if (star.y > canvas.offsetHeight) {
          star.y = 0;
          star.x = Math.random() * canvas.offsetWidth;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`;
        ctx.fill();

        // Glow effect for larger stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${star.opacity * 0.1})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    window.addEventListener("resize", () => { resize(); initStars(); });
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export function CelestialHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-cosmos-deeper)]">
      {/* Animated starfield */}
      <StarField />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(123,47,190,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(67,56,202,0.1)_0%,_transparent_40%)]" />

      {/* Orbiting celestial body */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow relative size-[500px] opacity-20 sm:size-[600px] lg:size-[700px]">
          <div className="absolute inset-0 rounded-full border border-[var(--color-celestial-gold)]/20" />
          <div className="absolute inset-8 rounded-full border border-[var(--color-celestial-purple)]/15" />
          <div className="absolute inset-16 rounded-full border border-[var(--color-celestial-violet)]/10" />
          {/* Orbiting dots */}
          <div className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--color-celestial-gold)]" />
          <div className="absolute right-8 top-8 size-1.5 rounded-full bg-[var(--color-celestial-violet)]" />
          <div className="absolute bottom-12 left-12 size-1 rounded-full bg-[var(--color-celestial-rose)]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-celestial-gold)]/20 bg-[var(--color-celestial-gold)]/5 px-4 py-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-celestial-gold)]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-celestial-gold)]">
            The Stars Are Calling
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="animate-fade-up delay-200 text-4xl font-bold leading-tight tracking-tight text-white opacity-0 sm:text-6xl lg:text-7xl">
          Unlock the Secrets of
          <br />
          <span className="text-celestial-gradient">Your Cosmic Blueprint</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up delay-400 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 opacity-0 sm:text-xl">
          Journey through the celestial realms to discover your true purpose.
          Personalized birth chart readings, planetary transit forecasts,
          and guided moon rituals for your spiritual awakening.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up delay-500 mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row">
          <Link
            href="/birth-chart/new"
            className="btn-celestial group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest"
          >
            <span>Discover Your Chart</span>
            <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="#offerings"
            className="btn-celestial-outline inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm uppercase tracking-widest"
          >
            Explore Offerings
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-up delay-700 mt-16 flex flex-wrap items-center justify-center gap-8 opacity-0">
          <div className="flex items-center gap-2 text-white/30">
            <svg className="size-5 text-[var(--color-celestial-gold)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">50,000+ Readings</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <svg className="size-5 text-[var(--color-celestial-violet)]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Vedic Accuracy</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <svg className="size-5 text-[var(--color-celestial-rose)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm">10,000+ Seekers</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-cosmos-dark)] to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-[var(--color-celestial-gold)]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
