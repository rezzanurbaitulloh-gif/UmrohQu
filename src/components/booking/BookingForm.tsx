'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, User, Users, CreditCard, Shield, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const steps = [
  { id: 1, label: 'Data Pemesan', icon: User },
  { id: 2, label: 'Data Jamaah', icon: Users },
  { id: 3, label: 'Pembayaran', icon: CreditCard },
]

const samplePackage = {
  nama: 'Umroh Syawal Premium 9 Hari',
  harga: 32500000,
  keberangkatan: '12 April 2024',
  maskapai: 'Saudi Arabian Airlines',
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left - Form */}
      <div className="flex-1">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.id
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step.id ? 'text-primary font-medium' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Data Pemesan */}
        {currentStep === 1 && (
          <Card className="glass-card p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Data Pemesan</h2>
              <p className="text-sm text-slate-500">Masukkan data diri Anda sebagai pemesan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nama Lengkap (Sesuai KTP)</label>
                <Input placeholder="Contoh: Ahmad Subagja" className="bg-white border-slate-200 text-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nomor WhatsApp</label>
                <Input placeholder="+62 812 XXXX XXXX" className="bg-white border-slate-200 text-slate-800" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <Input type="email" placeholder="nama@email.com" className="bg-white border-slate-200 text-slate-800" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setCurrentStep(2)} className="bg-primary hover:bg-primary-dark text-white">
                Lanjut ke Data Jamaah
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Data Jamaah */}
        {currentStep === 2 && (
          <Card className="glass-card p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Data Jamaah</h2>
              <p className="text-sm text-slate-500">Masukkan data jamaah yang akan berangkat</p>
            </div>

            {/* Jamaah 1 */}
            <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="text-sm font-medium text-slate-800">Jamaah 1 (Utama)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nomor Paspor</label>
                  <Input placeholder="Contoh: A1234567" className="bg-white border-slate-200 text-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Masa Berlaku Paspor</label>
                  <Input type="date" className="bg-white border-slate-200 text-slate-800" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Nama di Paspor</label>
                  <Input placeholder="Minimal 2 kata" className="bg-white border-slate-200 text-slate-800" />
                </div>
              </div>
            </div>

            {/* Tambah Jamaah */}
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Tambah Jamaah Lainnya
            </button>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-slate-200 text-slate-600 hover:bg-slate-50">
                Kembali
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="bg-primary hover:bg-primary-dark text-white">
                Lanjut ke Pembayaran
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Pembayaran */}
        {currentStep === 3 && (
          <Card className="glass-card p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Pembayaran</h2>
              <p className="text-sm text-slate-500">Pilih metode pembayaran Anda</p>
            </div>

            {/* Opsi Pembayaran */}
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-2 border-primary cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">DP (Booking Seat)</p>
                  <p className="text-xs text-slate-500">Bayar Rp 5.000.000 untuk amankan kursi</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="payment" className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Pelunasan Langsung</p>
                  <p className="text-xs text-slate-500">Bayar penuh untuk harga yang lebih murah</p>
                </div>
              </label>
            </div>

            {/* Pilih Bank */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-700">Metode Pembayaran</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['BCA', 'Mandiri', 'BNI', 'Lainnya'].map((bank) => (
                  <button
                    key={bank}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="border-slate-200 text-slate-600 hover:bg-slate-50">
                Kembali
              </Button>
              <Button className="bg-primary hover:bg-primary-dark text-white px-8">
                Konfirmasi & Bayar
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Right Sidebar - Summary */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <Card className="glass-card p-6 sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Ringkasan Pesanan</h3>
          <div className="text-base font-semibold text-slate-900 mb-4">{samplePackage.nama}</div>

          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Keberangkatan</span>
              <span className="text-slate-700">{samplePackage.keberangkatan}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Maskapai</span>
              <span className="text-slate-700">{samplePackage.maskapai}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between text-slate-500">
              <span>Jamaah 1 (Quad Room)</span>
              <span>Rp {samplePackage.harga.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Biaya Admin & Asuransi</span>
              <span>Rp 150.000</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>PPN 11%</span>
              <span>Rp 359.150</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 mb-4" />

          <div className="flex justify-between text-slate-900 font-semibold mb-6">
            <span>Total Pembayaran</span>
            <span className="text-primary">Rp {samplePackage.harga.toLocaleString('id-ID')}</span>
          </div>

          {/* Security badges */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-xs text-slate-500">
              Pembayaran aman & terjamin. Provider terdaftar resmi di Kementrian Agama RI.
            </p>
          </div>

          {/* Consultan */}
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 mb-2">Punya pertanyaan?</p>
            <Link href="#" className="flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              Chat CS Konsultasi
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
