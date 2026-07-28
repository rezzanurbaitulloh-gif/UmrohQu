"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Users, Building2, Package, CreditCard, Settings, LogOut, Search, Bell, Loader2, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DualLogo } from "@/components/layout/DualLogo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Vendors", path: "/admin/vendors", icon: Building2 },
  { name: "Packages", path: "/admin/packages", icon: Package },
  { name: "Finance", path: "/admin/finance", icon: CreditCard },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string | null; role: string | null }>({ email: null, role: null });
  const [authLoading, setAuthLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", authUser.id)
            .single();
          setUser({
            email: authUser.email,
            role: profile?.role || "SUPER_ADMIN",
          });
        }
      } catch (err) {
        console.error("Admin auth check error:", err);
        setUser({ email: "admin@umrohqu.com", role: "SUPER_ADMIN" });
      } finally {
        setAuthLoading(false);
      }
    };
    loadUser();
  }, []);

  // Block non-admin users
  if (!authLoading && user.role && !["SUPER_ADMIN", "STAFF", "TRAVEL"].includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-900 max-w-md">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Akses Ditolak</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Anda tidak memiliki izin untuk mengakses halaman admin.
          </p>
          <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
            Kembali ke Beranda →
          </Link>
        </div>
      </div>
    );
  }

  const displayName = user.role === "SUPER_ADMIN" ? "Super Admin"
    : user.role === "STAFF" ? "Staff"
    : user.role === "TRAVEL" ? "Travel Partner"
    : "Admin";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className={cn(
        "bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0 transition-all duration-200 sidebar-scrollbar",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          )}
        </button>

        {/* Logo */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <DualLogo showText={!isSidebarCollapsed} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50",
                  isSidebarCollapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-700">
          {authLoading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-400" />
            </div>
          ) : (
            <>
              <div className={cn("flex items-center gap-2 mb-2", isSidebarCollapsed && "justify-center")}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/admin.png" alt="Admin" />
                  <AvatarFallback className="bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 text-xs font-semibold">
                    {user.email ? user.email.charAt(0).toUpperCase() : "A"}
                  </AvatarFallback>
                </Avatar>
                {!isSidebarCollapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs text-slate-900 dark:text-slate-50 truncate">{displayName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email || "admin@umrohqu.com"}</p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 h-auto py-1.5 px-2",
                  isSidebarCollapsed && "justify-center"
                )}
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  window.location.href = "/auth/login";
                }}
              >
                <LogOut className="h-4 w-4" />
                {!isSidebarCollapsed && "Logout"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {navItems.find(item => item.path === pathname)?.name || "Admin Panel"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input
                placeholder="Search..."
                className="pl-9 w-64 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 h-9 text-sm"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] bg-red-500 dark:bg-red-400 border-2 border-white dark:border-slate-800">
                3
              </Badge>
            </Button>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-900">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
