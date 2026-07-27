================================================================================
MASTER PROMPT ULTUMATE: DASHBOARD SUPER ADMIN ("GOD-MODE") - PLATFORM UMROHQU
================================================================================

Kamu adalah Senior Front-End & Full-Stack Architect serta Lead Developer Next.js 14 & Supabase. Tugasmu adalah membangun seluruh Halaman Dashboard Super Admin ("God-Mode") pada path `/admin` (Next.js 14 App Router: `app/admin/...`) untuk platform UmrohQu — sebuah marketplace & SaaS Haji & Umroh Multi-Tenant.

Halaman Admin ini merupakan pusat kendali master tunggal (Single Master Control Hub) bagi pemilik platform untuk memantau transaksi real-time, mengelola pengguna (CRM), memoderasi vendor/travel, mengatur CMS global, mengelola pustaka template SaaS, hingga mengeksekusi payout keuangan.

--------------------------------------------------------------------------------
1. PALET WARNA & DESIGN SYSTEM DASHBOARD ADMIN
--------------------------------------------------------------------------------
• Primary Emerald Green: `#046A38` / `#004D34` (Tombol utama, header aktif, status verified, badge sukses).
• Mint Light Accent: `#D1F4E2` / `#E8F8F0` (Latar belakang badge, highlight active tab, icon KPI, card accent).
• Dark Emerald Sidebar: `#003824` / `#014D32` (Latar belakang sidebar navigasi).
• Neutral Canvas: Off-White `#F9FAFB` / `#F1F5F9` (Latar belakang workspace utama agar data/tabel nyaman dibaca).
• Text & Borders: Obsidian Black `#0F172A` (Teks utama), Cool Grey `#64748B` (Teks sekunder), dan `#E2E8F0` (Border).
• Aesthetics: Clean, modern, fluid, rounded corners (border-radius 12px–16px / `rounded-xl`), shadow-sm, scannable, dan konsistensi komponen menggunakan Tailwind CSS + shadcn/ui + Lucide Icons + Recharts.

--------------------------------------------------------------------------------
2. LAYOUT STRUCTURAL DASHBOARD (`app/admin/layout.tsx`)
--------------------------------------------------------------------------------
• Sidebar Navigation (Kiri / Dark Emerald Theme `#003824`):
  - Dual Logo Brand: GAMBAR 1 (Logo Icon) + GAMBAR 2 (Logotype/Teks Logo) di bagian paling atas.
  - Menu Navigasi Admin dengan icon Lucide dan indikator active state (Mint Light background `#D1F4E2` + Emerald text `#046A38`).
  - Profile Card Admin + Tombol Logout di bagian paling bawah.
• Top Bar (Atas / White Clean `#FFFFFF`):
  - Global Search Input (Cari cepat Jamaah, Travel, atau Kode Booking).
  - Quick Switcher Maintenance Mode (Toggle ON/OFF dengan modal konfirmasi).
  - Notification Bell Dropdown (Notifikasi pendaftaran travel baru, pengajuan payout, tiket sengketa).
• Main Workspace (Kanan / Off-White Canvas `#F9FAFB`):
  - Dynamic Content Area berbasis route/tab dengan Header Judul + Breadcrumb + Quick Action Buttons.

--------------------------------------------------------------------------------
3. STRUKTUR MENU & FITUR LENGKAP ADMIN (10 MODUL UTAMA)
--------------------------------------------------------------------------------

📊 [1. DASHBOARD & ANALYTICS OVERVIEW] (`app/admin/dashboard/page.tsx`)
WAJIB MENGGUNAKAN DATA REAL DARI SUPABASE DATABASE (TANPA HARDCODE):
A. Header & Controls:
   - Judul "Master Control Hub" + Tombol "Refresh Data Realtime" dengan ikon `Loader2` spinner.
B. 4 KPI Metric Cards:
   1. Total GMV Transaksi: Count baris dari `bookings` + akumulasi omzet lunas (`PAID`/`COMPLETED`) dalam Rp.
   2. Total Member Jamaah: Count pengguna `role = 'JAMAAH'` dari `profiles`.
   3. Data Vendor/Travel: Count biro travel dari `travels` + statistik mitra status `ACTIVE` vs `PENDING`.
   4. Tiket/Paket Published: Count paket aktif (`is_active = true`) dari `packages`.
