"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stars,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { LogoIcon } from "@/components/shared/logo-icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const adminNavItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/horoscopes", label: "Horoscopes", icon: Stars, exact: false },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText, exact: false },
  { href: "/admin/users", label: "Users", icon: Users, exact: false },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, exact: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4">
          <LogoIcon className="size-7 shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-[#FF6600]">
              Admin
            </span>
          )}
        </div>

        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-2">
          {adminNavItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-orange-50 text-[#FF6600]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive
                      ? "text-[#FF6600]"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-gray-200" />

        {/* Admin User Info */}
        <div className="p-3">
          {collapsed ? (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#FF6600] text-xs text-white">
                  A
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#FF6600] text-xs text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-gray-900">
                  Admin User
                </span>
                <span className="truncate text-xs text-gray-500">
                  admin@celestialpath.com
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Back to site */}
        <div className="border-t border-gray-200 p-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="size-5 shrink-0 text-gray-400" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-[#FF6600]" />
            <h1 className="text-lg font-semibold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Admin User</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#FF6600] text-xs text-white">
                A
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
