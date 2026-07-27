import { NextResponse } from 'next/server'

// API alternatif jika equran.id tidak tersedia
const ALTERNATIVE_APIS = [
  'https://equran.id/api/v2',
  'https://api.quran.gading.dev'
]

// Data lokal sebagai fallback
const LOCAL_SURAHS = [
  {
    nomor: 1,
    namaLatin: 'Al-Fatihah',
    nama: 'الفاتحة',
    jumlahAyat: 7,
    tempatTurun: 'mekah',
    ayat: [
      {
        nomorAyat: 1,
        teksArab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        teksIndonesia: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.'
      },
      {
        nomorAyat: 2,
        teksArab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        teksIndonesia: 'Segala puji bagi Allah, Tuhan seluruh alam,'
      },
      {
        nomorAyat: 3,
        teksArab: 'الرَّحْمَٰنِ الرَّحِيمِ',
        teksIndonesia: 'Yang Maha Pengasih, Maha Penyayang,'
      },
      {
        nomorAyat: 4,
        teksArab: 'مَالِكِ يَوْمِ الدِّينِ',
        teksIndonesia: 'Pemilik hari pembalasan.'
      },
      {
        nomorAyat: 5,
        teksArab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        teksIndonesia: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.'
      },
      {
        nomorAyat: 6,
        teksArab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        teksIndonesia: 'Tunjukilah kami jalan yang lurus,'
      },
      {
        nomorAyat: 7,
        teksArab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        teksIndonesia: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.'
      }
    ]
  }
]

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  })
  clearTimeout(id)

  return response
}

async function fetchFromQuranAPI(path: string, isSurahDetail: boolean = false) {
  // Coba semua API alternatif
  for (const apiBase of ALTERNATIVE_APIS) {
    try {
      let apiUrl = `${apiBase}${path}`

      console.log('Trying API:', apiUrl)

      const response = await fetchWithTimeout(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }, 8000) // 8 detik timeout

      if (!response.ok) {
        console.log(`API ${apiBase} returned status ${response.status}`)
        continue // Coba API berikutnya
      }

      const data = await response.json()
      return { success: true, data }

    } catch (error) {
      console.error(`Error with API ${apiBase}:`, error)
      continue // Coba API berikutnya
    }
  }

  return { success: false, error: 'All API endpoints failed' }
}

export async function GET(request: Request) {
  try {
    const { pathname } = new URL(request.url)
    const pathParts = pathname.split('/').filter(Boolean)

    // Debug: log path parts
    console.log('Path parts:', pathParts)

    let apiPath = ''
    let isSurahDetail = false

    // Handle different path structures
    if (pathParts.length === 3 && pathParts[2] === 'surat') {
      // /api/al-quran/surat
      apiPath = '/surat'
    } else if (pathParts.length === 4 && pathParts[2] === 'surat') {
      // /api/al-quran/surat/{number}
      const surahNumber = pathParts[3]
      // Validate surah number (more lenient validation)
      if (!/^\d+$/.test(surahNumber)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid surah number',
            details: `Surah number must be a number, got ${surahNumber}`
          },
          { status: 400 }
        )
      }
      apiPath = `/surat/${surahNumber}`
      isSurahDetail = true
    } else if (pathParts.length === 5 && pathParts[2] === 'surat') {
      // /api/al-quran/surat/{number} - handle Next.js route params
      const surahNumber = pathParts[3]
      if (!/^\d+$/.test(surahNumber)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid surah number',
            details: `Surah number must be a number, got ${surahNumber}`
          },
          { status: 400 }
        )
      }
      apiPath = `/surat/${surahNumber}`
      isSurahDetail = true
    } else {
      console.log('Endpoint not found - path parts:', pathParts)
      return NextResponse.json(
        {
          success: false,
          error: 'Endpoint not found',
          details: `Expected /api/al-quran/surat or /api/al-quran/surat/[number], got ${pathname}`
        },
        { status: 404 }
      )
    }

    console.log('API Path:', apiPath)

    // Coba ambil data dari API
    const apiResult = await fetchFromQuranAPI(apiPath, isSurahDetail)

    if (apiResult.success) {
      return NextResponse.json({
        success: true,
        data: apiResult.data
      })
    }

    // Jika API gagal, gunakan data lokal sebagai fallback
    console.log('All APIs failed, using local fallback data')

    if (!isSurahDetail) {
      // Untuk daftar surah, kembalikan data lokal yang terbatas
      return NextResponse.json({
        success: true,
        data: LOCAL_SURAHS
      })
    } else {
      // Untuk detail surah, cari surah yang sesuai atau kembalikan Al-Fatihah
      const surahNumber = parseInt(pathParts[3])
      // Pastikan nomor surah valid
      const validSurahNumber = isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114 ? 1 : surahNumber
      const localSurah = LOCAL_SURAHS.find(s => s.nomor === validSurahNumber) || LOCAL_SURAHS[0]

      return NextResponse.json({
        success: true,
        data: localSurah
      })
    }

  } catch (error) {
    console.error('API error:', error)

    // Fallback ke data lokal jika terjadi error internal
    return NextResponse.json({
      success: true,
      data: LOCAL_SURAHS[0] // Kembalikan Al-Fatihah sebagai fallback
    })
  }
}
