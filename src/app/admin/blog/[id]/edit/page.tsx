"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Planetary Transits",
  "Birth Charts",
  "Seasonal",
  "Houses",
  "Lunar Cycles",
  "Compatibility",
  "Career",
  "Spirituality",
  "Beginner Guides",
];

// Placeholder existing blog post data
const existingPost = {
  title: "Mercury Retrograde Survival Guide 2026",
  slug: "mercury-retrograde-survival-guide-2026",
  excerpt:
    "Everything you need to know about navigating Mercury Retrograde periods in 2026, including dates, effects, and practical tips for each zodiac sign.",
  content:
    "Mercury Retrograde is one of the most talked-about astrological events, and for good reason. When Mercury appears to move backward in its orbit, communication, technology, and travel can all be affected.\n\n## 2026 Mercury Retrograde Dates\n\n- January 15 - February 5 (in Aquarius)\n- May 10 - June 2 (in Gemini)\n- September 8 - September 30 (in Libra)\n\n## What to Expect\n\nDuring Mercury Retrograde, you may experience:\n- Miscommunications and misunderstandings\n- Technology glitches and device malfunctions\n- Travel delays and scheduling conflicts\n- Past relationships or situations resurfacing\n\n## Survival Tips\n\n1. **Back up your devices** before each retrograde period begins\n2. **Double-check all communications** before sending\n3. **Avoid signing major contracts** if possible\n4. **Build in extra travel time** for important appointments\n5. **Use this time for reflection** and revisiting past projects",
  coverImageUrl: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f0",
  category: "Planetary Transits",
  tags: "mercury, retrograde, planetary transits, survival guide",
  premium: false,
  published: true,
};

export default function EditBlogPostPage() {
  const [title, setTitle] = React.useState(existingPost.title);
  const [slug, setSlug] = React.useState(existingPost.slug);
  const [excerpt, setExcerpt] = React.useState(existingPost.excerpt);
  const [content, setContent] = React.useState(existingPost.content);
  const [coverImageUrl, setCoverImageUrl] = React.useState(
    existingPost.coverImageUrl
  );
  const [category, setCategory] = React.useState(existingPost.category);
  const [tags, setTags] = React.useState(existingPost.tags);
  const [premium, setPremium] = React.useState(existingPost.premium);
  const [published, setPublished] = React.useState(existingPost.published);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Edit Blog Post</h2>
            <p className="text-sm text-slate-400">
              Modify the existing blog article
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-white/10 text-slate-200 hover:bg-white/5 hover:text-white"
          >
            <Save className="size-4" />
            Save Draft
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500">
            <Send className="size-4" />
            Update Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Post Content</CardTitle>
              <CardDescription className="text-slate-400">
                Edit your blog post content
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="slug" className="text-slate-300">
                  Slug
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">/blog/</span>
                  <Input
                    id="slug"
                    placeholder="post-url-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt" className="text-slate-300">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of the post..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="content" className="text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Publishing Options */}
        <div className="flex flex-col gap-6">
          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Publishing</CardTitle>
              <CardDescription className="text-slate-400">
                Configure post settings
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-slate-300">Status</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Published</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={published}
                    onClick={() => setPublished(!published)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      published ? "bg-emerald-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${
                        published ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-slate-300">Premium Content</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Premium Only</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={premium}
                    onClick={() => setPremium(!premium)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      premium ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${
                        premium ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-slate-300">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v ?? "")}>
                  <SelectTrigger className="border-white/10 bg-slate-800/50 text-slate-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="tags" className="text-slate-300">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="mercury, retrograde, transit"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500">Separate tags with commas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Cover Image</CardTitle>
              <CardDescription className="text-slate-400">
                Featured image for the post
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="coverImage" className="text-slate-300">
                  Image URL
                </Label>
                <Input
                  id="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              {coverImageUrl ? (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <img
                    src={coverImageUrl}
                    alt="Cover preview"
                    className="aspect-video w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/10 bg-slate-800/30">
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <Image className="size-8" />
                    <span className="text-xs">No image set</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
