'use client'

import Link from 'next/link'
import Image from 'next/image'

const companyLinks = [
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/tentang?tab=privacy', label: 'Kebijakan Privasi' },
  { href: '/tentang?tab=terms', label: 'Syarat & Ketentuan' },
  { href: '/kemitraan', label: 'Menjadi Mitra' },
]

const resourcesLinks = [
  { href: '/tentang?tab=faq', label: 'Pusat Bantuan' },
  { href: '/cara-kerja', label: 'Panduan Perjalanan' },
  { href: '/blog', label: 'Blog & Artikel' },
  { href: '/testimonials', label: 'Testimoni Jamaah' },
]

export function Footer() {
  return (
    <footer className="relative bg-white text-slate-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/masjid.png"
          alt="Masjid background"
          fill
          className="object-cover opacity-5"
          quality={85}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:py-20 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-0 mb-6">
              <Image
                src="/assets/logoo.png"
                alt="UmrohQu Icon"
                width={80}
                height={80}
                className="object-contain"
              />
              <Image
                src="/assets/nama-logo.png"
                alt="UmrohQu"
                width={160}
                height={36}
                className="object-contain -ml-2"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Your trusted partner for premium pilgrimage experiences.
            </p>

            <div className="flex gap-4">
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-2.84v2.44a4.83 4.83 0 01-3.77 4.25c-1.98 0-3.59 1.61-3.59 3.59 0 1.98 1.61 3.59 3.59 3.59a4.83 4.83 0 013.77 4.25V22h2.84v-2.44a4.83 4.83 0 013.77-4.25c1.98 0 3.59-1.61 3.59-3.59 0-1.98-1.61-3.59-3.59-3.59zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
                <span>Instagram</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Perusahaan</h3>
            <ul className="space-y-3">
  {companyLinks.map((link) => (
    <li key={`${link.href}-${link.label}`}>
      <Link
        href={link.href}
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        {link.label}
      </Link>
    </li>
  ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Sumber Daya</h3>
            <ul className="space-y-3">
  {resourcesLinks.map((link) => (
    <li key={`${link.href}-${link.label}`}>
      <Link
        href={link.href}
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        {link.label}
      </Link>
    </li>
  ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to our newsletter for the latest travel updates and offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="p-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >Paket LA

                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 UmrohQu. All rights reserved. Providing premium pilgrimage experiences.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Made with</span>
            <span className="text-red-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </span>
            <span className="text-slate-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}