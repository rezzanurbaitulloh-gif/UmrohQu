'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, ShoppingBag, Settings, LogOut, Package, Clock, CheckCircle, XCircle, ChevronRight, Search, Calendar, Plane, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getPublicUrl } from '@/lib/supabase/storage'

// Mock data untuk pesanan
const mockOrders = {
  belumDibayar: [
    {
      id: 'ORD-2026-001',
      packageName: 'Paket Umroh Premium 14 Hari',
      packageType: 'Umroh',
      date: '2026-08-15',
      price: 25000000,
      status: 'Belum Dibayar',
      paymentDeadline: '2026-07-30',
      image: getPublicUrl('packages/katalogpaket.png')
    },
    {
      id: 'ORD-2026-002',
      packageName: 'Paket Umroh Ekonomi 9 Hari',
      packageType: 'Umroh',
      date: '2026-09-05',
      price: 18000000,
      status: 'Belum Dibayar',
      paymentDeadline: '2026-08-10',
      image: getPublicUrl('packages/katalogpaket.png')
    }
  ],
  diproses: [
    {
      id: 'ORD-2026-003',
      packageName: 'Paket Umroh Ramadhan 10 Hari',
      packageType: 'Umroh',
      date: '2026-04-01',
      price: 22000000,
      status: 'Diproses',
      paymentDeadline: 'Sudah Dibayar',
      image: getPublicUrl('packages/katalogpaket.png')
    }
  ],
  selesai: [
    {
      id: 'ORD-2025-045',
      packageName: 'Paket Umroh Reguler 7 Hari',
      packageType: 'Umroh',
      date: '2025-12-20',
      price: 15000000,
      status: 'Selesai',
      paymentDeadline: 'Selesai',
      image: getPublicUrl('packages/katalogpaket.png')
    }
  ],
  kadaluwarsa: [
    {
      id: 'ORD-2026-004',
      packageName: 'Paket Umroh VIP 12 Hari',
      packageType: 'Umroh',
      date: '2026-10-10',
      price: 30000000,
      status: 'Kadaluwarsa',
      paymentDeadline: '2026-07-15',
      image: getPublicUrl('packages/katalogpaket.png')
    }
  ]
}

