"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User as UserIcon,
  Share2,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paywall } from "@/components/shared/paywall";

interface BlogPostData {
  slug: string;
  title: string;
  author: string;
  authorBio: string;
  date: string;
  category: string;
  content: string[];
  premiumContent: string[];
  relatedSlugs: string[];
}

const postsData: Record<string, BlogPostData> = {
  "understanding-your-sun-sign": {
    slug: "understanding-your-sun-sign",
    title: "Understanding Your Sun Sign: More Than Just Your Birthday",
    author: "Luna Starweaver",
    authorBio: "Professional astrologer and spiritual guide with 15 years of experience in natal chart interpretation.",
    date: "2026-03-10",
    category: "Zodiac Signs",
    content: [
      "When most people think of astrology, they think of their Sun sign. It is the sign determined by the position of the Sun at the time of your birth, and it forms the foundation of your astrological identity. But your Sun sign is just the beginning of a much deeper cosmic story.",
      "The Sun in astrology represents your core essence, your ego, and the fundamental energy that drives you forward in life. It is the light that you shine into the world, the role you play on the grand stage of existence. Understanding your Sun sign at a deeper level means looking beyond the generic horoscope columns and examining how this placement interacts with every other element in your natal chart.",
      "For example, an Aries Sun might manifest very differently depending on whether the Moon is in nurturing Cancer or detached Aquarius. The house placement of your Sun adds another layer of nuance, revealing which area of life receives the most solar energy and focus.",
      "Consider also the aspects your Sun makes to other planets. A Sun conjunct Jupiter person radiates optimism and generosity, while a Sun square Saturn individual might struggle with self-doubt before discovering incredible discipline and resilience.",
    ],
    premiumContent: [
      "In advanced chart analysis, the Sun's dispositor chain reveals even deeper patterns of identity formation. The dispositor is the planet that rules the sign your Sun occupies. Following this chain of planetary rulership can uncover hidden motivations and life themes that operate beneath conscious awareness.",
      "Solar arc directions, a powerful predictive technique, move every point in your natal chart forward by the same amount as the progressed Sun. This creates a unified timing system that astrologers use to forecast major life developments with remarkable precision.",
      "Understanding your Sun sign also means recognizing its shadow side. Every sign has qualities that, when taken to an extreme, become liabilities. By acknowledging these shadows, you can work with your solar energy more consciously and avoid the pitfalls that come with unconscious expression of your core nature.",
    ],
    relatedSlugs: ["mercury-retrograde-survival-guide", "astrology-for-beginners"],
  },
  "mercury-retrograde-survival-guide": {
    slug: "mercury-retrograde-survival-guide",
    title: "Mercury Retrograde Survival Guide: What You Actually Need to Know",
    author: "Orion Blake",
    authorBio: "Astrology writer and educator specializing in planetary transits and their practical applications in daily life.",
    date: "2026-03-08",
    category: "Planets",
    content: [
      "Three to four times a year, Mercury appears to move backward through the zodiac from our perspective on Earth. This optical illusion, known as Mercury retrograde, has become one of the most talked-about astrological phenomena in popular culture.",
      "While the internet loves to blame Mercury retrograde for everything from broken appliances to relationship drama, the reality is far more nuanced. Mercury retrograde is actually a valuable period for reflection, review, and revision. The 're-' prefix is key: this is a time to revisit, reconsider, and refine rather than launch brand new initiatives.",
      "Communication is Mercury's domain, so yes, misunderstandings can increase during retrograde periods. Emails may go astray, contracts might have hidden clauses, and conversations can be prone to confusion. The remedy is not panic but rather extra care and attention to detail in all communicative matters.",
      "Travel plans may need flexibility during Mercury retrograde. Delays, reroutes, and schedule changes are more common. Building buffer time into your plans and double-checking reservations can help you navigate these periods smoothly.",
    ],
    premiumContent: [
      "The sign Mercury retrogrades through adds specific flavor to each retrograde period. When Mercury retrogrades through a fire sign, ego-driven communications may need re-examination. Through earth signs, financial and material plans benefit from review. Through air signs, intellectual assumptions get challenged. Through water signs, emotional truths surface for processing.",
      "Your natal Mercury sign and house placement determine how personally affected you will be by each retrograde. If Mercury retrogrades over your natal Mercury, the effects are more pronounced and personally meaningful. This is often when important revelations about your communication style and thought processes emerge.",
    ],
    relatedSlugs: ["understanding-your-sun-sign", "saturn-return-what-to-expect"],
  },
};

