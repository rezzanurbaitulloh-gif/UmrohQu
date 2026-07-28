"use client";

import { createClient } from "@/lib/supabase/client";

// Error types for classification
const ERROR_TYPES = {
  NETWORK: "network",
  PERMISSION: "permission",
  SERVER: "server",
  UNKNOWN: "unknown",
};

// Classify error based on message or status
const classifyError = (error: Error): string => {
  const message = error.message.toLowerCase();
  if (message.includes("network") || message.includes("fetch") || message.includes("failed to fetch")) {
    return ERROR_TYPES.NETWORK;
  } else if (message.includes("permission") || message.includes("403")) {
    return ERROR_TYPES.PERMISSION;
  } else if (message.includes("500") || message.includes("server")) {
    return ERROR_TYPES.SERVER;
  }
  return ERROR_TYPES.UNKNOWN;
};

// Retry utility with exponential backoff
const retry = async <T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

// Fetch data with retry and error classification
export const fetchWithRetry = async <T>(
  query: Promise<{ data: T | null; error: Error | null }>,
  retries = 2
): Promise<T> => {
  try {
    const { data, error } = await retry(() => query, retries);
    if (error) throw error;
    return data as T;
  } catch (error) {
    const errorType = classifyError(error as Error);
    throw new Error(errorType); // Re-throw with classified error type
  }
};

// Fetch dashboard data
export const fetchDashboardData = async () => {
  const supabase = createClient();
  
  // Fetch counts
  const [
    { count: totalMembers },
    { count: totalVendors },
    { count: activeVendors },
    { count: pendingVendors },
    { count: totalPackages }
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("travels").select("*", { count: "exact", head: true }),
    supabase.from("travels").select("*", { count: "exact", head: true }).eq("license_status", "ACTIVE"),
    supabase.from("travels").select("*", { count: "exact", head: true }).eq("license_status", "PENDING"),
    supabase.from("packages").select("*", { count: "exact", head: true }).eq("is_active", true),
  ]);

  // GMV
  const { data: gmvData } = await supabase
    .from("bookings")
    .select("total_amount")
    .in("status", ["PAID", "COMPLETED"]);
  const totalGMV = gmvData?.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0) || 0;

  // Monthly bookings
  const { data: bookingsData } = await supabase
    .from("bookings")
    .select("total_amount, created_at, channel, status")
    .order("created_at", { ascending: true });

  // Process monthly data
  const monthlyMap = new Map<string, { revenue: number; volume: number }>();
  bookingsData?.forEach((booking: any) => {
    if (booking.status === "PAID" || booking.status === "COMPLETED") {
      const month = new Date(booking.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
      const existing = monthlyMap.get(month) || { revenue: 0, volume: 0 };
      monthlyMap.set(month, { revenue: existing.revenue + booking.total_amount, volume: existing.volume + 1 });
    }
  });
  const monthlyData = Array.from(monthlyMap.entries()).map(([month, data]) => ({ month, revenue: data.revenue, volume: data.volume }));

  // Channel data
  const channelMap = new Map<string, number>();
  bookingsData?.forEach((booking: any) => {
    if (booking.status === "PAID" || booking.status === "COMPLETED") {
      const channelName = booking.channel === "subdomain" ? "Subdomain Travel" : "Portal Utama";
      channelMap.set(channelName, (channelMap.get(channelName) || 0) + booking.total_amount);
    }
  });
  const channelData = Array.from(channelMap.entries()).map(([name, value]) => ({ name, value }));

  // Recent bookings (last 10)
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("id, code, user_id, package_id, total_amount, status, channel, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  let bookings = [];
  if (recentBookings && recentBookings.length > 0) {
    const userIds = [...new Set(recentBookings.map((b: any) => b.user_id))];
    const packageIds = [...new Set(recentBookings.map((b: any) => b.package_id))];

    const [{ data: usersData } = {}, { data: packagesData } = {}] = await Promise.all([
      userIds.length > 0 ? supabase.from("profiles").select("id, full_name").in("id", userIds) : { data: null },
      packageIds.length > 0 ? supabase.from("packages").select("id, title").in("id", packageIds) : { data: null },
    ]);

    const userMap = new Map(usersData?.map((u: any) => [u.id, u.full_name]) || []);
    const packageMap = new Map(packagesData?.map((p: any) => [p.id, p.title]) || []);

    bookings = recentBookings.map((b: any) => ({
      id: b.id, code: b.code, user_id: b.user_id, package_id: b.package_id,
      user_name: userMap.get(b.user_id) || "Unknown",
      package_name: packageMap.get(b.package_id) || "Unknown",
      total_amount: b.total_amount, channel: b.channel,
      status: b.status, created_at: b.created_at,
    }));
  }

  // Members, vendors, packages tables
  const [{ data: membersData } = {}, { data: vendorsData } = {}, { data: packagesData } = {}] = await Promise.all([
    supabase.from("profiles").select("id, full_name, email, phone, is_public, created_at").eq("role", "JAMAAH").order("created_at", { ascending: false }).limit(10),
    supabase.from("travels").select("id, name, slug, custom_domain, ppiu_number, license_status, created_at").order("created_at", { ascending: false }).limit(10),
    supabase.from("packages").select("id, title, travels(name), price_per_pax, departure_date, remaining_quota, is_active").eq("is_active", true).order("created_at", { ascending: false }).limit(10),
  ]);

  const members = membersData || [];
  const vendors = vendorsData || [];
  const packages = packagesData?.map((pkg: any) => ({
    id: pkg.id, title: pkg.title, travel_name: pkg.travels?.name || "Unknown",
    price_per_pax: pkg.price_per_pax, departure_date: pkg.departure_date,
    remaining_quota: pkg.remaining_quota, is_active: pkg.is_active,
  })) || [];

  return {
    kpiData: {
      totalGMV,
      totalMembers: totalMembers || 0,
      totalVendors: { total: totalVendors || 0, active: activeVendors || 0, pending: pendingVendors || 0 },
      totalPackages: totalPackages || 0,
    },
    monthlyData,
    channelData,
    bookings,
    members,
    vendors,
    packages,
  };
};