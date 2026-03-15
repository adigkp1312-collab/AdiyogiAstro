"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  Save,
  CreditCard,
  Star,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // Placeholder profile data
  const [formData, setFormData] = React.useState({
    name: "Alex Stargazer",
    email: "alex@celestialpath.com",
    birthDate: "1995-06-15",
    birthTime: "14:30",
    birthPlace: "New York, NY",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <User className="size-8 text-amber-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Profile
          </h1>
        </div>
        <p className="text-slate-400">
          Manage your personal information, birth details, and subscription.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">
            Personal Information
          </h2>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-white/10 bg-slate-800/50 text-white"
            />
          </div>

          {/* Email (readonly) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="border-white/10 bg-slate-800/30 text-slate-400 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500">
              Email cannot be changed. Contact support for assistance.
            </p>
          </div>
        </div>

        {/* Birth Details */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">Birth Details</h2>
          <p className="text-sm text-slate-400">
            Accurate birth details help generate precise astrological readings.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-slate-200">
                <Calendar className="mr-1 inline size-4 text-slate-400" />
                Birth Date
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="border-white/10 bg-slate-800/50 text-white"
              />
            </div>

            {/* Birth Time */}
            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-slate-200">
                <Clock className="mr-1 inline size-4 text-slate-400" />
                Birth Time
              </Label>
              <Input
                id="birthTime"
                name="birthTime"
                type="time"
                value={formData.birthTime}
                onChange={handleChange}
                className="border-white/10 bg-slate-800/50 text-white"
              />
            </div>
          </div>

          {/* Birth Place */}
          <div className="space-y-2">
            <Label htmlFor="birthPlace" className="text-slate-200">
              <MapPin className="mr-1 inline size-4 text-slate-400" />
              Birth Place
            </Label>
            <Input
              id="birthPlace"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              placeholder="City, State/Country"
              className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={isSaving}
            className={cn(
              "gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500",
              isSaving && "opacity-60"
            )}
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          {saved && (
            <span className="text-sm text-emerald-400">
              Profile updated successfully.
            </span>
          )}
        </div>
      </form>

      {/* Subscription Status */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Subscription</h2>
          <Badge className="bg-slate-700 text-slate-300">Free Plan</Badge>
        </div>

        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-slate-800">
              <CreditCard className="size-5 text-slate-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-white">Free Tier</p>
              <p className="text-sm text-slate-400">
                You are currently on the Free plan. Upgrade to Premium or Pro to
                unlock advanced horoscopes, birth chart reports, compatibility
                analysis, and transit tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500"
            render={<Link href="/pricing" />}
          >
            <Star className="size-4" />
            Upgrade Plan
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
