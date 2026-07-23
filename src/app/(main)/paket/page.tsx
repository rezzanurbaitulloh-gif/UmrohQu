import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { PackageCard } from '@/components/package/PackageCard'
import { FilterSidebar } from '@/components/package/FilterSidebar'
import { ChevronRight, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Katalog Paket Umroh Terbaik',
  description: 'Temukan ribuan pilihan paket umroh dari travel agent terpercaya yang telah terverifikasi PPIU.',
}

const samplePackages = [
  {
    id: '1', vendor_id: '1', nama: 'Umroh Reguler 5 Bintang Awal Musim', deskripsi: 'Paket umroh reguler dengan hotel bintang 5 dekat Masjidil Haram.',
    harga: 32500000, durasi_hari: 9, tanggal_keberangkatan: '2024-10-15', kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop', featured: true,
    slug: 'umroh-reguler-5-bintang-awal-musim', ppiu_number: '420/2021', maskapai: 'Saudia', hotel_bintang: 5, rating: 4.8,
    jumlah_terjual: 156, is_promo: false, promo_harga: null, created_at: '2024-01-01',
  },
  {
    id: '2', vendor_id: '2', nama: 'Paket Umroh Promo Syawal 2024', deskripsi: 'Raih keberkahan bulan Syawal dengan paket umroh promo spesial.',
    harga: 28000000, durasi_hari: 12, tanggal_keberangkatan: '2024-10-20', kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=800&h=500&fit=crop', featured: false,
    slug: 'paket-umroh-promo-syawal-2024', ppiu_number: '12/2020', maskapai: 'Garuda', hotel_bintang: 4, rating: 4.5,
    jumlah_terjual: 89, is_promo: true, promo_harga: 24500000, created_at: '2024-02-01',
  },
  {
    id: '3', vendor_id: '1', nama: 'Umroh Plus Turki 12 Hari', deskripsi: 'Kombinasi umroh dan wisata religi Turki.',
    harga: 45000000, durasi_hari: 12, tanggal_keberangkatan: '2024-11-01', kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop', featured: true,
    slug: 'umroh-plus-turki-12-hari', ppiu_number: '85/2022', maskapai: 'Turkish Airlines', hotel_bintang: 5, rating: 4.9,
    jumlah_terjual: 67, is_promo: false, promo_harga: null, created_at: '2024-03-01',
  },
  {
    id: '4', vendor_id: '3', nama: 'Umroh Keluarga Hemat', deskripsi: 'Paket umroh keluarga dengan harga hemat.',
    harga: 22000000, durasi_hari: 9, tanggal_keberangkatan: '2024-12-15', kota_keberangkatan: 'Surabaya (SUB)',
    gambar_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop', featured: false,
    slug: 'umroh-keluarga-hemat', ppiu_number: '156/2021', maskapai: 'Emirates', hotel_bintang: 4, rating: 4.6,
    jumlah_terjual: 234, is_promo: true, promo_harga: 19500000, created_at: '2024-04-01',
  },
  {
    id: '5', vendor_id: '2', nama: 'Umroh VIP Private Guide 7 Hari', deskripsi: 'Layanan VIP dengan private guide throughout perjalanan.',
    harga: 55000000, durasi_hari: 7, tanggal_keberangkatan: '2024-11-10', kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1586892478390-53a7af3d5f3b?w=800&h=500&fit=crop', featured: true,
    slug: 'umroh-vip-private-guide-7-hari', ppiu_number: '23/2023', maskapai: 'Qatar Airways', hotel_bintang: 5, rating: 5.0,
    jumlah_terjual: 42, is_promo: false, promo_harga: null, created_at: '2024-05-01',
  },
  {
    id: '6', vendor_id: '3', nama: 'Umroh Ramadhan 1446 H Spesial', deskripsi: 'Tuntaskan ibadah umroh di bulan suci Ramadhan.',
    harga: 38000000, durasi_hari: 10, tanggal_keberangkatan: '2025-02-20', kota_keberangkatan: 'Medan (KNO)',
    gambar_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&h=500&fit=crop', featured: true,
    slug: 'umroh-ramadhan-1446-h-spesial', ppiu_number: '78/2022', maskapai: 'Saudia', hotel_bintang: 5, rating: 4.9,
    jumlah_terjual: 312, is_promo: false, promo_harga: null, created_at: '2024-06-01',
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

export default function CatalogPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="py-10 px-4 sm:px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">Katalog Paket</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Katalog Paket Umroh Terbaik</h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Temukan ribuan pilihan paket umroh dari travel agent terpercaya yang telah terverifikasi PPIU.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <FilterSidebar />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-slate-600">
                Menampilkan <span className="text-primary font-semibold">124 Paket Umroh</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Urutkan:</span>
                <select className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:border-primary appearance-none cursor-pointer">
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Durasi</option>
                  <option>Populer</option>
                </select>
              </div>
            </div>

            <Suspense fallback={<div className="text-slate-400">Loading packages...</div>}>
              <PackageGrid />
            </Suspense>

            {/* Consultan Banner */}
            <div className="mt-10 glass-card p-6 md:p-8 bg-gradient-to-r from-green-50 to-slate-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">Bantuan Pilih Paket?</h3>
                  <p className="text-sm text-slate-500">
                    Konsultan kami siap membantu Anda memilih paket yang paling sesuai dengan budget dan kebutuhan keluarga Anda.
                  </p>
                </div>
                <Link
                  href="#"
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
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
