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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */


const mainNavLinkKeys = [
  { href: "/", key: "nav.home" },
  { href: "/horoscopes", key: "nav.horoscope" },
  { href: "/birth-chart/new", key: "nav.astrology" },
  { href: "/birth-chart/new", key: "nav.freeReports" },
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

const utilityLinkKeys = [
  { href: "/horoscopes", key: "nav.todaysHoroscope" },
  { href: "/birth-chart/new", key: "nav.kundli" },
  { href: "/panchang", key: "nav.calendar2026" },
] as const;

const zodiacSignKeys = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const { language: activeLang, setLanguage: setActiveLang, t } = useLanguage();
  const languages = LANGUAGES.filter((l) => l.code !== "en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
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
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* ============================================================= */}
      {/*  LAYER 1 -- Language Dropdown                                  */}
      {/* ============================================================= */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-1">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium text-gray-700 transition-colors hover:bg-gray-200/60 hover:text-[#FF6600]"
            >
              <Globe className="size-3.5" />
              {activeLangLabel}
              <ChevronDown className={`size-3 text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-[60] mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {t("nav.selectLanguage")}
                </p>
                <div className="my-1 h-px bg-gray-100" />
                <button
                  onClick={() => { setActiveLang("en"); setLangOpen(false); }}
                  className={`flex w-full items-center px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-[#FFF7ED] ${activeLang === "en" ? "font-bold text-[#FF6600]" : "text-gray-700"}`}
                >
                  English
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-[#FFF7ED] ${activeLang === lang.code ? "font-bold text-[#FF6600]" : "text-gray-700"}`}
                  >
                    {lang.label}
                    <span className="text-[10px] text-gray-400">{lang.labelEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/*  LAYER 2 -- Main Header (Logo + Zodiac Strip)                  */}
      {/* ============================================================= */}
      <div className="border-b border-[#1a1a4e]/30 bg-gradient-to-r from-[#0a0a2e] via-[#1a1a5e] to-[#0a0a2e]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-3 lg:flex-row lg:gap-6">
          {/* Logo + mobile hamburger row */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon className="size-8" />
              <span className="text-2xl font-extrabold tracking-tight text-[#FF9933]">
                Astro
                <span className="text-white">Path</span>
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md border border-white/30 p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
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
                    <span className="select-none text-[10px] text-white/30">|</span>
                  )}
                  <Link
                    href={`/horoscopes/${sign}`}
                    className={`whitespace-nowrap px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-[#FF9933] ${
                      pathname === `/horoscopes/${sign}`
                        ? "text-[#FF9933]"
                        : "text-white/80"
                    }`}
                  >
                    {t(`zodiac.${sign}`)}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Desktop auth (visible only on large screens, in header row) */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md border border-[#FF6600]/30 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#FF6600] hover:bg-[#FF6600]/5">
                  <Avatar size="sm">
                    {session.user.image && (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name ?? "User avatar"}
                      />
                    )}
                    <AvatarFallback className="bg-[#FF6600] text-[10px] font-bold text-white">
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown className="size-3.5 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    render={<Link href="/dashboard" />}
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    render={<Link href="/profile" />}
                  >
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      render={<Link href="/admin" />}
                    >
                      <Shield className="size-4" />
                      Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    render={<Link href="/api/auth/signout" />}
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="rounded-md border-2 border-[#FF9933] bg-[#FF6600] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#FF9933]"
              >
                {t("nav.signIn")}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/*  LAYER 3 -- Main Navigation Bar                                */}
      {/* ============================================================= */}
      <nav className="hidden border-b border-[#FF6600]/20 bg-gradient-to-r from-[#FF6600] to-[#FF8C00] lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4">
          <div className="flex items-center gap-0">
            {mainNavLinkKeys.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <React.Fragment key={link.key}>
                  {i > 0 && (
                    <span className="select-none text-white/30">|</span>
                  )}
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
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

      {/* ============================================================= */}
      {/*  LAYER 4 -- Secondary Quick Links Bar                          */}
      {/* ============================================================= */}
      <div className="hidden border-b border-[#333]/60 bg-[#1a1a1a] lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-6 px-4">
          {secondaryLinkKeys.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="flex items-center gap-1 text-xs font-semibold text-[#daa520] transition-colors hover:text-[#ffd700] hover:underline"
            >
              <Sparkles className="size-3" />
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>

      {/* ============================================================= */}
      {/*  MOBILE MENU OVERLAY                                           */}
      {/* ============================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-white lg:hidden">
          {/* Mobile auth section */}
          <div className="border-b border-[#FF6600]/20 bg-[#FFF7ED] px-4 py-3">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  {session.user.image && (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name ?? "User avatar"}
                    />
                  )}
                  <AvatarFallback className="bg-[#FF6600] text-[10px] font-bold text-white">
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {session.user.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Link
                  href="/login"
                  className="rounded-md bg-[#FF6600] px-5 py-2 text-sm font-bold uppercase text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.signIn")}
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 rounded-md border border-[#FF6600] px-3 py-2 text-xs font-semibold text-[#FF6600]"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="size-3.5" />
                  {t("nav.chatWithAstrologer")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile main nav */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {t("nav.navigation")}
            </p>
            {mainNavLinkKeys.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block border-b border-gray-100 px-2 py-2.5 text-sm font-semibold transition-colors last:border-b-0 ${
                    isActive
                      ? "text-[#FF6600]"
                      : "text-gray-700 hover:text-[#FF6600]"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          {/* Mobile zodiac signs */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {t("nav.zodiacSigns")}
            </p>
            <div className="grid grid-cols-3 gap-1">
              {zodiacSignKeys.map((sign) => (
                <Link
                  key={sign}
                  href={`/horoscopes/${sign}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-2 py-2 text-center text-xs font-bold uppercase tracking-wide transition-colors ${
                    pathname === `/horoscopes/${sign}`
                      ? "bg-[#FF6600] text-white"
                      : "bg-[#FFF7ED] text-gray-700 hover:bg-[#FF6600]/10 hover:text-[#FF6600]"
                  }`}
                >
                  {t(`zodiac.${sign}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile quick links */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {t("nav.popular")}
            </p>
            {secondaryLinkKeys.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 border-b border-gray-100 px-2 py-2.5 text-sm text-[#FF6600] transition-colors last:border-b-0 hover:underline"
              >
                <Sparkles className="size-3" />
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Mobile utility links */}
          <div className="px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {t("nav.quickAccess")}
            </p>
            {utilityLinkKeys.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-gray-100 px-2 py-2.5 text-sm text-gray-600 transition-colors last:border-b-0 hover:text-[#FF6600]"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Mobile user links (logged in only) */}
          {session?.user && (
            <div className="border-t border-gray-200 px-4 py-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {t("nav.account")}
              </p>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 border-b border-gray-100 px-2 py-2.5 text-sm text-gray-700 hover:text-[#FF6600]"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 border-b border-gray-100 px-2 py-2.5 text-sm text-gray-700 hover:text-[#FF6600]"
              >
                <User className="size-4" />
                Profile
              </Link>
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 border-b border-gray-100 px-2 py-2.5 text-sm text-gray-700 hover:text-[#FF6600]"
                >
                  <Shield className="size-4" />
                  Admin
                </Link>
              )}
              <Link
                href="/api/auth/signout"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="size-4" />
                Sign Out
              </Link>
            </div>
          )}

          {/* Bottom spacer for safe area */}
          <div className="h-20" />
        </div>
      )}
    </header>
  );
}
