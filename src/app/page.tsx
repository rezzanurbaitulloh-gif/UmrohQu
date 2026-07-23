import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Star, Quote, ChevronRight, Play, BadgeCheck } from 'lucide-react'
import { PackageCard } from '@/components/package/PackageCard'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'UmrohQu - Premium Umrah & Haji Marketplace',
  description: 'Platform marketplace Haji dan Umroh terpercaya. Temukan paket umroh terbaik dari travel agent terverifikasi.',
}

const samplePackages = [
  {
    id: '1', vendor_id: '1',
    nama: '9 Days Royal Umroh',
    deskripsi: 'Paket umroh dengan hotel bintang 5 dekat Masjidil Haram.',
    harga: 24500000, durasi_hari: 9, tanggal_keberangkatan: '2024-10-15',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
    featured: true, slug: 'umroh-reguler-5-bintang',
    ppiu_number: '420/2021', maskapai: 'Saudia', hotel_bintang: 5,
    rating: 4.8, jumlah_terjual: 156, is_promo: false, promo_harga: null, created_at: '2024-01-01',
  },
  {
    id: '2', vendor_id: '2',
    nama: '12 Days Spiritual Umroh',
    deskripsi: 'Raih keberkahan dengan paket umroh promo spesial.',
    harga: 32000000, durasi_hari: 12, tanggal_keberangkatan: '2024-10-20',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=600&h=400&fit=crop',
    featured: false, slug: 'paket-umroh-promo',
    ppiu_number: '12/2020', maskapai: 'Garuda', hotel_bintang: 4,
    rating: 4.5, jumlah_terjual: 89, is_promo: true, promo_harga: 29000000, created_at: '2024-02-01',
  },
  {
    id: '3', vendor_id: '1',
    nama: '15 Days Grand Voyage Umroh',
    deskripsi: 'Paket eksklusif + wisata Turki + Makkah + Madinah.',
    harga: 45000000, durasi_hari: 15, tanggal_keberangkatan: '2024-11-01',
    kota_keberangkatan: 'Surabaya (SUB)',
    gambar_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop',
    featured: true, slug: 'umroh-plus-turki',
    ppiu_number: '85/2022', maskapai: 'Turkish Airlines', hotel_bintang: 5,
    rating: 4.9, jumlah_terjual: 67, is_promo: false, promo_harga: null, created_at: '2024-03-01',
  },
  {
    id: '4', vendor_id: '3',
    nama: '10 Days Classic Umroh',
    deskripsi: 'Paket umroh kelasik dengan layanan terbaik.',
    harga: 18990000, durasi_hari: 10, tanggal_keberangkatan: '2024-12-15',
    kota_keberangkatan: 'Jakarta (CGK)',
    gambar_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop',
    featured: false, slug: 'umroh-kelasik',
    ppiu_number: '156/2021', maskapai: 'Emirates', hotel_bintang: 4,
    rating: 4.6, jumlah_terjual: 234, is_promo: true, promo_harga: 16990000, created_at: '2024-04-01',
  },
]

