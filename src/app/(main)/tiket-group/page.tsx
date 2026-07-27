'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Users, Calendar, Plane, ChevronDown, ArrowRight, ArrowLeft, Star } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPublicUrl } from '@/lib/supabase/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Sample data for group tickets
const sampleGroupTickets = [
  {
    id: '1',
    maskapai: 'Garuda Indonesia',
    logo: getPublicUrl('airlines/garuda.png'),
    keberangkatan: 'Jakarta (CGK)',
    tujuan: 'Jeddah (JED)',
    tanggal: '2024-10-15',
    waktu: '08:00 - 12:00',
    harga: 8500000,
    sisaKursi: 12,
    rating: 4.8,
    status: 'Tersedia',
  },
  {
    id: '2',
    maskapai: 'Saudia',
    logo: getPublicUrl('airlines/saudia.png'),
    keberangkatan: 'Surabaya (SUB)',
    tujuan: 'Madinah (MED)',
    tanggal: '2024-10-18',
    waktu: '14:00 - 18:00',
    harga: 9200000,
    sisaKursi: 8,
    rating: 4.7,
    status: 'Tersedia',
  },
  {
    id: '3',
    maskapai: 'Lion Air',
    logo: getPublicUrl('airlines/lion.png'),
    keberangkatan: 'Jakarta (CGK)',
    tujuan: 'Jeddah (JED)',
    tanggal: '2024-10-20',
    waktu: '20:00 - 00:00',
    harga: 7800000,
    sisaKursi: 15,
    rating: 4.5,
    status: 'Tersedia',
  },
  {
    id: '4',
    maskapai: 'Emirates',
    logo: getPublicUrl('airlines/emirates.png'),
    keberangkatan: 'Jakarta (CGK)',
    tujuan: 'Jeddah (JED)',
    tanggal: '2024-10-22',
    waktu: '10:00 - 14:00',
    harga: 12000000,
    sisaKursi: 5,
    rating: 4.9,
    status: 'Hampir Habis',
  },
  {
    id: '5',
    maskapai: 'Qatar Airways',
    logo: getPublicUrl('airlines/qatar.png'),
    keberangkatan: 'Bandung (BDO)',
    tujuan: 'Madinah (MED)',
    tanggal: '2024-10-25',
    waktu: '16:00 - 20:00',
    harga: 11000000,
    sisaKursi: 10,
    rating: 4.8,
    status: 'Tersedia',
  },
]

// Sample cities for dropdowns
const departureCities = [
  { value: 'CGK', label: 'Jakarta (CGK)' },
  { value: 'SUB', label: 'Surabaya (SUB)' },
  { value: 'BDO', label: 'Bandung (BDO)' },
  { value: 'DPS', label: 'Denpasar (DPS)' },
  { value: 'MES', label: 'Medan (MES)' },
]

const destinationCities = [
  { value: 'JED', label: 'Jeddah (JED)' },
  { value: 'MED', label: 'Madinah (MED)' },
]

export default function TiketGroupPage() {
  const [departure, setDeparture] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [pilgrims, setPilgrims] = useState<string>('1')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter tickets based on search criteria
  const filteredTickets = sampleGroupTickets.filter(ticket => {
    const matchesDeparture = departure ? ticket.keberangkatan.includes(departure) : true
    const matchesDestination = destination ? ticket.tujuan.includes(destination) : true
    return matchesDeparture && matchesDestination
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 py-20 px-4">
        <div className="absolute inset-0">
          <Image
            src={getPublicUrl('backgrounds/makkah.png')}
            alt="Makkah background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tiket Group Umroh & Haji</h1>
          <p className="text-lg text-white/90 mb-8">Temukan tiket group terbaik untuk perjalanan ibadah Anda</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* Keberangkatan */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Keberangkatan</label>
                <Select value={departure} onValueChange={(value) => setDeparture(value || '')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {departureCities.map(city => (
                      <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tujuan */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tujuan</label>
                <Select value={destination} onValueChange={(value) => setDestination(value || '')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationCities.map(city => (
                      <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Jumlah Jamaah */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah Jamaah</label>
                <Select value={pilgrims} onValueChange={(value) => setPilgrims(value || '1')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Jumlah" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Orang</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button className="w-full bg-primary hover:bg-primary-dark h-12">
                <Search className="w-4 h-4 mr-2" />
                Cari Tiket
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {paginatedTickets.length > 0 ? (
              <>
                {paginatedTickets.map(ticket => (
                  <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                        {/* Maskapai */}
                        <div className="md:col-span-3 flex items-center gap-3">
                          <Image
                            src={ticket.logo}
                            alt={ticket.maskapai}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                          <div>
                            <h3 className="font-semibold text-slate-800">{ticket.maskapai}</h3>
                            <p className="text-sm text-slate-500">{ticket.keberangkatan} → {ticket.tujuan}</p>
                          </div>
                        </div>

                        {/* Tanggal & Waktu */}
                        <div className="md:col-span-2">
                          <p className="font-medium text-slate-800">{new Date(ticket.tanggal).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                          <p className="text-sm text-slate-500">{ticket.waktu}</p>
                        </div>

                        {/* Harga */}
                        <div className="md:col-span-2">
                          <p className="text-sm text-slate-500">Mulai dari</p>
                          <p className="text-lg font-bold text-primary">Rp {ticket.harga.toLocaleString('id-ID')}</p>
                        </div>

                        {/* Sisa Kursi */}
                        <div className="md:col-span-2">
                          <p className="text-sm text-slate-500">Sisa kursi</p>
                          <p className="font-medium text-slate-800">{ticket.sisaKursi} kursi</p>
                        </div>

                        {/* Rating & Status */}
                        <div className="md:col-span-2 flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{ticket.rating}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            ticket.status === 'Tersedia' ? 'bg-green-100 text-green-800' :
                            ticket.status === 'Hampir Habis' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>

                        {/* Action Button */}
                        <div className="md:col-span-1 flex justify-end">
                          <Link href={`/booking/${ticket.id}`}>
                            <Button className="bg-primary hover:bg-primary-dark">
                              Pesan <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Sebelumnya
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Selanjutnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">Tiket group tidak ditemukan</h3>
                <p className="text-slate-500">Coba sesuaikan filter pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}