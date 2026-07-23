import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Clock, Users, Plane, Hotel, Share2, Bookmark, ChevronRight, Phone } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Paket Umroh - Detail',
  description: 'Detail paket umroh lengkap dengan itinerary, hotel, dan penerbangan.',
}

// Sample package data
const samplePackage = {
  id: '1',
  nama: 'Umroh Plus Turki 12 Hari: Jejak Peradaban Islam & Ibadah Suci',
  deskripsi: 'Kombinasi umroh dan wisata religi Turki, mengunjungi tempat bersejarah Islam di Istanbul dan kota suci Makkah & Madinah. Paket eksklusif dengan hotel bintang 5 dekat Haram.',
  harga: 32500000,
  durasi_hari: 12,
  tanggal_keberangkatan: '2024-10-15',
  kota_keberangkatan: 'Jakarta (CGK)',
  gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=600&fit=crop',
  featured: true,
  slug: 'umroh-plus-turki-12-hari',
  ppiu_number: '85/2022',
  maskapai: 'Turkish Airlines',
  hotel_bintang: 5,
  rating: 4.9,
  jumlah_terjual: 67,
  is_promo: false,
  promo_harga: null,
  created_at: '2024-03-01',
}

const photos = [
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop',
]

const itinerary = [
  {
    hari_ke: 1,
    judul: 'Keberangkatan Jakarta – Istanbul',
    deskripsi: 'Berkumpul di Bandara Soekarno-Hatta untuk proses check-in dan briefing keberangkatan menuju Istanbul, Turki menggunakan Turkish Airlines.',
    gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=300&fit=crop',
  },
  {
    hari_ke: 2,
    judul: 'City Tour Istanbul & Bosphorus',
    deskripsi: 'Tiba di Istanbul, mengunjungi Blue Mosque, Hagia Sophia, dan menikmati keindahan selat Bosphorus dengan Cruise privat.',
    gambar_url: 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=600&h=300&fit=crop',
  },
  {
    hari_ke: 3,
    judul: 'Istanbul – Madinah Al-Munawwarah',
    deskripsi: 'Melanjutkan perjalanan menuju kota suci Madinah. Proses check-in hotel dan persiapan ibadah di Masjid Nabawi.',
    gambar_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=500&fit=crop',
  },
  {
    hari_ke: 4,
    judul: 'Ziarah di Madinah',
    deskripsi: 'Ziarah ke Masjid Quba, Bukit Uhud, dan tempat-tempat bersejarah lainnya di Madinah.',
    gambar_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=500&fit=crop',
  },
  {
    hari_ke: 5,
    judul: 'Madinah – Makkah',
    deskripsi: 'Perjalanan menuju kota suci Makkah. Check-in hotel dan persiapan untuk umroh.',
    gambar_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=600&h=300&fit=crop',
  },
  {
    hari_ke: 6,
    judul: 'Ibadah Umroh',
    deskripsi: 'Melaksanakan ibadah umroh di Masjidil Haram. Tawaf, Sa\'i, dan ibadah lainnya.',
    gambar_url: null,
  },
]

const hotels = [
  {
    nama: 'Pullman Zamzam Madinah',
    kota: 'Madinah',
    bintang: 5,
    deskripsi: 'Hotel bintang 5 langsung terhubung dengan Masjid Nabawi',
    gambar_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=300&fit=crop',
    jarak_ke_masjid: '50m',
  },
  {
    nama: 'Swissôtel Al Maqam Makkah',
    kota: 'Makkah',
    bintang: 5,
    deskripsi: 'Hotel bintang 5 dengan pemandangan langsung Ka\'bah',
    gambar_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=300&fit=crop',
    jarak_ke_masjid: '100m',
  },
]

const flights = [
  {
    maskapai: 'Turkish Airlines',
    kode_penerbangan: 'TK 205',
    dari: 'Jakarta (CGK)',
    ke: 'Istanbul (IST)',
    waktu_berangkat: '08:30',
    waktu_tiba: '15:45',
  },
  {
    maskapai: 'Turkish Airlines',
    kode_penerbangan: 'TK 720',
    dari: 'Istanbul (IST)',
    ke: 'Madinah (MED)',
    waktu_berangkat: '10:00',
    waktu_tiba: '12:30',
  },
]

