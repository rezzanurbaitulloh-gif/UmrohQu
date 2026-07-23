import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield, Users, Globe, Heart, Award, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Tentang Kami - UmrohQu',
  description: 'Pelajari visi dan misi UmrohQu sebagai platform marketplace umroh terpercaya di Indonesia.',
}

const values = [
  {
    icon: Shield,
    title: 'Terpercaya',
    description: 'Semua travel partner telah terverifikasi PPIU/HKU oleh Kementerian Agama RI.',
  },
  {
    icon: Globe,
    title: 'Transparan',
    description: 'Harga jelas, tidak ada biaya tersembunyi. Semua detail paket ditampilkan secara terbuka.',
  },
  {
    icon: Users,
    title: 'Berfokus Jamaah',
    description: 'Kami selalu mengutamakan kenyamanan dan kebutuhan jamaah di atas segalanya.',
  },
  {
    icon: Heart,
    title: 'Berintegritas',
    description: 'Komitmen kami adalah memberikan layanan ibadah dengan kejujuran dan amanah.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">Tentang Kami</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tentang <span className="text-primary">UmrohQu</span>
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            UmrohQu adalah platform marketplace Haji dan Umroh berbasis digital yang menghubungkan 
            biro travel terverifikasi dengan calon jamaah dalam satu ekosistem terpadu, transparan, dan modern.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass-card p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Visi</h3>
              <p className="text-sm text-slate-500">
                Membangun startup ekosistem digital ibadah terintegrasi di Indonesia yang menghubungkan 
                biro travel, jamaah, dan mitra pendukung.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Misi</h3>
              <p className="text-sm text-slate-500">
                Memberikan akses mudah, aman, dan transparan bagi setiap muslim Indonesia untuk 
                menuntaskan ibadah umroh dengan travel agent terpercaya.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Komitmen</h3>
              <p className="text-sm text-slate-500">
                Menjadi standar baru dalam industri travel ibadah dengan mengedepankan 
                kejujuran, transparansi, dan kualitas layanan.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-sm text-slate-500">{value.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Siap Menempuh Perjalanan Suci?</h2>
          <p className="text-slate-500 mb-8">
            Temukan paket umroh terbaik yang sesuai dengan kebutuhan Anda.
          </p>
          <Link href="/paket">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl">
              Lihat Katalog Paket
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
