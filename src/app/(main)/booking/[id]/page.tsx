import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BookingForm } from '@/components/booking/BookingForm'

export const metadata: Metadata = {
  title: 'Pemesanan Paket Umroh',
  description: 'Selesaikan pemesanan paket umroh Anda dengan aman dan mudah.',
}

export default function BookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
        <ChevronRight size={14} />
        <Link href="/paket" className="hover:text-primary transition-colors">Paket Umroh</Link>
        <ChevronRight size={14} />
        <span className="text-slate-600">Pemesanan</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Pemesanan Paket Umroh</h1>
      <BookingForm />
    </div>
  )
}
