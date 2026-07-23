-- ============================================
-- FIX: Travel Vendors Schema - Run in Supabase SQL Editor
-- ============================================

-- Drop table if exists (will also drop dependent constraints)
DROP TABLE IF EXISTS travel_vendors CASCADE;

-- Create table with nullable user_id
CREATE TABLE travel_vendors (
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

-- Insert sample data (without user_id)
INSERT INTO travel_vendors (nama_brand, ppiu_number, subdomain, status_verifikasi, rating, jumlah_terjual)
VALUES
  ('Amanah Tour & Travel', '420/2021', 'amanah', 'verified', 4.8, 156),
  ('Berkah Wisata Indonesia', '12/2020', 'berkah', 'verified', 4.5, 89),
  ('Safira Travel', '156/2021', 'safira', 'verified', 4.6, 234)
ON CONFLICT DO NOTHING;

-- Verify insert worked
SELECT * FROM travel_vendors;
