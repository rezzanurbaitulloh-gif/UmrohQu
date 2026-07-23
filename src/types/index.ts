export type UserRole = 'super_admin' | 'support' | 'billing' | 'travel_vendor' | 'jamaah'

export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'processing' | 'completed' | 'cancelled'
export type PaymentMethod = 'dp' | 'full'
export type PaymentStatus = 'pending' | 'verified' | 'rejected'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone: string
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface TravelVendor {
  id: string
  user_id: string
  nama_brand: string
  ppiu_number: string
  subdomain: string | null
  custom_domain: string | null
  logo_url: string | null
  description: string | null
  status_verifikasi: 'pending' | 'verified' | 'rejected'
  rating: number
  jumlah_terjual: number
  created_at: string
}

export interface Package {
  id: string
  vendor_id: string
  nama: string
  deskripsi: string
  harga: number
  durasi_hari: number
  tanggal_keberangkatan: string
  kota_keberangkatan: string
  gambar_url: string
  featured: boolean
  slug: string
  ppiu_number: string
  maskapai: string
  hotel_bintang: number
  rating: number
  jumlah_terjual: number
  is_promo: boolean
  promo_harga: number | null
  created_at: string
}

export interface PackagePhoto {
  id: string
  package_id: string
  photo_url: string
  urutan: number
}

export interface Itinerary {
  id: string
  package_id: string
  hari_ke: number
  judul: string
  deskripsi: string
  gambar_url: string | null
}

export interface Hotel {
  id: string
  package_id: string
  nama: string
  kota: string
  bintang: number
  deskripsi: string
  gambar_url: string | null
  jarak_ke_masjid: string | null
}

export interface Flight {
  id: string
  package_id: string
  maskapai: string
  kode_penerbangan: string
  dari: string
  ke: string
  waktu_berangkat: string
  waktu_tiba: string
}

export interface Booking {
  id: string
  package_id: string
  customer_id: string | null
  nama_lengkap: string
  email: string
  whatsapp: string
  total_harga: number
  dp: number
  metode_bayar: PaymentMethod
  status: BookingStatus
  nomor_booking: string
  bank_tujuan: string | null
  created_at: string
}

export interface Jamaah {
  id: string
  booking_id: string
  nama_lengkap: string
  nomor_paspor: string
  masa_berlaku_paspor: string
  hubungan: string
}

export interface Review {
  id: string
  package_id: string
  user_id: string | null
  rating: number
  komentar: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  tipe: 'travel' | 'jamaah'
  created_at: string
}

export interface Bid {
  id: string
  package_id: string
  nominal_bid: number
  status: 'active' | 'paused' | 'expired'
  expired_at: string
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface Newsletter {
  id: string
  email: string
  created_at: string
}

export interface MasterData {
  id: string
  tipe: 'maskapai' | 'hotel_makkah' | 'hotel_madinah' | 'kota_keberangkatan'
  nama: string
  nilai: string
  created_at: string
}

export interface PaymentProof {
  id: string
  booking_id: string
  gambar_url: string
  nominal: number
  status_verifikasi: PaymentStatus
  created_at: string
}
