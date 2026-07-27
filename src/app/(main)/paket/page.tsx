import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Calendar, Plane, Users, Star, Search, MapPin, Heart, Share2, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Paket Umroh Terbaik - UmrohQu',
  description: 'Temukan paket umroh terbaik dari travel agent terpercaya dengan harga terjangkau dan fasilitas lengkap.',
}

const samplePackages = [
  {
    id: '1',
    nama: 'Umroh Reguler 5 Bintang Awal Musim',
    deskripsi: 'Paket umroh reguler dengan hotel bintang 5 dekat Masjidil Haram. Fasilitas lengkap dan pelayanan prima.',
    harga: 32500000,
    promo_harga: 29500000,
    durasi_hari: 9,
    tanggal_keberangkatan: '2024-10-15',
    kota_keberangkatan: 'Jakarta (CGK)',
    maskapai: 'Saudia',
    hotel_bintang: 5,
    rating: 4.8,
    jumlah_terjual: 156,
    vendor: 'Al-Hidayah Travel',
    ppiu_number: '420/2021',
    fasilitas: [
      'Hotel bintang 5 dekat Masjidil Haram',
      'Makan 3x sehari',
      'Transportasi bandara',
      'Ziarah ke tempat-tempat bersejarah',
      'Pembimbing ibadah berpengalaman'
    ],
    is_promo: true,
    slug: 'umroh-reguler-5-bintang-awal-musim'
  },
  {
    id: '2',
    nama: 'Paket Umroh Promo Syawal 2024',
    deskripsi: 'Raih keberkahan bulan Syawal dengan paket umroh promo spesial. Harga terjangkau dengan fasilitas lengkap.',
    harga: 28000000,
    promo_harga: 24500000,
    durasi_hari: 12,
    tanggal_keberangkatan: '2024-10-20',
    kota_keberangkatan: 'Jakarta (CGK)',
    maskapai: 'Garuda',
    hotel_bintang: 4,
    rating: 4.5,
    jumlah_terjual: 89,
    vendor: 'Nurul Iman Tour',
    ppiu_number: '12/2020',
    fasilitas: [
      'Hotel bintang 4 dekat Masjid Nabawi',
      'Makan 2x sehari',
      'Transportasi bandara',
      'Ziarah ke tempat bersejarah',
      'Pembimbing ibadah'
    ],
    is_promo: true,
    slug: 'paket-umroh-promo-syawal-2024'
  },
  {
    id: '3',
    nama: 'Umroh Plus Turki 12 Hari',
    deskripsi: 'Kombinasi umroh dan wisata religi Turki. Kunjungi tempat-tempat bersejarah di Istanbul dan sekitarnya.',
    harga: 45000000,
    promo_harga: null,
    durasi_hari: 12,
    tanggal_keberangkatan: '2024-11-01',
    kota_keberangkatan: 'Jakarta (CGK)',
    maskapai: 'Turkish Airlines',
    hotel_bintang: 5,
    rating: 4.9,
    jumlah_terjual: 67,
    vendor: 'Global Ziarah',
    ppiu_number: '85/2022',
    fasilitas: [
      'Hotel bintang 5 di Makkah & Madinah',
      'Tour wisata Turki 4 hari',
      'Makan 3x sehari',
      'Transportasi eksklusif',
      'Pembimbing ibadah multibahasa'
    ],
    is_promo: false,
    slug: 'umroh-plus-turki-12-hari'
  },
  {
    id: '4',
    nama: 'Umroh Keluarga Hemat - Promo Akhir Tahun',
    deskripsi: 'Paket umroh keluarga dengan harga hemat untuk 4 orang. Fasilitas lengkap dan pelayanan ramah keluarga.',
    harga: 22000000,
    promo_harga: 19500000,
    durasi_hari: 9,
    tanggal_keberangkatan: '2024-12-15',
    kota_keberangkatan: 'Surabaya (SUB)',
    maskapai: 'Emirates',
    hotel_bintang: 4,
    rating: 4.6,
    jumlah_terjual: 234,
    vendor: 'Safari Tour',
    ppiu_number: '156/2021',
    fasilitas: [
      'Hotel bintang 4 dekat Masjidil Haram',
      'Makan 2x sehari',
      'Transportasi bandara',
      'Ziarah keluarga',
      'Pembimbing ibadah ramah anak'
    ],
    is_promo: true,
    slug: 'umroh-keluarga-hemat-promo-akhir-tahun'
  },
  {
    id: '5',
    nama: 'Umroh VIP Private Guide - 7 Hari',
    deskripsi: 'Layanan VIP dengan private guide throughout perjalanan. Transfer private dan fasilitas eksklusif.',
    harga: 55000000,
    promo_harga: null,
    durasi_hari: 7,
    tanggal_keberangkatan: '2024-11-10',
    kota_keberangkatan: 'Jakarta (CGK)',
    maskapai: 'Qatar Airways',
    hotel_bintang: 5,
    rating: 5.0,
    jumlah_terjual: 42,
    vendor: 'Elite Travel',
    ppiu_number: '23/2023',
    fasilitas: [
      'Hotel bintang 5 premium',
      'Private guide 24/7',
      'Transportasi private',
      'Makanan premium',
      'Akses VIP di bandara'
    ],
    is_promo: false,
    slug: 'umroh-vip-private-guide-7-hari'
  },
  {
    id: '6',
    nama: 'Umroh Ramadhan 1446 H - Spesial',
    deskripsi: 'Tuntaskan ibadah umroh di bulan suci Ramadhan dengan paket eksklusif. Fasilitas lengkap dan bimbingan spiritual.',
    harga: 38000000,
    promo_harga: 35000000,
    durasi_hari: 10,
    tanggal_keberangkatan: '2025-02-20',
    kota_keberangkatan: 'Medan (KNO)',
    maskapai: 'Saudia',
    hotel_bintang: 5,
    rating: 4.9,
    jumlah_terjual: 312,
    vendor: 'Al-Madinah Travel',
    ppiu_number: '78/2022',
    fasilitas: [
      'Hotel bintang 5 dekat Masjidil Haram',
      'Makan sahur & buka puasa',
      'Transportasi eksklusif',
      'Bimbingan ibadah Ramadhan',
      'Ziarah malam'
    ],
    is_promo: true,
    slug: 'umroh-ramadhan-1446-h-spesial'
  }
]

