
import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const categoryFields = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} as const

function isDuplicateCategory(error: unknown) {
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
    const totalCategories = await prisma.category.count()
    const totalPages = Math.max(1, Math.ceil(totalCategories / pageSize))
    const page = Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1

    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: categoryFields,
    })

    return NextResponse.json({
      categories,
      pagination: { page, pageSize, totalCategories, totalPages },
    })
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return NextResponse.json({ error: "Gagal memuat data category." }, { status: 500 })
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

  if (!name || name.length > 191) {
    return NextResponse.json({ error: "Nama category tidak valid." }, { status: 400 })
  }

  try {
    const category = await prisma.category.create({
      data: { name },
      select: categoryFields,
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    if (isDuplicateCategory(error)) {
      return NextResponse.json({ error: "Nama Category sudah digunakan." }, { status: 409 })
    }

    console.error("Failed to create category:", error)
    return NextResponse.json({ error: "Gagal membuat category. Periksa koneksi database." }, { status: 500 })
  }
}
