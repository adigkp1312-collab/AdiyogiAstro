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

interface Horoscope {
  id: string;
  sign: string;
  signSymbol: string;
  type: string;
  title: string;
  publishedDate: string;
  status: "published" | "draft";
}

const placeholderData: Horoscope[] = [
  { id: "1", sign: "Aries", signSymbol: "\u2648", type: "DAILY", title: "Aries Daily - Bold Moves Ahead", publishedDate: "2026-03-12", status: "published" },
  { id: "2", sign: "Taurus", signSymbol: "\u2649", type: "DAILY", title: "Taurus Daily - Grounding Energy", publishedDate: "2026-03-12", status: "published" },
  { id: "3", sign: "Gemini", signSymbol: "\u264A", type: "WEEKLY", title: "Gemini Weekly - Communication Breakthrough", publishedDate: "2026-03-10", status: "published" },
  { id: "4", sign: "Cancer", signSymbol: "\u264B", type: "MONTHLY", title: "Cancer Monthly - Emotional Renewal", publishedDate: "2026-03-01", status: "published" },
  { id: "5", sign: "Leo", signSymbol: "\u264C", type: "DAILY", title: "Leo Daily - Spotlight Moments", publishedDate: "2026-03-12", status: "draft" },
  { id: "6", sign: "Virgo", signSymbol: "\u264D", type: "WEEKLY", title: "Virgo Weekly - Practical Magic", publishedDate: "2026-03-10", status: "published" },
  { id: "7", sign: "Libra", signSymbol: "\u264E", type: "DAILY", title: "Libra Daily - Harmony Restored", publishedDate: "2026-03-12", status: "published" },
  { id: "8", sign: "Scorpio", signSymbol: "\u264F", type: "MONTHLY", title: "Scorpio Monthly - Deep Transformation", publishedDate: "2026-03-01", status: "draft" },
  { id: "9", sign: "Sagittarius", signSymbol: "\u2650", type: "DAILY", title: "Sagittarius Daily - Adventure Calls", publishedDate: "2026-03-12", status: "published" },
  { id: "10", sign: "Capricorn", signSymbol: "\u2651", type: "WEEKLY", title: "Capricorn Weekly - Career Growth", publishedDate: "2026-03-10", status: "published" },
  { id: "11", sign: "Aquarius", signSymbol: "\u2652", type: "DAILY", title: "Aquarius Daily - Innovation Sparks", publishedDate: "2026-03-12", status: "draft" },
  { id: "12", sign: "Pisces", signSymbol: "\u2653", type: "MONTHLY", title: "Pisces Monthly - Spiritual Awakening", publishedDate: "2026-03-01", status: "published" },
];

const columnHelper = createColumnHelper<Horoscope>();

const columns = [
  columnHelper.accessor("sign", {
    header: "Sign",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="text-lg">{info.row.original.signSymbol}</span>
        <span className="font-medium text-slate-200">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => {
      const type = info.getValue();
      const colors: Record<string, string> = {
        DAILY: "bg-blue-500/10 text-blue-400",
        WEEKLY: "bg-purple-500/10 text-purple-400",
        MONTHLY: "bg-amber-500/10 text-amber-400",
      };
      return (
        <Badge className={colors[type] || "bg-slate-500/10 text-slate-400"}>
          {type}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <span className="text-slate-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("publishedDate", {
    header: "Published Date",
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
        <Link href={`/admin/horoscopes/${info.row.original.id}/edit`}>
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

export default function AdminHoroscopesPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [signFilter, setSignFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");

  const filteredData = React.useMemo(() => {
    let data = placeholderData;
    if (signFilter !== "all") {
      data = data.filter((h) => h.sign === signFilter);
    }
    if (typeFilter !== "all") {
      data = data.filter((h) => h.type === typeFilter);
    }
    return data;
  }, [signFilter, typeFilter]);

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

  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Horoscopes</h2>
          <p className="text-sm text-slate-400">
            Manage daily, weekly, and monthly horoscope readings
          </p>
        </div>
        <Link href="/admin/horoscopes/new">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500">
            <Plus className="size-4" />
            New Horoscope
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
            <Select value={signFilter} onValueChange={(v) => setSignFilter(v ?? "all")}>
              <SelectTrigger className="w-[160px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Signs" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Signs</SelectItem>
                {signs.map((sign) => (
                  <SelectItem key={sign} value={sign}>
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
              <SelectTrigger className="w-[160px] border-white/10 bg-slate-800/50 text-slate-200">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900 text-slate-200">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search horoscopes..."
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
                    No horoscopes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <span className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {filteredData.length} horoscopes
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
