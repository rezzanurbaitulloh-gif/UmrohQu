import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Handshake, TrendingUp, Globe, DollarSign, Rocket, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Kemitraan - UmrohQu',
  description: 'Jadilah mitra travel UmrohQu dan kembangkan bisnis Anda dengan platform digital terpercaya.',
}

const benefits = [
  {
    icon: Globe,
    title: 'Subdomain Instan',
    description: 'Dapatkan website branded sendiri dengan subdomain [namaanda].umrohqu.com dalam hitungan menit.',
  },
  {
    icon: DollarSign,
    title: 'Hemat Biaya',
    description: 'Fee layanan lebih murah dibanding platform lain. Hemat hingga 50% biaya transaksi.',
  },
  {
    icon: TrendingUp,
    title: 'Jangkauan Lebih Luas',
    description: 'Akses ribuan calon jamaah dari seluruh Indonesia melalui portal utama UmrohQu.',
  },
  {
    icon: Rocket,
    title: 'Tools Modern',
    description: 'Kelola paket, itinerary, booking, dan manifes dengan dashboard yang mudah digunakan.',
  },
  {
    icon: Users,
    title: 'Verifikasi PPIU',
    description: 'Brand Anda akan mendapatkan badge verifikasi PPIU/HKU untuk meningkatkan kepercayaan.',
  },
  {
    icon: Handshake,
    title: 'Dukungan Penuh',
    description: 'Tim support kami siap membantu 24/7 untuk memastikan operasional Anda berjalan lancar.',
  },
]

const pricingPlans = [
  {
    name: 'Setup Fee',
    price: 'Rp 5.000.000',
    promoPrice: 'Rp 2.500.000',
    description: 'Biaya pendaftaran awal untuk aktivasi sistem dan pembuatan subdomain/custom domain.',
  },
  {
    name: 'Service Fee Subdomain',
    price: 'Rp 100.000',
    promoPrice: 'Rp 50.000',
    description: 'Per jamaah yang bertransaksi di website subdomain milik Anda.',
    per: '/jamaah',
  },
  {
    name: 'Service Fee Portal Utama',
    price: 'Rp 300.000',
    promoPrice: 'Rp 150.000',
    description: 'Per jamaah yang masuk dari portal pencarian terpusat umrohqu.com.',
    per: '/jamaah',
  },
]

export default function KemitraanPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-16 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">Kemitraan</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kemitraan <span className="text-primary">Travel Agent</span>
          </h1>
          <p className="text-base text-slate-500 max-w-2xl mx-auto mb-8">
            Bergabung dengan ribuan travel agent terpercaya yang telah mengandalkan UmrohQu 
            untuk mengembangkan bisnis perjalanan ibadah mereka.
          </p>
          <Link href="/#contact">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl">
              Daftar Menjadi Mitra
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Keuntungan Menjadi Mitra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Skema Monetisasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="glass-card p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-base font-semibold text-slate-900 mb-4">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-sm text-slate-400 line-through">{plan.price}</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {plan.promoPrice}
              </div>
              {plan.per && (
                <span className="text-sm text-slate-500">{plan.per}</span>
              )}
              <p className="text-sm text-slate-500 mt-4">{plan.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-r from-green-50 to-white">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Siap Bergabung?</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Hubungi tim kami untuk informasi lebih lanjut tentang program kemitraan UmrohQu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl">
              Daftar Sekarang
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-xl">
              Download Brosur
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
