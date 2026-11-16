
'use client'
 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
 
type ManagedCategory = {
    id: number
    name: string
    createdAt: string
}
 
const PAGE_SIZE = 10
 
export default function CategoryManagementPage() {
    const router = useRouter()
    const [categories, setCategories] = useState<ManagedCategory[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCategories, setTotalCategories] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
 
    async function loadCategories(page = currentPage) {
        setIsLoading(true)
        setError("")
        try {
            const response = await fetch(`/api/categories?page=${page}&pageSize=${PAGE_SIZE}`)
            const result = await response.json()
            if (!response.ok) throw new Error(result.error ?? "Gagal memuat kategori.")
            setCategories(result.categories)
            setTotalCategories(result.pagination.totalCategories)
            setCurrentPage(result.pagination.page)
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Gagal memuat kategori.")
        } finally {
            setIsLoading(false)
        }
    }
 
    useEffect(() => {
        void loadCategories(1)
    }, [])
 
    function goToPage(page: number) {
        setCurrentPage(page)
        void loadCategories(page)
    }
 
    async function deleteCategory(category: ManagedCategory) {
        if (!window.confirm(`Hapus kategori ${category.name}?`)) return
        setError("")
        try {
            const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error ?? "Gagal menghapus kategori.")
            if (categories.length === 1 && currentPage > 1) {
                goToPage(currentPage - 1)
            } else {
                await loadCategories(currentPage)
            }
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "Gagal menghapus kategori.")
        }
    }
 
    const totalPages = Math.max(1, Math.ceil(totalCategories / PAGE_SIZE))
 
    return (
        <Card className="m-6 px-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="mb-1 text-2xl font-bold">Category</h1>
                    <p className="text-sm text-muted-foreground">Kelola kategori.</p>
                </div>
                <Button onClick={() => router.push("/admin/category/form/add")}>
                    <Plus aria-hidden="true" />
                    Tambah kategori
                </Button>
            </div>
 
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
 
            <div className="mt-5 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama kategori</TableHead>
                            <TableHead>Dibuat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center">Memuat kategori...</TableCell></TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center">Belum ada kategori.</TableCell></TableRow>
                        ) : categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{new Date(category.createdAt).toLocaleDateString("id-ID")}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Edit ${category.name}`}
                                            title="Edit kategori"
                                            onClick={() => router.push(`/admin/category/form/${category.id}`)}
                                        >
                                            <Pencil aria-hidden="true" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Hapus ${category.name}`}
                                            title="Hapus kategori"
                                            onClick={() => void deleteCategory(category)}
                                        >
                                            <Trash2 aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
 
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                aria-disabled={currentPage === 1 || isLoading}
                                className={currentPage === 1 || isLoading ? "pointer-events-none opacity-50" : undefined}
                                onClick={(event) => {
                                    event.preventDefault()
                                    if (currentPage > 1 && !isLoading) goToPage(currentPage - 1)
                                }}
                            />
                        </PaginationItem>
                        {getPageItems(currentPage, totalPages).map((item, index) => (
                            <PaginationItem key={`${item}-${index}`}>
                                {item === "ellipsis" ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href="#"
                                        isActive={item === currentPage}
                                        aria-label={`Go to page ${item}`}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (!isLoading && item !== currentPage) goToPage(item)
                                        }}
                                    >
                                        {item}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                aria-disabled={currentPage === totalPages || isLoading}
                                className={currentPage === totalPages || isLoading ? "pointer-events-none opacity-50" : undefined}
                                onClick={(event) => {
                                    event.preventDefault()
                                    if (currentPage < totalPages && !isLoading) goToPage(currentPage + 1)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </Card>
    )
}
 
function getPageItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
    if (totalPages <= 4) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }
    if (currentPage <= 2) return [1, 2, 3, "ellipsis"]
    if (currentPage >= totalPages - 1) {
        return ["ellipsis", totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis"]
}
