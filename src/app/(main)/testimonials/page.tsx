'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Ahmad Fauzi',
      location: 'Jakarta',
      rating: 5,
      date: 'November 2023',
      text: 'Alhamdulillah, perjalanan umroh bersama UmrohQu sangat terorganisir dengan baik. Hotel dekat Masjidil Haram, makanan enak, dan pembimbing manasik yang sangat sabar. Pengalaman yang tidak terlupakan.',
      package: 'Paket Umroh Reguler 12 Hari',
      travel: 'Travel Amanah Jakarta',
      avatar: '',
    },
    {
      name: 'Siti Nurhaliza',
      location: 'Surabaya',
      rating: 5,
      date: 'Oktober 2023',
      text: 'Sudah 2 kali berangkat umroh lewat UmrohQu dan selalu puas pelayanannya. Tim guide sangat responsif dan profesional. Harga juga transparan tanpa biaya tersembunyi.',
      package: 'Paket Umroh Plus Turki',
      travel: 'Travel Darussalam',
      avatar: '',
    },
    {
      name: 'Hendra Wijaya',
      location: 'Bandung',
      rating: 5,
      date: 'September 2023',
      text: 'Awalnya ragu pesan online, tapi setelah konsultasi dengan tim UmrohQu semua keraguan hilang. Prosesnya cepat, transparan, dan pelayanan di Tanah Suci luar biasa. Highly recommended!',
      package: 'Paket Umroh VIP 14 Hari',
      travel: 'Travel Al-Barkah',
      avatar: '',
    },
    {
      name: 'Rina Kartika',
      location: 'Medan',
      rating: 4,
      date: 'Agustus 2023',
      text: 'Umroh pertama saya dan sangat berkesan. Guide membimbing dari awal sampai akhir. Hanya saja ada sedikit delay penerbangan, tapi secara keseluruhan pengalaman sangat memuaskan.',
      package: 'Paket Umroh Ramadhan 2023',
      travel: 'Travel Prima Haji',
      avatar: '',
    },
    {
      name: 'Muhammad Rizki',
      location: 'Yogyakarta',
      rating: 5,
      date: 'Juli 2023',
      text: 'Paket umroh haji khusus yang saya ambil di UmrohQu sangat worth it. Hotel bintang 5 dekat Haram, shuttle bus ke Masjid Nabawi setiap hari. Jazakallahu khairan untuk tim UmrohQu.',
      package: 'Haji Khusus 2023',
      travel: 'Travel Al-Mukmin',
      avatar: '',
    },
    {
      name: 'Dewi Lestari',
      location: 'Semarang',
      rating: 5,
      date: 'Juni 2023',
      text: 'Sebagai jamaah wanita yang berangkat rombongan wanita, saya merasa sangat aman dan nyaman. Ada pendamping khusus wanita dan makanan yang sesuai syariat. Terima kasih UmrohQu!',
      package: 'Umroh Wanita 10 Hari',
      travel: 'Travel Aisyah Paradise',
      avatar: '',
    },
  ]

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Testimoni Jamaah
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cerita inspiratif dari para jamaah yang telah memilih UmrohQu untuk perjalanan ibadah mereka.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600">15.000+</div>
            <div className="text-sm text-slate-600 mt-1">Jamaah Terlayani</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">4.9/5</div>
            <div className="text-sm text-slate-600 mt-1">Rating Rata-rata</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">200+</div>
            <div className="text-sm text-slate-600 mt-1">Travel Terdaftar</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">34</div>
            <div className="text-sm text-slate-600 mt-1">Kota di Indonesia</div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < t.rating ? 'text-amber-400' : 'text-slate-200'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review */}
              <p className="text-slate-700 mb-4">
                "{expandedIndex === index ? t.text : `${t.text.slice(0, 120)}...`}
                {expandedIndex === index && <span> </span>}
                </p>

              {t.text.length > 120 && (
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-4"
                >
                  {expandedIndex === index ? 'Tampilkan lebih sedikit' : 'Baca Selengkapnya'}
                </button>
              )}

              {/* Package */}
              <div className="text-sm text-slate-500 mb-4">
                <span>{t.package}</span>
                <span className="mx-2">·</span>
                <span>{t.travel}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">
                    {t.location} · {t.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Ingin Bergabung Sebagai Jamaah?
          </h3>
          <p className="text-slate-600 mb-6">
            Raih pengalaman ibadah umroh yang tak terlupakan bersama UmrohQu.
          </p>
          <a
            href="/paket"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Lihat Paket Umroh
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