// Fallback for any slug not in the data
const fallbackPost: BlogPostData = {
  slug: "fallback",
  title: "Exploring the Celestial Tapestry",
  author: "Luna Starweaver",
  authorBio: "Professional astrologer and spiritual guide.",
  date: "2026-03-01",
  category: "Beginners",
  content: [
    "Astrology is an ancient practice that maps the positions of celestial bodies at the moment of birth to reveal insights about personality, life themes, and potential destinies. For thousands of years, cultures around the world have looked to the stars for guidance.",
    "The birth chart, also called a natal chart, is a snapshot of the sky at the exact moment and location of your birth. It includes the positions of the Sun, Moon, and planets across the twelve zodiac signs and twelve houses, creating a unique cosmic fingerprint that belongs to you alone.",
    "Modern astrology combines this ancient wisdom with contemporary psychological insights, offering a powerful tool for self-understanding and personal growth. Whether you are exploring your Sun sign for the first time or diving deep into advanced techniques, astrology offers endless layers of discovery.",
  ],
  premiumContent: [
    "Advanced astrological techniques such as solar returns, progressions, and synastry charts offer even deeper insights into life timing and relationship dynamics. These methods have been refined over centuries of careful observation and analysis.",
    "Working with a professional astrologer can help you unlock the full potential of your natal chart. A skilled interpreter can synthesize the many layers of your chart into a coherent narrative that illuminates your path forward.",
  ],
  relatedSlugs: ["understanding-your-sun-sign", "astrology-for-beginners"],
};

const relatedPostTitles: Record<string, string> = {
  "understanding-your-sun-sign": "Understanding Your Sun Sign",
  "mercury-retrograde-survival-guide": "Mercury Retrograde Survival Guide",
  "12-houses-explained": "The 12 Houses of Astrology Explained",
  "saturn-return-what-to-expect": "Your Saturn Return",
  "astrology-for-beginners": "Astrology for Beginners",
  "venus-through-the-signs": "Venus Through the Signs",
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = postsData[slug] ?? { ...fallbackPost, slug, title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>

      {/* Article Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        {/* Main Article */}
        <article className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Badge className="bg-indigo-500/15 text-indigo-400">
              {post.category}
            </Badge>
            <h1 className="text-3xl font-bold leading-tight text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <UserIcon className="size-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Premium Content - Paywalled */}
          {post.premiumContent.length > 0 && (
            <div className="pt-4">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Deep Dive: Premium Analysis
              </h2>
              <Paywall requiredTier="PREMIUM" currentTier="FREE">
                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                  {post.premiumContent.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Paywall>
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="text-sm font-medium text-slate-400">Share:</span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Twitter className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Facebook className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <LinkIcon className="size-4" />
            </Button>
          </div>

          {/* Author Info */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {post.author[0]}
              </div>
              <div>
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-xs text-slate-400">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related Posts */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Related Articles
            </h3>
            <div className="space-y-3">
              {post.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/blog/${relSlug}`}
                  className="block text-sm font-medium text-slate-300 transition-colors hover:text-amber-400"
                >
                  {relatedPostTitles[relSlug] ?? relSlug}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Zodiac Signs", "Planets", "Houses", "Transits", "Beginners"].map(
                (cat) => (
                  <Link
                    key={cat}
                    href="/blog"
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {cat}
                  </Link>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