export default function PesananPage() {
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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <User size={18} />
                    Profile Akun
                  </Link>

                  <Link
                    href="/profile/pesanan"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
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
              <h1 className="text-2xl font-bold text-slate-900 mb-6">Pesanan Saya</h1>

              <Tabs defaultValue="belumDibayar" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="belumDibayar" className="flex items-center gap-2">
                    <Clock size={16} />
                    Belum Dibayar
                  </TabsTrigger>
                  <TabsTrigger value="diproses" className="flex items-center gap-2">
                    <Package size={16} />
                    Diproses
                  </TabsTrigger>
                  <TabsTrigger value="selesai" className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    Selesai
                  </TabsTrigger>
                  <TabsTrigger value="kadaluwarsa" className="flex items-center gap-2">
                    <XCircle size={16} />
                    Kadaluwarsa
                  </TabsTrigger>
                </TabsList>

                {/* Tab Belum Dibayar */}
                <TabsContent value="belumDibayar">
                  {mockOrders.belumDibayar.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.belumDibayar.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <Image
                                src={order.image}
                                alt={order.packageName}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-900">{order.packageName}</h3>
                                  <Badge variant="outline" className="mt-1">{order.packageType}</Badge>
                                </div>
                                <Badge variant="destructive">{order.status}</Badge>
                              </div>
                              <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Plane size={14} />
                                  <span>Keberangkatan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>Jakarta - Jeddah</span>
                                </div>
                                <div className="font-bold text-primary">
                                  Rp {order.price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-xs text-red-500">
                                  Batasi pembayaran: {order.paymentDeadline}
                                </div>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Link
                                  href={`/profile/pesanan/${order.id}`}
                                  className="text-sm text-primary hover:text-primary-dark"
                                >
                                  Lihat Detail
                                </Link>
                                <button className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dark">
                                  Bayar Sekarang
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada pesanan belum dibayar</h3>
                      <p className="text-sm text-slate-500 mb-4">Anda belum memiliki pesanan yang perlu dibayar</p>
                      <Link
                        href="/paket"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        <Search size={16} />
                        Cari Paket Umroh
                      </Link>
                    </div>
                  )}
                </TabsContent>

                {/* Tab Diproses */}
                <TabsContent value="diproses">
                  {mockOrders.diproses.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.diproses.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <Image
                                src={order.image}
                                alt={order.packageName}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-900">{order.packageName}</h3>
                                  <Badge variant="outline" className="mt-1">{order.packageType}</Badge>
                                </div>
                                <Badge variant="secondary">{order.status}</Badge>
                              </div>
                              <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Plane size={14} />
                                  <span>Keberangkatan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>Jakarta - Jeddah</span>
                                </div>
                                <div className="font-bold text-primary">
                                  Rp {order.price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-xs text-green-500">
                                  {order.paymentDeadline}
                                </div>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Link
                                  href={`/profile/pesanan/${order.id}`}
                                  className="text-sm text-primary hover:text-primary-dark"
                                >
                                  Lihat Detail
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada pesanan yang diproses</h3>
                      <p className="text-sm text-slate-500 mb-4">Anda belum memiliki pesanan yang sedang diproses</p>
                      <Link
                        href="/paket"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        <Search size={16} />
                        Cari Paket Umroh
                      </Link>
                    </div>
                  )}
                </TabsContent>

                {/* Tab Selesai */}
                <TabsContent value="selesai">
                  {mockOrders.selesai.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.selesai.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <Image
                                src={order.image}
                                alt={order.packageName}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-900">{order.packageName}</h3>
                                  <Badge variant="outline" className="mt-1">{order.packageType}</Badge>
                                </div>
                                <Badge variant="default" className="bg-green-500">{order.status}</Badge>
                              </div>
                              <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Plane size={14} />
                                  <span>Keberangkatan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>Jakarta - Jeddah</span>
                                </div>
                                <div className="font-bold text-primary">
                                  Rp {order.price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-xs text-green-500">
                                  {order.paymentDeadline}
                                </div>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Link
                                  href={`/profile/pesanan/${order.id}`}
                                  className="text-sm text-primary hover:text-primary-dark"
                                >
                                  Lihat Detail
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada pesanan selesai</h3>
                      <p className="text-sm text-slate-500 mb-4">Anda belum memiliki pesanan yang selesai</p>
                      <Link
                        href="/paket"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        <Search size={16} />
                        Cari Paket Umroh
                      </Link>
                    </div>
                  )}
                </TabsContent>

                {/* Tab Kadaluwarsa */}
                <TabsContent value="kadaluwarsa">
                  {mockOrders.kadaluwarsa.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.kadaluwarsa.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <Image
                                src={order.image}
                                alt={order.packageName}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-900">{order.packageName}</h3>
                                  <Badge variant="outline" className="mt-1">{order.packageType}</Badge>
                                </div>
                                <Badge variant="destructive">{order.status}</Badge>
                              </div>
                              <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Plane size={14} />
                                  <span>Keberangkatan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>Jakarta - Jeddah</span>
                                </div>
                                <div className="font-bold text-primary">
                                  Rp {order.price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-xs text-red-500">
                                  Kadaluwarsa pada: {order.paymentDeadline}
                                </div>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Link
                                  href={`/profile/pesanan/${order.id}`}
                                  className="text-sm text-primary hover:text-primary-dark"
                                >
                                  Lihat Detail
                                </Link>
                                <button className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dark">
                                  Pesan Ulang
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <XCircle size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada pesanan kadaluwarsa</h3>
                      <p className="text-sm text-slate-500 mb-4">Anda belum memiliki pesanan yang kadaluwarsa</p>
                      <Link
                        href="/paket"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        <Search size={16} />
                        Cari Paket Umroh
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}