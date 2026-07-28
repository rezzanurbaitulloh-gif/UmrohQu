"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, RefreshCw, DollarSign, Users, Building2, Package } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { fetchDashboardData } from "@/lib/fetchUtils";

// Types
type KPIData = {
  totalGMV: number;
  totalMembers: number;
  totalVendors: { total: number; active: number; pending: number };
  totalPackages: number;
};

type BookingData = {
  id: string;
  code: string;
  user_id: string;
  package_id: string;
  user_name: string;
  package_name: string;
  total_amount: number;
  channel: "main" | "subdomain";
  status: "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED";
  created_at: string;
};

type MemberData = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_public: boolean;
  created_at: string;
};

type VendorData = {
  id: string;
  name: string;
  slug: string;
  custom_domain: string | null;
  ppiu_number: string | null;
  license_status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
  created_at: string;
};

type PackageData = {
  id: string;
  title: string;
  travel_name: string;
  price_per_pax: number;
  departure_date: string;
  remaining_quota: number;
  is_active: boolean;
};

const COLORS = {
  emerald: "#059669",
  mint: "#10B981",
  slate: "#64748B",
};

const emptyKpiData: KPIData = {
  totalGMV: 0,
  totalMembers: 0,
  totalVendors: { total: 0, active: 0, pending: 0 },
  totalPackages: 0,
};

