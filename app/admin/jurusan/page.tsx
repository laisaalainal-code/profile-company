
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
 
type ManagedJurusan = {
    id: number
    name: string
    description: string
    createdAt: string
}
 
const PAGE_SIZE = 10
 
export default function JurusanManagementPage() {
    const router = useRouter()
    const [jurusans, setJurusans] = useState<ManagedJurusan[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalJurusans, setTotalJurusans] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
 
    async function loadJurusans(page = currentPage) {
        setIsLoading(true)
        setError("")
        try {
            const response = await fetch(`/api/jurusan?page=${page}&pageSize=${PAGE_SIZE}`)
            const result = await response.json()
            if (!response.ok) throw new Error(result.error ?? "Gagal memuat jurusan.")
            setJurusans(result.jurusan)
            setTotalJurusans(result.pagination.totalJurusan)
            setCurrentPage(result.pagination.page)
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Gagal memuat jurusan.")
        } finally {
            setIsLoading(false)
        }
    }
 
    useEffect(() => {
        void loadJurusans(1)
    }, [])
 
    function goToPage(page: number) {
        setCurrentPage(page)
        void loadJurusans(page)
    }
 
    async function deleteJurusan(jurusan: ManagedJurusan) {
        if (!window.confirm(`Hapus jurusan ${jurusan.name}?`)) return
        setError("")
        try {
            const response = await fetch(`/api/jurusan/${jurusan.id}`, { method: "DELETE" })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error ?? "Gagal menghapus jurusan.")
            if (jurusans.length === 1 && currentPage > 1) {
                goToPage(currentPage - 1)
            } else {
                await loadJurusans(currentPage)
            }
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "Gagal menghapus jurusan.")
        }
    }
 
    const totalPages = Math.max(1, Math.ceil(totalJurusans / PAGE_SIZE))
 
    return (
        <Card className="m-6 px-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="mb-1 text-2xl font-bold">Jurusan</h1>
                    <p className="text-sm text-muted-foreground">Kelola data jurusan.</p>
                </div>
                <Button onClick={() => router.push("/admin/jurusan/form/add")}>
                    <Plus aria-hidden="true" />
                    Tambah jurusan
                </Button>
            </div>
 
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
 
            <div className="mt-5 overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama jurusan</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Dibuat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={5} className="text-center">Memuat jurusan...</TableCell></TableRow>
                        ) : jurusans.length === 0 ? (
                            <TableRow><TableCell colSpan={5} className="text-center">Belum ada jurusan.</TableCell></TableRow>
                        ) : jurusans.map((jurusan) => (
                            <TableRow key={jurusan.id}>
                                <TableCell>{jurusan.id}</TableCell>
                                <TableCell className="font-medium">{jurusan.name}</TableCell>
                                <TableCell>{jurusan.description}</TableCell>
                                <TableCell>{new Date(jurusan.createdAt).toLocaleDateString("id-ID")}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Edit ${jurusan.name}`}
                                            title="Edit jurusan"
                                            onClick={() => router.push(`/admin/jurusan/form/${jurusan.id}`)}
                                        >
                                            <Pencil aria-hidden="true" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Hapus ${jurusan.name}`}
                                            title="Hapus jurusan"
                                            onClick={() => void deleteJurusan(jurusan)}
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
 
//pagination
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
