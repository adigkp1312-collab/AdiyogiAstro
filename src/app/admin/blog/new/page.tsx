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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewBlogPostPage() {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [coverImageUrl, setCoverImageUrl] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [premium, setPremium] = React.useState(false);
  const [published, setPublished] = React.useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugManuallyEdited(true);
  }

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
            <h2 className="text-2xl font-bold text-slate-100">New Blog Post</h2>
            <p className="text-sm text-slate-400">
              Create a new article for the blog
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
            Publish
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
                Write your blog post content
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
                  onChange={(e) => handleTitleChange(e.target.value)}
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
                    onChange={(e) => handleSlugChange(e.target.value)}
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
                  placeholder="Brief summary of the post (shown in previews)..."
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
                  placeholder="Write your blog post content here. Supports markdown formatting..."
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
                Add a featured image
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
