import { NextResponse } from 'next/server'

// Fungsi pembantu fetch dengan timeout agar tidak menggantung jika API lambat
async function fetchWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(url, { signal: controller.signal })
  clearTimeout(id)
  return response
}

export async function GET() {
  // 1. Coba Ambil Data dari EQuran.id v2
  try {
    console.log('Fetching daftar surah dari EQuran.id...')
    const res = await fetchWithTimeout('https://equran.id/api/v2/surat')
    
    if (res.ok) {
      const result = await res.json()
      // Ambil array 114 surah dari result.data agar tidak double-nested
      const surahList = result.data || result
      
      return NextResponse.json({
        success: true,
        data: surahList
      })
    }
  } catch (err) {
    console.error('EQuran.id gagal, mencoba backup API...', err)
  }

  // 2. Backup API: Gunakan Quran.com API v4 (Bahasa Indonesia) jika EQuran bermasalah
  try {
    console.log('Fetching daftar surah dari Quran.com API...')
    const res = await fetchWithTimeout('https://api.quran.com/api/v4/chapters?language=id')
    
    if (res.ok) {
      const result = await res.json()
      
      // Formatting ulang agar cocok dengan struktur UI kamu
      const mappedSurahs = result.chapters.map((ch: any) => ({
        nomor: ch.id,
        namaLatin: ch.name_simple,
        nama: ch.name_arabic,
        jumlahAyat: ch.verses_count,
        tempatTurun: ch.revelation_place === 'makkah' ? 'Makkah' : 'Madinah',
        arti: ch.translated_name.name
      }))

      return NextResponse.json({
        success: true,
        data: mappedSurahs
      })
    }
  } catch (err) {
    console.error('Quran.com API backup juga gagal:', err)
  }

  // 3. Jika semua API mati
  return NextResponse.json(
    { success: false, message: 'Gagal memuat daftar surah' },
    { status: 500 }
  )
}