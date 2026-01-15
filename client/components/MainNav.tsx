'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Home,
  StickyNote,
  Link as LinkIcon,
  LogOut,
  Vault
} from 'lucide-react'

export default function MainNav() {
  const router = useRouter()
  const isLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem('token')

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex items-center gap-6
          rounded-full
          bg-slate-900/70
          border border-white/10
          px-6 py-3
          backdrop-blur-xl
          shadow-xl
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Vault className="text-indigo-400" />
          <span className="text-slate-100 font-semibold">Vaultify</span>
        </Link>

        <div className="h-6 w-px bg-white/10" />

        {/* Nav Items */}
        <Link href="/" className="nav-icon">
          <Home />
        </Link>

        <Link href="/notes" className="nav-icon">
          <StickyNote />
        </Link>

        <Link href="/links" className="nav-icon">
          <LinkIcon />
        </Link>

        <div className="h-6 w-px bg-white/10" />

        {/* Auth */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem('token')
              router.push('/login')
            }}
            className="nav-icon text-red-400 hover:text-red-300"
          >
            <LogOut />
          </button>
        ) : (
          <Link href="/login" className="nav-icon text-indigo-400">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
