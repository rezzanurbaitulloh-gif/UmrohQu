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

    // Get channel distribution data
    const { data, error } = await supabaseClient
      .from("bookings")
      .select("channel, total_amount, status")
      .in("status", ["PAID", "COMPLETED"]);

    if (error) throw error;

    // Calculate distribution by channel
    const channelData: Record<string, number> = {};

    data?.forEach((booking) => {
      const channelName = booking.channel === "subdomain" ? "Subdomain Travel" : "Portal Utama";
      if (!channelData[channelName]) {
        channelData[channelName] = 0;
      }
      channelData[channelName] += booking.total_amount;
    });

    // Convert to array format for chart
    const result = Object.entries(channelData).map(([name, value]) => ({
      name,
      value,
    }));

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