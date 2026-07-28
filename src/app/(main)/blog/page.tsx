'use client'

import { useState } from 'react'

export default function BlogPage() {
  const articles = [
    {
      title: 'Panduan Lengkap Umroh untuk Pemula 2024',
      excerpt: 'Pelajari langkah-langkah penting yang perlu disiapkan sebelum berangkat umroh, dari persiapan dokumen hingga perlengkapan yang harus dibawa.',
      date: '15 Januari 2024',
      category: 'Panduan',
      readTime: '8 menit baca',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
    },
    {
      title: '5 Tips Memilih Travel Umroh Terpercaya',
      excerpt: 'Tidak semua travel umroh memiliki standar pelayanan yang sama. Berikut tips memilih travel umroh yang aman dan terpercaya.',
      date: '10 Januari 2024',
      category: 'Tips',
      readTime: '5 menit baca',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop',
    },
    {
      title: 'Manasik Umroh: Apa Saja yang Perlu Diketahui?',
      excerpt: 'Manasik umroh adalah langkah penting sebelum keberangkatan. Kenali tata cara manasik dan persiapan yang perlu Anda lakukan.',
      date: '5 Januari 2024',
      category: 'Manasik',
      readTime: '6 menit baca',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop',
    },
    {
      title: 'Keistimewaan Masjidil Haram dan Masjid Nabawi',
      excerpt: 'Mengenal lebih dekat keistimewaan dan sejarah dua masjid suci yang menjadi tujuan utama jamaah umroh dan haji.',
      date: '28 Desember 2023',
      category: 'Informasi',
      readTime: '10 menit baca',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop',
    },
    {
      title: 'Persiapan Kesehatan Sebelum Berangkat Umroh',
      excerpt: 'Kesehatan adalah prioritas utama. Simak tips persiapan kesehatan yang perlu dilakukan sebelum berangkat umroh.',
      date: '20 Desember 2023',
      category: 'Kesehatan',
      readTime: '7 menit baca',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    },
    {
      title: 'Inspirasi Oleh-oleh Dari Makkah dan Madinah',
      excerpt: 'Berbagai oleh-oleh khas dari Tanah Suci yang bisa Anda bawa pulang untuk keluarga dan kerabat tercinta.',
      date: '15 Desember 2023',
      category: 'Travel',
      readTime: '4 menit baca',
      image: 'https://images.unsplash.com/photo-1519810755548-392116d9a620?w=600&h=400&fit=crop',
    },
  ]

  const categories = ['Semua', 'Panduan', 'Tips', 'Manasik', 'Informasi', 'Kesehatan', 'Travel']
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredArticles = activeCategory === 'Semua'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Blog & Artikel
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Informasi terkini seputar perjalanan ibadah umroh dan haji dari tim UmrohQu.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <article
              key={index}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
