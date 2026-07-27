'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, ShoppingBag, Settings, LogOut, ChevronRight, Camera, Lock, Mail, User as UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
        setFormData({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)

      // Update profile data
      const { error: profileError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone
        }
      })

      if (profileError) {
        throw profileError
      }

      // Update email if changed
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        })

        if (emailError) {
          throw emailError
        }
      }

      // Update password if provided
      if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.newPassword
        })

        if (passwordError) {
          throw passwordError
        }
      }

      toast.success('Profil berhasil diperbarui')
      setIsEditing(false)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Terjadi kesalahan saat memperbarui profil')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
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
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                  <User size={40} className="text-primary" />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <Camera size={14} />
                    </button>
                  )}
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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          fullName: user.user_metadata?.full_name || '',
                          email: user.email || '',
                          phone: user.user_metadata?.phone || '',
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        })
                      }}
                      variant="outline"
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-primary hover:bg-primary-dark"
                      disabled={loading}
                    >
                      {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Informasi Pribadi */}
                <div className="border-b border-slate-100 pb-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Informasi Pribadi</h2>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Nama Lengkap</div>
                      <div className="relative mt-1">
                        <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Email</div>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Nomor Telepon</div>
                      <div className="relative mt-1">
                        <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keamanan Akun */}
                <div className="border-b border-slate-100 pb-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Keamanan Akun</h2>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Kata Sandi Saat Ini</div>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                          placeholder="Masukkan kata sandi saat ini"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Kata Sandi Baru</div>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                          placeholder="Masukkan kata sandi baru"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi Baru</div>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 bg-white"
                          disabled={!isEditing}
                          placeholder="Konfirmasi kata sandi baru"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informasi Tambahan */}
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Informasi Tambahan</h2>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Verifikasi Akun</p>
                      <p className="text-sm text-slate-500">Verifikasi akun Anda untuk keamanan yang lebih baik</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}