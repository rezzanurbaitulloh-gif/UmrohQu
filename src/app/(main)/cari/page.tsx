import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Calendar, Users, Star, Search, MapPin, Heart, Share2, Utensils, Hotel, Bus, Briefcase, CheckCircle, Plane } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Paket LA (Land Arrangement) - UmrohQu',
  description: 'Paket Land Arrangement keberangkatan paling awal termasuk hotel, visa, transport, tour guide, handling & 3x makan. Tanpa tiket pesawat.',
}

const sampleLaPackages = [
  {
    id: '1',
    nama: 'Paket LA Ekonomis 7 Hari',
    deskripsi: 'Paket land arrangement ekonomis dengan fasilitas lengkap untuk perjalanan umroh yang nyaman dan terjangkau.',
    harga: 12500000,
    promo_harga: 11000000,
    durasi_hari: 7,
    tanggal_keberangkatan: '2024-10-10',
    kota_tujuan: 'Jeddah',
    hotel_bintang: 3,
    rating: 4.5,
    jumlah_terjual: 187,
    vendor: 'Al-Hidayah Travel',
    ppiu_number: '420/2021',
    fasilitas: [
      'Hotel bintang 3 di Makkah & Madinah',
      'Visa umroh',
      'Transportasi darat (bandara-hotel-ziarah)',
      'Tour guide berpengalaman',
      'Handling dokumen',
      'Makan 3x sehari',
      'Air zam-zam 5 liter'
    ],
    is_promo: true,
    slug: 'paket-la-ekonomis-7-hari'
  },
  {
    id: '2',
    nama: 'Paket LA Reguler 9 Hari',
    deskripsi: 'Paket land arrangement reguler dengan fasilitas standar untuk perjalanan umroh yang nyaman dan terorganisir.',
    harga: 15500000,
    promo_harga: null,
    durasi_hari: 9,
    tanggal_keberangkatan: '2024-10-15',
    kota_tujuan: 'Jeddah',
    hotel_bintang: 4,
    rating: 4.7,
    jumlah_terjual: 243,
    vendor: 'Nurul Iman Tour',
    ppiu_number: '12/2020',
    fasilitas: [
      'Hotel bintang 4 dekat Masjidil Haram & Nabawi',
      'Visa umroh',
      'Transportasi darat AC',
      'Tour guide berbahasa Indonesia & Arab',
      'Handling dokumen lengkap',
      'Makan 3x sehari (buffet)',
      'Air zam-zam 10 liter'
    ],
    is_promo: false,
    slug: 'paket-la-reguler-9-hari'
  },
  {
    id: '3',
    nama: 'Paket LA Premium 12 Hari',
    deskripsi: 'Paket land arrangement premium dengan fasilitas terbaik untuk pengalaman umroh yang istimewa dan nyaman.',
    harga: 22000000,
    promo_harga: 19500000,
    durasi_hari: 12,
    tanggal_keberangkatan: '2024-10-20',
    kota_tujuan: 'Jeddah',
    hotel_bintang: 5,
    rating: 4.9,
    jumlah_terjual: 312,
    vendor: 'Global Ziarah',
    ppiu_number: '85/2022',
    fasilitas: [
      'Hotel bintang 5 dekat Masjidil Haram & Nabawi',
      'Visa umroh prioritas',
      'Transportasi darat limousine',
      'Tour guide private berbahasa Indonesia, Arab & Inggris',
      'Handling dokumen VIP',
      'Makan 3x sehari (menu premium)',
      'Air zam-zam 15 liter',
      'Ziarah eksklusif malam hari'
    ],
    is_promo: true,
    slug: 'paket-la-premium-12-hari'
  },
  {
    id: '4',
    nama: 'Paket LA Keluarga 10 Hari',
    deskripsi: 'Paket land arrangement khusus keluarga dengan fasilitas ramah anak dan pelayanan yang memudahkan.',
    harga: 18000000,
    promo_harga: 16500000,
    durasi_hari: 10,
    tanggal_keberangkatan: '2024-11-05',
    kota_tujuan: 'Jeddah',
    hotel_bintang: 4,
    rating: 4.8,
    jumlah_terjual: 156,
    vendor: 'Safari Tour',
    ppiu_number: '156/2021',
    fasilitas: [
      'Hotel bintang 4 keluarga (kamar connecting)',
      'Visa umroh keluarga',
      'Transportasi darat ramah anak',
      'Tour guide berpengalaman dengan anak',
      'Handling dokumen keluarga',
      'Makan 3x sehari (menu anak tersedia)',
      'Air zam-zam 10 liter',
      'Fasilitas bermain anak di hotel'
    ],
    is_promo: true,
    slug: 'paket-la-keluarga-10-hari'
  },
  {
    id: '5',
    nama: 'Paket LA Ramadhan 1446H',
    deskripsi: 'Paket land arrangement khusus bulan Ramadhan dengan fasilitas sahur, buka puasa, dan bimbingan ibadah.',
    harga: 20000000,
    promo_harga: 18500000,
    durasi_hari: 10,
    tanggal_keberangkatan: '2025-02-15',
    kota_tujuan: 'Jeddah',
    hotel_bintang: 4,
    rating: 4.9,
    jumlah_terjual: 421,
    vendor: 'Al-Madinah Travel',
    ppiu_number: '78/2022',
    fasilitas: [
      'Hotel bintang 4 dekat Masjidil Haram',
      'Visa umroh Ramadhan',
      'Transportasi darat eksklusif',
      'Bimbingan ibadah Ramadhan',
      'Sahur & buka puasa bersama',
      'Makan 3x sehari (menu Ramadhan)',
      'Air zam-zam 10 liter',
      'Ziarah malam khusus Ramadhan'
    ],
    is_promo: true,
    slug: 'paket-la-ramadhan-1446h'
  }
]

