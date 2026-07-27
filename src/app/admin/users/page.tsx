"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, Search, Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types";

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"] & {
  travels?: { name: string } | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [travelFilter, setTravelFilter] = useState<string | null>(null);
  const [travels, setTravels] = useState<{ id: string; name: string }[]>([]);

  const supabase = createClient();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("profiles")
        .select("*, travels(name)")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`);
      }

      if (roleFilter) {
        query = query.eq("role", roleFilter);
      }

      if (travelFilter) {
        query = query.eq("travels.id", travelFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTravels = async () => {
    try {
      const { data, error } = await supabase
        .from("travels")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) throw error;

      setTravels(data || []);
    } catch (err) {
      console.error("Error fetching travels:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTravels();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower)
    );
  });

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "destructive";
      case "STAFF":
        return "default";
      case "TRAVEL":
        return "secondary";
      case "JAMAAH":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleRoleChange = async (userId: string, newRole: string | null) => {
    if (!newRole) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      // Refresh data
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
      setError("Failed to update user role. Please try again.");
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
            onClick={fetchUsers}
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-obsidian-black">Manajemen Pengguna</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cari Pengguna</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari berdasarkan nama, email, atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Filter Peran</label>
              <Select value={roleFilter || ""} onValueChange={(value) => setRoleFilter(value === "" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Peran</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="TRAVEL">Travel</SelectItem>
                  <SelectItem value="JAMAAH">Jamaah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Filter Travel</label>
              <Select value={travelFilter || ""} onValueChange={(value) => setTravelFilter(value === "" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Travel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Travel</SelectItem>
                  {travels.map((travel) => (
                    <SelectItem key={travel.id} value={travel.id}>
                      {travel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={fetchUsers} className="gap-2">
              <Filter className="h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No. Telepon</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>Travel</TableHead>
                  <TableHead>Status Profil</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name || "Tidak tersedia"}</TableCell>
                      <TableCell>{user.email || "Tidak tersedia"}</TableCell>
                      <TableCell>{user.phone || "Tidak tersedia"}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.travels?.name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={user.is_public ? "default" : "secondary"}>
                          {user.is_public ? "Publik" : "Privat"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                            <SelectItem value="STAFF">Staff</SelectItem>
                            <SelectItem value="TRAVEL">Travel</SelectItem>
                            <SelectItem value="JAMAAH">Jamaah</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Tidak ada pengguna yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}