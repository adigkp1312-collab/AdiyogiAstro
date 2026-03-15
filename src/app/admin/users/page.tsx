"use client";

import * as React from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
  Crown,
  Star,
  MoreHorizontal,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  tier: "FREE" | "PREMIUM" | "PRO";
  joined: string;
  image?: string;
}

const placeholderData: UserData[] = [
  { id: "1", name: "Emma Johnson", email: "emma.johnson@email.com", role: "USER", tier: "PREMIUM", joined: "2025-11-15" },
  { id: "2", name: "Alex Stargazer", email: "alex.stargazer@email.com", role: "USER", tier: "PRO", joined: "2025-10-22" },
  { id: "3", name: "Luna Bright", email: "luna.bright@email.com", role: "ADMIN", tier: "PRO", joined: "2025-06-01" },
  { id: "4", name: "Marcus Chen", email: "marcus.chen@email.com", role: "USER", tier: "FREE", joined: "2026-01-08" },
  { id: "5", name: "Sophia Martinez", email: "sophia.martinez@email.com", role: "USER", tier: "PREMIUM", joined: "2025-09-14" },
  { id: "6", name: "James Wilson", email: "james.wilson@email.com", role: "USER", tier: "FREE", joined: "2026-02-20" },
  { id: "7", name: "Aisha Patel", email: "aisha.patel@email.com", role: "USER", tier: "PRO", joined: "2025-12-03" },
  { id: "8", name: "Oliver Brown", email: "oliver.brown@email.com", role: "USER", tier: "FREE", joined: "2026-03-01" },
  { id: "9", name: "Isabelle Dubois", email: "isabelle.dubois@email.com", role: "USER", tier: "PREMIUM", joined: "2025-08-19" },
  { id: "10", name: "David Kim", email: "david.kim@email.com", role: "USER", tier: "FREE", joined: "2026-03-05" },
  { id: "11", name: "Sarah Cosmos", email: "sarah.cosmos@email.com", role: "ADMIN", tier: "PRO", joined: "2025-05-10" },
  { id: "12", name: "Ryan O'Neill", email: "ryan.oneill@email.com", role: "USER", tier: "PREMIUM", joined: "2025-07-28" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const columnHelper = createColumnHelper<UserData>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback className="bg-indigo-600 text-xs text-white">
            {getInitials(info.getValue())}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-slate-200">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => (
      <span className="text-slate-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => {
      const role = info.getValue();
      return (
        <Badge
          className={
            role === "ADMIN"
              ? "bg-red-500/10 text-red-400"
              : "bg-slate-500/10 text-slate-400"
          }
        >
          {role === "ADMIN" && <Shield className="mr-1 size-3" />}
          {role}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("tier", {
    header: "Tier",
    cell: (info) => {
      const tier = info.getValue();
      const tierConfig: Record<string, { className: string; icon?: React.ReactNode }> = {
        FREE: { className: "bg-slate-500/10 text-slate-400" },
        PREMIUM: {
          className: "bg-amber-500/10 text-amber-400",
          icon: <Crown className="mr-1 size-3" />,
        },
        PRO: {
          className: "bg-purple-500/10 text-purple-400",
          icon: <Star className="mr-1 size-3" />,
        },
      };
      const config = tierConfig[tier];
      return (
        <Badge className={config.className}>
          {config.icon}
          {tier}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("joined", {
    header: "Joined",
    cell: (info) => (
      <span className="text-slate-400">
        {new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-slate-400 hover:bg-white/5 hover:text-amber-400"
        >
          <Eye className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-slate-400 hover:bg-white/5 hover:text-slate-200"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    ),
  }),
];

export default function AdminUsersPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [tierFilter, setTierFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    let data = placeholderData;
    if (roleFilter !== "all") {
      data = data.filter((u) => u.role === roleFilter);
    }
    if (tierFilter !== "all") {
      data = data.filter((u) => u.tier === tierFilter);
    }
    return data;
  }, [roleFilter, tierFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Users</h2>
        <p className="text-sm text-slate-400">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Total Users</span>
              <span className="text-2xl font-bold text-slate-100">
                {placeholderData.length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Admins</span>
              <span className="text-2xl font-bold text-red-400">
                {placeholderData.filter((u) => u.role === "ADMIN").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Premium</span>
              <span className="text-2xl font-bold text-amber-400">
                {placeholderData.filter((u) => u.tier === "PREMIUM").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-900/50">
          <CardContent className="pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Pro</span>
              <span className="text-2xl font-bold text-purple-400">
                {placeholderData.filter((u) => u.tier === "PRO").length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-white/10 bg-slate-900/50">
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-slate-500" />
              <span className="text-sm text-slate-400">Filters:</span>
            </div>
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v ?? "all")}>
              <SelectTrigger className="w-[140px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={(v) => setTierFilter(v ?? "all")}>
              <SelectTrigger className="w-[140px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="FREE">Free</SelectItem>
                <SelectItem value="PREMIUM">Premium</SelectItem>
                <SelectItem value="PRO">Pro</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search users..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(e) =>
                  table.getColumn("name")?.setFilterValue(e.target.value)
                }
                className="w-[250px] border-white/10 bg-slate-800/50 pl-10 text-slate-200 placeholder:text-slate-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-white/10 bg-slate-900/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-white/10 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-slate-400">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-white/5 hover:bg-white/5">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <span className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {filteredData.length} users
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-white/10 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-white/10 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
