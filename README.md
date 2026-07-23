# UmrohQu - Premium Umrah & Haji Marketplace

Platform marketplace Haji dan Umroh berbasis digital yang menghubungkan berbagai biro perjalanan terverifikasi dengan calon jamaah dalam satu ekosistem terpadu, transparan, dan modern.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** lucide-react
- **Database:** Supabase (PostgreSQL, Auth, Storage, RLS)
- **Font:** Inter (Google Fonts)
- **Multi-Tenant:** Next.js Proxy (subdomain routing)

## Features

### Public Portal (umrohqu.com)
- Katalog paket umroh dengan filter multi (harga, bintang hotel, maskapai, kota, bulan)
- Detail paket lengkap (itinerary, hotel, penerbangan, fasilitas, syarat & ketentuan)
- Sistem booking 3 langkah (Data Pemesan → Data Jamaah → Pembayaran)
- Pencarian & perbandingan paket
- Halaman tentang kami, cara kerja, dan kemitraan
- Auth (Login/Register) dengan Supabase

### Multi-Tenant Engine
- Subdomain dinamis: `[travel].umrohqu.com`
- Setiap travel mendapat website branded sendiri

### Design System
- Atmospheric dark theme dengan green accent (#10B981)
- Glassmorphism cards (frosted glass effect)
- Star pattern overlay untuk nuansa spiritual modern
- Green glow effects & smooth animations
- Dual Logo (Icon + Text) dengan transparent background

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd umrohq
npm install
```

### 2. Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://etmjycldjyrbsbcuuwzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

Jalankan SQL schema di Supabase SQL Editor:

```bash
# 1. Buka Supabase Dashboard → SQL Editor
# 2. Copy paste isi file: supabase/schema.sql
# 3. Execute
# 4. Kemudian jalankan: supabase/seed.sql untuk data sample
```

Buat Storage Buckets di Supabase Dashboard → Storage:
- `package-images` (public)
- `payment-proofs` (private)
- `avatars` (public)
- `vendor-logos` (public)

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── (main)/                    # Portal utama marketplace
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home (redirect ke /paket)
│   │   ├── paket/
│   │   │   ├── page.tsx           # Katalog paket
│   │   │   └── [slug]/page.tsx    # Detail paket
│   │   ├── booking/[id]/page.tsx  # Checkout 3-step
│   │   ├── tentang/page.tsx       # About Us
│   │   ├── cara-kerja/page.tsx    # Cara Kerja
│   │   ├── kemitraan/page.tsx     # Kemitraan
│   │   └── cari/page.tsx          # Pencarian
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── layout.tsx                 # Root layout (global)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── DualLogo.tsx
│   ├── package/
│   │   ├── PackageCard.tsx
│   │   └── FilterSidebar.tsx
│   ├── booking/
│   │   └── BookingForm.tsx
│   └── ui/                        # shadcn/ui components
├── lib/
│   └── supabase/
│       ├── client.ts              # Browser client
│       └── server.ts              # Server client
├── types/
│   └── index.ts                   # TypeScript interfaces
├── proxy.ts                       # Multi-tenant middleware
└── globals.css                    # Global styles + theme
public/
└── logos/
    ├── logo-icon.svg              # Kaaba icon (transparent)
    └── logo-text.svg              # UmrohQu text logo (transparent)
supabase/
├── schema.sql                     # Database schema
└── seed.sql                       # Sample data
```

## User Roles

| Role | Description |
|------|-------------|
| `super_admin` | Global CMS, master data, monetization config |
| `support` | Verifikasi vendor, ticket handling, impersonation |
| `billing` | Setup fee ledger, service fee split, payout |
| `travel_vendor` | Kelola paket, itinerary, pesanan, branding |
| `jamaah` | Booking, tracking, upload dokumen, follow travel |

## Design Guidelines

- **Primary Color:** #10B981 (Emerald)
- **Accent:** #34D399 (Mint)
- **Background:** #0F172A (Deep Obsidian)
- **Surface:** rgba(30, 41, 59, 0.6) with backdrop-blur
- **Border Radius:** 20px-24px
- **Typography:** Inter font, clean whitespace

## Monetisasi

| Pilar | Tarif Normal | Tarif Promo |
|-------|-------------|-------------|
| Setup Fee Mitra | Rp 5.000.000 | Rp 2.500.000 |
| Service Fee Subdomain | Rp 100.000/jamaah | Rp 50.000/jamaah |
| Service Fee Portal Utama | Rp 300.000/jamaah | Rp 150.000/jamaah |
| Bidding Promosi | Lelang Dinamis | - |

## License

Private & Proprietary - UmrohQu
