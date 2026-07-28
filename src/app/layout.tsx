import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'UmrohQu - Premium Umrah & Haji Marketplace',
    template: '%s | UmrohQu',
  },
  description: 'Platform marketplace Haji dan Umroh terpercaya. Temukan paket umroh terbaik dari travel agent terverifikasi.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Toaster position="top-right" />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