const partners = [
  { name: 'Saudi Airlines', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=120&h=60&fit=crop' },
  { name: 'Saudi Air', img: 'https://images.unsplash.com/photo-1542296332-2e44a99cfef5?w=120&h=60&fit=crop' },
  { name: 'Royal Jordanian', img: 'https://images.unsplash.com/photo-1583978317965-e7b36b12cab3?w=120&h=60&fit=crop' },
  { name: 'Etihad', img: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=120&h=60&fit=crop' },
  { name: 'Emirates', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=120&h=60&fit=crop' },
  { name: 'Biman Airlines', img: 'https://images.unsplash.com/photo-1542296332-2e44a99cfef5?w=120&h=60&fit=crop' },
  { name: 'Malaysia Airlines', img: 'https://images.unsplash.com/photo-1583978317965-158ea5ccacbd?w=120&h=60&fit=crop' },
  { name: 'Qatar Airways', img: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=120&h=60&fit=crop' },
]

const testimonials = [
  {
    id: 1,
    text: '"The booking process was incredibly smooth! Everything from inquiry to departure felt seamless and well-organized. UmrohQu made our spiritual journey truly memorable."',
    name: 'Ahmad Rizki',
    role: 'Jamaah Reguler',
  },
  {
    id: 2,
    text: '"I was nervous about traveling abroad, but UmrohQu\'s support team was always available. The hotel was beautiful and very close to the Haram. Highly recommended!"',
    name: 'Siti Nurhaliza',
    role: 'Jamaah Keluarga',
  },
  {
    id: 3,
    text: '"Excellent value for money. The transparent pricing and flexible booking options gave us total peace of mind. We chose UmrohQu and it was the right decision."',
    name: 'Budi Santoso',
    role: 'Jamaah VIP',
  },
]

function PackageGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {samplePackages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  )
}

function TrustFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center px-4 py-6">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
        <div className="text-primary">{icon}</div>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-1.5">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ========== HERO SECTION (Green Gradient + Kaaba Image) ========== */}
      <section className="relative min-h-[600px] md:min-h-[650px] overflow-hidden">
        {/* Left: Green gradient */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Green background with text */}
          <div className="z-10 bg-gradient-to-br from-[#047857] via-[#10B981] to-[#34D399] px-6 py-20 md:py-24 lg:px-12 xl:px-16">
            {/* Small badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-6">
              <BadgeCheck className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] font-medium text-white/90">Travel by UmrohQu - Premium</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-4 leading-[1.15]">
              Embark on a Sacred<br />Journey of a Lifetime
            </h1>
            <p className="text-sm md:text-[15px] text-white/80 mb-8 max-w-md leading-relaxed">
              Experience the spiritual serenity of Umroh with our premium, all-inclusive packages designed for comfort, clarity, and peace of mind.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/paket">
                <button className="bg-white text-green-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 shadow-sm">
                  Explore Packages
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              <button className="border border-white/40 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                Watch Video
              </button>
            </div>
          </div>

          {/* Right side - Kaaba image */}
          <div className="relative hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop"
              alt="Masjidil Haram Kaaba"
              fill
              className="object-cover"
              priority
            />
            {/* Small overlay cards on image - matching design */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">Next Departure</p>
                  <p className="text-xs text-slate-500">Ramadan 1446 H</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Starting from</p>
                  <p className="text-sm font-bold text-green-600">Rp 19.9jt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CURATED PACKAGES (White bg) ========== */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Curated Packages</h2>
              <p className="text-sm text-slate-500">Handpicked premium pilgrimage experiences for you</p>
            </div>
            <Link
              href="/paket"
              className="hidden md:flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              View all Packages <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <Suspense fallback={<div className="text-slate-400">Loading packages...</div>}>
            <PackageGrid />
          </Suspense>
        </div>
      </section>

      {/* ========== MITRA MASKAPAI (Light gray bg) ========== */}
      <section className="py-14 md:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Mitra Maskapai</h2>
          <p className="text-sm text-slate-500 mb-10">Travel with Trusted Maskapai Terbaik & Terpercaya</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 flex items-center justify-center h-16 border border-slate-100 shadow-sm"
              >
                <span className="text-xs font-medium text-slate-600">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY PILGRIMS TRUST US (White bg) ========== */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Why Pilgrims Trust UmrohQu</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-12">
            We bridge the gap between spiritual devotion and modern travel management, ensuring a seamless experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <TrustFeature
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
              title="Trusted Travel"
              description="Fully verified and trusted travel agency with a proven record in spiritual journeys."
            />
            <TrustFeature
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
              title="Secure Payment"
              description="Your payments are handled with advanced encryption and trusted gateways."
            />
            <TrustFeature
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>}
              title="Easy Booking"
              description="Simple and intuitive booking process designed for stress-free travel planning."
            />
            <TrustFeature
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>}
              title="Verified Reviews"
              description="Real reviews from verified pilgrims help you choose with confidence."
            />
            <TrustFeature
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>}
              title="24/7 Support"
              description="Dedicated support team assists you before, during, and after your journey."
            />
          </div>
        </div>
      </section>

      {/* ========== STATS BAR (Dark Green) ========== */}
      <section className="bg-gradient-to-r from-[#047857] to-[#059669] py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">250+</p>
              <p className="text-xs md:text-sm text-white/70 mt-1">Travel Agents Verified</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">1.2k</p>
              <p className="text-xs md:text-sm text-white/70 mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">50k+</p>
              <p className="text-xs md:text-sm text-white/70 mt-1">Successful Booking</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">99%</p>
              <p className="text-xs md:text-sm text-white/70 mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VOICES OF FAITH (Testimonials - Light bg) ========== */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-10 text-center">Voices of Faith</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">{t.text}</p>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-500">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AGENCY CTA (Dark bg) ========== */}
      <section className="bg-[#1E293B] py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Are you a Travel Agency?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Join the fastest-growing Umroh platform in Southeast Asia and reach thousands of pilgrims with our trusted marketplace.
          </p>
          <Link href="/kemitraan">
            <button className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors">
              Become a Partner <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
