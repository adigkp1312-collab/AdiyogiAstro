'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Star background component ───
function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />
      <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" />
      {/* Tiny stars */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.6 + 0.1,
            animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Download', href: '#download' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-text-primary tracking-wide">
              Nakshatra
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>
            <a
              href="#download"
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white px-6 py-2.5 rounded-pill text-sm font-semibold transition-all duration-300 shadow-glow hover:shadow-elevated"
            >
              Get the App
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-slide-up">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/auth/login" className="text-sm text-text-secondary text-center py-2">
                Sign In
              </Link>
              <a
                href="#download"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-pill text-sm font-semibold text-center"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ───
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <StarField />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-surface-card/80 backdrop-blur border border-border/50 rounded-pill px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-positive rounded-full animate-pulse" />
              <span className="text-xs font-medium text-text-secondary">
                Trusted by 15 Lakh+ Users
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6 animate-slide-up">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
                Vedic Astrology
              </span>{' '}
              Guide
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
              Discover your life journey with AI-powered Vedic astrology. Get personalized
              horoscopes, Dasha insights, Kundli charts, and consult with verified astrologers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
              <a
                href="#download"
                className="group bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white px-8 py-4 rounded-pill text-base font-semibold transition-all duration-300 shadow-glow hover:shadow-elevated flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Download Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/auth/login"
                className="border border-border hover:border-primary/50 text-text-primary px-8 py-4 rounded-pill text-base font-semibold transition-all duration-300 hover:bg-surface-card flex items-center justify-center gap-2"
              >
                Try Web App
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['bg-primary', 'bg-accent', 'bg-positive', 'bg-primary-light'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                      {['N', 'A', 'R', 'S'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">100+ Verified Astrologers</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-text-secondary ml-1">4.8/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="flex justify-center lg:justify-end animate-float">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-primary/20 rounded-[40px] blur-[60px] scale-110" />
              {/* Phone frame */}
              <div className="relative w-[280px] sm:w-[300px] h-[580px] sm:h-[620px] bg-gradient-to-b from-surface-card to-surface-elevated rounded-[40px] border-2 border-border/80 shadow-elevated overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-[10px] text-text-secondary">9:41</span>
                  <div className="w-20 h-5 bg-background rounded-full" />
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 border border-text-secondary/50 rounded-sm">
                      <div className="w-1.5 h-full bg-positive rounded-sm" />
                    </div>
                  </div>
                </div>
                {/* App content mockup */}
                <div className="px-5 pt-2 space-y-4">
                  {/* Greeting */}
                  <div>
                    <p className="text-xs text-accent font-medium">Namaste</p>
                    <p className="text-lg font-bold text-text-primary">Good Morning</p>
                  </div>
                  {/* Dasha card */}
                  <div className="bg-background/50 backdrop-blur rounded-2xl p-4 border border-border/30">
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">Current Dasha</p>
                    <p className="text-sm font-semibold text-primary-light mt-1">Mercury Pratyantardasha</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full" />
                      <span className="text-xs text-text-secondary">Influenced by Mercury</span>
                    </div>
                  </div>
                  {/* Horoscope card */}
                  <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-4 border border-primary/20">
                    <p className="text-[10px] text-accent uppercase tracking-wider font-semibold">Today&apos;s Horoscope</p>
                    <p className="text-sm font-bold text-text-primary mt-1">A Day for Gentle Release</p>
                    <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-3">
                      The stars align to bring clarity and peace to your journey today...
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <span className="text-accent text-sm">7</span>
                        <span className="text-[10px] text-text-secondary">Lucky No.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-[10px] text-text-secondary">Lucky Color</span>
                      </div>
                    </div>
                  </div>
                  {/* Life areas */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: '❤️', label: 'Love', color: 'text-positive' },
                      { icon: '💼', label: 'Career', color: 'text-accent' },
                      { icon: '💰', label: 'Money', color: 'text-positive' },
                      { icon: '🛡️', label: 'Health', color: 'text-primary-light' },
                    ].map((area) => (
                      <div key={area.label} className="bg-background/30 rounded-xl p-2 text-center border border-border/20">
                        <span className="text-lg">{area.icon}</span>
                        <p className="text-[9px] text-text-secondary mt-1">{area.label}</p>
                        <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${area.color === 'text-positive' ? 'bg-positive' : area.color === 'text-accent' ? 'bg-accent' : 'bg-primary-light'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─── Features Section ───
const features = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: 'Daily Horoscope',
    desc: 'Personalized predictions based on your birth chart and real-time planetary positions. Not generic sun-sign readings.',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'Dasha Insights',
    desc: 'Deep Vedic Dasha system predictions for each life phase - Love, Career, Money, and Health with precise timelines.',
    color: 'from-purple-500/20 to-violet-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Talk to Astrologers',
    desc: 'Consult with 100+ verified human astrologers via chat or call. Available 24/7 in multiple Indian languages.',
    color: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AI Astrologer',
    desc: 'Get instant answers from our AI-powered astrologer. Smart, empathetic, and available anytime - completely free.',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    title: 'Panchang & Muhurat',
    desc: 'Daily Tithi, Nakshatra, auspicious timings, Rahu Kaal, and festival calendar with accurate Hindu Panchang data.',
    color: 'from-indigo-500/20 to-purple-500/10',
    borderColor: 'border-indigo-500/20',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Kundli & Charts',
    desc: 'Generate detailed birth charts with house analysis, planetary positions, Doshas, Yogas, and strengths - exportable as PDF.',
    color: 'from-rose-500/20 to-pink-500/10',
    borderColor: 'border-rose-500/20',
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="section-divider">
            <span className="section-label">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-4">
            Everything You Need in{' '}
            <span className="text-glow text-primary-light">One App</span>
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
            From daily horoscopes to deep Vedic analysis, Nakshatra brings ancient wisdom
            to your fingertips with modern AI technology.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group glass-card p-6 sm:p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-glow hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.borderColor} flex items-center justify-center text-primary-light mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ───
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Enter Birth Details',
      desc: 'Provide your date, time, and place of birth for accurate Vedic chart calculations.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Get Your Kundli',
      desc: 'We generate your complete birth chart with Dasha periods, planetary positions, and Nakshatras.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Explore Predictions',
      desc: 'Receive daily personalized horoscopes and life insights for Love, Career, Money, and Health.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Talk to Experts',
      desc: 'Need deeper guidance? Chat or call our verified astrologers anytime for personalized advice.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-surface/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-divider">
            <span className="section-label">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-4">
            Start Your{' '}
            <span className="text-glow-gold text-accent">Cosmic Journey</span>
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
            Get started in minutes. No complex setup - just your birth details and
            the stars do the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-surface-card to-surface-elevated border border-border/50 text-primary-light mb-6 group-hover:shadow-glow group-hover:border-primary/40 transition-all duration-300">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-glow-sm">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About / Life Areas Section ───
function AboutSection() {
  const lifeAreas = [
    { icon: '❤️', label: 'Love', desc: 'Relationship compatibility, love predictions, and guidance for your romantic life.', status: 'Favourable', color: 'bg-positive' },
    { icon: '💼', label: 'Career', desc: 'Career growth predictions, recognition timing, and professional opportunities.', status: 'Favourable', color: 'bg-positive' },
    { icon: '💰', label: 'Money', desc: 'Financial forecasts, investment timings, and wealth accumulation insights.', status: 'Neutral', color: 'bg-accent' },
    { icon: '🛡️', label: 'Health', desc: 'Health awareness, energy levels, wellness guidance, and body signals.', status: 'Favourable', color: 'bg-positive' },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <div className="section-divider justify-start">
              <span className="section-label">Discover Your Life</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-6">
              Deep Insights Across{' '}
              <span className="text-primary-light">Every Life Area</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Nakshatra analyzes your Vedic Dasha periods to provide detailed predictions
              across four key areas of your life. Each prediction adapts as planets transition,
              giving you real-time guidance.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">15L+</p>
                <p className="text-xs text-text-secondary mt-1">Secured Chats</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-primary-light">100+</p>
                <p className="text-xs text-text-secondary mt-1">Astrologers</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-positive">10+</p>
                <p className="text-xs text-text-secondary mt-1">Languages</p>
              </div>
            </div>

            <a
              href="#download"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-pill text-sm font-semibold shadow-glow hover:shadow-elevated transition-all duration-300"
            >
              Explore Your Life
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right - Life Area Cards */}
          <div className="grid grid-cols-2 gap-4">
            {lifeAreas.map((area, index) => (
              <div
                key={index}
                className="glass-card p-5 hover:border-primary/40 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{area.icon}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${area.color}`}>
                    {area.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{area.label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ───
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      text: 'The daily horoscope is incredibly accurate. It feels like the app truly knows my life situation. The Dasha predictions have been spot on!',
      rating: 5,
      avatar: 'PS',
    },
    {
      name: 'Rahul Verma',
      location: 'Mumbai',
      text: 'I was skeptical at first, but the career predictions helped me make a crucial job change at the right time. The AI astrologer is amazing.',
      rating: 5,
      avatar: 'RV',
    },
    {
      name: 'Anita Patel',
      location: 'Ahmedabad',
      text: 'Love the Panchang feature! I check Muhurat timings daily before important tasks. The interface is beautiful and so easy to use.',
      rating: 5,
      avatar: 'AP',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-divider">
            <span className="section-label">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-4">
            Loved by{' '}
            <span className="text-accent">Thousands</span>
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
            Join a growing community of users who trust Nakshatra for their daily guidance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="glass-card p-6 sm:p-8 hover:border-primary/40 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Download CTA Section ───
function DownloadSection() {
  return (
    <section id="download" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-8 sm:p-12 lg:p-16 border-primary/20">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-float">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Begin Your Cosmic Journey
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Download Nakshatra for free and unlock personalized Vedic astrology insights.
            Your stars are waiting.
          </p>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/adigkp1312-collab/AdiyogiAstro"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white px-8 py-4 rounded-pill text-base font-semibold transition-all duration-300 shadow-glow hover:shadow-elevated flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Get on Google Play
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <Link
              href="/auth/login"
              className="border border-border hover:border-primary/50 text-text-primary px-8 py-4 rounded-pill text-base font-semibold transition-all duration-300 hover:bg-surface-card flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Try Web Version
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-text-secondary">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-positive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free to Download
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-positive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              DPIIT Recognized
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-positive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Made in India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-text-primary">Nakshatra</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Your personal Vedic astrology guide. Made in India, for the world.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <svg className="w-4 h-4 text-positive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              DPIIT #StartupIndia Certified
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-3">
              {['Daily Horoscope', 'Kundli Charts', 'Panchang', 'Dasha Predictions', 'AI Astrologer', 'Muhurat Finder'].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Data Deletion', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Nakshatra. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/adigkp1312-collab/AdiyogiAstro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Landing Page ───
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />
      <TestimonialsSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}
