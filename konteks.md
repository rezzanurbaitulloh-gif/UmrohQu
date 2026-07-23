Berikut adalah **Dokumen Konteks Pembangunan Platform UmrohQu** (*Project Context & Product Requirement Summary*) yang menggabungkan seluruh hasil diskusi kita, rancangan arsitektur teknis, model bisnis, hingga detail dari dokumen rancangan PDF.

Dokumen ini dirancang sebagai **Single Source of Truth** (Acuan Utama) untuk tim pengembang, pemangku kepentingan (*stakeholders*), maupun dokumen acuan konteks proyek.

---

# 📄 DOKUMEN KONTEKS & SPESIFIKASI PROYEK: UMROHQU

---

## 1. RINGKASAN EKSEKUTIF & LATAR BELAKANG

**UmrohQu** adalah platform *marketplace* Haji dan Umroh berbasis digital yang berfokus utama pada layanan Umroh. Platform ini menghubungkan berbagai biro perjalanan (*travel/vendor*) terverifikasi dengan calon jamaah dalam satu ekosistem terpadu, transparan, dan modern.

* **Visi Strategis:** Membangun *startup* ekosistem digital ibadah terintegrasi di Indonesia yang menghubungkan biro travel, jamaah, dan mitra pendukung. Platform ini juga disiapkan untuk mendukung program keberangkatan ibadah Umroh bagi karyawan **UBIG**.
* **Acuan Industri (Benchmark):** Mengacu pada *standard user experience* (UX), transparansi *itinerary*, dan mesin pencarian dari **Umroh.com** dan **Ihram Asia**.
* **PendApproach Teknis:** Menggunakan arsitektur *Multi-Tenant Software as a Service* (SaaS) dalam **1 repositori tunggal** untuk efisiensi pengembangan dan kemudahan pemeliharaan sistem.

---

## 2. MODEL BISNIS & STRATEGI MONETISASI

Monetisasi platform UmrohQu bertumpu pada tiga pilar utama:

| Pilar Monetisasi | Skema & Tarif Normal | Skema Promo / Tarif Berlaku | Keterangan & Aturan Bisnis |
| --- | --- | --- | --- |
| **1. Setup Fee Mitra** *(Onboarding)* | Rp5.000.000 | **Rp2.500.000** | Biaya pendaftaran awal travel untuk aktivasi sistem dan pembuatan website subdomain/custom domain. |
| **2. Service Fee Transaksi** *(Via Subdomain Travel)* | Rp100.000 / jamaah | **Rp50.000 / jamaah** | Dikenakan untuk setiap jamaah yang bertransaksi langsung di website subdomain milik travel (contoh: `travelabc.umrohqu.com`). |
| **3. Service Fee Transaksi** *(Via Portal Utama)* | Rp300.000 / jamaah | **Rp150.000 / jamaah** | Dikenakan untuk transaksi jamaah yang masuk dari portal pencarian terpusat (`umrohqu.com`). |
| **4. Bidding Promosi** *(Sponsored Listing)* | Lelang Dinamis | Lelang Dinamis | Fitur lelang penempatan posisi iklan berbayar agar paket travel tampil di urutan teratas hasil pencarian/homepage. |

---

## 3. ARSITEKTUR TEKNIS & STRATEGI PENGEMBANGAN

### A. Tech Stack Utama

* **Framework Frontend/Backend:** Next.js 14+ (App Router, Server Components, Server Actions).
* **Bahasa & Styling:** TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons.
* **Database & Infrastruktur Backend:** Supabase (PostgreSQL, Auth, Storage, Row Level Security / RLS).
* **Multi-Tenant Engine:** Next.js `middleware.ts` untuk *URL Rewriting* dinamis berbasis subdomain dan *custom domain*.

### B. Konsep Multi-Tenancy (1 Repository)

Seluruh ekosistem berjalan di dalam satu repositori Next.js:

