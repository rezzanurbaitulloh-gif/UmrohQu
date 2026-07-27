import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get monthly transactions data
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("total_amount, created_at, status")
      .in("status", ["PAID", "COMPLETED"])
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Group by month and calculate revenue and volume
    const monthlyData: Record<string, { revenue: number; volume: number }> = {};

    data?.forEach((booking) => {
      const date = new Date(booking.created_at);
      const month = date.toLocaleString("default", { month: "short", year: "2-digit" });
      const monthKey = `${month}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { revenue: 0, volume: 0 };
      }

      monthlyData[monthKey].revenue += booking.total_amount;
      monthlyData[monthKey].volume += 1;
    });

    // Convert to array and sort by month
    const result = Object.entries(monthlyData)
      .map(([month, { revenue, volume }]) => ({
        month,
        revenue,
        volume,
      }))
      .sort((a, b) => {
        const dateA = new Date(`1 ${a.month} 2000`);
        const dateB = new Date(`1 ${b.month} 2000`);
        return dateA.getTime() - dateB.getTime();
      });

    return new Response(
      JSON.stringify(result),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});