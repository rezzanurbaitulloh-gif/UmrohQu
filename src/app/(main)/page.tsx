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
    travel_id: '1',
    title: 'Umroh Reguler 5 Bintang Awal Musim',
    description: 'Paket umroh reguler dengan hotel bintang 5 dekat Masjidil Haram.',
    price_per_pax: 32500000,
    departure_date: '2024-10-15',
    return_date: '2024-10-24',
    duration_days: 9,
    remaining_quota: 20,
    total_quota: 100,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop',
    nama: 'Umroh Reguler 5 Bintang Awal Musim',
    durasi_hari: 9,
    kota_keberangkatan: 'Jakarta (CGK)',
    hotel_bintang: 5,
    slug: 'umroh-reguler-5-bintang-awal-musim',
    is_promo: false,
    featured: true,
    promo_harga: 0,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    travel_id: '2',
    title: 'Paket Umroh Promo Syawal 2024',
    description: 'Raih keberkahan bulan Syawal dengan paket umroh promo spesial.',
    price_per_pax: 28000000,
    departure_date: '2024-10-20',
    return_date: '2024-10-30',
    duration_days: 12,
    remaining_quota: 15,
    total_quota: 80,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=800&h=500&fit=crop',
    nama: 'Paket Umroh Promo Syawal 2024',
    durasi_hari: 12,
    kota_keberangkatan: 'Jakarta (CGK)',
    hotel_bintang: 4,
    slug: 'paket-umroh-promo-syawal-2024',
    is_promo: true,
    featured: false,
    promo_harga: 24500000,
    created_at: '2024-02-01',
    updated_at: '2024-02-01',
  },
  {
    id: '3',
    travel_id: '1',
    title: 'Umroh Plus Turki 12 Hari: Jejak Peradaban Islam',
    description: 'Kombinasi umroh dan wisata religi Turki, mengunjungi tempat bersejarah.',
    price_per_pax: 45000000,
    departure_date: '2024-11-01',
    return_date: '2024-11-13',
    duration_days: 12,
    remaining_quota: 10,
    total_quota: 50,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
    nama: 'Umroh Plus Turki 12 Hari',
    durasi_hari: 12,
    kota_keberangkatan: 'Jakarta (CGK)',
    hotel_bintang: 5,
    slug: 'umroh-plus-turki-12-hari',
    is_promo: false,
    featured: true,
    promo_harga: 0,
    created_at: '2024-03-01',
    updated_at: '2024-03-01',
  },
  {
    id: '4',
    travel_id: '3',
    title: 'Umroh Keluarga Hemat - Promo Akhir Tahun',
    description: 'Paket umroh keluarga dengan harga hemat untuk 4 orang ke Makkah dan Madinah.',
    price_per_pax: 22000000,
    departure_date: '2024-12-15',
    return_date: '2024-12-24',
    duration_days: 9,
    remaining_quota: 30,
    total_quota: 120,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop',
    nama: 'Umroh Keluarga Hemat',
    durasi_hari: 9,
    kota_keberangkatan: 'Surabaya (SUB)',
    hotel_bintang: 4,
    slug: 'umroh-keluarga-hemat-promo-akhir-tahun',
    is_promo: true,
    featured: false,
    promo_harga: 19500000,
    created_at: '2024-04-01',
    updated_at: '2024-04-01',
  },
  {
    id: '5',
    travel_id: '2',
    title: 'Umroh VIP Private Guide - 7 Hari',
    description: 'Layanan VIP dengan private guide throughout perjalanan, transfer private.',
    price_per_pax: 55000000,
    departure_date: '2024-11-10',
    return_date: '2024-11-17',
    duration_days: 7,
    remaining_quota: 5,
    total_quota: 20,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1586892478390-53a7af3d5f3b?w=800&h=500&fit=crop',
    nama: 'Umroh VIP Private Guide',
    durasi_hari: 7,
    kota_keberangkatan: 'Jakarta (CGK)',
    hotel_bintang: 5,
    slug: 'umroh-vip-private-guide-7-hari',
    is_promo: false,
    featured: true,
    promo_harga: 0,
    created_at: '2024-05-01',
    updated_at: '2024-05-01',
  },
  {
    id: '6',
    travel_id: '3',
    title: 'Umroh Ramadhan 1446 H - Spesial',
    description: 'Tuntaskan ibadah umroh di bulan suci Ramadhan dengan paket eksklusif.',
    price_per_pax: 38000000,
    departure_date: '2025-02-20',
    return_date: '2025-03-01',
    duration_days: 10,
    remaining_quota: 25,
    total_quota: 90,
    is_active: true,
    gambar_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&h=500&fit=crop',
    nama: 'Umroh Ramadhan 1446 H',
    durasi_hari: 10,
    kota_keberangkatan: 'Medan (KNO)',
    hotel_bintang: 5,
    slug: 'umroh-ramadhan-1446-h-spesial',
    is_promo: false,
    featured: true,
    promo_harga: 0,
    created_at: '2024-06-01',
    updated_at: '2024-06-01',
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