C. Visual Charts (Recharts / ResponsiveContainer):
   - Grafis Batang Transaksi Pembelian Real-Time (data `bookings` berstatus `PAID`/`COMPLETED` di-grouping bulanan, misal: "Jan 26", "Feb 26").
   - Batang 1 (Emerald `#046A38`): Omzet Lunas (dalam Juta Rp).
   - Batang 2 (Mint/Emerald Muda `#34D399`): Volume Transaksi.
   - Tooltip kustom Dark Slate (`#0F172A`) dengan format mata uang Rupiah (`id-ID`).
   - Pie Chart Perbandingan Transaksi (Jalur Subdomain Travel vs Portal Utama).
D. Tabulasi Data Real-Time & Search Filter:
   - TAB 1: 🛒 Data Pembelian (`bookings`) -> Kode Transaksi, Pemesan (join `profiles`), Paket (join `packages`), Total Bayar, Saluran, Status Badge (`PAID`, `PENDING`, `CANCELLED`), Tanggal.
   - TAB 2: 👥 Data Member (`profiles` where `role = 'JAMAAH'`) -> Nama, Email, No. WA, Status Profil (`is_public`), Tanggal Bergabung.
   - TAB 3: 🏢 Data Vendor (`travels`) -> Nama Biro, Subdomain (`[slug].umrohqu.com`), Custom Domain, No. PPIU Kemenag, Status Lisensi (`ACTIVE`, `PENDING`, `SUSPENDED`), Tanggal Didaftarkan.
   - TAB 4: 🎫 Tiket / Paket Publish (`packages` where `is_active = true`) -> Judul Paket, Biro Travel (join `travels`), Harga/Pax, Keberangkatan, Sisa Kuota, Status Market.

👥 [2. GLOBAL USER MANAGEMENT HUB (CRM GOD-EYE VIEW)] (`app/admin/users/page.tsx`)
Tampilan Tab-Based untuk mengelola seluruh akun pengguna di dalam sistem:
• Tab 1: Akun Jamaah (Customer CRM)
  - Data lengkap: Nama, WhatsApp, Email, Jumlah Booking, Status Privasi (`is_public`).
  - View Berkas Sensitif: Tombol modal untuk mengintip/mengunduh Paspor & KTP (via Supabase Secure Signed URL).
  - Histori Transaksi & Travel yang diikuti (Followed Travels).
• Tab 2: Akun Travel & Vendor (Tenant Owners & Staff)
  - Data Pemilik Utama & Staf Vendor, Nama Travel, Subdomain (`travelabc.umrohqu.com`), Custom Domain.
  - Data Bank Payout Resmi Travel.
  - Tombol Universal Impersonation: "Login As Vendor" (Masuk ke dashboard travel tersebut dalam mode support).
• Tab 3: Akun Staf Internal (RBAC Control)
  - Pengaturan peran staf internal: Staf Billing/Finance vs Staf Support Helpdesk.
• Tab 4: Akun Super Admin
  - Manajemen sesama akun Super Admin.
• Action Toolkit Per Akun (Dropdown Menu):
  - [Force Reset Password] -> Kirim reset link / temp password.
  - [Revoke All Sessions] -> Kick out user dari seluruh perangkat.
  - [Ban / Suspend / Activate] -> Toggle status aktif akun.
  - [View Audit Log] -> Histori/Audit trail aktivitas akun tersebut.

🎨 [3. SAAS WEB TEMPLATE ENGINE (VENDOR THEME MANAGER)] (`app/admin/templates/page.tsx`)
• Template Gallery Grid:
  - Daftar template desain website travel yang tersedia (Preview Thumbnail, Nama Template, Status Aktif).
  - Tombol "Tambah Template Baru" (Upload config JSON, atur CSS layout preset).
• Preset Configuration Editor:
  - Mengatur elemen mana pada template yang BISA diubah oleh Vendor (Unlocked: Logo, Warna Utama, Hero Image) dan mana yang TERKUNCI (Locked).
• Tiering Manager:
  - Toggle status template: `Gratis` (Bawaan Setup Fee) vs `Premium` (Sewa/biaya upgrade bulanan).

🏢 [4. MANAGEMENT VENDOR & TENANT GOVERNANCE] (`app/admin/vendors/page.tsx`)
• Tabel Daftar Biro Travel (`Pending`, `Verified`, `Suspended`).
• Modul Persetujuan Domain: Verifikasi pendaftaran travel baru, konfirmasi klaim Subdomain & verifikasi CNAME Custom Domain.
• Kustomisasi Margin/Fee Spesial: Menyetel potongan Service Fee khusus untuk travel mitra strategis.