function LaPackageCard({ pkg }: { pkg: typeof sampleLaPackages[0] }) {
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
            <Calendar className="w-3 h-3" />
            <span>{new Date(pkg.tanggal_keberangkatan).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{pkg.kota_tujuan}</span>
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
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Fasilitas Utama:</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            {pkg.fasilitas.slice(0, 4).map((fasilitas, index) => (
              <li key={index} className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-primary" />
                {fasilitas}
              </li>
            ))}
            {pkg.fasilitas.length > 4 && (
              <li className="text-primary text-xs">+{pkg.fasilitas.length - 4} fasilitas lainnya</li>
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

function LaPackageGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleLaPackages.map((pkg) => (
        <LaPackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  )
}

export default function PaketLAPage() {
  return (
    <div className="bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Paket LA (Land Arrangement)</h1>
          </div>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto">
            Paket Land Arrangement keberangkatan paling awal termasuk hotel, visa, transport, tour guide, handling & 3x makan.
            <span className="font-semibold"> Tanpa tiket pesawat</span>. Solusi terbaik untuk perjalanan umroh yang nyaman dan terjangkau.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
                <option>Rp 10jt - Rp 15jt</option>
                <option>Rp 15jt - Rp 20jt</option>
                <option>Rp 20jt - Rp 25jt</option>
                <option>Di atas Rp 25jt</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Semua Kategori</option>
                <option>Ekonomis</option>
                <option>Reguler</option>
                <option>Premium</option>
                <option>Keluarga</option>
                <option>Ramadhan</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1">Cari Paket LA</label>
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
            <h2 className="text-lg font-semibold text-slate-900">Paket LA Unggulan</h2>
            <Link href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleLaPackages.filter(pkg => pkg.rating >= 4.8).map((pkg) => (
              <LaPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* All Packages */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Semua Paket LA</h2>
            <span className="text-sm text-slate-500">Menampilkan {sampleLaPackages.length} paket</span>
          </div>

          <LaPackageGrid />
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">Apa Saja yang Termasuk dalam Paket LA?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Hotel className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Akomodasi Hotel</h3>
              <p className="text-xs text-slate-600">Hotel bintang 3-5 dekat Masjidil Haram & Nabawi dengan fasilitas lengkap.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Visa & Handling</h3>
              <p className="text-xs text-slate-600">Visa umroh dan handling dokumen lengkap untuk perjalanan yang lancar.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Transportasi Darat</h3>
              <p className="text-xs text-slate-600">Transportasi AC dari bandara ke hotel dan ziarah selama di Arab Saudi.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Makan 3x Sehari</h3>
              <p className="text-xs text-slate-600">Makanan halal 3x sehari dengan menu bervariasi dan bergizi.</p>
            </div>
          </div>
        </div>

        {/* Why Choose LA Packages */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">Mengapa Memilih Paket LA?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Keberangkatan Lebih Awal</h3>
              <p className="text-xs text-slate-600">Dapatkan jadwal keberangkatan yang lebih awal dan fleksibel sesuai kebutuhan Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Harga Lebih Terjangkau</h3>
              <p className="text-xs text-slate-600">Hemat biaya dengan paket land arrangement tanpa tiket pesawat.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Fleksibilitas Tinggi</h3>
              <p className="text-xs text-slate-600">Pilih maskapai dan jadwal penerbangan sesuai preferensi Anda.</p>
            </div>
          </div>
        </div>

        {/* How to Book */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-8 text-center">Cara Memesan Paket LA</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">1. Pilih Paket</h3>
              <p className="text-xs text-slate-600">Jelajahi berbagai pilihan paket LA dan pilih yang sesuai dengan kebutuhan Anda.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">2. Urus Dokumen</h3>
              <p className="text-xs text-slate-600">Lengkapi dokumen yang diperlukan untuk visa dan handling perjalanan.</p>
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
              <h3 className="text-sm font-semibold text-slate-900 mb-2">4. Atur Penerbangan</h3>
              <p className="text-xs text-slate-600">Atur tiket pesawat Anda secara terpisah sesuai jadwal yang diinginkan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
