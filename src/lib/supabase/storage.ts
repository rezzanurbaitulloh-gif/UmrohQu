'use client'

import { createClient } from './client'

export function getPublicUrl(path: string, bucket: string = 'package-images'): string {
  const supabase = createClient()

  if (!supabase) {
    // Fallback for when Supabase is not configured
    return `/assets/${path.split('/').pop()}`
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  if (!data.publicUrl) {
    // Fallback if public URL is not available
    return `/assets/${path.split('/').pop()}`
  }

  return data.publicUrl
}