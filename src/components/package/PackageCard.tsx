'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Clock, Users, Bed } from 'lucide-react'
import { Package } from '@/types'

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  const getTagText = (pkg: Package) => {
    if (pkg.is_promo) return 'PROMO'
    if (pkg.featured) return 'FEATURED'
    return 'REGULAR'
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg hover:border-green-100 transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={pkg.gambar_url}
          alt={pkg.nama}
          width={400}
          height={250}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tag badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {getTagText(pkg)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Days label */}
        <p className="text-[11px] text-slate-400 mb-1">
          {pkg.durasi_hari} Days {pkg.nama.split(' ').slice(2).join(' ')}
        </p>

        {/* Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
          {pkg.nama}
        </h3>

        {/* Location dots */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] text-slate-400">📍 {pkg.kota_keberangkatan}</span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-400">Makkah & Madinah</span>
        </div>

        {/* Date & Duration */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            {pkg.durasi_hari} Days
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
            <Bed className="w-3 h-3" />
            {pkg.hotel_bintang} Star
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            {pkg.is_promo && pkg.promo_harga ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  Rp {pkg.price_per_pax.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-bold text-green-600">
                  Rp {pkg.promo_harga.toLocaleString('id-ID')}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-green-600">
                Rp {pkg.price_per_pax.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <Link href={`/paket/${pkg.slug}`}>
            <button className="bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