export default function AdminDashboardPage() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    retry: 2,
  });

  const [kpiData, setKpiData] = useState<KPIData>(emptyKpiData);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [members, setMembers] = useState<MemberData[]>([]);
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [monthlyData, setMonthlyData] = useState<{month: string; revenue: number; volume: number}[]>([]);
  const [channelData, setChannelData] = useState<{name: string; value: number}[]>([]);
  
  // Pagination state
  const [bookingsPage, setBookingsPage] = useState(1);
  const [membersPage, setMembersPage] = useState(1);
  const [vendorsPage, setVendorsPage] = useState(1);
  const [packagesPage, setPackagesPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (data) {
      setKpiData(data.kpiData);
      setMonthlyData(data.monthlyData);
      setChannelData(data.channelData);
      setBookings(data.bookings);
      setMembers(data.members);
      setVendors(data.vendors);
      setPackages(data.packages);
    }
  }, [data]);

  // Classify error for display
  const getErrorMessage = () => {
    if (!error) return null;
    if (error.message.includes("network")) {
      return "Koneksi terputus. Periksa koneksi internet Anda dan coba lagi.";
    } else if (error.message.includes("permission")) {
      return "Akses ditolak. Anda tidak memiliki izin untuk melihat data ini.";
    } else {
      return "Gagal memuat data dashboard. Silakan coba lagi.";
    }
  };

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const statusBadge = (status: string) => {
    switch (status) {
      case "PAID": case "COMPLETED": return "default";
      case "PENDING": return "secondary";
      case "CANCELLED": case "REFUNDED": return "destructive";
      default: return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent className="h-[300px]">
                <Skeleton className="h-full w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Tabs Skeleton */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
            <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[...Array(5)].map((_, i) => (
                      <TableHead key={i}><Skeleton className="h-4 w-full" /></TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(5)].map((_, j) => (
                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">Dashboard</h1>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => refetch()} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {isError && (
        <div className="bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-amber-700 dark:text-amber-300">{getErrorMessage()}</p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Total GMV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{formatCurrency(kpiData.totalGMV)}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lunas (PAID/COMPLETED)</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Total Jamaah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{kpiData.totalMembers.toLocaleString("id-ID")}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pengguna terdaftar</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Vendor/Travel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{kpiData.totalVendors.total}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="default" className="text-xs bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">{kpiData.totalVendors.active} Aktif</Badge>
              <Badge variant="secondary" className="text-xs">{kpiData.totalVendors.pending} Pending</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Paket Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{kpiData.totalPackages}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Paket published</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">Transaksi Bulanan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData.length > 0 ? monthlyData : [{month: '-', revenue: 0, volume: 0}]">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tick={{ fill: '#64748b' }} 
                  className="dark:stroke-slate-400 dark:text-slate-400"
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tick={{ fill: '#64748b' }} 
                  tickFormatter={(v: number) => `Rp${(v / 1e6).toFixed(0)}jt`} 
                  className="dark:stroke-slate-400 dark:text-slate-400"
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #e2e8f0", 
                    borderRadius: "8px", 
                    fontSize: "12px", 
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    color: "#334155"
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                  formatter={(value: any) => [formatCurrency(Number(value)), "Total"]}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50"
                />
                <Bar dataKey="revenue" fill="#059669" name="Omzet" radius={[4, 4, 0, 0]} className="dark:fill-emerald-500" />
                <Bar dataKey="volume" fill="#10B981" name="Volume" radius={[4, 4, 0, 0]} className="dark:fill-emerald-400" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">Saluran Transaksi</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={channelData.length > 0 ? channelData : [{name: "Belum ada data", value: 1}]}
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  innerRadius={50} 
                  fill="#8884d8" 
                  dataKey="value" 
                  nameKey="name" 
                  label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {channelData.map((entry: any) => (
                    <Cell 
                      key={entry.name} 
                      fill={entry.name === "Subdomain Travel" ? "#059669" : "#10B981"} 
                      className={entry.name === "Subdomain Travel" ? "dark:fill-emerald-500" : "dark:fill-emerald-400"}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #e2e8f0", 
                    borderRadius: "8px", 
                    fontSize: "12px",
                    color: "#334155"
                  }}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-50">Data Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="bookings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">🛒 Transaksi</TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">👥 Jamaah</TabsTrigger>
              <TabsTrigger value="vendors" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">🏢 Vendor</TabsTrigger>
              <TabsTrigger value="packages" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">🎫 Paket</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Belum ada transaksi</p>
                  <Button variant="link" className="text-emerald-600 dark:text-emerald-400 mt-2" onClick={() => refetch()}>
                    Muat ulang
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                        <TableHead className="text-slate-700 dark:text-slate-300">Kode</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Pemesan</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Paket</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Total</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Saluran</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.slice((bookingsPage - 1) * itemsPerPage, bookingsPage * itemsPerPage).map((b) => (
                        <TableRow key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{b.code}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{b.user_name}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{b.package_name}</TableCell>
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{formatCurrency(b.total_amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs border-slate-200 dark:border-slate-700">{b.channel === "subdomain" ? "Subdomain" : "Portal Utama"}</Badge>
                          </TableCell>
                          <TableCell><Badge variant={statusBadge(b.status)} className="text-xs">{b.status}</Badge></TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-400">{new Date(b.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setBookingsPage(bookingsPage - 1)}
                              disabled={bookingsPage === 1}
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Page {bookingsPage} of {Math.ceil(bookings.length / itemsPerPage)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setBookingsPage(bookingsPage + 1)}
                              disabled={bookingsPage >= Math.ceil(bookings.length / itemsPerPage)}
                            >
                              Next
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="members">
              {members.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm">Belum ada data jamaah</p>
                  <Button variant="link" className="text-emerald-600 dark:text-emerald-400 mt-2" onClick={() => refetch()}>
                    Muat ulang
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                        <TableHead className="text-slate-700 dark:text-slate-300">Nama</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">No. WA</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Bergabung</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.slice((membersPage - 1) * itemsPerPage, membersPage * itemsPerPage).map((m) => (
                        <TableRow key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{m.full_name || "-"}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{m.email || "-"}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{m.phone || "-"}</TableCell>
                          <TableCell><Badge variant={m.is_public ? "default" : "secondary"} className="text-xs">{m.is_public ? "Publik" : "Privat"}</Badge></TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-400">{new Date(m.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setMembersPage(membersPage - 1)}
                              disabled={membersPage === 1}
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Page {membersPage} of {Math.ceil(members.length / itemsPerPage)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setMembersPage(membersPage + 1)}
                              disabled={membersPage >= Math.ceil(members.length / itemsPerPage)}
                            >
                              Next
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vendors">
              {vendors.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Belum ada vendor terdaftar</p>
                  <Button variant="link" className="text-emerald-600 dark:text-emerald-400 mt-2" onClick={() => refetch()}>
                    Muat ulang
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                        <TableHead className="text-slate-700 dark:text-slate-300">Nama</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Subdomain</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">PPIU</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.slice((vendorsPage - 1) * itemsPerPage, vendorsPage * itemsPerPage).map((v) => (
                        <TableRow key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{v.name}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{v.slug}.umrohqu.com</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{v.ppiu_number || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={v.license_status === "ACTIVE" ? "default" : v.license_status === "PENDING" ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {v.license_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-400">{new Date(v.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setVendorsPage(vendorsPage - 1)}
                              disabled={vendorsPage === 1}
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Page {vendorsPage} of {Math.ceil(vendors.length / itemsPerPage)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setVendorsPage(vendorsPage + 1)}
                              disabled={vendorsPage >= Math.ceil(vendors.length / itemsPerPage)}
                            >
                              Next
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="packages">
              {packages.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
                  </svg>
                  <p className="text-sm">Belum ada paket aktif</p>
                  <Button variant="link" className="text-emerald-600 dark:text-emerald-400 mt-2" onClick={() => refetch()}>
                    Muat ulang
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                        <TableHead className="text-slate-700 dark:text-slate-300">Judul</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Travel</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Harga</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Keberangkatan</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Kuota</TableHead>
                        <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packages.slice((packagesPage - 1) * itemsPerPage, packagesPage * itemsPerPage).map((p) => (
                        <TableRow key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{p.title}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{p.travel_name}</TableCell>
                          <TableCell className="font-medium text-slate-900 dark:text-slate-50">{formatCurrency(p.price_per_pax)}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{new Date(p.departure_date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">{p.remaining_quota}</TableCell>
                          <TableCell>
                            <Badge variant={p.is_active ? "default" : "secondary"} className="text-xs bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                              {p.is_active ? "Aktif" : "Nonaktif"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPackagesPage(packagesPage - 1)}
                              disabled={packagesPage === 1}
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Page {packagesPage} of {Math.ceil(packages.length / itemsPerPage)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPackagesPage(packagesPage + 1)}
                              disabled={packagesPage >= Math.ceil(packages.length / itemsPerPage)}
                            >
                              Next
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
