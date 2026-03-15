"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  Crown,
  Star,
  DollarSign,
  FileText,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Activity,
  UserPlus,
  Eye,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statsCards = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Premium Subscribers",
    value: "3,241",
    change: "+8.2%",
    trend: "up" as const,
    icon: Crown,
    color: "text-[#FF6600]",
    bgColor: "bg-orange-50",
  },
  {
    label: "Pro Subscribers",
    value: "1,892",
    change: "+15.3%",
    trend: "up" as const,
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    label: "Revenue (Monthly)",
    value: "$48,290",
    change: "+22.1%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Blog Posts",
    value: "156",
    change: "+3",
    trend: "up" as const,
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    label: "Unread Messages",
    value: "23",
    change: "-5.1%",
    trend: "down" as const,
    icon: MessageSquare,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
];

const subscriberData = [
  { month: "Jul", premium: 2100, pro: 1200 },
  { month: "Aug", premium: 2350, pro: 1350 },
  { month: "Sep", premium: 2580, pro: 1480 },
  { month: "Oct", premium: 2720, pro: 1560 },
  { month: "Nov", premium: 2950, pro: 1720 },
  { month: "Dec", premium: 3050, pro: 1780 },
  { month: "Jan", premium: 3120, pro: 1850 },
  { month: "Feb", premium: 3241, pro: 1892 },
];

const recentActivity = [
  {
    icon: UserPlus,
    text: "New user registered",
    detail: "emma.johnson@email.com",
    time: "2 minutes ago",
    color: "text-emerald-600",
  },
  {
    icon: Edit,
    text: "Horoscope updated",
    detail: "Aries Daily - March 12",
    time: "15 minutes ago",
    color: "text-[#FF6600]",
  },
  {
    icon: Eye,
    text: "Blog post viewed 500+ times",
    detail: "Mercury Retrograde Survival Guide",
    time: "1 hour ago",
    color: "text-blue-600",
  },
  {
    icon: Crown,
    text: "New Premium subscription",
    detail: "alex.stargazer@email.com",
    time: "2 hours ago",
    color: "text-purple-600",
  },
  {
    icon: MessageSquare,
    text: "New contact message",
    detail: "Question about birth chart accuracy",
    time: "3 hours ago",
    color: "text-rose-600",
  },
  {
    icon: Activity,
    text: "System health check passed",
    detail: "All services operational",
    time: "4 hours ago",
    color: "text-emerald-600",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="text-sm text-gray-500">
            Welcome back, Admin. Here&apos;s what&apos;s happening with AstroPath.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/horoscopes/new">
            <Button className="bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-sm font-semibold text-white hover:opacity-90">
              <Plus className="size-4" />
              New Horoscope
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button
              variant="outline"
              className="border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Plus className="size-4" />
              New Blog Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((stat) => (
          <Card
            key={stat.label}
            className="border-gray-200 bg-white shadow-sm"
          >
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="size-3 text-emerald-500" />
                    )}
                    <span className="text-xs text-emerald-600">
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div
                  className={`flex size-12 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <stat.icon className={`size-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Subscriber Growth Chart */}
        <Card className="border-gray-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-900">Subscriber Growth</CardTitle>
            <CardDescription className="text-gray-500">
              Premium and Pro subscriber trends over the last 8 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subscriberData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis
                    dataKey="month"
                    stroke="rgba(0,0,0,0.2)"
                    tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="rgba(0,0,0,0.2)"
                    tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      color: "#111827",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="premium"
                    stroke="#FF6600"
                    strokeWidth={2}
                    dot={{ fill: "#FF6600", strokeWidth: 0, r: 3 }}
                    name="Premium"
                  />
                  <Line
                    type="monotone"
                    dataKey="pro"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }}
                    name="Pro"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <activity.icon className={`size-4 ${activity.color}`} />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-medium text-gray-900">
                      {activity.text}
                    </span>
                    <span className="truncate text-xs text-gray-500">
                      {activity.detail}
                    </span>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-500">
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/horoscopes/new">
              <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-orange-200 hover:bg-white hover:shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-orange-50">
                  <Star className="size-5 text-[#FF6600]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    New Horoscope
                  </span>
                  <span className="text-xs text-gray-500">
                    Create daily reading
                  </span>
                </div>
                <ArrowRight className="ml-auto size-4 text-gray-400 transition-colors group-hover:text-[#FF6600]" />
              </div>
            </Link>
            <Link href="/admin/blog/new">
              <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-orange-200 hover:bg-white hover:shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50">
                  <FileText className="size-5 text-indigo-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    New Blog Post
                  </span>
                  <span className="text-xs text-gray-500">
                    Write new article
                  </span>
                </div>
                <ArrowRight className="ml-auto size-4 text-gray-400 transition-colors group-hover:text-[#FF6600]" />
              </div>
            </Link>
            <Link href="/admin/users">
              <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-orange-200 hover:bg-white hover:shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
                  <Users className="size-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    Manage Users
                  </span>
                  <span className="text-xs text-gray-500">
                    View all users
                  </span>
                </div>
                <ArrowRight className="ml-auto size-4 text-gray-400 transition-colors group-hover:text-[#FF6600]" />
              </div>
            </Link>
            <Link href="/admin/messages">
              <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-orange-200 hover:bg-white hover:shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-rose-50">
                  <MessageSquare className="size-5 text-rose-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    Messages
                  </span>
                  <span className="text-xs text-gray-500">
                    23 unread
                  </span>
                </div>
                <ArrowRight className="ml-auto size-4 text-gray-400 transition-colors group-hover:text-[#FF6600]" />
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
