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
} from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
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

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/horoscopes", label: "Horoscope" },
  { href: "/birth-chart/new", label: "Astrology" },
  { href: "/birth-chart/new", label: "Free Reports" },
  { href: "/panchang", label: "Panchang" },
  { href: "/festivals", label: "Festivals" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/pricing", label: "Calculators" },
] as const;

const secondaryLinks = [
  { href: "/birth-chart/new", label: "Free Kundli" },
  { href: "/compatibility", label: "Horoscope Matching" },
  { href: "/horoscopes", label: "Today's Horoscope" },
  { href: "/panchang", label: "Panchang Today" },
  { href: "/pricing", label: "Premium Reports" },
  { href: "/contact", label: "Talk to Astrologer" },
] as const;

const utilityLinks = [
  { href: "/horoscopes", label: "Today's Horoscope" },
  { href: "/birth-chart/new", label: "Kundli" },
  { href: "/panchang", label: "Calendar 2026" },
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

  const languages = [
    { code: "hi", label: "हिन्दी", labelEn: "Hindi" },
    { code: "bn", label: "বাংলা", labelEn: "Bengali" },
    { code: "te", label: "తెలుగు", labelEn: "Telugu" },
    { code: "mr", label: "मराठी", labelEn: "Marathi" },
    { code: "ta", label: "தமிழ்", labelEn: "Tamil" },
    { code: "gu", label: "ગુજરાતી", labelEn: "Gujarati" },
    { code: "kn", label: "ಕನ್ನಡ", labelEn: "Kannada" },
    { code: "ml", label: "മലയാളം", labelEn: "Malayalam" },
    { code: "pa", label: "ਪੰਜਾਬੀ", labelEn: "Punjabi" },
  ];

  const [activeLang, setActiveLang] = React.useState("en");

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* ============================================================= */}
      {/*  LAYER 1 -- Language Bar                                       */}
      {/* ============================================================= */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-1 px-4 py-1 sm:gap-0">
          <button
            onClick={() => setActiveLang("en")}
            className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
              activeLang === "en"
                ? "text-[#FF6600] underline underline-offset-2"
                : "text-blue-700 hover:text-[#FF6600] hover:underline"
            }`}
          >
            English
          </button>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
                activeLang === lang.code
                  ? "text-[#FF6600] underline underline-offset-2"
                  : "text-blue-700 hover:text-[#FF6600] hover:underline"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================= */}
      {/*  LAYER 2 -- Main Header (Logo + Zodiac Strip)                  */}
      {/* ============================================================= */}
      <div className="border-b border-[#FF6600]/20 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-3 lg:flex-row lg:gap-6">
          {/* Logo + mobile hamburger row */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon className="size-8" />
              <span className="text-2xl font-extrabold tracking-tight text-[#FF6600]">
                Astro
                <span className="text-gray-800">Path</span>
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md border border-[#FF6600]/30 p-2 text-[#FF6600] transition-colors hover:bg-[#FF6600]/10 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Zodiac sign strip -- desktop */}
          <div className="hidden flex-1 overflow-x-auto lg:block">
            <div className="flex items-center justify-center gap-0">
              {zodiacSigns.map((sign, i) => (
                <React.Fragment key={sign}>
                  {i > 0 && (
                    <span className="select-none text-[10px] text-[#FF6600]/40">|</span>
                  )}
                  <Link
                    href={`/horoscopes/${sign.toLowerCase()}`}
                    className={`whitespace-nowrap px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-[#FF6600] ${
                      pathname === `/horoscopes/${sign.toLowerCase()}`
                        ? "text-[#FF6600]"
                        : "text-gray-600"
                    }`}
                  >
                    {sign}
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
                className="rounded-md border-2 border-[#FF6600] bg-[#FF6600] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e65c00]"
              >
                Sign In / Sign Up
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
            {mainNavLinks.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <React.Fragment key={link.label}>
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
                    {link.label}
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
      <div className="hidden border-b border-gray-200 bg-[#FFF7ED] lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-6 px-4">
          {secondaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-xs font-medium text-[#FF6600] transition-colors hover:text-[#cc5200] hover:underline"
            >
              <Sparkles className="size-3" />
              {link.label}
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
                  Sign In / Sign Up
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 rounded-md border border-[#FF6600] px-3 py-2 text-xs font-semibold text-[#FF6600]"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="size-3.5" />
                  Chat with Astrologer
                </Link>
              </div>
            )}
          </div>

          {/* Mobile main nav */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Navigation
            </p>
            {mainNavLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block border-b border-gray-100 px-2 py-2.5 text-sm font-semibold transition-colors last:border-b-0 ${
                    isActive
                      ? "text-[#FF6600]"
                      : "text-gray-700 hover:text-[#FF6600]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile zodiac signs */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Zodiac Signs
            </p>
            <div className="grid grid-cols-3 gap-1">
              {zodiacSigns.map((sign) => (
                <Link
                  key={sign}
                  href={`/horoscopes/${sign.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-2 py-2 text-center text-xs font-bold uppercase tracking-wide transition-colors ${
                    pathname === `/horoscopes/${sign.toLowerCase()}`
                      ? "bg-[#FF6600] text-white"
                      : "bg-[#FFF7ED] text-gray-700 hover:bg-[#FF6600]/10 hover:text-[#FF6600]"
                  }`}
                >
                  {sign}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile quick links */}
          <div className="border-b border-gray-200 px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Popular
            </p>
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 border-b border-gray-100 px-2 py-2.5 text-sm text-[#FF6600] transition-colors last:border-b-0 hover:underline"
              >
                <Sparkles className="size-3" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile utility links */}
          <div className="px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Quick Access
            </p>
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-gray-100 px-2 py-2.5 text-sm text-gray-600 transition-colors last:border-b-0 hover:text-[#FF6600]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile user links (logged in only) */}
          {session?.user && (
            <div className="border-t border-gray-200 px-4 py-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Account
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