📦 [5. MASTER KATALOG & MODERASI PAKET] (`app/admin/packages/page.tsx`)
• Index Seluruh Paket Umroh/Haji yang tayang di seluruh subdomain & portal utama.
• Moderasi & Take-Down: Tombol untuk menyembunyikan/menolak paket yang melanggar aturan atau informasi tidak terbukti.
• Labeling Banner: Menyematkan badge pilihan Admin (misal: *Paket Promo Syawal*, *Umroh Plus Turki*).

💰 [6. BILLING & FINANCIAL SETTLEMENT LEDGER] (`app/admin/finance/page.tsx`)
• Audit Setup Fee: Status pembayaran biaya pendaftaran awal travel (Rp2.500.000 / Rp5.000.000).
• Split-Fee Ledger Engine:
  - Rekapan pemotongan Service Fee otomatis per transaksi jamaah:
    * Jalur Subdomain Travel: Rp50.000 / jamaah.
    * Jalur Portal Utama: Rp150.000 / jamaah.
• Disbursement / Payout Execution:
  - Tabel antrean klaim pencairan dana travel (Total Bayar Jamaah - Service Fee UmrohQu).
  - Tombol "Approve & Execute Payout" dengan unggah bukti transfer.
• Voucher & Coupon Generator: Buat kode diskon Service Fee untuk kampanye promo.

📢 [7. BIDDING & SPONSORED LISTING MANAGER] (`app/admin/bidding/page.tsx`)
• Pengaturan Aturan Lelang: Set minimum bid price per slot iklan paket unggulan.
• Moderasi Pengajuan Bidding dari travel mitra.

🛡️ [8. VERIFIKASI LEGAL & SUPPORT CENTER] (`app/admin/support/page.tsx`)
• Antrean Verifikasi Izin Kemenag (PPIU / HKU) milik travel baru.
• Dispute Ticketing Hub: Penanganan tiket sengketa antara Jamaah dan Travel (fitur Hold Payout jika ada laporan penipuan).

🌐 [9. GLOBAL CMS & SITE SETTINGS] (`app/admin/settings/page.tsx`)
Satu pintu pengubah seluruh identitas visual situs portal utama (`site_settings`):
• Form Upload Logo: GAMBAR 1 (Logo Icon) dan GAMBAR 2 (Logotype/Teks Logo).
• General Info: Nama App ("UmrohQu"), Slogan, Favicon, Meta SEO Title/Description.
• Kontak & Footer: Nomor CS WhatsApp, Email Support, Alamat Kantor, Teks Footer.
• Emergency Maintenance Switch: Sakelar menutup situs publik dengan pesan perbaikan.
*Catatan: Setiap perubahan di sini LANGSUNG MENGUBAH tampilan frontend utama secara real-time.*

🔒 [10. SYSTEM GOVERNANCE & AUDIT LOGS] (`app/admin/audit-logs/page.tsx`)
• Tabel rekam jejak otomatis aktivitas Admin/Staf (Siapa, Melakukan Apa, Terhadap Data Apa, Jam Berapa, IP Address).

--------------------------------------------------------------------------------
4. TEKNIS IMPLEMENTASI & TUGAS EKSEKUSI KODE
--------------------------------------------------------------------------------
1. Gunakan Next.js 14 App Router (`use client` untuk komponen interaktif).
2. Tulis interface TypeScript yang ketat untuk query database Supabase.
3. Seluruh komponen chart harus responsif menggunakan `<ResponsiveContainer>` dari `recharts`.
4. Sediakan loading state (`Loader2` spinner) saat data sedang dimuat dari Supabase.
5. Pastikan semua UI menggunakan Tailwind CSS dengan palet warna Hijau Emerald (`#046A38`), Dark Emerald (`#003824`), Aksen Mint (`#D1F4E2`), dan komponen shadcn/ui (`Table`, `Dialog`, `Tabs`, `Badge`, `Button`, `DropdownMenu`, `Switch`, `Input`, `Select`).

BUATKAN SEKARANG:
1. Struktur Layout Utama: `app/admin/layout.tsx` (Sidebar Dark Emerald + Topbar Clean + Main Canvas).
2. Halaman Dashboard Utama: `app/admin/dashboard/page.tsx` (KPI Cards, Realtime Recharts, Tabulasi Data Supabase, Loading States).