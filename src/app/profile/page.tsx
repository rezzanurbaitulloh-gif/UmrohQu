'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, ShoppingBag, Settings, LogOut, ChevronRight, Package, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
      toast.success('Anda telah logout')
    } catch (error) {
      toast.error('Terjadi kesalahan saat logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Profile */}
          <div className="lg:w-1/4">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User size={40} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {user.user_metadata?.full_name || 'User'}
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  {user.email}
                </p>

                <div className="w-full space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
                  >
                    <User size={18} />
                    Profile Akun
                  </Link>

                  <Link
                    href="/profile/pesanan"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <ShoppingBag size={18} />
                    Pesanan Saya
                  </Link>

                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Settings size={18} />
                    Profile Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Card className="p-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile Akun</h1>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-slate-900">Informasi Pribadi</p>
                      <p className="text-sm text-slate-500">Lihat dan edit informasi pribadi Anda</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-slate-900">Metode Pembayaran</p>
                      <p className="text-sm text-slate-500">Kelola metode pembayaran Anda</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-slate-900">Pengaturan Akun</p>
                      <p className="text-sm text-slate-500">Ubah kata sandi dan preferensi</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}