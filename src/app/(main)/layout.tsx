import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}
