"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Users, Building2, Package, CreditCard, Gavel, Settings, FileText, BarChart2, Shield, LogOut, Search, Bell, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DualLogo } from "@/components/layout/DualLogo";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Templates", path: "/admin/templates", icon: FileText },
  { name: "Vendors", path: "/admin/vendors", icon: Building2 },
  { name: "Packages", path: "/admin/packages", icon: Package },
  { name: "Finance", path: "/admin/finance", icon: CreditCard },
  { name: "Bidding", path: "/admin/bidding", icon: Gavel },
  { name: "Support", path: "/admin/support", icon: Shield },
  { name: "Settings", path: "/admin/settings", icon: Settings },
  { name: "Audit Logs", path: "/admin/audit-logs", icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-neutral-canvas">
      {/* Sidebar */}
      <div className="w-64 bg-dark-emerald text-white flex flex-col">
        <div className="p-4 border-b border-emerald-700">
          <DualLogo />
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? "bg-mint-light text-emerald-800"
                    : "text-white/90 hover:bg-emerald-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && <div className="w-1 h-4 bg-emerald-500 rounded-full ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-700">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/admin.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Super Admin</p>
              <p className="text-xs text-emerald-200">admin@umrohqu.com</p>
            </div>
          </div>
           <Button
             variant="ghost"
             className="w-full justify-start gap-3 text-red-300 hover:text-red-100 hover:bg-red-900/20"
             onClick={async () => {
               const supabase = createClient();
               await supabase.auth.signOut();
             }}
           >
             <LogOut className="h-4 w-4" />
             Logout
           </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-obsidian-black">
              {navItems.find(item => item.path === pathname)?.name || "Admin Panel"}
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cool-grey" />
              <Input
                placeholder="Search users, vendors, bookings..."
                className="pl-9 w-80 bg-neutral-canvas border border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-cool-grey" />
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs">3</Badge>
            </Button>
            <Button variant="outline" className="gap-2">
              <Loader2 className="h-4 w-4" />
              Maintenance Mode
              <Badge variant="outline" className="ml-2">OFF</Badge>
            </Button>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}