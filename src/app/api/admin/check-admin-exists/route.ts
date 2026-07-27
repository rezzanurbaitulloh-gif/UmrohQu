import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check if any SUPER_ADMIN exists
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "SUPER_ADMIN")
      .limit(1);

    if (error) {
      console.error("Error checking admin existence:", error);
      return NextResponse.json({ hasAdmin: false }, { status: 200 });
    }

    return NextResponse.json({ hasAdmin: data.length > 0 }, { status: 200 });
  } catch (err) {
    console.error("Error in check-admin-exists API:", err);
    return NextResponse.json({ hasAdmin: false }, { status: 200 });
  }
}