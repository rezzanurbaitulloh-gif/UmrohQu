import { createClient } from "./client";
import { Database } from "@/types";

export const createAdminAccount = async (email: string, password: string, fullName: string) => {
  const supabase = createClient();

  // Create user
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  });

  if (userError || !userData.user) {
    throw userError || new Error("Failed to create user");
  }

  // Set user role to SUPER_ADMIN in profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userData.user.id,
      email: userData.user.email,
      full_name: fullName,
      role: "SUPER_ADMIN",
      is_public: true
    });

  if (profileError) {
    // Rollback user creation if profile creation fails
    await supabase.auth.admin.deleteUser(userData.user.id);
    throw profileError;
  }

  return userData.user;
};

export const signInAdmin = async (email: string, password: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    throw error || new Error("Failed to sign in");
  }

  // Check if user is SUPER_ADMIN
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError || profile?.role !== "SUPER_ADMIN") {
    await supabase.auth.signOut();
    throw new Error("Unauthorized access");
  }

  return data.user;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};
