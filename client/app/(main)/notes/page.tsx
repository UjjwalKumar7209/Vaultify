'use client'

import ContentCard from '@/components/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

interface NotesData {
  id: string
  title: string
  content: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NotesData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await axios.get(
          '/api/v1/notes/bulk',
          { headers: { Authorization: token } }
        )

        setNotes(res.data.data)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-28 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Notes</h1>
          <p className="text-slate-400 text-sm">
            Your saved thoughts and ideas
          </p>
        </div>

        <Link
          href="/notes/new"
          className="
            flex items-center gap-2
            rounded-xl
            bg-indigo-600
            px-4 py-2
            text-sm font-medium text-white
            hover:bg-indigo-700 transition
          "
        >
          <Plus size={18} />
          Add Note
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && notes.length === 0 && (
        <div className="mt-32 text-center text-slate-400">
          No notes yet. Start writing ✨
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <ContentCard
            key={note.id}
            title={note.title}
            content={note.content}
            href={`/notes/${note.id}`}
          />
        ))}
      </div>
    </main>
  )
}
