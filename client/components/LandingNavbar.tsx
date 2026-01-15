'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LogIn,
  LogOut,
  StickyNote,
  Link2,
  Vault,
  Menu,
  X,
} from 'lucide-react'

export default function LandingNavbar() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [open, setOpen] = useState(false)

  // ✅ Read localStorage ONLY after mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    router.push('/login')
    setOpen(false)
  }

  const goTo = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  // ⛔ Prevent hydration mismatch
  if (loggedIn === null) return null

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="
            mt-4
            flex items-center justify-between
            rounded-2xl
            bg-slate-900/80
            backdrop-blur-xl
            border border-white/10
            px-4 sm:px-6 py-4
            shadow-2xl
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-slate-100">
            <Vault className="text-indigo-400" />
            <span className="font-semibold tracking-wide">Vaultify</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => goTo(loggedIn ? '/notes' : '/login')}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <StickyNote size={18} />
              Notes
            </button>

            <button
              onClick={() => goTo(loggedIn ? '/links' : '/login')}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <Link2 size={18} />
              Links
            </button>

            {!loggedIn ? (
              <button
                onClick={() => goTo('/login')}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                <LogIn size={16} />
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-200 hover:text-white transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="
              mt-3
              rounded-2xl
              bg-slate-900/90
              backdrop-blur-xl
              border border-white/10
              shadow-2xl
              p-4
              md:hidden
              space-y-3
            "
          >
            <button
              onClick={() => goTo(loggedIn ? '/notes' : '/login')}
              className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
            >
              <StickyNote size={18} />
              Notes
            </button>

            <button
              onClick={() => goTo(loggedIn ? '/links' : '/login')}
              className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
            >
              <Link2 size={18} />
              Links
            </button>

            {!loggedIn ? (
              <button
                onClick={() => goTo('/login')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                <LogIn size={16} />
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
