-- ============================================
-- COMPLETE SETUP SCRIPT
-- Copy and paste this entire block into Supabase SQL Editor
-- ============================================

-- 1. Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'jamaah' CHECK (role IN ('super_admin', 'support', 'billing', 'travel_vendor', 'jamaah')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create travel_vendors table (user_id nullable)
CREATE TABLE IF NOT EXISTS travel_vendors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nama_brand TEXT NOT NULL,
  ppiu_number TEXT,
  subdomain TEXT UNIQUE,
  custom_domain TEXT UNIQUE,
  logo_url TEXT,
  description TEXT,
  status_verifikasi TEXT DEFAULT 'pending' CHECK (status_verifikasi IN ('pending', 'verified', 'rejected')),
  rating DECIMAL(3,2) DEFAULT 0.0,
  jumlah_terjual INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID REFERENCES travel_vendors(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  deskripsi TEXT,
  harga BIGINT NOT NULL,
  durasi_hari INTEGER NOT NULL,
  tanggal_keberangkatan DATE NOT NULL,
  kota_keberangkatan TEXT NOT NULL,
  gambar_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  ppiu_number TEXT NOT NULL,
  maskapai TEXT NOT NULL,
  hotel_bintang INTEGER NOT NULL CHECK (hotel_bintang BETWEEN 1 AND 5),
  rating DECIMAL(3,2) DEFAULT 0.0,
  jumlah_terjual INTEGER DEFAULT 0,
  is_promo BOOLEAN DEFAULT FALSE,
  promo_harga BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create package_photos table
CREATE TABLE IF NOT EXISTS package_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  urutan INTEGER DEFAULT 0
);

-- 6. Create itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  hari_ke INTEGER NOT NULL,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  gambar_url TEXT
);

-- 7. Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  kota TEXT NOT NULL,
  bintang INTEGER NOT NULL CHECK (bintang BETWEEN 1 AND 5),
  deskripsi TEXT,
  gambar_url TEXT,
  jarak_ke_masjid TEXT
);

-- 8. Create flights table
CREATE TABLE IF NOT EXISTS flights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  maskapai TEXT NOT NULL,
  kode_penerbangan TEXT NOT NULL,
  dari TEXT NOT NULL,
  ke TEXT NOT NULL,
  waktu_berangkat TEXT NOT NULL,
  waktu_tiba TEXT NOT NULL
);

-- 9. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE RESTRICT NOT NULL,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  nama_lengkap TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  total_harga BIGINT NOT NULL,
  dp BIGINT DEFAULT 0,
  metode_bayar TEXT DEFAULT 'dp' CHECK (metode_bayar IN ('dp', 'full')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'processing', 'completed', 'cancelled')),
  nomor_booking TEXT UNIQUE NOT NULL,
  bank_tujuan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Create jamaah table
CREATE TABLE IF NOT EXISTS jamaah (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  nomor_paspor TEXT NOT NULL,
  masa_berlaku_paspor DATE NOT NULL,
  hubungan TEXT DEFAULT 'utama'
);

-- 11. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  komentar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tipe TEXT NOT NULL CHECK (tipe IN ('travel', 'jamaah')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- 13. Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE NOT NULL,
  nominal_bid BIGINT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired')),
  expired_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Create master_data table
CREATE TABLE IF NOT EXISTS master_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tipe TEXT NOT NULL CHECK (tipe IN ('maskapai', 'hotel_makkah', 'hotel_madinah', 'kota_keberangkatan')),
  nama TEXT NOT NULL,
  nilai TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Create payment_proofs table
CREATE TABLE IF NOT EXISTS payment_proofs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  gambar_url TEXT NOT NULL,
  nominal BIGINT NOT NULL,
  status_verifikasi TEXT DEFAULT 'pending' CHECK (status_verifikasi IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE jamaah ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE master_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Travel vendors viewable by everyone" ON travel_vendors FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create travel vendors" ON travel_vendors FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Packages are viewable by everyone" ON packages FOR SELECT USING (true);
CREATE POLICY "Vendors can create packages" ON packages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM travel_vendors WHERE user_id = auth.uid() AND id = vendor_id)
);
CREATE POLICY "Vendors can update own packages" ON packages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM travel_vendors WHERE user_id = auth.uid() AND id = vendor_id)
);

CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (
  customer_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM packages
    JOIN travel_vendors ON packages.vendor_id = travel_vendors.id
    WHERE packages.id = bookings.package_id
    AND travel_vendors.user_id = auth.uid()
  )
);
CREATE POLICY "Authenticated users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view jamaah for own bookings" ON jamaah FOR SELECT USING (
  EXISTS (SELECT 1 FROM bookings WHERE id = booking_id AND customer_id = auth.uid())
);

CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view follows" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can create follows" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete own follows" ON follows FOR DELETE USING (auth.uid() = follower_id);

CREATE POLICY "Bids are viewable by everyone" ON bids FOR SELECT USING (true);
CREATE POLICY "Vendors can manage own bids" ON bids FOR ALL USING (
  EXISTS (SELECT 1 FROM packages WHERE id = bids.package_id AND vendor_id IN (SELECT id FROM travel_vendors WHERE user_id = auth.uid()))
);

CREATE POLICY "Site settings viewable by everyone" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can subscribe newsletter" ON newsletter FOR INSERT WITH CHECK (true);

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'jamaah')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_packages_vendor_id ON packages(vendor_id);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(featured);
CREATE INDEX IF NOT EXISTS idx_packages_tanggal ON packages(tanggal_keberangkatan);
CREATE INDEX IF NOT EXISTS idx_packages_kota ON packages(kota_keberangkatan);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_package ON bookings(package_id);
CREATE INDEX IF NOT EXISTS idx_reviews_package ON reviews(package_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_package ON itineraries(package_id);
CREATE INDEX IF NOT EXISTS idx_hotels_package ON hotels(package_id);
CREATE INDEX IF NOT EXISTS idx_flights_package ON flights(package_id);
CREATE INDEX IF NOT EXISTS idx_jamaah_booking ON jamaah(booking_id);
