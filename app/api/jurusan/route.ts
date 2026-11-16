
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

function isDuplicateJurusan(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002"
}

export async function GET(request: Request) {
  if (!await getAuthenticatedUser()) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })
  }

  const searchParams = new URL(request.url).searchParams
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const requestedPageSize = Number.parseInt(searchParams.get("pageSize") ?? "10", 10)
  const pageSize = Number.isFinite(requestedPageSize)
    ? Math.min(100, Math.max(1, requestedPageSize))
    : 10

  try {
    const totalJurusan = await prisma.jurusan.count()
    const totalPages = Math.max(1, Math.ceil(totalJurusan / pageSize))
    const page = Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1

    const jurusan = await prisma.jurusan.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: jurusanFields,
    })

    return NextResponse.json({
      jurusan,
      pagination: { page, pageSize, totalJurusan, totalPages },
    })
  } catch (error) {
    console.error("Failed to fetch jurusan:", error)
    return NextResponse.json({ error: "Gagal memuat data jurusan." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!await getAuthenticatedUser()) {
    return NextResponse.json({ error: "Silakan login untuk melanjutkan." }, { status: 401 })
  }

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
    const jurusan = await prisma.jurusan.create({
      data: { name, description },
      select: jurusanFields,
    })

    return NextResponse.json({ jurusan }, { status: 201 })
  } catch (error) {
    if (isDuplicateJurusan(error)) {
      return NextResponse.json({ error: "Nama Jurusan sudah digunakan." }, { status: 409 })
    }

    console.error("Failed to create Jurusan:", error)
    return NextResponse.json({ error: "Gagal membuat Jurusan. Periksa koneksi database." }, { status: 500 })
  }
}