export default function PackageDetailPage() {
  return (
    <div className="bg-white">
      {/* Hero Gallery */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={samplePackage.gambar_url}
          alt={samplePackage.nama}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Photo count badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            📷 {photos.length} Foto
          </span>
        </div>

        {/* Share & Bookmark */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-green-500/80 transition-colors">
            <Share2 size={16} />
          </button>
          <button className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-green-500/80 transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - Tabs */}
          <div className="flex-1">
            {/* Breadcrumb + Title */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-3">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <Link href="/paket" className="hover:text-primary transition-colors">Paket Umroh</Link>
              <ChevronRight size={14} />
              <span className="text-slate-600">Detail</span>
            </nav>

            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              {samplePackage.nama}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-slate-900 font-medium">{samplePackage.rating}</span>
                ({samplePackage.jumlah_terjual} terjual)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {samplePackage.durasi_hari} Hari
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {samplePackage.kota_keberangkatan}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {samplePackage.maskapai}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                PPIU No. {samplePackage.ppiu_number}
              </span>
            </div>

            <Tabs defaultValue="itinerari" className="w-full">
              <TabsList className="w-full justify-start bg-slate-50 border border-slate-200 rounded-xl p-1 mb-6">
                <TabsTrigger value="itinerari" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Itinerari</TabsTrigger>
                <TabsTrigger value="hotel" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Hotel & Pesawat</TabsTrigger>
                <TabsTrigger value="fasilitas" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Fasilitas</TabsTrigger>
                <TabsTrigger value="syarat" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Syarat & Ketentuan</TabsTrigger>
              </TabsList>

              {/* Itinerary Tab */}
              <TabsContent value="itinerari" className="space-y-0">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Rencana Perjalanan</h2>
                <div className="relative">
                  {itinerary.map((item, index) => (
                    <div key={item.hari_ke} className="flex gap-4 pb-8 last:pb-0">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm z-10">
                          {item.hari_ke}
                        </div>
                        {index < itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-green-100 mt-2" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 glass-card p-5">
                        <h3 className="text-base font-semibold text-slate-900 mb-2">{item.judul}</h3>
                        <p className="text-sm text-slate-500 mb-3">{item.deskripsi}</p>
                        {item.gambar_url && (
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image
                              src={item.gambar_url}
                              alt={item.judul}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Hotel & Flight Tab */}
              <TabsContent value="hotel" className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Hotel & Penerbangan</h2>

                {/* Hotels */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-primary" />
                    Akomodasi Hotel
                  </h3>
                  {hotels.map((hotel) => (
                    <div key={hotel.nama} className="glass-card overflow-hidden">
                      <div className="md:flex">
                        <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
                          <Image
                            src={hotel.gambar_url}
                            alt={hotel.nama}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5 flex-1">
                          <h4 className="text-base font-semibold text-slate-900 mb-1">{hotel.nama}</h4>
                          <p className="text-xs text-primary mb-2">{hotel.kota}</p>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < hotel.bintang ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                            ))}
                          </div>
                          <p className="text-sm text-slate-500">{hotel.deskripsi}</p>
                          {hotel.jarak_ke_masjid && (
                            <p className="text-xs text-slate-400 mt-2">📍 {hotel.jarak_ke_masjid} dari Masjidil Haram</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flights */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" />
                    Penerbangan
                  </h3>
                  {flights.map((flight) => (
                    <div key={flight.kode_penerbangan} className="glass-card p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{flight.maskapai}</p>
                          <p className="text-xs text-slate-500">{flight.kode_penerbangan}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">{flight.waktu_berangkat}</p>
                            <p className="text-xs text-slate-500">{flight.dari}</p>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <div className="w-8 h-px bg-border" />
                            <Plane size={16} className="text-primary" />
                            <div className="w-8 h-px bg-border" />
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-slate-900">{flight.waktu_tiba}</p>
                            <p className="text-xs text-slate-500">{flight.ke}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Fasilitas Tab */}
              <TabsContent value="fasilitas">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Fasilitas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Visa Umroh', 'Hotel Bintang 5', 'Transportasi AC', 'Makan 3x sehari', 'Pembimbing ibadah', 'Airport assistance', 'Semua tiket', 'Travel insurance', 'City tour', 'Manasik'].map((item) => (
                    <div key={item} className="glass-card p-4 flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Syarat Tab */}
              <TabsContent value="syarat">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Syarat & Ketentuan</h2>
                <div className="glass-card p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Dokumen Wajib:</h3>
                    <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                      <li>Paspor minimal berlaku 8 bulan dari tanggal keberangkatan</li>
                      <li>Foto paspor berwarna (background putih)</li>
                      <li>KTP asli & fotokopi</li>
                      <li>Kartu Keluarga (KK) fotokopi</li>
                      <li>Buku Nikah / Akta Cerai (bagi yang menikah)</li>
                      <li>Akte Kelahiran (bagi anak &lt; 17 tahun)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Ketentuan Pembatalan:</h3>
                    <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                      <li>Pembatalan H-60: Biaya administrasi 10%</li>
                      <li>Pembatalan H-30: Biaya administrasi 25%</li>
                      <li>Pembatalan H-15: Biaya administrasi 50%</li>
                      <li>Pembatalan H-7: Tidak ada pengembalian dana</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Price Card */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-slate-500 mb-3">Mulai dari</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">
                  Rp {samplePackage.harga.toLocaleString('id-ID')}
                </span>
                <span className="text-sm text-slate-400 ml-1">/pax</span>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Min.</span>
                  <span>Rp {Math.floor(samplePackage.harga / 2).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>DP</span>
                  <span className="text-red-500">Rp 10.000.000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Sisa</span>
                  <span>Rp {(samplePackage.harga - 10000000).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Kursi Tersedia</span>
                  <span>12</span>
                </div>
                <Separator />
                <div className="flex justify-between text-slate-900 font-medium">
                  <span>Keberangkatan</span>
                  <span>12 Okt 2024</span>
                </div>
              </div>

              <Link href={`/booking/${samplePackage.id}`}>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium">
                  Pesan Paket Sekarang
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                <Phone className="w-4 h-4 text-primary" />
                <span>Punya pertanyaan?</span>
                <Link href="#" className="text-primary hover:text-primary-dark font-medium">
                  Chat CS Konsultasi
                </Link>
              </div>

              <p className="text-xs text-slate-400 mt-4 text-center">
                Dengan menekan tombol, Anda menyetujui Syarat & Ketentuan UmrohQu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
