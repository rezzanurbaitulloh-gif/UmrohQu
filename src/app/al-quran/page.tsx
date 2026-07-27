import { Metadata } from 'next'
import AlQuranClient from '@/app/al-quran/AlQuranClient'

export const metadata: Metadata = {
  title: 'Al-Quran Digital - UmrohQu',
  description: 'Baca Al-Quran dengan terjemahan, tafsir, dan audio murattal',
}

export default function AlQuranPage() {
  return <AlQuranClient />
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
