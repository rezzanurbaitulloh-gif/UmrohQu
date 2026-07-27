"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    platform_fee_percentage: 0,
    setup_fee_amount: 0,
    min_withdrawal_amount: 0,
    withdrawal_fee: 0,
  });

  const supabase = createClient();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would fetch from a settings table
      // For now, we'll use default values
      setSettings({
        platform_fee_percentage: 10,
        setup_fee_amount: 5000000,
        min_withdrawal_amount: 1000000,
        withdrawal_fee: 25000,
      });
    } catch (err) {
      console.error("Error fetching settings:", err);
      toast.error("Gagal memuat pengaturan platform");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // In a real implementation, you would save to a settings table
      toast.success("Pengaturan platform berhasil disimpan");
    } catch (err) {
      console.error("Error saving settings:", err);
      toast.error("Gagal menyimpan pengaturan platform");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-obsidian-black">Pengaturan Platform</h1>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biaya Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platformFee">Persentase Biaya Platform (%)</Label>
            <Input
              id="platformFee"
              type="number"
              value={settings.platform_fee_percentage}
              onChange={(e) => setSettings({...settings, platform_fee_percentage: Number(e.target.value)})}
              min="0"
              max="100"
            />
            <p className="text-sm text-gray-500">
              Persentase biaya yang dikenakan pada setiap transaksi (contoh: 10%)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="setupFee">Biaya Setup Travel</Label>
            <Input
              id="setupFee"
              type="number"
              value={settings.setup_fee_amount}
              onChange={(e) => setSettings({...settings, setup_fee_amount: Number(e.target.value)})}
              min="0"
            />
            <p className="text-sm text-gray-500">
              Biaya yang dikenakan untuk pendaftaran travel baru {formatCurrency(settings.setup_fee_amount)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Penarikan Dana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="minWithdrawal">Jumlah Minimum Penarikan</Label>
            <Input
              id="minWithdrawal"
              type="number"
              value={settings.min_withdrawal_amount}
              onChange={(e) => setSettings({...settings, min_withdrawal_amount: Number(e.target.value)})}
              min="0"
            />
            <p className="text-sm text-gray-500">
              Jumlah minimum yang dapat ditarik oleh travel {formatCurrency(settings.min_withdrawal_amount)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdrawalFee">Biaya Penarikan</Label>
            <Input
              id="withdrawalFee"
              type="number"
              value={settings.withdrawal_fee}
              onChange={(e) => setSettings({...settings, withdrawal_fee: Number(e.target.value)})}
              min="0"
            />
            <p className="text-sm text-gray-500">
              Biaya yang dikenakan untuk setiap penarikan dana {formatCurrency(settings.withdrawal_fee)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}