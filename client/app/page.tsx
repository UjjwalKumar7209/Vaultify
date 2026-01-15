'use client'

import LandingNavbar from '@/components/LandingNavbar'
import { useRouter } from 'next/navigation'
import { StickyNote, Link2, Sparkles } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  const go = (path: string) => {
    const token = localStorage.getItem('token')
    router.push(token ? path : '/login')
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <LandingNavbar />

      {/* HERO */}
      <section className="pt-32 pb-24 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Store your <span className="text-blue-500">knowledge</span>,<br />
          not your clutter.
        </h1>
        <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
          Vaultify helps you organize notes and links in one secure, beautiful place.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <ActionButton onClick={() => go('/notes')}>
            <StickyNote size={18} />
            See Notes
          </ActionButton>

          <ActionButton variant="secondary" onClick={() => go('/links')}>
            <Link2 size={18} />
            See Links
          </ActionButton>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-white/10 py-6">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-slate-400 text-lg">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <Sparkles className="text-blue-500" size={16} />
              Notes • Links • Productivity • Vaultify
            </span>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Smart Notes"
          desc="Write, edit and revisit your thoughts with zero distraction."
        />
        <FeatureCard
          title="Useful Links"
          desc="Save important resources and never lose them again."
        />
        <FeatureCard
          title="Secure Vault"
          desc="Your data is private, protected and always available."
        />
      </section>
    </main>
  )
}

function ActionButton({
  children,
  onClick,
  variant = 'primary'
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}) {
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-white/10 hover:bg-white/20'

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${styles}`}
    >
      {children}
    </button>
  )
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{desc}</p>

      {/* loader shimmer */}
      <div className="mt-4 h-1 w-full bg-linear-to-r from-transparent via-blue-500/40 to-transparent animate-pulse" />
    </div>
  )
}
