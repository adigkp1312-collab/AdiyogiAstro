"use client";

import Link from "next/link";
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const quickLinks = [
  { href: "/horoscopes", key: "footer.dailyHoroscopes" },
  { href: "/birth-chart/new", key: "nav.freeKundli" },
  { href: "/panchang", key: "footer.todaysPanchang" },
  { href: "/compatibility", key: "nav.horoscopeMatching" },
  { href: "/festivals", key: "footer.indianFestivals" },
  { href: "/transits", key: "footer.planetaryTransits" },
  { href: "/blog", key: "footer.astrologyBlog" },
  { href: "/pricing", key: "footer.premiumPlans" },
];

const services = [
  { href: "/birth-chart/new", key: "features.kundli" },
  { href: "/compatibility", key: "footer.compatibilityReport" },
  { href: "/birth-chart/new", key: "features.numerology" },
  { href: "/contact", key: "features.tarot" },
  { href: "/birth-chart/new", key: "features.gemstones" },
  { href: "/contact", key: "features.askQuestion" },
];

const horoscopes = [
  { href: "/horoscopes/aries", key: "zodiac.aries" },
  { href: "/horoscopes/taurus", key: "zodiac.taurus" },
  { href: "/horoscopes/gemini", key: "zodiac.gemini" },
  { href: "/horoscopes/cancer", key: "zodiac.cancer" },
  { href: "/horoscopes/leo", key: "zodiac.leo" },
  { href: "/horoscopes/virgo", key: "zodiac.virgo" },
  { href: "/horoscopes/libra", key: "zodiac.libra" },
  { href: "/horoscopes/scorpio", key: "zodiac.scorpio" },
  { href: "/horoscopes/sagittarius", key: "zodiac.sagittarius" },
  { href: "/horoscopes/capricorn", key: "zodiac.capricorn" },
  { href: "/horoscopes/aquarius", key: "zodiac.aquarius" },
  { href: "/horoscopes/pisces", key: "zodiac.pisces" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gold/10 bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-8 rounded-xl border border-white/[0.08] bg-surface p-5 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <Mail className="size-6 text-gold" />
              <div>
                <h3 className="text-base font-bold text-white">
                  {t("footer.subscribe")}
                </h3>
                <p className="text-sm text-white/50">
                  {t("footer.newsletterDesc")}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Input
                type="email"
                placeholder={t("footer.enterEmail")}
                className="h-10 w-full rounded-lg border border-white/[0.08] bg-elevated px-3 text-sm text-white placeholder:text-white/40 focus-visible:border-gold/40 focus-visible:ring-gold/20 sm:w-64"
              />
              <Button className="h-10 shrink-0 rounded-lg bg-gradient-to-r from-gold to-saturn px-5 text-sm font-bold text-void hover:opacity-90">
                {t("footer.subscribeBtn")}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="border-b border-gold/30 pb-1 text-sm font-bold uppercase tracking-wider text-gold">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.key}>
                  <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-gold">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-3">
            <h3 className="border-b border-gold/30 pb-1 text-sm font-bold uppercase tracking-wider text-gold">
              {t("footer.services")}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {services.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-gold">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horoscopes Column */}
          <div className="flex flex-col gap-3">
            <h3 className="border-b border-gold/30 pb-1 text-sm font-bold uppercase tracking-wider text-gold">
              {t("footer.horoscopes")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {horoscopes.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-gold">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & About Column */}
          <div className="flex flex-col gap-3">
            <h3 className="border-b border-gold/30 pb-1 text-sm font-bold uppercase tracking-wider text-gold">
              {t("footer.contact")}
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-2">
                <LogoIcon className="size-6 text-gold" />
                <span className="text-lg font-bold tracking-tight text-white font-display">
                  Daivik <span className="text-gold">Vani</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-white/50">
                {t("footer.companyDesc")}
              </p>
              <Link
                href="/contact"
                className="mt-1 inline-flex w-fit items-center rounded-md border border-gold px-3 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-void"
              >
                {t("footer.contactUs")}
              </Link>

              {/* Social Media */}
              <div className="mt-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/40">
                  {t("footer.followUs")}
                </p>
                <div className="flex items-center gap-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-[#1877F2] hover:text-white" aria-label="Facebook">
                    <Facebook className="size-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-[#1DA1F2] hover:text-white" aria-label="Twitter">
                    <Twitter className="size-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white" aria-label="Instagram">
                    <Instagram className="size-4" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-[#FF0000] hover:text-white" aria-label="YouTube">
                    <Youtube className="size-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <Link href="/privacy" className="text-xs text-white/40 hover:text-gold">
                {t("footer.privacyPolicy")}
              </Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-gold">
                {t("footer.terms")}
              </Link>
              <Link href="/disclaimer" className="text-xs text-white/40 hover:text-gold">
                {t("footer.disclaimer")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="my-6 bg-white/[0.08]" />
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Daivik Vani. {t("footer.allRights")}
          </p>
          <p className="text-xs text-white/30">
            {t("footer.entertainmentOnly")}
          </p>
        </div>
      </div>
    </footer>
  );
}
