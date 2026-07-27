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

type Transaction = Database["public"]["Tables"]["bookings"]["Row"] & {
  package_title?: string;
  travel_name?: string;
  user_name?: string;
};

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [travelFilter, setTravelFilter] = useState<string | null>(null);
  const [travels, setTravels] = useState<{ id: string; name: string }[]>([]);

  const supabase = createClient();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("bookings")
        .select("*, packages(title), travels(name), profiles(full_name)")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`code.ilike.%${searchTerm}%,profiles.full_name.ilike.%${searchTerm}%`);
      }

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      if (travelFilter) {
        query = query.eq("travel_id", travelFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data
      const transformedData = data?.map((transaction: any) => ({
        ...transaction,
        package_title: transaction.packages?.title || "Unknown",
        travel_name: transaction.travels?.name || "Unknown",
        user_name: transaction.profiles?.full_name || "Unknown",
      })) || [];

      setTransactions(transformedData);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions data. Please try again.");
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
    fetchTransactions();
    fetchTravels();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      transaction.code.toLowerCase().includes(searchLower) ||
      transaction.user_name?.toLowerCase().includes(searchLower) ||
      transaction.package_title?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PAID":
        return "default";
      case "PENDING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "REFUNDED":
        return "destructive";
      case "COMPLETED":
        return "default";
      default:
        return "outline";
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleStatusChange = async (transactionId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", transactionId);

      if (error) throw error;

      // Refresh data
      fetchTransactions();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update transaction status. Please try again.");
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
            onClick={fetchTransactions}
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
        <h1 className="text-2xl font-bold text-obsidian-black">Manajemen Transaksi</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cari Transaksi</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari berdasarkan kode booking, nama pengguna, atau paket..."
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
                  <SelectItem value="PAID">Lunas</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                  <SelectItem value="REFUNDED">Dikembalikan</SelectItem>
                  <SelectItem value="COMPLETED">Selesai</SelectItem>
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

            <Button onClick={fetchTransactions} className="gap-2">
              <Filter className="h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Booking</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Travel</TableHead>
                  <TableHead>Total Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Transaksi</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.code}</TableCell>
                      <TableCell>{transaction.user_name}</TableCell>
                      <TableCell>{transaction.package_title}</TableCell>
                      <TableCell>{transaction.travel_name}</TableCell>
                      <TableCell>{formatCurrency(transaction.total_amount)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={transaction.status}
                          onValueChange={(newStatus) => newStatus && handleStatusChange(transaction.id, newStatus)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PAID">Lunas</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                            <SelectItem value="REFUNDED">Dikembalikan</SelectItem>
                            <SelectItem value="COMPLETED">Selesai</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Tidak ada transaksi yang ditemukan
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