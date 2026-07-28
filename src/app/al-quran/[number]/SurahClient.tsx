'use client'

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ui/error-boundary';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useState, useEffect, useRef } from 'react';

interface Verse {
  number: number
  arabic: string
  translation: string
  audio: string
  tafsir: string
}

interface Surah {
  number: number
  name: string
  arabic: string
  verses: number
  revelation: string
  versesData: Verse[]
}

interface SurahClientProps {
  params: { number: string }
}

export default function SurahClient({ params }: SurahClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAutoPlayFromURL = searchParams.get('autoplay') === 'true'

  const [surah, setSurah] = useState<Surah | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingVerse, setPlayingVerse] = useState<number | null>(null)
  const [audioProgress, setAudioProgress] = useState<{[key: number]: number}>({})
  const audioRefs = useRef<{[key: number]: HTMLAudioElement | null}>({})

  // Find previous and next surah
  const surahNumber = parseInt(params.number)
  const previousSurah = surahNumber > 1 ? surahNumber - 1 : null
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null

  useEffect(() => {
    fetchSurah()
  }, [params.number])

  // Effect untuk Auto-Play dari Surah Sebelumnya
  useEffect(() => {
    if (surah && isAutoPlayFromURL && surah.versesData.length > 0) {
      // Putar otomatis ayat pertama saat berpindah surah
      setPlayingVerse(surah.versesData[0].number)
    }
  }, [surah, isAutoPlayFromURL])

  // Effect untuk Menjalankan Audio setiap kali playingVerse berubah
  useEffect(() => {
    if (playingVerse !== null && audioRefs.current[playingVerse]) {
      // Hentikan semua audio lain yang mungkin sedang menyala
      Object.keys(audioRefs.current).forEach((key) => {
        const vNum = Number(key)
        if (vNum !== playingVerse && audioRefs.current[vNum]) {
          audioRefs.current[vNum]?.pause()
        }
      })

      // Putar audio ayat yang aktif
      const activeAudio = audioRefs.current[playingVerse]
      if (activeAudio) {
        activeAudio.play().catch((err) => console.error("Gagal memutar audio:", err))
      }
    }
  }, [playingVerse])

  const fetchSurah = async () => {
    setLoading(true)
    setError(null)
    setPlayingVerse(null)

    try {
      // Validate surah number first
      const surahNumber = parseInt(params.number)
      if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        throw new Error('Nomor surah tidak valid. Pastikan nomor antara 1-114.')
      }

      // Use the API route
      const response = await fetch(`/api/al-quran/surat/${params.number}`)

      if (!response.ok) {
        if (response.status === 404) {
          let errorDetails = ''
          try {
            const errorData = await response.json()
            errorDetails = errorData.details || ''
          } catch {}

          throw new Error(`Surah tidak ditemukan. ${errorDetails || 'Pastikan nomor surah antara 1-114.'}`)
        } else {
          throw new Error(`Gagal mengambil data surah: ${response.status} ${response.statusText}`)
        }
      }

      const data = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Format respons API tidak valid')
      }

      // Handle different API response structures
      let surahData = data.data

      if (data.data.data && typeof data.data.data === 'object') {
        surahData = data.data.data
      } else if (typeof data.data === 'object' && !Array.isArray(data.data)) {
        surahData = data.data
      }

      if (!surahData || typeof surahData !== 'object') {
        throw new Error('Format data surah tidak valid: data bukan objek')
      }

      // Map API data to our format
      const mappedSurah: Surah = {
        number: surahData.nomor || surahData.number,
        name: surahData.namaLatin || surahData.name || surahData.nama,
        arabic: surahData.nama || surahData.arabic || surahData.asma,
        verses: surahData.jumlahAyat || surahData.ayahCount || surahData.verses,
        revelation: (surahData.tempatTurun || surahData.revelationType || surahData.type) === 'mekah' ? 'Makkah' : 'Madinah',
        versesData: surahData.ayat ? surahData.ayat.map((verse: any) => ({
          number: verse.nomorAyat || verse.number,
          arabic: verse.teksArab || verse.arabic || verse.text,
          translation: verse.teksIndonesia || verse.translation || verse.idn,
          audio: verse.audio?.['01'] || verse.audio?.['05'] || verse.audio || '',
          tafsir: verse.tafsir?.teks || verse.tafsir || ''
        })) : []
      }

      setSurah(mappedSurah)
    } catch (err) {
      console.error('Error fetching surah:', err)
      const fallbackSurah: Surah = {
        number: 1,
        name: 'Al-Fatihah',
        arabic: 'الفاتحة',
        verses: 7,
        revelation: 'Makkah',
        versesData: [
          { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.', audio: '', tafsir: '' },
          { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'Segala puji bagi Allah, Tuhan seluruh alam,', audio: '', tafsir: '' },
          { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'Yang Maha Pengasih, Maha Penyayang,', audio: '', tafsir: '' },
          { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Pemilik hari pembalasan.', audio: '', tafsir: '' },
          { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.', audio: '', tafsir: '' },
          { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Tunjukilah kami jalan yang lurus,', audio: '', tafsir: '' },
          { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.', audio: '', tafsir: '' },
        ]
      }
      setSurah(fallbackSurah)
      setError('Menggunakan data lokal karena API tidak tersedia')
    } finally {
      setLoading(false)
    }
  }

  const toggleAudio = (verseNumber: number) => {
    if (playingVerse === verseNumber) {
      // Pause current audio
      if (audioRefs.current[verseNumber]) {
        audioRefs.current[verseNumber]?.pause()
      }
      setPlayingVerse(null)
    } else {
      // Switch playing verse
      setPlayingVerse(verseNumber)
    }
  }

  // --- FUNGSI UTAMA AUTO-PLAY KETIKA AUDIO 1 AYAT SELESAI ---
  const handleAudioEnded = (currentVerseNumber: number) => {
    setAudioProgress(prev => ({ ...prev, [currentVerseNumber]: 0 }))

    if (!surah) return

    // Cari posisi index ayat saat ini
    const currentIndex = surah.versesData.findIndex(v => v.number === currentVerseNumber)

    if (currentIndex !== -1 && currentIndex < surah.versesData.length - 1) {
      // 1. Jika masih ada ayat selanjutnya di surah ini -> Lanjut ke ayat berikutnya
      const nextVerse = surah.versesData[currentIndex + 1]
      setPlayingVerse(nextVerse.number)
    } else if (currentIndex === surah.versesData.length - 1) {
      // 2. Jika ini adalah ayat TERAKHIR dalam surah -> Pindah ke Surah Selanjutnya
      setPlayingVerse(null)
      if (nextSurah) {
        router.push(`/al-quran/${nextSurah}?autoplay=true`)
      }
    }
  }

  const handleAudioTimeUpdate = (verseNumber: number, e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.target as HTMLAudioElement
    const progress = (audio.currentTime / audio.duration) * 100
    setAudioProgress(prev => ({...prev, [verseNumber]: progress}))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <LoadingSpinner text="Memuat surah..." />
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!surah) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p className="text-yellow-600">Surah tidak ditemukan</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                Surah {surah.name} ({surah.arabic})
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Surah ke-{surah.number} • {surah.verses} ayat • {surah.revelation}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            {previousSurah ? (
              <Link
                href={`/al-quran/${previousSurah}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Surah Sebelumnya
              </Link>
            ) : (
              <div></div>
            )}
            {nextSurah ? (
              <Link
                href={`/al-quran/${nextSurah}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Surah Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Surah Content */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <div className="space-y-8">
              {surah.versesData.map((verse) => (
                <div key={verse.number} className={`border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 transition-all rounded-xl p-3 ${playingVerse === verse.number ? 'bg-emerald-50/70 border-emerald-300' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-2xl md:text-3xl font-arabic text-right mb-4 leading-relaxed">
                        {verse.arabic}
                      </div>
                      <div className="text-sm text-slate-600 mb-3 leading-relaxed">
                        {verse.translation}
                      </div>
                      <div className="text-xs text-slate-400 mb-3">
                        {surah.name} • Ayat {verse.number}
                      </div>

                      {/* Audio Player */}
                      {verse.audio && (
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => toggleAudio(verse.number)}
                            className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            {playingVerse === verse.number ? (
                              <Pause className="w-4 h-4 text-primary fill-primary" />
                            ) : (
                              <Play className="w-4 h-4 text-primary fill-primary" />
                            )}
                          </button>
                          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-100"
                              style={{ width: `${audioProgress[verse.number] || 0}%` }}
                            ></div>
                          </div>
                          <audio
                            ref={(el) => {
                              if (el) audioRefs.current[verse.number] = el
                            }}
                            src={verse.audio}
                            onEnded={() => handleAudioEnded(verse.number)}
                            onTimeUpdate={(e) => handleAudioTimeUpdate(verse.number, e)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {previousSurah ? (
              <Link
                href={`/al-quran/${previousSurah}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Surah Sebelumnya
              </Link>
            ) : (
              <div></div>
            )}
            {nextSurah ? (
              <Link
                href={`/al-quran/${nextSurah}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Surah Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}