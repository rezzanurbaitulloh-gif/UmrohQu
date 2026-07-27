"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, Search, Filter, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types";

type Package = Database["public"]["Tables"]["packages"]["Row"] & {
  travel_name?: string;
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [travelFilter, setTravelFilter] = useState<string | null>(null);
  const [travels, setTravels] = useState<{ id: string; name: string }[]>([]);

  const supabase = createClient();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("packages")
        .select("*, travels(name)")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (statusFilter) {
        query = query.eq("is_active", statusFilter === "active");
      }

      if (travelFilter) {
        query = query.eq("travel_id", travelFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data to include travel_name
      const transformedData = data?.map((pkg: any) => ({
        ...pkg,
        travel_name: pkg.travels?.name || "Unknown",
      })) || [];

      setPackages(transformedData);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages data. Please try again.");
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
    fetchPackages();
    fetchTravels();
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(searchLower) ||
      (pkg.description?.toLowerCase().includes(searchLower) || false) ||
      pkg.travel_name?.toLowerCase().includes(searchLower)
    );
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleStatusChange = async (packageId: string, newStatus: boolean | null) => {
    if (newStatus === null) return;
    try {
      const { error } = await supabase
        .from("packages")
        .update({ is_active: newStatus })
        .eq("id", packageId);

      if (error) throw error;

      // Refresh data
      fetchPackages();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update package status. Please try again.");
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
            onClick={fetchPackages}
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
        <h1 className="text-2xl font-bold text-obsidian-black">Manajemen Paket</h1>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Tambah Paket Baru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cari Paket</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari berdasarkan judul, deskripsi, atau travel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Filter Status</label>
              <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value === "" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
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

            <Button onClick={fetchPackages} className="gap-2">
              <Filter className="h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Packages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Paket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Paket</TableHead>
                  <TableHead>Travel</TableHead>
                  <TableHead>Harga/Pax</TableHead>
                  <TableHead>Keberangkatan</TableHead>
                  <TableHead>Sisa Kuota</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg) => (
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
                      <TableCell>
                        {new Date(pkg.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={pkg.is_active ? "active" : "inactive"}
                          onValueChange={(newStatus) => handleStatusChange(pkg.id, newStatus === "active")}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Nonaktif</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Tidak ada paket yang ditemukan
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