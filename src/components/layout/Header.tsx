'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Globe, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Packages' },
  { href: '/paket', label: 'Hotels' },
  { href: '/cari', label: 'Flights' },
  { href: '/tentang', label: 'Travel' },
  { href: '/cara-kerja', label: 'About Us' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logoo.png"
              alt="UmrohQu Icon"
              width={32}
              height={32}
              className="object-contain"
            />
            <Image
              src="/assets/nama-logo.png"
              alt="UmrohQu"
              width={120}
              height={28}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <Search size={18} />
          </button>
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <Globe size={18} />
          </button>
          <Link
            href="/auth/login"
            className="text-sm text-slate-600 hover:text-primary transition-colors px-3 py-1.5 font-medium"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl animate-fade-in-up">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-primary transition-colors py-2 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
              <Link href="/auth/login" className="text-sm text-slate-600 hover:text-primary">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-lg">
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
