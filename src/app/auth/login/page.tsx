'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserPlus, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img src="/assets/logoo.png" alt="UmrohQu" className="w-12 h-12 object-contain" />
          </Link>
        </div>

        <Card className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang</h1>
            <p className="text-sm text-slate-500">Masuk ke akun UmrohQu Anda</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10 bg-white border-slate-200 text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  className="pl-10 pr-10 bg-white border-slate-200 text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary" />
                <span className="text-sm text-slate-500">Ingat saya</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:text-primary-dark">Lupa password?</Link>
            </div>

            <Button className="w-full bg-primary hover:bg-primary-dark text-white py-2.5">
              Masuk
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400">Atau masuk dengan</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.03 2.53-2.16 3.31v2.77h3.49c2.04-1.88 3.24-4.64 3.24-7.89z"/>
                  <path fill="currentColor" d="M12 23c3.24 0 5.95-1.07 7.94-2.91l-3.49-2.77c-1.07.72-2.44 1.14-4.05 1.14-3.12 0-5.76-2.1-6.71-4.93H2.18v2.84C3.99 20.02 7.67 23 12 23z"/>
                  <path fill="currentColor" d="M5.29 14.26c-.23-.69-.37-1.43-.37-2.19s.14-1.5.37-2.19V7.04H2.18C1.43 8.55 1 10.21 1 12s.43 3.45 1.18 4.96l2.85-2.22.46-.58z"/>
                  <path fill="currentColor" d="M12 5.38c1.76 0 3.33.6 4.57 1.79l3.44-3.44C17.95 2.09 15.24 1 12 1 7.67 1 3.99 3.98 2.18 7.96l2.85 2.22c.95-2.83 3.59-4.8 6.71-4.8z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.039-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.025-.653 2.562-.992 3.984-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 0z"/>
                </svg>
                WhatsApp
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
              Daftar sekarang
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
