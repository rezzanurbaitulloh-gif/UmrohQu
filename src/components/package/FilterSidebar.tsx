'use client'

import { Star } from 'lucide-react'

const hotelStars = [
  { value: 5, label: 'Premium' },
  { value: 4, label: 'Eksklusif' },
  { value: 3, label: 'Ekonomi' },
]

const maskapaiOptions = [
  { value: 'saudi', label: 'Saudia', country: 'Saudi Arabian' },
  { value: 'garuda', label: 'Garuda Indonesia', country: 'Indonesia' },
  { value: 'emirates', label: 'Emirates', country: 'Emirates' },
  { value: 'qatar', label: 'Qatar Airways', country: 'Qatar Airways' },
]

export function FilterSidebar() {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Rentang Harga (Juta)</h3>
          <button className="text-xs text-primary hover:text-primary-dark">Reset</button>
        </div>
        <div className="space-y-4">
          <div className="relative h-2 bg-slate-200 rounded-full">
            <div className="absolute left-0 right-0 h-2 bg-green-100 rounded-full" />
            <div className="absolute left-[20%] right-[10%] h-2 bg-primary rounded-full" />
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg cursor-pointer border-2 border-white" />
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg cursor-pointer border-2 border-white" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Rp 20 Juta</span>
            <span>Rp 100 Juta</span>
          </div>
        </div>
      </div>

      {/* Hotel Stars */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Bintang Hotel</h3>
        <div className="space-y-3">
          {hotelStars.map((star) => (
            <label key={star.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < star.value ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
                  />
                ))}
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-700">{star.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Maskapai */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Maskapai</h3>
        <div className="grid grid-cols-2 gap-2">
          {maskapaiOptions.map((opt) => (
            <button
              key={opt.value}
              className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kota Keberangkatan */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Kota Keberangkatan</h3>
        <select className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary appearance-none cursor-pointer">
          <option>Jakarta (CGK)</option>
          <option>Medan (KNO)</option>
          <option>Surabaya (SUB)</option>
          <option>Denpasar (DPS)</option>
          <option>Makassar (UPG)</option>
          <option>Semua Kota</option>
        </select>
      </div>

      {/* Bulan Keberangkatan */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Bulan Keberangkatan</h3>
        <select className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 focus:outline-none focus:border-primary appearance-none cursor-pointer">
          <option>Oktober 2024</option>
          <option>November 2024</option>
          <option>Desember 2024</option>
          <option>Januari 2025</option>
          <option>Februari 2025</option>
          <option>Semua Bulan</option>
        </select>
      </div>
    </div>
  )
}