function PackageCard({ pkg }: { pkg: typeof samplePackages[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={`https://images.unsplash.com/photo-${pkg.id}-umroh?w=600&h=300&fit=crop`}
          alt={pkg.nama}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {pkg.maskapai}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">
          {pkg.hotel_bintang} <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" />
        </div>
        {pkg.is_promo && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            PROMO
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-slate-900">{pkg.nama}</h3>
          <div className="text-right">
            {pkg.is_promo ? (
              <>
                <div className="text-sm text-slate-400 line-through">Rp {pkg.harga.toLocaleString('id-ID')}</div>
                <div className="text-lg font-bold text-red-500">Rp {pkg.promo_harga?.toLocaleString('id-ID')}</div>
              </>
            ) : (
              <>
                <div className="text-sm text-slate-500">Mulai dari</div>
                <div className="text-lg font-bold text-primary">Rp {pkg.harga.toLocaleString('id-ID')}</div>
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{pkg.deskripsi}</p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{pkg.durasi_hari} hari</span>
          </div>
          <div className="flex items-center gap-1">
            <Plane className="w-3 h-3" />
            <span>{pkg.kota_keberangkatan}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(pkg.tanggal_keberangkatan).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">{pkg.jumlah_terjual} terjual</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-slate-600">{pkg.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-500">
            <div className="font-medium">{pkg.vendor}</div>
            <div>PPIU: {pkg.ppiu_number}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Heart className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Fasilitas:</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            {pkg.fasilitas.slice(0, 3).map((fasilitas, index) => (
              <li key={index} className="flex items-center gap-1">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {fasilitas}
              </li>
            ))}
            {pkg.fasilitas.length > 3 && (
              <li className="text-primary text-xs">+{pkg.fasilitas.length - 3} fasilitas lainnya</li>
            )}
          </ul>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/paket/${pkg.slug}`} className="flex-1">
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Lihat Detail
            </button>
          </Link>
          <Link href={`/booking/${pkg.id}`} className="flex-1">
            <button className="w-full border border-primary text-primary hover:bg-primary/10 py-2 rounded-lg text-sm font-medium transition-colors">
              Pesan Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function PackageGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {samplePackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  )
}

export default function PaketUmrohPage() {
  return (
    <div className="bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Paket Umroh Terbaik</h1>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Temukan paket umroh terbaik dari travel agent terpercaya. Dapatkan pengalaman ibadah yang nyaman dan berkah dengan harga terjangkau.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kota Keberangkatan</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Kota</option>
                <option>Jakarta (CGK)</option>
                <option>Surabaya (SUB)</option>
                <option>Medan (KNO)</option>
                <option>Bandung (BDO)</option>
                <option>Yogyakarta (JOG)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bulan Keberangkatan</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Bulan</option>
                <option>Oktober 2024</option>
                <option>November 2024</option>
                <option>Desember 2024</option>
                <option>Januari 2025</option>
                <option>Februari 2025</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bintang Hotel</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Bintang</option>
                <option>5 Bintang</option>
                <option>4 Bintang</option>
                <option>3 Bintang</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Durasi</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Durasi</option>
                <option>7-9 hari</option>
                <option>10-12 hari</option>
                <option>13+ hari</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Rentang Harga</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Harga</option>
                <option>Rp 20jt - Rp 30jt</option>
                <option>Rp 30jt - Rp 40jt</option>
                <option>Rp 40jt - Rp 50jt</option>
                <option>Di atas Rp 50jt</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1">Cari Paket Umroh</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama paket, travel agent..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors mt-6 md:mt-0">
              Cari Paket
            </button>
          </div>
        </div>

        {/* Featured Packages */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Paket Unggulan</h2>
            <Link href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePackages.filter(pkg => pkg.rating >= 4.8).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* All Packages */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Semua Paket Umroh</h2>
            <span className="text-sm text-slate-500">Menampilkan {samplePackages.length} paket</span>
          </div>

          <PackageGrid />
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">Mengapa Memilih Paket Umroh di UmrohQu?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Travel Terverifikasi</h3>
              <p className="text-xs text-slate-600">Semua travel agent telah melalui proses verifikasi ketat untuk memastikan kualitas dan keamanan.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Pembayaran Aman</h3>
              <p className="text-xs text-slate-600">Sistem pembayaran terenkripsi untuk melindungi transaksi Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Ulasan Asli</h3>
              <p className="text-xs text-slate-600">Lihat ulasan dari jamaah yang telah menggunakan paket umroh untuk membuat keputusan yang tepat.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Dukungan 24/7</h3>
              <p className="text-xs text-slate-600">Tim dukungan kami siap membantu Anda kapan saja selama perjalanan.</p>
            </div>
          </div>
        </div>

        {/* How to Book */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">Cara Memesan Paket Umroh</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">1. Cari Paket</h3>
              <p className="text-xs text-slate-600">Gunakan filter untuk menemukan paket umroh yang sesuai dengan kebutuhan dan budget Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">2. Pilih Paket</h3>
              <p className="text-xs text-slate-600">Bandingkan berbagai pilihan paket dan baca ulasan dari jamaah sebelumnya.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">3. Pesan & Bayar</h3>
              <p className="text-xs text-slate-600">Lakukan pemesanan dan pembayaran melalui sistem yang aman dan terpercaya.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plane className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">4. Nikmati Perjalanan</h3>
              <p className="text-xs text-slate-600">Persiapkan diri Anda untuk perjalanan spiritual yang tak terlupakan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}