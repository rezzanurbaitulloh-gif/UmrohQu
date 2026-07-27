"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types";

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
  emerald: "#046A38",
  mint: "#34D399",
  slate: "#0F172A",
  gray: "#64748B",
};

export default function AdminDashboardPage() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [members, setMembers] = useState<MemberData[]>([]);
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<{month: string; revenue: number; volume: number}[]>([]);
  const [channelData, setChannelData] = useState<{name: string; value: number}[]>([]);

  const supabase = createClient();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch KPI data - replace RPC with direct queries
      const [
        { count: totalMembers },
        { count: totalVendors },
        { count: activeVendors },
        { count: pendingVendors },
        { count: totalPackages },
        { data: bookingsData },
        { data: monthlyData },
        { data: channelData }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("travels").select("*", { count: "exact", head: true }),
        supabase.from("travels").select("*", { count: "exact", head: true }).eq("license_status", "ACTIVE"),
        supabase.from("travels").select("*", { count: "exact", head: true }).eq("license_status", "PENDING"),
        supabase.from("packages").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("bookings").select("id, code, user_id, package_id, total_amount, status, channel, created_at").order("created_at", { ascending: false }).limit(10),
        supabase.from("bookings").select("total_amount, created_at").order("created_at", { ascending: true }),
        supabase.from("bookings").select("channel, total_amount")
      ]);

      // Calculate total GMV (only PAID and COMPLETED bookings)
      const { data: gmvData } = await supabase
        .from("bookings")
        .select("total_amount")
        .in("status", ["PAID", "COMPLETED"]);

      const totalGMV = gmvData?.reduce((sum: number, booking: {total_amount: number}) => sum + booking.total_amount, 0) || 0;

      setKpiData({
        totalGMV,
        totalMembers: totalMembers || 0,
        totalVendors: {
          total: totalVendors || 0,
          active: activeVendors || 0,
          pending: pendingVendors || 0,
        },
        totalPackages: totalPackages || 0,
      });

      // Process monthly data
      const monthlyMap = new Map<string, { revenue: number, volume: number }>();
      monthlyData?.forEach((booking: {created_at: string; total_amount: number}) => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
        const existing = monthlyMap.get(month) || { revenue: 0, volume: 0 };
        monthlyMap.set(month, {
          revenue: existing.revenue + booking.total_amount,
          volume: existing.volume + 1
        });
      });

      const processedMonthlyData = Array.from(monthlyMap.entries()).map(([month, data]) => ({
        month,
        revenue: data.revenue,
        volume: data.volume
      }));
      setMonthlyData(processedMonthlyData);

      // Process channel data
      const channelMap = new Map<string, number>();
      channelData?.forEach((booking: {channel: string; total_amount: number}) => {
        const channelName = booking.channel === "subdomain" ? "Subdomain Travel" : "Portal Utama";
        const existing = channelMap.get(channelName) || 0;
        channelMap.set(channelName, existing + booking.total_amount);
      });

      const processedChannelData = Array.from(channelMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
      setChannelData(processedChannelData);

      // Set bookings data with temporary names
      const initialBookings = bookingsData?.map((booking: any) => ({
        id: booking.id,
        code: booking.code,
        user_id: booking.user_id,
        package_id: booking.package_id,
        user_name: "Unknown",
        package_name: "Unknown",
        total_amount: booking.total_amount,
        channel: booking.channel as "main" | "subdomain",
        status: booking.status as "PENDING" | "PAID" | "CANCELLED" | "COMPLETED" | "REFUNDED",
        created_at: booking.created_at,
      })) || [];

      setBookings(initialBookings);

      // Fetch additional data for bookings
      if (bookingsData && bookingsData.length > 0) {
        const packageIds = bookingsData.map((b: any) => b.package_id).filter(Boolean);
        const userIds = bookingsData.map((b: any) => b.user_id).filter(Boolean);

        if (packageIds.length > 0) {
          const { data: packagesData } = await supabase
            .from("packages")
            .select("id, title")
            .in("id", packageIds);

          const packageMap = new Map(packagesData?.map((p: any) => [p.id, p.title]) || []);

          setBookings(prev => prev.map(booking => ({
            ...booking,
            package_name: packageMap.get(booking.package_id) as string || "Unknown"
          })));
        }

        if (userIds.length > 0) {
          const { data: usersData } = await supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", userIds);

          const userMap = new Map(usersData?.map((u: any) => [u.id, u.full_name]) || []);

          setBookings(prev => prev.map(booking => ({
            ...booking,
            user_name: userMap.get(booking.user_id) as string || "Unknown"
          })));
        }
      }

      // Fetch members data
      const { data: membersData } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, is_public, created_at")
        .eq("role", "JAMAAH")
        .order("created_at", { ascending: false })
        .limit(10);

      setMembers(membersData || []);

      // Fetch vendors data
      const { data: vendorsData } = await supabase
        .from("travels")
        .select("id, name, slug, custom_domain, ppiu_number, license_status, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      setVendors(vendorsData || []);

      // Fetch packages data
      const { data: packagesData } = await supabase
        .from("packages")
        .select(`
          id,
          title,
          travels(name),
          price_per_pax,
          departure_date,
          remaining_quota,
          is_active
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(10);

      setPackages(
        packagesData?.map((pkg: any) => ({
          id: pkg.id,
          title: pkg.title,
          travel_name: pkg.travels?.name || "Unknown",
          price_per_pax: pkg.price_per_pax,
          departure_date: pkg.departure_date,
          remaining_quota: pkg.remaining_quota,
          is_active: pkg.is_active,
        })) || []
      );

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toUpperCase()) {
      case "PAID":
      case "COMPLETED":
        return "default";
      case "PENDING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            variant="outline"
            className="mt-4 gap-2"
            onClick={fetchDashboardData}
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!kpiData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-cool-grey">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-obsidian-black">Master Control Hub</h1>
        <Button
          variant="outline"
          className="gap-2"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Refresh Data Realtime
            </>
          )}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cool-grey">Total GMV Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {formatCurrency(kpiData.totalGMV)}
            </div>
            <p className="text-xs text-cool-grey">Lunas (PAID/COMPLETED)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cool-grey">Total Member Jamaah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {kpiData.totalMembers.toLocaleString("id-ID")}
            </div>
            <p className="text-xs text-cool-grey">Pengguna terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cool-grey">Data Vendor/Travel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {kpiData.totalVendors.total}
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                {kpiData.totalVendors.active} Active
              </Badge>
              <Badge variant="secondary">
                {kpiData.totalVendors.pending} Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cool-grey">Tiket/Paket Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {kpiData.totalPackages}
            </div>
            <p className="text-xs text-cool-grey">Paket aktif</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Transactions Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaksi Pembelian Real-Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(value) => `Rp${(value / 1e6).toFixed(0)}jt`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.slate,
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: any) => [
                    formatCurrency(Number(value)),
                    "Total Omzet",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill={COLORS.emerald}
                  name="Omzet Lunas"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="volume"
                  fill={COLORS.mint}
                  name="Volume Transaksi"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Channel Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Perbandingan Transaksi</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`
                  }
                >
                  {channelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === "Subdomain Travel" ? COLORS.emerald : COLORS.mint}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.slate,
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Data Real-Time & Search Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bookings" className="space-y-4">
            <TabsList className="bg-neutral-canvas">
              <TabsTrigger value="bookings">🛒 Data Pembelian</TabsTrigger>
              <TabsTrigger value="members">👥 Data Member</TabsTrigger>
              <TabsTrigger value="vendors">🏢 Data Vendor</TabsTrigger>
              <TabsTrigger value="packages">🎫 Tiket / Paket</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode Transaksi</TableHead>
                      <TableHead>Pemesan</TableHead>
                      <TableHead>Paket</TableHead>
                      <TableHead>Total Bayar</TableHead>
                      <TableHead>Saluran</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.code}</TableCell>
                        <TableCell>{booking.user_name}</TableCell>
                        <TableCell>{booking.package_name}</TableCell>
                        <TableCell>{formatCurrency(booking.total_amount)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {booking.channel === "subdomain" ? "Subdomain Travel" : "Portal Utama"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(booking.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>No. WA</TableHead>
                      <TableHead>Status Profil</TableHead>
                      <TableHead>Tanggal Bergabung</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.full_name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>
                          <Badge variant={member.is_public ? "default" : "secondary"}>
                            {member.is_public ? "Publik" : "Privat"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(member.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Biro</TableHead>
                      <TableHead>Subdomain</TableHead>
                      <TableHead>Custom Domain</TableHead>
                      <TableHead>No. PPIU</TableHead>
                      <TableHead>Status Lisensi</TableHead>
                      <TableHead>Tanggal Didaftarkan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.slug}.umrohqu.com</TableCell>
                        <TableCell>{vendor.custom_domain || "-"}</TableCell>
                        <TableCell>{vendor.ppiu_number || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              vendor.license_status === "ACTIVE"
                                ? "default"
                                : vendor.license_status === "PENDING"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {vendor.license_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(vendor.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul Paket</TableHead>
                      <TableHead>Biro Travel</TableHead>
                      <TableHead>Harga/Pax</TableHead>
                      <TableHead>Keberangkatan</TableHead>
                      <TableHead>Sisa Kuota</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">{pkg.title}</TableCell>
                        <TableCell>{pkg.travel_name}</TableCell>
                        <TableCell>{formatCurrency(pkg.price_per_pax)}</TableCell>
                        <TableCell>
                          {new Date(pkg.departure_date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{pkg.remaining_quota}</TableCell>
                        <TableCell>
                          <Badge variant={pkg.is_active ? "default" : "secondary"}>
                            {pkg.is_active ? "Aktif" : "Nonaktif"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}