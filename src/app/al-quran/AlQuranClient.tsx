'use client'

import Link from 'next/link'
import { BookOpen, Search } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useState, useEffect } from 'react'

interface Surah {
  number: number
  name: string
  arabic: string
  verses: number
  revelationType: string
  revelation: string
}

export default function AlQuranClient() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSurahs()
  }, [])

  useEffect(() => {
    if (surahs.length > 0) {
      const filtered = surahs.filter(surah =>
        surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.arabic.includes(searchTerm) ||
        surah.number.toString().includes(searchTerm)
      )
      setFilteredSurahs(filtered)
    }
  }, [searchTerm, surahs])

  const fetchSurahs = async () => {
    setLoading(true)
    setError(null)

    try {
      // Use the API route
      const response = await fetch('/api/al-quran/surat')

      if (!response.ok) {
        throw new Error(`Gagal mengambil data surah: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Format respons API tidak valid')
      }

      // Handle different API response structures
      let surahsData = data.data

      // Jika data.data adalah objek dengan properti data (struktur dari equran.id)
      if (data.data.data && Array.isArray(data.data.data)) {
        surahsData = data.data.data
      }
      // Jika data.data adalah array langsung (struktur dari api.quran.gading.dev)
      else if (Array.isArray(data.data)) {
        surahsData = data.data
      }
      // Jika data.data adalah objek dengan nomor surah (struktur fallback lokal)
      else if (data.data.nomor) {
        surahsData = [data.data]
      }

      if (!Array.isArray(surahsData)) {
        throw new Error('Format data surah tidak valid: data bukan array')
      }

      // Map API data to our format
      const mappedSurahs: Surah[] = surahsData.map((surah: any) => ({
        number: surah.nomor || surah.number,
        name: surah.namaLatin || surah.name || surah.nama,
        arabic: surah.nama || surah.arabic || surah.asma,
        verses: surah.jumlahAyat || surah.ayahCount || surah.verses,
        revelationType: surah.tempatTurun || surah.revelationType || surah.type,
        revelation: (surah.tempatTurun || surah.revelationType || surah.type) === 'mekah' ? 'Makkah' : 'Madinah'
      }))

      setSurahs(mappedSurahs)
      setFilteredSurahs(mappedSurahs)
    } catch (err) {
      console.error('Error fetching surahs:', err)
      // Fallback to local data if API fails
      const fallbackData: Surah[] = [
        { number: 1, name: 'Al-Fatihah', arabic: 'الفاتحة', verses: 7, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 2, name: 'Al-Baqarah', arabic: 'البقرة', verses: 286, revelationType: 'madinah', revelation: 'Madinah' },
        { number: 3, name: 'Ali Imran', arabic: 'آل عمران', verses: 200, revelationType: 'madinah', revelation: 'Madinah' },
        { number: 4, name: 'An-Nisa', arabic: 'النساء', verses: 176, revelationType: 'madinah', revelation: 'Madinah' },
        { number: 5, name: 'Al-Maidah', arabic: 'المائدة', verses: 120, revelationType: 'madinah', revelation: 'Madinah' },
        { number: 18, name: 'Al-Kahf', arabic: 'الكهف', verses: 110, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 36, name: 'Ya-Sin', arabic: 'يس', verses: 83, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 55, name: 'Ar-Rahman', arabic: 'الرحمن', verses: 78, revelationType: 'madinah', revelation: 'Madinah' },
        { number: 67, name: 'Al-Mulk', arabic: 'الملك', verses: 30, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 112, name: 'Al-Ikhlas', arabic: 'الإخلاص', verses: 4, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 113, name: 'Al-Falaq', arabic: 'الفلق', verses: 5, revelationType: 'mekah', revelation: 'Makkah' },
        { number: 114, name: 'An-Nas', arabic: 'الناس', verses: 6, revelationType: 'mekah', revelation: 'Makkah' },
      ]
      setSurahs(fallbackData)
      setFilteredSurahs(fallbackData)
      setError('Menggunakan data lokal karena API tidak tersedia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Al-Quran Digital</h1>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Baca Al-Quran dengan terjemahan, tafsir, dan audio murattal. Nikmati kemudahan membaca Al-Quran kapan saja dan di mana saja.
          </p>
        </div>

        {/* Search and Features */}
        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">
                Cari Surah
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  id="search"
                  placeholder="Cari nama surah atau nomor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Cari
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-slate-600">Terjemahan</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M18.364 18.364A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <p className="text-xs text-slate-600">Audio</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-xs text-slate-600">Tafsir</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <p className="text-xs text-slate-600">Bookmark</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-slate-600">Memuat daftar surah...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Surah List */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {filteredSurahs.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/al-quran/${surah.number}`}
                  className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{surah.number}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{surah.name}</h3>
                      <p className="text-xs text-slate-500">{surah.arabic} • {surah.verses} ayat • {surah.revelation}</p>
                    </div>
                  </div>
                  <div className="text-lg font-arabic text-slate-700">{surah.arabic}</div>
                </Link>
              ))}
            </div>

            {filteredSurahs.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-slate-500">Tidak ada surah yang cocok dengan pencarian "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}