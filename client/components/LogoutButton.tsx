'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="
        flex items-center gap-2
        rounded-xl
        px-4 py-2
        text-sm font-medium
        transition
        hover:scale-[1.03]
        active:scale-95
      "
    >
      <LogOut size={16} />
      Logout
    </Button>
  )
}
