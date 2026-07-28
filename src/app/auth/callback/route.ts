import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_code_provided`);
  }

  try {
    const supabase = await createClient();

    // Exchange code for session first
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('OAuth Callback Error:', sessionError);
      return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`);
    }

    // Get the authenticated user's profile to check their role
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.redirect(`${origin}/auth/login?error=no_user_found`);
    }

    // Fetch user role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authUser.id)
      .single();

    const userRole = profile?.role ?? 'JAMAAH';

    // Redirect based on user role
    if (userRole === 'SUPER_ADMIN' || userRole === 'STAFF' || userRole === 'TRAVEL') {
      return NextResponse.redirect(`${origin}/admin`);
    }

    // Regular users (JAMAAH) go to their dashboard
    return NextResponse.redirect(`${origin}/profile`);
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.redirect(`${origin}/auth/login?error=server_error`);
  }
}