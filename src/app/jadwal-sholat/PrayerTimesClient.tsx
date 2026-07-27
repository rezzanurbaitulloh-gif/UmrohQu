'use client'

import { Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PrayerTimesClient() {
  const [prayerTimes, setPrayerTimes] = useState([
    { name: 'Imsak', time: '--:--' },
    { name: 'Subuh', time: '--:--' },
    { name: 'Terbit', time: '--:--' },
    { name: 'Dhuha', time: '--:--' },
    { name: 'Dzuhur', time: '--:--' },
    { name: 'Ashar', time: '--:--' },
    { name: 'Maghrib', time: '--:--' },
    { name: 'Isya', time: '--:--' },
  ])

  const [selectedCity, setSelectedCity] = useState('Jakarta')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationInfo, setLocationInfo] = useState('Jakarta, Indonesia')

  const cities = [
    { name: 'Jakarta', country: 'Indonesia' },
    { name: 'Surabaya', country: 'Indonesia' },
    { name: 'Bandung', country: 'Indonesia' },
    { name: 'Yogyakarta', country: 'Indonesia' },
    { name: 'Medan', country: 'Indonesia' },
    { name: 'Makkah', country: 'Saudi Arabia' },
    { name: 'Madinah', country: 'Saudi Arabia' },
    { name: 'Jeddah', country: 'Saudi Arabia' },
    { name: 'Riyadh', country: 'Saudi Arabia' },
    { name: 'Dubai', country: 'United Arab Emirates' }
  ]

  const fetchPrayerTimes = async () => {
    setLoading(true)
    setError(null)

    try {
      const city = cities.find(c => c.name === selectedCity)
      if (!city) {
        throw new Error('Kota tidak ditemukan')
      }

      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}&method=2`
      )

      if (!response.ok) {
        throw new Error('Gagal mengambil data jadwal sholat')
      }

      const data = await response.json()

      // Map API data to our format
      const timings = data.data.timings
      const date = data.data.date.readable

      setLocationInfo(`${city.name}, ${city.country}`)
      setPrayerTimes([
        { name: 'Imsak', time: timings.Imsak },
        { name: 'Subuh', time: timings.Fajr },
        { name: 'Terbit', time: timings.Sunrise },
        { name: 'Dhuha', time: calculateDhuha(timings.Sunrise) },
        { name: 'Dzuhur', time: timings.Dhuhr },
        { name: 'Ashar', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isya', time: timings.Isha },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data')
      console.error('Error fetching prayer times:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateDhuha = (sunriseTime: string) => {
    // Dhuha is approximately 20 minutes after sunrise
    const [hours, minutes] = sunriseTime.split(':').map(Number)
    const sunriseDate = new Date()
    sunriseDate.setHours(hours, minutes, 0)

    const dhuhaDate = new Date(sunriseDate.getTime() + 20 * 60000)
    return dhuhaDate.toTimeString().substring(0, 5)
  }

  useEffect(() => {
    fetchPrayerTimes()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Jadwal Sholat</h1>
        </div>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Dapatkan jadwal sholat akurat untuk kota Anda. Waktu sholat diperbarui setiap hari berdasarkan lokasi dan perhitungan astronomi.
        </p>
      </div>

      {/* Search and Location */}
      <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
              Pilih Kota
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={fetchPrayerTimes}
            disabled={loading}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors mt-6 md:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memuat...' : 'Cari Jadwal'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Prayer Times Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-slate-600">Memuat jadwal sholat...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Jadwal Sholat Hari Ini</h2>
              <div className="text-sm text-slate-500">
                <span className="font-medium">{locationInfo}</span> • {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {prayerTimes.map((prayer) => (
                <div key={prayer.name} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-slate-500 mb-1">{prayer.name}</div>
                  <div className="text-xl font-bold text-slate-900">{prayer.time}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}