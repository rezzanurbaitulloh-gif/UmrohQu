'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { getPublicUrl } from '@/lib/supabase/storage'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src={getPublicUrl('logos/logo-icon.png')}
              alt="UmrohQu"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>

        <Card className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Daftar Akun</h1>
            <p className="text-sm text-slate-500">Buat akun UmrohQu untuk memulai</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input placeholder="Nama lengkap sesuai KTP" className="pl-10 bg-white border-slate-200 text-slate-800" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input type="email" placeholder="nama@email.com" className="pl-10 bg-white border-slate-200 text-slate-800" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nomor WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input placeholder="+62 812 XXXX XXXX" className="pl-10 bg-white border-slate-200 text-slate-800" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
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

            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary" />
              <span className="text-xs text-slate-500">
                Saya menyetujui{' '}
                <Link href="#" className="text-primary hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="#" className="text-primary hover:underline">Kebijakan Privasi</Link>
                {' '}UmrohQu
              </span>
            </div>

            <Button className="w-full bg-primary hover:bg-primary-dark text-white py-2.5">
              <UserPlus className="w-4 h-4 mr-2" />
              Daftar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
              Masuk disini
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
