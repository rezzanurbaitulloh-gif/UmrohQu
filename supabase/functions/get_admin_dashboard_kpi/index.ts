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

    // Calculate KPI data
    const [gmvResult, membersResult, vendorsResult, packagesResult] = await Promise.all([
      // Total GMV (PAID/COMPLETED bookings)
      supabaseClient
        .from("bookings")
        .select("total_amount", { count: "exact", head: true })
        .in("status", ["PAID", "COMPLETED"])
        .then(({ count }) => count || 0),

      // Total Members (JAMAAH)
      supabaseClient
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "JAMAAH")
        .then(({ count }) => count || 0),

      // Total Vendors and status breakdown
      supabaseClient
        .from("travels")
        .select("id, license_status", { count: "exact" })
        .then(({ data, count }) => {
          const total = count || 0;
          const active = data?.filter(v => v.license_status === "ACTIVE").length || 0;
          const pending = data?.filter(v => v.license_status === "PENDING").length || 0;
          return { total, active, pending };
        }),

      // Total Packages (active)
      supabaseClient
        .from("packages")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true)
        .then(({ count }) => count || 0),
    ]);

    // Calculate total GMV
    const { data: gmvData } = await supabaseClient
      .from("bookings")
      .select("total_amount")
      .in("status", ["PAID", "COMPLETED"]);

    const totalGMV = gmvData?.reduce((sum, booking) => sum + booking.total_amount, 0) || 0;

    return new Response(
      JSON.stringify({
        total_gmv: totalGMV,
        total_members: membersResult,
        total_vendors: vendorsResult.total,
        active_vendors: vendorsResult.active,
        pending_vendors: vendorsResult.pending,
        total_packages: packagesResult,
      }),
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