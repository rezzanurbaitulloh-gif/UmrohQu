import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email yang tidak valid.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletters')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: 'Email ini sudah terdaftar sebagai subscriber.' },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const { error } = await supabase.from('newsletters').insert({ email });

    if (error) {
      console.error('Newsletter insert error:', error);
      return NextResponse.json(
        { error: 'Terjadi kesalahan. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Terima kasih! Anda berhasil berlangganan newsletter.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
