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

type Travel = Database["public"]["Tables"]["travels"]["Row"] & {
  packages_count?: number;
};

export default function AdminTravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const supabase = createClient();

  const fetchTravels = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("travels")
        .select("*, packages:packages(count)")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%,ppiu_number.ilike.%${searchTerm}%`);
      }

      if (statusFilter) {
        query = query.eq("license_status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data to include packages_count
      const transformedData = data?.map((travel: any) => ({
        ...travel,
        packages_count: travel.packages?.[0]?.count || 0,
      })) || [];

      setTravels(transformedData);
    } catch (err) {
      console.error("Error fetching travels:", err);
      setError("Failed to load travels data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  const filteredTravels = travels.filter((travel) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      travel.name.toLowerCase().includes(searchLower) ||
      travel.slug.toLowerCase().includes(searchLower) ||
      (travel.ppiu_number?.toLowerCase().includes(searchLower) || false)
    );
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "PENDING":
        return "secondary";
      case "SUSPENDED":
        return "destructive";
      case "REJECTED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleStatusChange = async (travelId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("travels")
        .update({ license_status: newStatus })
        .eq("id", travelId);

      if (error) throw error;

      // Refresh data
      fetchTravels();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update travel status. Please try again.");
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
            onClick={fetchTravels}
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
        <h1 className="text-2xl font-bold text-obsidian-black">Manajemen Travel</h1>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Tambah Travel Baru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cari Travel</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari berdasarkan nama, slug, atau nomor PPIU..."
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
                  <SelectItem value="ACTIVE">Aktif</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SUSPENDED">Ditangguhkan</SelectItem>
                  <SelectItem value="REJECTED">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={fetchTravels} className="gap-2">
              <Filter className="h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Travels Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Travel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Travel</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>No. PPIU</TableHead>
                  <TableHead>Status Lisensi</TableHead>
                  <TableHead>Biaya Setup</TableHead>
                  <TableHead>Jumlah Paket</TableHead>
                  <TableHead>Tanggal Didaftarkan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTravels.length > 0 ? (
                  filteredTravels.map((travel) => (
                    <TableRow key={travel.id}>
                      <TableCell className="font-medium">{travel.name}</TableCell>
                      <TableCell>{travel.slug}.umrohqu.com</TableCell>
                      <TableCell>{travel.ppiu_number || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(travel.license_status)}>
                          {travel.license_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {travel.setup_fee_status === "PAID" ? (
                          <Badge variant="default">Lunas</Badge>
                        ) : (
                          <Badge variant="secondary">
                            {travel.setup_fee_status === "PENDING" ? "Pending" : "Belum Bayar"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{travel.packages_count}</TableCell>
                      <TableCell>
                        {new Date(travel.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={travel.license_status}
                          onValueChange={(newStatus) => newStatus && handleStatusChange(travel.id, newStatus)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Aktif</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="SUSPENDED">Ditangguhkan</SelectItem>
                            <SelectItem value="REJECTED">Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Tidak ada travel yang ditemukan
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