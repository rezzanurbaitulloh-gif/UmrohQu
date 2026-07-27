import { Metadata } from 'next'
import { LandingPageClient } from './LandingPageClient'

export const metadata: Metadata = {
  title: 'UmrohQu - Premium Umrah & Haji Marketplace',
  description: 'Platform marketplace Haji dan Umroh terpercaya. Temukan paket umroh terbaik dari travel agent terverifikasi.',
}

export default function LandingPage() {
  return <LandingPageClient />
}