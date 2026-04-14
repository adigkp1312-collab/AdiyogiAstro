"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  Shield,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Globe,
} from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  subscriptionTier?: string;
}

interface NavbarProps {
  session?: {
    user: SessionUser;
  } | null;
}

const mainNavLinkKeys = [
  { href: "/", key: "nav.home" },
  { href: "/horoscopes", key: "nav.horoscope" },
  { href: "/birth-chart/new", key: "nav.astrology" },
  { href: "/panchang", key: "nav.panchang" },
  { href: "/festivals", key: "nav.festivals" },
  { href: "/compatibility", key: "nav.compatibility" },
  { href: "/pricing", key: "nav.calculators" },
] as const;

const secondaryLinkKeys = [
  { href: "/birth-chart/new", key: "nav.freeKundli" },
  { href: "/compatibility", key: "nav.horoscopeMatching" },
  { href: "/horoscopes", key: "nav.todaysHoroscope" },
  { href: "/panchang", key: "nav.panchangToday" },
  { href: "/pricing", key: "nav.premiumReports" },
  { href: "/contact", key: "nav.talkToAstrologer" },
] as const;

const zodiacSignKeys = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const { language: activeLang, setLanguage: setActiveLang, t } = useLanguage();
  const languages = LANGUAGES.filter((l) => l.code !== "en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <header className="sticky top-0 z-50 w-full bg-void/95 backdrop-blur-xl border-b border-white/[0.08]">
      {/* Layer 1 -- Language Dropdown */}
      <div className="border-b border-white/[0.05] bg-deep/50">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-1">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-gold"
            >
              <Globe className="size-3.5" />
              {activeLangLabel}
              <ChevronDown className={`size-3 text-white/40 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-[60] mt-1 w-48 overflow-hidden rounded-lg border border-white/[0.08] bg-surface py-1 shadow-lg shadow-black/40">
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {t("nav.selectLanguage")}
                </p>
                <div className="my-1 h-px bg-white/5" />
                <button
                  onClick={() => { setActiveLang("en"); setLangOpen(false); }}
                  className={`flex w-full items-center px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-gold/10 ${activeLang === "en" ? "font-bold text-gold" : "text-white/70"}`}
                >
                  English
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-gold/10 ${activeLang === lang.code ? "font-bold text-gold" : "text-white/70"}`}
                  >
                    {lang.label}
                    <span className="text-[10px] text-white/40">{lang.labelEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Layer 2 -- Main Header (Logo + Zodiac Strip) */}
      <div className="border-b border-white/[0.05] bg-gradient-to-r from-deep via-surface to-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-3 lg:flex-row lg:gap-6">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon className="size-8 text-gold" />
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                Daivik <span className="text-gold">Vani</span>
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-gold lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Zodiac sign strip -- desktop */}
          <div className="hidden flex-1 overflow-x-auto lg:block">
            <div className="flex items-center justify-center gap-0">
              {zodiacSignKeys.map((sign, i) => (
                <React.Fragment key={sign}>
                  {i > 0 && (
                    <span className="select-none text-[10px] text-white/20">|</span>
                  )}
                  <Link
                    href={`/horoscopes/${sign}`}
                    className={`whitespace-nowrap px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-gold ${
                      pathname === `/horoscopes/${sign}` ? "text-gold" : "text-white/70"
                    }`}
                  >
                    {t(`zodiac.${sign}`)}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Desktop auth */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md border border-gold/30 px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-gold hover:bg-gold/5">
                  <Avatar className="h-8 w-8">
                    {session.user.image && (
                      <AvatarImage src={session.user.image} alt={session.user.name ?? "User avatar"} />
                    )}
                    <AvatarFallback className="bg-gold text-[10px] font-bold text-void">
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{session.user.name}</span>
                  <ChevronDown className="size-3.5 text-white/40" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-56 bg-surface border-white/[0.08]">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-white">{session.user.name}</span>
                      <span className="text-xs text-white/50">{session.user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer text-white/80 focus:bg-gold/10 focus:text-white" render={<Link href="/dashboard" />}>
                    <LayoutDashboard className="size-4 mr-2" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-white/80 focus:bg-gold/10 focus:text-white" render={<Link href="/profile" />}>
                    <User className="size-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem className="cursor-pointer text-white/80 focus:bg-gold/10 focus:text-white" render={<Link href="/admin" />}>
                      <Shield className="size-4 mr-2" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-500/10" render={<Link href="/api/auth/signout" />}>
                    <LogOut className="size-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="rounded-md border border-gold bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-void"
              >
                {t("nav.signIn")}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Layer 3 -- Main Navigation Bar */}
      <nav className="hidden border-b border-gold/10 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4">
          <div className="flex items-center gap-0">
            {mainNavLinkKeys.map((link, i) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <React.Fragment key={link.key}>
                  {i > 0 && <span className="select-none text-gold/20">|</span>}
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Layer 4 -- Secondary Quick Links Bar */}
      <div className="hidden border-b border-white/[0.05] bg-elevated lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-6 px-4">
          {secondaryLinkKeys.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="flex items-center gap-1 text-xs font-semibold text-gold/80 transition-colors hover:text-gold hover:underline"
            >
              <Sparkles className="size-3" />
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-void lg:hidden">
          <div className="border-b border-gold/10 bg-deep px-4 py-3">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name ?? "User avatar"} />}
                  <AvatarFallback className="bg-gold text-[10px] font-bold text-void">
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{session.user.name}</span>
                  <span className="text-xs text-white/50">{session.user.email}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Link href="/login" className="rounded-md bg-gold px-5 py-2 text-sm font-bold uppercase text-void" onClick={() => setMobileOpen(false)}>
                  {t("nav.signIn")}
                </Link>
                <Link href="/contact" className="flex items-center gap-1.5 rounded-md border border-gold px-3 py-2 text-xs font-semibold text-gold" onClick={() => setMobileOpen(false)}>
                  <MessageCircle className="size-3.5" />
                  {t("nav.chatWithAstrologer")}
                </Link>
              </div>
            )}
          </div>

          <div className="border-b border-white/[0.05] px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{t("nav.navigation")}</p>
            {mainNavLinkKeys.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block border-b border-white/5 px-2 py-2.5 text-sm font-semibold transition-colors last:border-b-0 ${
                    isActive ? "text-gold" : "text-white/70 hover:text-gold"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          <div className="border-b border-white/[0.05] px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{t("nav.zodiacSigns")}</p>
            <div className="grid grid-cols-3 gap-1">
              {zodiacSignKeys.map((sign) => (
                <Link
                  key={sign}
                  href={`/horoscopes/${sign}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-2 py-2 text-center text-xs font-bold uppercase tracking-wide transition-colors ${
                    pathname === `/horoscopes/${sign}` ? "bg-gold text-void" : "bg-surface text-white/70 hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {t(`zodiac.${sign}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-b border-white/[0.05] px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{t("nav.popular")}</p>
            {secondaryLinkKeys.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 border-b border-white/5 px-2 py-2.5 text-sm text-gold transition-colors last:border-b-0 hover:underline"
              >
                <Sparkles className="size-3" />
                {t(link.key)}
              </Link>
            ))}
          </div>

          {session?.user && (
            <div className="border-t border-white/[0.05] px-4 py-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{t("nav.account")}</p>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 border-b border-white/5 px-2 py-2.5 text-sm text-white/70 hover:text-gold">
                <LayoutDashboard className="size-4" /> Dashboard
              </Link>
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 border-b border-white/5 px-2 py-2.5 text-sm text-white/70 hover:text-gold">
                <User className="size-4" /> Profile
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 border-b border-white/5 px-2 py-2.5 text-sm text-white/70 hover:text-gold">
                  <Shield className="size-4" /> Admin
                </Link>
              )}
              <Link href="/api/auth/signout" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-red-400 hover:text-red-300">
                <LogOut className="size-4" /> Sign Out
              </Link>
            </div>
          )}

          <div className="h-20" />
        </div>
      )}
    </header>
  );
}
