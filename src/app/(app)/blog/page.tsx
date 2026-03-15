"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Lock, Calendar, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PremiumBadge } from "@/components/shared/premium-badge";
import { cn } from "@/lib/utils";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  isPremium: boolean;
  gradientFrom: string;
  gradientTo: string;
}

const categories = [
  "All",
  "Zodiac Signs",
  "Planets",
  "Houses",
  "Transits",
  "Beginners",
];

const samplePosts: BlogPost[] = [
  {
    slug: "understanding-your-sun-sign",
    title: "Understanding Your Sun Sign: More Than Just Your Birthday",
    excerpt:
      "Your Sun sign represents your core identity and ego. But there is so much more to discover beyond just the date you were born. Learn how your Sun sign interacts with the rest of your natal chart.",
    author: "Luna Starweaver",
    date: "2026-03-10",
    category: "Zodiac Signs",
    isPremium: false,
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-700",
  },
  {
    slug: "mercury-retrograde-survival-guide",
    title: "Mercury Retrograde Survival Guide: What You Actually Need to Know",
    excerpt:
      "Mercury retrograde gets a bad reputation, but understanding its true astrological meaning can help you navigate these periods with grace and even benefit from the cosmic slow-down.",
    author: "Orion Blake",
    date: "2026-03-08",
    category: "Planets",
    isPremium: false,
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
  },
  {
    slug: "12-houses-explained",
    title: "The 12 Houses of Astrology Explained: A Complete Guide",
    excerpt:
      "The houses in your birth chart represent different areas of life, from identity and possessions to career and spirituality. This guide breaks down each house and what it means for you.",
    author: "Luna Starweaver",
    date: "2026-03-05",
    category: "Houses",
    isPremium: true,
    gradientFrom: "from-purple-600",
    gradientTo: "to-violet-700",
  },
  {
    slug: "saturn-return-what-to-expect",
    title: "Your Saturn Return: What to Expect and How to Prepare",
    excerpt:
      "Around ages 28 to 30, Saturn returns to the same position it occupied when you were born. This pivotal transit marks a major life milestone. Here is how to make the most of it.",
    author: "Celeste Moon",
    date: "2026-03-01",
    category: "Transits",
    isPremium: true,
    gradientFrom: "from-slate-600",
    gradientTo: "to-gray-700",
  },
  {
    slug: "astrology-for-beginners",
    title: "Astrology for Beginners: Your First Steps Into the Cosmos",
    excerpt:
      "New to astrology? This comprehensive beginner guide covers the basics: zodiac signs, planets, houses, and aspects. Everything you need to start reading charts with confidence.",
    author: "Orion Blake",
    date: "2026-02-25",
    category: "Beginners",
    isPremium: false,
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-700",
  },
  {
    slug: "venus-through-the-signs",
    title: "Venus Through the Signs: How You Love and What You Value",
    excerpt:
      "Your Venus placement reveals how you approach love, beauty, and pleasure. Discover what your Venus sign says about your romantic style and aesthetic preferences.",
    author: "Celeste Moon",
    date: "2026-02-20",
    category: "Planets",
    isPremium: false,
    gradientFrom: "from-pink-600",
    gradientTo: "to-rose-700",
  },
];

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? samplePosts
      : samplePosts.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BookOpen className="size-8 text-amber-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Cosmic Journal
          </h1>
        </div>
        <p className="text-slate-400">
          Explore articles, guides, and insights about astrology, zodiac signs,
          planetary transits, and celestial wisdom.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/5"
          >
            {/* Cover Image Placeholder (gradient) */}
            <div
              className={cn(
                "relative h-44 bg-gradient-to-br",
                post.gradientFrom,
                post.gradientTo
              )}
            >
              {/* Premium Lock Badge */}
              {post.isPremium && (
                <div className="absolute right-3 top-3">
                  <PremiumBadge tier="PREMIUM" />
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-black/40 text-white backdrop-blur-sm">
                  {post.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h2 className="text-base font-semibold leading-snug text-white group-hover:text-amber-400 transition-colors">
                {post.title}
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
                {post.excerpt}
              </p>

              {/* Author & Date */}
              <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <UserIcon className="size-3" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <BookOpen className="size-12 text-slate-600" />
          <p className="text-slate-400">
            No articles found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
