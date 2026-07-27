import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import PrayerTimesClient from './PrayerTimesClient'

export const metadata: Metadata = {
  title: 'Jadwal Sholat - UmrohQu',
  description: 'Jadwal sholat harian untuk kota-kota di Indonesia dan seluruh dunia',
}

export default function JadwalSholatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <PrayerTimesClient />
      </main>

      <Footer />
    </div>
  )
}