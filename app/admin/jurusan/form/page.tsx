'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@radix-ui/themes"
import Link from "next/link"

export default function FormTambahJurusan() {
  return (
    <Card className="m-6 p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tambah Jurusan</h1>
        <p className="text-gray-500 text-sm">Tambahkan program keahlian atau jurusan baru di SMK MVP ARS INTERNASIONAL.</p>
      </div>

      <form className="space-y-5">
        {/* Grid supaya Nama Jurusan dan Singkatan bersebelahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Jurusan</label>
            <Input type="text" placeholder="Contoh: Rekayasa Perangkat Lunak" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Singkatan / Kode</label>
            <Input type="text" placeholder="Contoh: RPL" />
          </div>
        </div>

        {/* Input Kepala Jurusan */}
        <div>
          <label className="block text-sm font-medium mb-1">Kepala Jurusan (Opsional)</label>
          <Input type="text" placeholder="Masukkan nama kepala jurusan..." />
        </div>

        {/* Input Deskripsi Jurusan */}
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Jurusan</label>
          <textarea 
            rows={4}
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
            placeholder="Tuliskan penjelasan mengenai kompetensi keahlian jurusan ini..."
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-4">
          {/* Tombol Batal akan mengarahkan kembali ke halaman tabel Jurusan */}
          <Link href="/admin/jurusan">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Batal
            </Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            Simpan Jurusan
          </Button>
        </div>
      </form>
    </Card>
  );
}