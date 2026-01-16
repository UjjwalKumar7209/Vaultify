'use client'

import ContentCard from '@/components/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

interface LinkData {
  id: string
  title: string
  category: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await axios.get(
          '/api/v1/link/bulk',
          { headers: { Authorization: token } }
        )

        setLinks(res.data.data)
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-28 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Links</h1>
          <p className="text-slate-400 text-sm">
            Your saved resources and references
          </p>
        </div>

        <Link
          href="/links/new"
          className="
            flex items-center gap-2
            rounded-xl
            bg-emerald-600
            px-4 py-2
            text-sm font-medium text-white
            hover:bg-emerald-700
            transition
            shadow-lg
          "
        >
          <Plus size={18} />
          Add Link
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && links.length === 0 && (
        <div className="mt-32 text-center text-slate-400">
          No links yet. Save something useful 🔗
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {links.map(link => (
          <ContentCard
            key={link.id}
            title={link.title}
            content={link.category}
            href={`/links/${link.id}`}
          />
        ))}
      </div>
    </main>
  )
}
