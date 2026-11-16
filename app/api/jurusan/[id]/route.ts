
import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const jurusanFields = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} as const

type RouteContext = { params: Promise<{ id: string }> }

function isDuplicateJurusan(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002"
}

function isMissingJurusan(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025"
}

async function getJurusanId(context: RouteContext) {
  const { id } = await context.params
  const jurusanId = Number(id)
  return Number.isInteger(jurusanId) && jurusanId > 0 ? jurusanId : null
}

export async function GET(_request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })
  }

  const jurusanId = await getJurusanId(context)
  if (!jurusanId) return NextResponse.json({ error: "ID Jurusan tidak valid." }, { status: 400 })

  try {
    const jurusan = await prisma.jurusan.findUnique({
      where: { id: jurusanId },
      select: jurusanFields,
    })

    if (!jurusan) {
      return NextResponse.json({ error: "Jurusan tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ jurusan })
  } catch (error) {
    console.error("Failed to fetch Jurusan:", error)
    return NextResponse.json({ error: "Gagal memuat data jurusan." }, { status: 500 })
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })
  }

  const jurusanId = await getJurusanId(context)
  if (!jurusanId) return NextResponse.json({ error: "ID Jurusan tidak valid." }, { status: 400 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Format request tidak valid." }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const description = typeof body.description === "string" ? body.description.trim() : ""

  if (!name || name.length > 191) {
    return NextResponse.json({ error: "Nama Jurusan tidak valid." }, { status: 400 })
  }

  if (!description) {
    return NextResponse.json({ error: "Deskripsi Jurusan wajib diisi." }, { status: 400 })
  }

  try {
    const jurusan = await prisma.jurusan.update({
      where: { id: jurusanId },
      data: { name, description },
      select: jurusanFields,
    })

    return NextResponse.json({ jurusan })
  } catch (error) {   
    if (isMissingJurusan(error)) {
      return NextResponse.json({ error: "Jurusan tidak ditemukan." }, { status: 404 })
      
    } if (isDuplicateJurusan(error)) {
      return NextResponse.json({ error: "Nama Jurusan sudah digunakan." }, { status: 409 })
    }
    console.error("Failed to update Jurusan:", error)
    return NextResponse.json({ error: "Gagal memperbarui Jurusan. Periksa koneksi database." }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!await getAuthenticatedUser()) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })
  }

  const jurusanId = await getJurusanId(context)
  if (!jurusanId) return NextResponse.json({ error: "ID Jurusan tidak valid." }, { status: 400 })

  try {
    await prisma.jurusan.delete({ where: { id: jurusanId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (isMissingJurusan(error)) {
      return NextResponse.json({ error: "Jurusan tidak ditemukan." }, { status: 404 })
    }
    console.error("Failed to delete Jurusan:", error)
    return NextResponse.json({ error: "Gagal menghapus Jurusan." }, { status: 500 })
  }
}
