import { Suspense } from 'react'
import { Metadata } from 'next'
import { PackageCard } from '@/components/package/PackageCard'
import { FilterSidebar } from '@/components/package/FilterSidebar'
import { Star, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Katalog Paket Umroh Terbaik',
  description: 'Temukan ribuan pilihan paket umroh dari travel agent terpercaya yang telah terverifikasi PPIU.',
}

// Sample packages data (will be replaced with Supabase query)
const samplePackages = [
  {
    id: '1',
    vendor_id: '1',
    nama: 'Umroh Reguler 5 Bintang Awal Musim',
    deskripsi: 'Paket umroh reguler dengan hotel bintang 5 dekat Masjidil Haram.',
    harga: 32500000,
    durasi_hari: 9,
    tanggal_keberangkatan: '2024-10-15',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop',
    featured: true,
    slug: 'umroh-reguler-5-bintang-awal-musim',
    ppiu_number: '420/2021',
    maskapai: 'Saudia',
    hotel_bintang: 5,
    rating: 4.8,
    jumlah_terjual: 156,
    is_promo: false,
    promo_harga: null,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    vendor_id: '2',
    nama: 'Paket Umroh Promo Syawal 2024',
    deskripsi: 'Raih keberkahan bulan Syawal dengan paket umroh promo spesial.',
    harga: 28000000,
    durasi_hari: 12,
    tanggal_keberangkatan: '2024-10-20',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=800&h=500&fit=crop',
    featured: false,
    slug: 'paket-umroh-promo-syawal-2024',
    ppiu_number: '12/2020',
    maskapai: 'Garuda',
    hotel_bintang: 4,
    rating: 4.5,
    jumlah_terjual: 89,
    is_promo: true,
    promo_harga: 24500000,
    created_at: '2024-02-01',
  },
  {
    id: '3',
    vendor_id: '1',
    nama: 'Umroh Plus Turki 12 Hari: Jejak Peradaban Islam',
    deskripsi: 'Kombinasi umroh dan wisata religi Turki, mengunjungi tempat bersejarah.',
    harga: 45000000,
    durasi_hari: 12,
    tanggal_keberangkatan: '2024-11-01',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
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
  },
  {
    id: '4',
    vendor_id: '3',
    nama: 'Umroh Keluarga Hemat - Promo Akhir Tahun',
    deskripsi: 'Paket umroh keluarga dengan harga hemat untuk 4 orang ke Makkah dan Madinah.',
    harga: 22000000,
    durasi_hari: 9,
    tanggal_keberangkatan: '2024-12-15',
    kota_keberangkatan: 'Surabaya (SUB)',
    gambar_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop',
    featured: false,
    slug: 'umroh-keluarga-hemat-promo-akhir-tahun',
    ppiu_number: '156/2021',
    maskapai: 'Emirates',
    hotel_bintang: 4,
    rating: 4.6,
    jumlah_terjual: 234,
    is_promo: true,
    promo_harga: 19500000,
    created_at: '2024-04-01',
  },
  {
    id: '5',
    vendor_id: '2',
    nama: 'Umroh VIP Private Guide - 7 Hari',
    deskripsi: 'Layanan VIP dengan private guide throughout perjalanan, transfer private.',
    harga: 55000000,
    durasi_hari: 7,
    tanggal_keberangkatan: '2024-11-10',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images/unsplash.com/photo-1586892478390-53a7af3d5f3b?w=800&h=500&fit=crop',
    featured: true,
    slug: 'umroh-vip-private-guide-7-hari',
    ppiu_number: '23/2023',
    maskapai: 'Qatar Airways',
    hotel_bintang: 5,
    rating: 5.0,
    jumlah_terjual: 42,
    is_promo: false,
    promo_harga: null,
    created_at: '2024-05-01',
  },
  {
    id: '6',
    vendor_id: '3',
    nama: 'Umroh Ramadhan 1446 H - Spesial',
    deskripsi: 'Tuntaskan ibadah umroh di bulan suci Ramadhan dengan paket eksklusif.',
    harga: 38000000,
    durasi_hari: 10,
    tanggal_keberangkatan: '2025-02-20',
    kota_keberangkatan: 'Medan (KNO)',
    gambar_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&h=500&fit=crop',
    featured: true,
    slug: 'umroh-ramadhan-1446-h-spesial',
    ppiu_number: '78/2022',
    maskapai: 'Saudia',
    hotel_bintang: 5,
    rating: 4.9,
    jumlah_terjual: 312,
    is_promo: false,
    promo_harga: null,
    created_at: '2024-06-01',
  },
]

function PackageGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {samplePackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  )
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button className="p-2 rounded-lg border border-border bg-slate-800/50 text-slate-400 hover:border-primary hover:text-primary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {[1, 2, 3, '...', 12].map((page, i) => (
        <button
          key={i}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            page === 1
              ? 'bg-primary text-white'
              : 'border border-border bg-slate-800/50 text-slate-400 hover:border-primary hover:text-primary'
          }`}
        >
          {page}
        </button>
      ))}
      <button className="p-2 rounded-lg border border-border bg-slate-800/50 text-slate-400 hover:border-primary hover:text-primary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero / Catalog Header */}
      <div className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-slate-300">Katalog Paket</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Katalog Paket Umroh Terbaik
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Temukan ribuan pilihan paket umroh dari travel agent terpercaya yang telah terverifikasi PPIU. 
            Perjalanan suci Anda dimulai dengan kepastian di sini.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Package Grid */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                Menampilkan <span className="text-primary">124 Paket Umroh</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Urutkan:</span>
                <select className="text-sm bg-slate-800/50 border border-border rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-primary">
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Durasi</option>
                  <option>Populer</option>
                </select>
              </div>
            </div>

            {/* Search context */}
            <p className="text-sm text-slate-400 mb-4">
              Hasil pencarian untuk &quot;Bulan Oktober&quot; di Jakarta
            </p>

            {/* Package Grid */}
            <Suspense fallback={<div className="text-slate-400">Loading packages...</div>}>
              <PackageGrid />
            </Suspense>

            {/* Pagination */}
            <Pagination />

            {/* Consultan Banner */}
            <div className="mt-10 glass-card p-6 md:p-8 bg-gradient-to-r from-emerald-900/30 to-slate-800/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bantuan Pilih Paket?</h3>
                  <p className="text-sm text-slate-400">
                    Konsultan kami siap membantu Anda memilih paket yang paling sesuai dengan budget dan kebutuhan keluarga Anda.
                  </p>
                </div>
                <Link
                  href="#"
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hubungi Konsultan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
