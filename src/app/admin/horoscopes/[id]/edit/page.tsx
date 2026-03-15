"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
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

const zodiacSigns = [
  { value: "ARIES", label: "Aries", symbol: "\u2648" },
  { value: "TAURUS", label: "Taurus", symbol: "\u2649" },
  { value: "GEMINI", label: "Gemini", symbol: "\u264A" },
  { value: "CANCER", label: "Cancer", symbol: "\u264B" },
  { value: "LEO", label: "Leo", symbol: "\u264C" },
  { value: "VIRGO", label: "Virgo", symbol: "\u264D" },
  { value: "LIBRA", label: "Libra", symbol: "\u264E" },
  { value: "SCORPIO", label: "Scorpio", symbol: "\u264F" },
  { value: "SAGITTARIUS", label: "Sagittarius", symbol: "\u2650" },
  { value: "CAPRICORN", label: "Capricorn", symbol: "\u2651" },
  { value: "AQUARIUS", label: "Aquarius", symbol: "\u2652" },
  { value: "PISCES", label: "Pisces", symbol: "\u2653" },
];

const horoscopeTypes = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

// Placeholder data for existing horoscope
const existingHoroscope = {
  sign: "ARIES",
  type: "DAILY",
  title: "Aries Daily - Bold Moves Ahead",
  content:
    "Today the stars are aligning in your favor, Aries. With Mars energizing your first house, you will feel a surge of confidence and determination. This is an excellent day to take initiative on projects you have been putting off. Your natural leadership abilities are heightened, making it a great time to step up and take charge.\n\nThe Moon in your fifth house adds a creative spark to your day. Express yourself through art, music, or spontaneous adventures. Romance may surprise you in unexpected ways.",
  premiumContent:
    "With Jupiter forming a trine to your natal Sun, financial opportunities are on the horizon. Pay attention to offers that come your way in the afternoon hours. A conversation with a mentor figure could open doors you did not know existed.\n\nLucky numbers: 7, 14, 23\nBest time for decisions: 2:00 PM - 4:00 PM\nCompatibility highlight: Leo and Sagittarius",
  publishDate: "2026-03-12",
  published: true,
};

export default function EditHoroscopePage() {
  const [sign, setSign] = React.useState(existingHoroscope.sign);
  const [type, setType] = React.useState(existingHoroscope.type);
  const [title, setTitle] = React.useState(existingHoroscope.title);
  const [content, setContent] = React.useState(existingHoroscope.content);
  const [premiumContent, setPremiumContent] = React.useState(
    existingHoroscope.premiumContent
  );
  const [publishDate, setPublishDate] = React.useState(
    existingHoroscope.publishDate
  );
  const [published, setPublished] = React.useState(existingHoroscope.published);
  const [showPreview, setShowPreview] = React.useState(false);

  const selectedSign = zodiacSigns.find((s) => s.value === sign);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/horoscopes">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Edit Horoscope</h2>
            <p className="text-sm text-slate-400">
              Update the horoscope reading
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="border-white/10 text-slate-200 hover:bg-white/5 hover:text-white"
          >
            <Eye className="size-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500">
            <Save className="size-4" />
            Update Horoscope
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="flex flex-col gap-6">
          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Horoscope Details</CardTitle>
              <CardDescription className="text-slate-400">
                Modify the sign, type, and scheduling details
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-300">Zodiac Sign</Label>
                  <Select value={sign} onValueChange={(v) => setSign(v ?? "")}>
                    <SelectTrigger className="border-white/10 bg-slate-800/50 text-slate-200">
                      <SelectValue placeholder="Select sign" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                      {zodiacSigns.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.symbol} {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-300">Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v ?? "")}>
                    <SelectTrigger className="border-white/10 bg-slate-800/50 text-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                      {horoscopeTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter horoscope title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="publishDate" className="text-slate-300">
                    Publish Date
                  </Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="border-white/10 bg-slate-800/50 text-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-300">Published</Label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={published}
                    onClick={() => setPublished(!published)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      published ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block size-6 transform rounded-full bg-white shadow-sm transition-transform ${
                        published ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Content</CardTitle>
              <CardDescription className="text-slate-400">
                Edit the horoscope reading content
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="content" className="text-slate-300">
                  Main Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write the horoscope reading content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="premiumContent" className="text-slate-300">
                  Premium Content
                  <span className="ml-2 text-xs text-amber-400">(Premium only)</span>
                </Label>
                <Textarea
                  id="premiumContent"
                  placeholder="Additional content for premium subscribers..."
                  value={premiumContent}
                  onChange={(e) => setPremiumContent(e.target.value)}
                  rows={5}
                  className="border-white/10 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className={showPreview ? "block" : "hidden lg:block"}>
          <Card className="sticky top-24 border-white/10 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Preview</CardTitle>
              <CardDescription className="text-slate-400">
                How the horoscope will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-white/5 bg-slate-800/50 p-6">
                {selectedSign && (
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl">{selectedSign.symbol}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400">
                        {selectedSign.label}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {type || "DAILY"} Horoscope
                      </span>
                    </div>
                  </div>
                )}
                {title && (
                  <h4 className="mb-3 text-lg font-medium text-slate-200">
                    {title}
                  </h4>
                )}
                {content ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                    {content}
                  </p>
                ) : (
                  <p className="text-sm italic text-slate-600">
                    Content preview will appear here...
                  </p>
                )}
                {premiumContent && (
                  <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <span className="mb-2 block text-xs font-medium text-amber-400">
                      Premium Content
                    </span>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                      {premiumContent}
                    </p>
                  </div>
                )}
                <div className="mt-4 text-xs text-slate-600">
                  {publishDate &&
                    new Date(publishDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
