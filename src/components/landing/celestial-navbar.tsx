"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/translations";

export function CelestialNavbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { language: activeLang, setLanguage: setActiveLang, t } = useLanguage();
  const languages = LANGUAGES.filter((l) => l.code !== "en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeLangLabel =
    activeLang === "en"
      ? "English"
      : LANGUAGES.find((l) => l.code === activeLang)?.label ?? "English";

  const navLinks = [
    { href: "#offerings", label: "Offerings" },
    { href: "#astrologer", label: "Your Guide" },
    { href: "#testimonials", label: "Journeys" },
    { href: "#zodiac", label: "Zodiac" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-celestial-gold)]/10 bg-[var(--color-cosmos-dark)]/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex size-10 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-celestial-gold)] to-[var(--color-celestial-purple)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
            <Sparkles className="relative size-6 text-[var(--color-celestial-gold)]" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white">
            Astro<span className="text-shimmer-gold">Path</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/60 transition-colors hover:text-[var(--color-celestial-gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-[var(--color-celestial-gold)]/30 hover:text-[var(--color-celestial-gold)]"
            >
              <Globe className="size-3.5" />
              <span className="hidden sm:inline">{activeLangLabel}</span>
              <ChevronDown className={`size-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-xl border border-[var(--color-celestial-gold)]/20 bg-[var(--color-cosmos-card)] py-1 shadow-xl shadow-black/40 backdrop-blur-xl">
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-celestial-gold)]/60">
                  Select Language
                </p>
                <div className="my-1 h-px bg-white/5" />
                <button
                  onClick={() => { setActiveLang("en"); setLangOpen(false); }}
                  className={`flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:bg-[var(--color-celestial-gold)]/10 ${activeLang === "en" ? "font-bold text-[var(--color-celestial-gold)]" : "text-white/70"}`}
                >
                  English
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-[var(--color-celestial-gold)]/10 ${activeLang === lang.code ? "font-bold text-[var(--color-celestial-gold)]" : "text-white/70"}`}
                  >
                    {lang.label}
                    <span className="text-[10px] text-white/30">{lang.labelEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/birth-chart/new"
            className="btn-celestial hidden rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider sm:inline-flex"
          >
            Discover Your Chart
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white/70 transition-colors hover:text-[var(--color-celestial-gold)] lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-[var(--color-cosmos-dark)]/98 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-[var(--color-celestial-gold)]/10 hover:text-[var(--color-celestial-gold)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-white/5 pt-4">
              <Link
                href="/birth-chart/new"
                onClick={() => setMobileOpen(false)}
                className="btn-celestial block rounded-full px-6 py-3 text-center text-sm font-bold uppercase tracking-wider"
              >
                Discover Your Chart
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