* **Portal Utama Marketplace:** Dipetakan ke domain `umrohqu.com` (folder `app/(main)`).
* **Website Subdomain Travel:** Dipetakan ke `[tenant].umrohqu.com` (folder `app/(tenant)/[subdomain]`).
* **Unified Dashboard Hub:** Dipetakan ke `[umrohqu.com/dashboard](https://umrohqu.com/dashboard)` (folder `app/(dashboard)`).

### C. Alokasi Tim (2 Developer)

Pengerjaan dibagi berdasarkan modul fitur (*Feature-Based Split*):

* **Developer A (UI/UX, Marketplace, Tenant Engine & Social Features):** Memegang Portal Utama, Landing Page Beranda, Search Filter, Comparison Tool, Subdomain Engine, Profil Publik, dan Social Share.
* **Developer B (Infrastruktur, Middleware, Database, Billing & Internal Admin):** Memegang `middleware.ts`, Skema Supabase & RLS, Auth, Dashboard Admin (CMS), Support Desk, Payment Gateway, dan Settlement Ledger.

---

## 4. HIERARKI & MATRIKS 6 ROLE PENGGUNA

```
                                  +-----------------------+
                                  |     INTERNAL STAFF    |
                                  +-----------------------+
                                              |
                 +----------------------------+----------------------------+
                 |                            |                            |
          [ SUPER ADMIN ]              [ SUPPORT TEAM ]             [ BILLING / FINANCE ]
          - Global CMS Controller      - Travel Legal Verifier      - Setup Fee Ledger
          - Master Data Manager        - Impersonation Support      - Service Fee Split Engine
          - Global Monetization Config - Dispute & Ticket Handling  - Payout / Disbursement
                 |                            |                            |
                 +----------------------------+----------------------------+
                                              |
                                  +-----------------------+
                                  |    EXTERNAL USERS     |
                                  +-----------------------+
                                              |
                 +----------------------------+----------------------------+
                 |                            |                            |
          [ TRAVEL VENDOR ]               [ JAMAAH ]                   [ GUEST ]
          - Kelola Branding & Domain   - Multi-Jamaah Checkout      - Akses Katalog & Search
          - Kelola Paket & Itinerary   - Payment & Order Tracking   - Lihat Sistem & Edukasi
          - Pasang Bidding Iklan       - Kelola Berkas Paspor/KTP   - Bandingkan Paket
          - Kelola Manifes Jamaah      - Follow & Share Profile     - Akses Profil Publik

```

### Detail Wewenang Utama Per Role:

1. **Guest (Unauthenticated):** Mengakses Beranda Publik, pencarian paket, komparasi paket, profil publik travel/jamaah, serta membagikan konten. Menekan tombol transaksi/follow memicu *Auth Modal*.
2. **Jamaah (Authenticated):** Pendaftaran multi-jamaah, pembayaran online (VA, QRIS, CC), manajemen berkas (Paspor/KTP), *tracking* keberangkatan, serta fitur sosial (*Follow/Unfollow* dan profil publik).
3. **Travel / Vendor (Mitra):** Kustomisasi website subdomain/custom domain, CRUD paket & *itinerary*, manajemen pesanan jamaah & manifes, pengajuan *payout*, dan partisipasi *bidding* promo.
4. **Support Staff (Internal):** Verifikasi berkas Izin Umroh Kemenag (PPIU/HKU) mitra baru, fitur *Impersonation* ("Login As Travel"), penanganan tiket sengketa, dan penahanan status *payout*.
5. **Billing / Finance (Internal):** Audit pembayaran *Setup Fee*, rekapan pemotongan *Service Fee* otomatis, eksekusi pencairan dana (*payout*) ke rekening travel, serta penerbitan voucher promo.
6. **Super Admin (Global CMS & Control):**
* **Global CMS Engine:** Mengubah Nama Platform, Logo Utama, Favicon, Banner, Informasi Kontak Footer, dan Mode Perawatan (*Maintenance Mode*). **Satu kali ubah langsung berdampak ke seluruh situs.**
* **Master Data Manager:** Kelola data resmi Maskapai, Hotel Makkah/Madinah, dan Kota Keberangkatan.
* **Monetization & Governance:** Mengatur variabel *Service Fee*, *Setup Fee*, aturan *Bidding*, serta *suspend/activate* akun travel.



