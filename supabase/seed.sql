-- ============================================
-- UMROHQU SEED DATA - V2 (FIXED)
-- Run after schema.sql
-- ============================================

-- Insert sample travel vendors (user_id will be linked when vendor registers via auth)
-- Subdomain and custom_domain should be unique
INSERT INTO travel_vendors (nama_brand, ppiu_number, subdomain, status_verifikasi, rating, jumlah_terjual)
VALUES
  ('Amanah Tour & Travel', '420/2021', 'amanah', 'verified', 4.8, 156),
  ('Berkah Wisata Indonesia', '12/2020', 'berkah', 'verified', 4.5, 89),
  ('Safira Travel', '156/2021', 'safira', 'verified', 4.6, 234)
ON CONFLICT DO NOTHING;

-- Insert sample packages
INSERT INTO packages (vendor_id, nama, deskripsi, harga, durasi_hari, tanggal_keberangkatan, kota_keberangkatan, gambar_url, featured, slug, ppiu_number, maskapai, hotel_bintang, rating, jumlah_terjual, is_promo, promo_harga)
VALUES
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'amanah'),
    'Umroh Reguler 5 Bintang Awal Musim',
    'Paket umroh reguler dengan hotel bintang 5 dekat Masjidil Haram. Termasuk tiket pesawat, hotel, transportasi, dan pembimbing ibadah.',
    32500000, 9, '2024-10-15', 'Jakarta (CGK)',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop',
    true, 'umroh-reguler-5-bintang-awal-musim', '420/2021', 'Saudia', 5, 4.8, 156, false, NULL
  ),
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'berkah'),
    'Paket Umroh Promo Syawal 2024',
    'Raih keberkahan bulan Syawal dengan paket umroh promo spesial. Hemat Rp 3.500.000 dari harga normal!',
    28000000, 12, '2024-10-20', 'Jakarta (CGK)',
    'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=800&h=500&fit=crop',
    false, 'paket-umroh-promo-syawal-2024', '12/2020', 'Garuda', 4, 4.5, 89, true, 24500000
  ),
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'amanah'),
    'Umroh Plus Turki 12 Hari: Jejak Peradaban Islam',
    'Kombinasi umroh dan wisata religi Turki, mengunjungi tempat bersejarah Islam di Istanbul dan kota suci Makkah & Madinah.',
    45000000, 12, '2024-11-01', 'Jakarta (CGK)',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
    true, 'umroh-plus-turki-12-hari', '85/2022', 'Turkish Airlines', 5, 4.9, 67, false, NULL
  ),
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'safira'),
    'Umroh Keluarga Hemat - Promo Akhir Tahun',
    'Paket umroh keluarga dengan harga hemat untuk 4 orang ke Makkah dan Madinah.',
    22000000, 9, '2024-12-15', 'Surabaya (SUB)',
    'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop',
    false, 'umroh-keluarga-hemat-promo-akhir-tahun', '156/2021', 'Emirates', 4, 4.6, 234, true, 19500000
  ),
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'berkah'),
    'Umroh VIP Private Guide - 7 Hari',
    'Layanan VIP dengan private guide throughout perjalanan, transfer private, dan hotel bintang 5.',
    55000000, 7, '2024-11-10', 'Jakarta (CGK)',
    'https://images.unsplash.com/photo-1586892478390-53a7af3d5f3b?w=800&h=500&fit=crop',
    true, 'umroh-vip-private-guide-7-hari', '23/2023', 'Qatar Airways', 5, 5.0, 42, false, NULL
  ),
  (
    (SELECT id FROM travel_vendors WHERE subdomain = 'safira'),
    'Umroh Ramadhan 1446 H - Spesial',
    'Tuntaskan ibadah umroh di bulan suci Ramadhan dengan paket eksklusif. Hotel dekat Haram.',
    38000000, 10, '2025-02-20', 'Medan (KNO)',
    'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&h=500&fit=crop',
    true, 'umroh-ramadhan-1446-h-spesial', '78/2022', 'Saudia', 5, 4.9, 312, false, NULL
  )
ON CONFLICT DO NOTHING;

