import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cari Paket Umroh',
  description: 'Cari paket umroh sesuai kebutuhan Anda dengan filter lanjutan.',
}

export default function SearchPage() {
  return (
    <div className="bg-slate-50">
      <div className="py-10 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">Cari Paket</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Cari Paket Umroh</h1>
          <p className="text-sm text-slate-500">Temukan paket umroh yang sesuai kebutuhan Anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="glass-card p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tanggal Keberangkatan</label>
              <input type="month" className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kota Keberangkatan</label>
              <select className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary appearance-none">
                <option>Semua Kota</option>
                <option>Jakarta (CGK)</option>
                <option>Medan (KNO)</option>
                <option>Surabaya (SUB)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bintang Hotel</label>
              <select className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary appearance-none">
                <option>Semua Bintang</option>
                <option>5 Bintang</option>
                <option>4 Bintang</option>
                <option>3 Bintang</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Rentang Harga</label>
              <select className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary appearance-none">
                <option>Semua Harga</option>
                <option>Di bawah Rp 20 Juta</option>
                <option>Rp 20 - 30 Juta</option>
                <option>Rp 30 - 50 Juta</option>
                <option>Di atas Rp 50 Juta</option>
              </select>
            </div>
          </div>
          <Link href="/paket">
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
              <Search className="w-5 h-5" />
              Cari Paket Umroh
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
