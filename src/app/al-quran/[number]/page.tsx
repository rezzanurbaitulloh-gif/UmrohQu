import { Metadata } from 'next'
import SurahClient from '@/app/al-quran/[number]/SurahClient'

interface SurahPageProps {
  params: Promise<{ number: string }>
}

export async function generateMetadata({ params }: SurahPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // Fetch surah info for metadata
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/al-quran/surat/${resolvedParams.number}`)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return {
      title: `Surah ${data.data.namaLatin} - Al-Quran Digital - UmrohQu`,
      description: `Baca Surah ${data.data.namaLatin} (${data.data.nama}) dengan terjemahan, tafsir, dan audio. Surah ke-${data.data.nomor} • ${data.data.jumlahAyat} ayat • ${data.data.tempatTurun === 'mekah' ? 'Makkah' : 'Madinah'}`,
    }
  } catch (error) {
    // Fallback metadata for common surahs
    const fallbackMetadata: {[key: string]: {title: string, description: string}} = {
      '1': { title: 'Surah Al-Fatihah - Al-Quran Digital - UmrohQu', description: 'Baca Surah Al-Fatihah dengan terjemahan dan tafsir. Surah ke-1 • 7 ayat • Makkah' },
      '2': { title: 'Surah Al-Baqarah - Al-Quran Digital - UmrohQu', description: 'Baca Surah Al-Baqarah dengan terjemahan dan tafsir. Surah ke-2 • 286 ayat • Madinah' },
      '3': { title: 'Surah Ali Imran - Al-Quran Digital - UmrohQu', description: 'Baca Surah Ali Imran dengan terjemahan dan tafsir. Surah ke-3 • 200 ayat • Madinah' },
      '36': { title: 'Surah Ya-Sin - Al-Quran Digital - UmrohQu', description: 'Baca Surah Ya-Sin dengan terjemahan dan tafsir. Surah ke-36 • 83 ayat • Makkah' },
      '55': { title: 'Surah Ar-Rahman - Al-Quran Digital - UmrohQu', description: 'Baca Surah Ar-Rahman dengan terjemahan dan tafsir. Surah ke-55 • 78 ayat • Madinah' },
      '67': { title: 'Surah Al-Mulk - Al-Quran Digital - UmrohQu', description: 'Baca Surah Al-Mulk dengan terjemahan dan tafsir. Surah ke-67 • 30 ayat • Makkah' },
    }

    return fallbackMetadata[resolvedParams.number] || {
      title: 'Surah - Al-Quran Digital - UmrohQu',
      description: 'Baca surah Al-Quran dengan terjemahan dan audio',
    }
  }
}

export default async function SurahPage({ params }: SurahPageProps) {
  const resolvedParams = await params;
  return <SurahClient params={resolvedParams} />
}
