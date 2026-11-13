'use client'
 
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
 
export function LogoutMenuItem() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [hasError, setHasError] = useState(false)
 
  async function logout() {
    setIsLoggingOut(true)
    setHasError(false)
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (!response.ok) throw new Error("Logout failed")
      router.replace("/")
      router.refresh()
    } catch {
      setIsLoggingOut(false)
      setHasError(true)
    }
  }
 
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isLoggingOut}
      onSelect={(event) => {
        event.preventDefault()
        void logout()
      }}
    >
      <LogOut aria-hidden="true" />
      {isLoggingOut ? "Keluar..." : hasError ? "Gagal keluar, coba lagi" : "Log out"}
    </DropdownMenuItem>
  )
}
