'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@radix-ui/themes"
import Link from "next/link"

export default function FormTambahCategory() {
  return (
    <Card className="m-6 p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tambah Kategori</h1>
        <p className="text-gray-500 text-sm">Masukkan data kategori baru di bawah ini.</p>
      </div>

      <form className="space-y-5">
        {/* Input Nama Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Kategori</label>
          <Input type="text" placeholder="Contoh: Berita Sekolah, Pengumuman, dll..." />
        </div>

        {/* Input Deskripsi (Menggunakan textarea standar dengan style ala shadcn) */}
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Kategori</label>
          <textarea 
            rows={4}
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
            placeholder="Tuliskan penjelasan singkat mengenai kategori ini..."
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-4">
          {/* Tombol Batal akan mengarahkan kembali ke halaman tabel Kategori */}
          <Link href="/admin/category">
            <Button variant="outline" type="button" className="w-full">
              Batal
            </Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            Simpan Kategori
          </Button>
        </div>
      </form>
    </Card>
  );
}