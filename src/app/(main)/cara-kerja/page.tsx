import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Search, CreditCard, FileCheck, Plane, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Cara Kerja - UmrohQu',
  description: 'Pelajari cara memesan paket umroh di UmrohQu dalam 4 langkah mudah.',
}

const jamaahSteps = [
  {
    step: 1,
    icon: Search,
    title: 'Cari & Pilih Paket',
    description: 'Jelajahi katalog paket umroh, filter sesuai budget dan kebutuhan, dan pilih paket terbaik.',
  },
  {
    step: 2,
    icon: CreditCard,
    title: 'Pesan & Bayar',
    description: 'Isi data pemesan dan jamaah, pilih metode pembayaran, dan selesaikan transaksi dengan aman.',
  },
  {
    step: 3,
    icon: FileCheck,
    title: 'Upload Berkas',
    description: 'Upload paspor, KTP, dan dokumen lainnya untuk proses visa umroh.',
  },
  {
    step: 4,
    icon: Plane,
    title: 'Berangkat',
    description: 'Dapatkan brief lengkap, manasik, dan persiapan ibadah. Nikmati perjalanan suci Anda.',
  },
]

const vendorSteps = [
  {
    step: 1,
    icon: Search,
    title: 'Daftar & Aktifasi',
    description: 'Daftar sebagai travel partner, bayar setup fee, dan aktifasi subdomain instan.',
  },
  {
    step: 2,
    icon: CreditCard,
    title: 'Subdomain Instan',
    description: 'Dapatkan website subdomain branded sendiri dengan tema custom dan domain pilihan.',
  },
  {
    step: 3,
    icon: FileCheck,
    title: 'Kelola Paket',
    description: 'Buat dan kelola paket umroh, itinerary, hotel, dan penerbangan dengan mudah.',
  },
  {
    step: 4,
    icon: Plane,
    title: 'Hemat Fee',
    description: 'Terima pesanan langsung dari jamaah dengan fee yang jauh lebih murah.',
  },
]

export default function CaraKerjaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">Cara Kerja</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Cara Kerja <span className="text-primary">UmrohQu</span>
          </h1>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Kami memudahkan perjalanan suci Anda dengan proses yang transparan dan terpercaya.
          </p>
        </div>
      </section>

      {/* Jamaah Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">
          Untuk <span className="text-primary">Jamaah</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {jamaahSteps.map((item) => (
            <div key={item.step} className="glass-card p-6 relative group hover:shadow-lg hover:border-green-100 transition-all duration-300">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mb-5">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Vendor Flow */}
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">
          Untuk <span className="text-primary">Mitra Travel</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendorSteps.map((item) => (
            <div key={item.step} className="glass-card p-6 relative group hover:shadow-lg hover:border-green-100 transition-all duration-300">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mb-5">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Bergabung dengan UmrohQu</h2>
          <p className="text-slate-500 mb-8">
            Jadilah bagian dari revolusi digital perjalanan ibadah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/paket">
              <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl">
                Lihat Paket Umroh
              </Button>
            </Link>
            <Link href="/kemitraan">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-xl">
                Menjadi Mitra
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
