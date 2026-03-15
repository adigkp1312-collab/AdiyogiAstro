"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Stars,
  Circle,
  Heart,
  Orbit,
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  subscriptionTier?: string;
}

interface SidebarProps {
  session?: {
    user: SessionUser;
  } | null;
  currentPath: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/horoscopes", label: "Horoscopes", icon: Stars },
  { href: "/birth-chart", label: "Birth Chart", icon: Circle },
  { href: "/compatibility", label: "Compatibility", icon: Heart },
  { href: "/transits", label: "Transits", icon: Orbit },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: User },
];

function getTierLabel(tier?: string): string {
  switch (tier) {
    case "PRO":
      return "Pro";
    case "PREMIUM":
      return "Premium";
    default:
      return "Free";
  }
}

function getTierClasses(tier?: string): string {
  switch (tier) {
    case "PRO":
      return "border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 text-white";
    case "PREMIUM":
      return "border-transparent bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white";
    default:
      return "border-gray-300 bg-gray-100 text-gray-500";
  }
}

export function Sidebar({ session, currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex items-center justify-end p-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-gray-400 hover:bg-orange-50 hover:text-[#FF6600]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
          <span className="sr-only">
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" &&
              currentPath.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-orange-50 text-[#FF6600] border-l-3 border-[#FF6600]"
                  : "text-gray-600 hover:bg-orange-50/50 hover:text-[#FF6600]"
              )}
            >
              <item.icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isActive
                    ? "text-[#FF6600]"
                    : "text-gray-400 group-hover:text-[#FF6600]"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info at Bottom */}
      {session?.user && (
        <div className="mt-auto border-t border-gray-200 p-3">
          {collapsed ? (
            <div className="flex justify-center" title={session.user.name ?? "User"}>
              <div className="flex size-8 items-center justify-center rounded-full bg-[#FF6600] text-xs font-medium text-white">
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF6600] text-xs font-medium text-white">
                  {session.user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-gray-900">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs text-gray-500">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <Badge
                className={cn(
                  "w-fit text-xs",
                  getTierClasses(session.user.subscriptionTier)
                )}
              >
                {session.user.subscriptionTier === "PRO" && (
                  <Star className="size-3 fill-current" />
                )}
                {getTierLabel(session.user.subscriptionTier)} Plan
              </Badge>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
