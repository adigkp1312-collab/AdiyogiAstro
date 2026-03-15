"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Crown,
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

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  premium: boolean;
  status: "published" | "draft";
}

const placeholderData: BlogPost[] = [
  { id: "1", title: "Mercury Retrograde Survival Guide 2026", category: "Planetary Transits", author: "Stella Nova", date: "2026-03-10", premium: false, status: "published" },
  { id: "2", title: "Understanding Your Moon Sign", category: "Birth Charts", author: "Luna Bright", date: "2026-03-08", premium: true, status: "published" },
  { id: "3", title: "Spring Equinox Rituals for Each Sign", category: "Seasonal", author: "Stella Nova", date: "2026-03-06", premium: false, status: "published" },
  { id: "4", title: "The 12th House: Secrets of the Subconscious", category: "Houses", author: "Dr. Astrid Cosmos", date: "2026-03-04", premium: true, status: "published" },
  { id: "5", title: "Venus in Pisces: Love Forecast", category: "Planetary Transits", author: "Luna Bright", date: "2026-03-02", premium: false, status: "published" },
  { id: "6", title: "Career Guidance by Rising Sign", category: "Career", author: "Stella Nova", date: "2026-02-28", premium: true, status: "draft" },
  { id: "7", title: "Full Moon in Virgo: What to Expect", category: "Lunar Cycles", author: "Dr. Astrid Cosmos", date: "2026-02-25", premium: false, status: "published" },
  { id: "8", title: "Composite Charts: Understanding Relationships", category: "Compatibility", author: "Luna Bright", date: "2026-02-22", premium: true, status: "published" },
  { id: "9", title: "Saturn Return: A Complete Guide", category: "Planetary Transits", author: "Dr. Astrid Cosmos", date: "2026-02-20", premium: true, status: "draft" },
  { id: "10", title: "Beginner's Guide to Reading Birth Charts", category: "Birth Charts", author: "Stella Nova", date: "2026-02-18", premium: false, status: "published" },
];

const columnHelper = createColumnHelper<BlogPost>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="max-w-[300px] truncate font-medium text-slate-200">
          {info.getValue()}
        </span>
        {info.row.original.premium && (
          <Crown className="size-3.5 shrink-0 text-amber-400" />
        )}
      </div>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => (
      <Badge className="bg-indigo-500/10 text-indigo-400">
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => (
      <span className="text-slate-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("date", {
    header: "Date",
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
  columnHelper.accessor("premium", {
    header: "Premium",
    cell: (info) =>
      info.getValue() ? (
        <Badge className="bg-amber-500/10 text-amber-400">Premium</Badge>
      ) : (
        <Badge className="bg-slate-500/10 text-slate-400">Free</Badge>
      ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <Badge
          className={
            status === "published"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-slate-500/10 text-slate-400"
          }
        >
          {status === "published" ? "Published" : "Draft"}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-1">
        <Link href={`/admin/blog/${info.row.original.id}/edit`}>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-slate-400 hover:bg-white/5 hover:text-amber-400"
          >
            <Edit className="size-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-slate-400 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    ),
  }),
];

export default function AdminBlogPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    let data = placeholderData;
    if (categoryFilter !== "all") {
      data = data.filter((p) => p.category === categoryFilter);
    }
    if (statusFilter !== "all") {
      data = data.filter((p) => p.status === statusFilter);
    }
    return data;
  }, [categoryFilter, statusFilter]);

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

  const categories = [...new Set(placeholderData.map((p) => p.category))];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Blog Posts</h2>
          <p className="text-sm text-slate-400">
            Manage articles and guides for the blog
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500">
            <Plus className="size-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-white/10 bg-slate-900/50">
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-slate-500" />
              <span className="text-sm text-slate-400">Filters:</span>
            </div>
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
              <SelectTrigger className="w-[180px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-[150px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search posts..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(e) =>
                  table.getColumn("title")?.setFilterValue(e.target.value)
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
                    No blog posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <span className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {filteredData.length} posts
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
