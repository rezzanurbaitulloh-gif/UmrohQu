'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Globe, Menu, X, Users, Calendar, Clock, BookOpen, Plane, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const navLinks = [
  { href: '/', label: 'Tiket Group', icon: <Users size={16} /> },
  { href: '/paket', label: 'Paket Umroh', icon: <Calendar size={16} /> },
  { href: '/cari', label: 'Paket LA', icon: <Plane size={16} /> },
  { href: '/jadwal-sholat', label: 'Jadwal Sholat', icon: <Clock size={16} /> },
  { href: '/al-quran', label: 'Al-Quran', icon: <BookOpen size={16} /> },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.refresh()
      toast.success('Anda telah logout')
    } catch (error) {
      toast.error('Terjadi kesalahan saat logout')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-0">
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-primary transition-colors font-medium flex items-center gap-1.5"
            >
              {link.icon}
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

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors px-3 py-1.5 font-medium"
              >
                <User size={16} />
                {user.user_metadata?.full_name || user.email || 'Profile'}
              </Link>
            </div>
          ) : (
            <>
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
            </>
          )}
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
               className="text-sm text-slate-600 hover:text-primary transition-colors py-2 font-medium flex items-center gap-2"
               onClick={() => setMobileOpen(false)}
             >
               {link.icon}
               {link.label}
             </Link>
           ))}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
              {user ? (
                <Link
                  href="/profile"
                  className="text-sm text-slate-600 hover:text-primary flex items-center gap-2"
                >
                  <User size={16} />
                  {user.user_metadata?.full_name || user.email || 'Profile'}
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm text-slate-600 hover:text-primary">
                    Login
                  </Link>
                  <Link href="/auth/register" className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-lg">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}