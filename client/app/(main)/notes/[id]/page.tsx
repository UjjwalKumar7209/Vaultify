'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function NoteDetail() {
  const { id } = useParams()
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [note, setNote] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/notes/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      .then(res => setNote(res.data.data))
  }, [id])

  if (!note) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-slate-400">
        Loading…
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 pt-28">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <article className="max-w-3xl mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6 shadow-xl">
        <span className="text-xs text-indigo-400">{note.subject}</span>
        <h1 className="text-3xl font-bold text-slate-100 mt-2">
          {note.title}
        </h1>
        <p className="mt-6 text-slate-300 leading-relaxed whitespace-pre-line">
          {note.content}
        </p>
      </article>
    </main>
  )
}