-- Insert itineraries for first package (Umroh Plus Turki)
INSERT INTO itineraries (package_id, hari_ke, judul, deskripsi, gambar_url)
SELECT id, 1, 'Keberangkatan Jakarta - Istanbul', 'Berkumpul di Bandara Soekarno-Hatta untuk proses check-in dan briefing keberangkatan menuju Istanbul, Turki.', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=300&fit=crop'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 2, 'City Tour Istanbul & Bosphorus', 'Tiba di Istanbul, mengunjungi Blue Mosque, Hagia Sophia, dan menikmati keindahan selat Bosphorus.', 'https://images.unsplash.com/photo-1542382226-115d9e24f84a?w=600&h=300&fit=crop'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 3, 'Istanbul - Madinah Al-Munawwarah', 'Melanjutkan perjalanan menuju kota suci Madinah. Proses check-in hotel dan persiapan ibadah.', 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=500&fit=crop'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 4, 'Ziarah di Madinah', 'Ziarah ke Masjid Quba, Bukit Uhud, dan tempat-tempat bersejarah lainnya di Madinah.', 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=500&fit=crop'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 5, 'Madinah - Makkah', 'Perjalanan menuju kota suci Makkah. Check-in hotel dan persiapan untuk umroh.', 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=600&h=500&fit=crop'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
ON CONFLICT DO NOTHING;

-- Insert hotels for first package
INSERT INTO hotels (package_id, nama, kota, bintang, deskripsi, gambar_url, jarak_ke_masjid)
SELECT id, 'Pullman Zamzam Madinah', 'Madinah', 5, 'Hotel bintang 5 langsung terhubung dengan Masjid Nabawi', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=300&fit=crop', '50m'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 'Swissotel Al Maqam Makkah', 'Makkah', 5, 'Hotel bintang 5 dengan pemandangan langsung Ka''bah', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=300&fit=crop', '100m'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
ON CONFLICT DO NOTHING;

-- Insert flights for first package
INSERT INTO flights (package_id, maskapai, kode_penerbangan, dari, ke, waktu_berangkat, waktu_tiba)
SELECT id, 'Turkish Airlines', 'TK 205', 'Jakarta (CGK)', 'Istanbul (IST)', '08:30', '15:45'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 'Turkish Airlines', 'TK 720', 'Istanbul (IST)', 'Madinah (MED)', '10:00', '12:30'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
  ('platform_name', 'UmrohQu'),
  ('maintenance_mode', 'false'),
  ('contact_email', 'info@umrohqu.com'),
  ('contact_phone', '+62-21-1234-5678'),
  ('whatsapp_number', '6281234567890')
ON CONFLICT DO NOTHING;

-- Insert master data
INSERT INTO master_data (tipe, nama, nilai) VALUES
  ('maskapai', 'Saudi Arabian Airlines', 'Saudia'),
  ('maskapai', 'Garuda Indonesia', 'Garuda'),
  ('maskapai', 'Emirates', 'Emirates'),
  ('maskapai', 'Qatar Airways', 'Qatar'),
  ('maskapai', 'Turkish Airlines', 'Turkish Airlines'),
  ('kota_keberangkatan', 'Jakarta', 'CGK'),
  ('kota_keberangkatan', 'Medan', 'KNO'),
  ('kota_keberangkatan', 'Surabaya', 'SUB'),
  ('kota_keberangkatan', 'Denpasar', 'DPS'),
  ('kota_keberangkatan', 'Makassar', 'UPG'),
  ('hotel_makkah', 'Swissôtel Al Maqam', '5 bintang, 100m dari Masjidil Haram'),
  ('hotel_madinah', 'Pullman Zamzam Madinah', '5 bintang, 50m dari Masjid Nabawi')
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (package_id, rating, komentar)
SELECT id, 5, 'Alhamdulillah, pelayanan sangat memuaskan. Hotel dekat haram dan fasilitas lengkap.'
FROM packages WHERE slug = 'umroh-plus-turki-12-hari'
UNION ALL
SELECT id, 4, 'Perjalanan berjalan lancar. Panduan ibadah membantu sekali. Recommended!'
FROM packages WHERE slug = 'paket-umroh-promo-syawal-2024'
ON CONFLICT DO NOTHING;

-- Insert sample bids for featured packages
INSERT INTO bids (package_id, nominal_bid, status, expired_at)
SELECT id, 500000, 'active', NOW() + INTERVAL '30 days'
FROM packages WHERE featured = true
ON CONFLICT DO NOTHING;