---

## 5. FITUR UTAMA & ALUR SISTEM

### A. Halaman Beranda Publik (Sebelum Login)

* **Header Dinamis:** Memuat Logo Utama, Teks Logo, Navigasi (*Beranda, Cari Paket, Tentang Aplikasi, Cara Kerja, Kemitraan*), serta Tombol *Login/Daftar*.
* **Hero Section & Smart Search:** Pencarian cepat berdasarkan Tanggal Keberangkatan, Kota Embarkasi, Bintang Hotel, dan Kisaran Harga.
* **Sektor Edukasi & Pengertian Aplikasi:** Menjelaskan visi UmrohQu sebagai ekosistem transparan.
* **Sektor "Cara Kerja Sistem":** Visualisasi alur bagi Jamaah (Cari $\rightarrow$ Bayar $\rightarrow$ Upload $\rightarrow$ Berangkat) dan alur bagi Mitra Travel (Daftar $\rightarrow$ Subdomain Instan $\rightarrow$ Kelola Paket $\rightarrow$ Hemat Fee).
* **Footer Dinamis:** Diintegrasikan langsung dengan *database* `site_settings` Admin.

### B. Engine Pencarian & Komparasi Paket

* **Multi-Filter Engine:** Penyaringan paket secara presisi.
* **Side-by-Side Comparison:** Membandingkan hingga 3 paket umroh secara berdampingan dalam satu layar (fasilitas, bintang hotel, jarak ke masjid, maskapai, dan harga).
* **Algoritma Ranking Paket:** Dipengaruhi oleh Nilai *Bidding Promosi* (Sponsored) $\rightarrow$ Promo Aktif $\rightarrow$ Rating/Ulasan $\rightarrow$ Volume Transaksi.

### C. Social Engagement & Virality

* **Follow System:** Jamaah dapat mengikuti (*follow*) biro travel favorit atau sesama jamaah untuk mendapatkan notifikasi paket baru.
* **Public Profile Pages:** Profil publik Vendor/Travel dan Profil Publik Member/Jamaah (dilengkapi tombol opsi privasi *Hide Profile*).
* **Dynamic Content Sharing:** Tombol *Share* ke WhatsApp, QR Code Generator, dan integrasi *Dynamic OpenGraph Meta Tags* untuk pratinjau tautan (*link preview*) yang elegan di media sosial.

---

## 6. PANDUAN VISUAL & DESIGN SYSTEM

* **Estetika & Filosofi:** *Award-winning Dribbble/Behance style* — ultra-modern, *fluid*, tidak kaku (*non-boxy*), bersih, dan terpercaya dengan sentuhan spiritual modern.
* **Palet Warna Utama:**
* **Aksen Utama:** Hijau Muda Fresh / *Mint Emerald* (`#10B981` / `#34D399`).
* **Warna Netral:** Hitam Obsidian (*Deep Obsidian Black* `#0F172A` / `#18181B`), Putih Bersih (*Crisp White* `#FFFFFF`), dan Abu-abu Slate (`#F1F5F9` / `#64748B`).


* **Efek Atmosfer (Atmospheric Background):** Latar belakang gelap kaya nuansa dengan efek *glowing starry night* (pola konstelasi bintang halus dengan pendar *ambient aura* hijau muda).
* **Bentuk & Komponen:** *Glassmorphic frosted glass*, sudut melengkung halus (*border-radius* 20px–24px), bayangan lembut (*ambient drop shadow*), dan *whitespace* yang lega.
* **Integrasi Dual-Logo:** Penggunaan terpisah antara **Ikon Utama** (Gambar 1) dan **Teks Nama Logo** (Gambar 2) yang tersusun rapi secara horizontal pada *desktop bar* dan adaptif pada tampilan *mobile*.
* **Responsivitas Multi-Rasio:** Dirancang adaptif penuh mulai dari *Mobile Portrait* (19.5:9), *Tablet* (4:3), *Desktop* (16:9), hingga *Ultrawide* (21:9 dengan pembatas *max-width* terpusat).