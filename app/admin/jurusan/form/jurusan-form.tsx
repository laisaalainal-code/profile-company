
'use client'

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type JurusanFormJurusan = {
  id: number
  name: string
  description: string
}

type JurusanFormProps = {
  jurusanId?: string
}

export function JurusanForm({ jurusanId }: JurusanFormProps) {
  const router = useRouter()

  const [jurusan, setJurusan] = useState<JurusanFormJurusan | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(jurusanId))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (!jurusanId) return

    let isActive = true

    async function loadJurusan() {
      try {
        const response = await fetch(`/api/jurusan/${jurusanId}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error ?? "Gagal memuat jurusan.")
        }

        if (isActive) {
          setJurusan(result.jurusan)
          setName(result.jurusan.name)
          setDescription(result.jurusan.description)
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Gagal memuat jurusan."
          )
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadJurusan()

    return () => {
      isActive = false
    }
  }, [jurusanId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      const response = await fetch(
        jurusanId ? `/api/jurusan/${jurusanId}` : "/api/jurusan",
        {
          method: jurusanId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            description: description.trim(),
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error ?? "Gagal menyimpan jurusan.")
      }

      router.push("/admin/jurusan")
      router.refresh()
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Gagal menyimpan jurusan."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="m-6 px-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">
          {jurusanId ? "Edit Jurusan" : "Tambah Jurusan"}
        </h1>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/jurusan")}
        >
          <ArrowLeft aria-hidden="true" />
          Kembali
        </Button>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="mt-5 text-sm text-muted-foreground">
          Memuat jurusan...
        </p>
      ) : jurusanId && !jurusan ? (
        <p className="mt-5 text-sm text-destructive">
          Jurusan tidak ditemukan atau gagal dimuat.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4 rounded-md border p-4 sm:grid-cols-2"
        >
          <div className="grid gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
              Nama Jurusan
            </label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Masukkan nama jurusan"
              required
              maxLength={191}
            />
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Deskripsi Jurusan
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Masukkan deskripsi jurusan"
              required
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/jurusan")}
              disabled={isSaving}
            >
              <X aria-hidden="true" />
              Batal
            </Button>

            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? "Menyimpan..."
                : jurusan
                  ? "Simpan perubahan"
                  : "Buat Jurusan"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}
