'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@radix-ui/themes"
import Link from "next/link"

export default function FormTambahArtikel() {
  return (
    <Card className="m-6 p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tulis Artikel Baru</h1>
        <p className="text-gray-500 text-sm">Publikasikan berita, pengumuman, atau artikel sekolah di sini.</p>
      </div>

      <form className="space-y-5">
        {/* Input Judul Artikel */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul Artikel</label>
          <Input type="text" placeholder="Masukkan judul artikel..." />
        </div>

        {/* Grid untuk Kategori dan Upload Gambar supaya bersebelahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Pilih Kategori --</option>
              <option value="berita">Berita Sekolah</option>
              <option value="prestasi">Prestasi Siswa</option>
              <option value="pengumuman">Pengumuman</option>
              <option value="kegiatan">Kegiatan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gambar Thumbnail</label>
            <Input 
              type="file" 
              accept="image/*"
              className="cursor-pointer file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-blue-100" 
            />
          </div>
        </div>

        {/* Input Isi Artikel */}
        <div>
          <label className="block text-sm font-medium mb-1">Isi Artikel</label>
          <textarea 
            rows={10}
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
            placeholder="Ketik isi artikel di sini..."
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-4 justify-end">
          {/* Tombol Batal akan mengarahkan kembali ke halaman tabel Artikel */}
          <Link href="/admin/artikel">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Batal
            </Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            Publikasikan Artikel
          </Button>
        </div>
      </form>
    </Card>
  );
}