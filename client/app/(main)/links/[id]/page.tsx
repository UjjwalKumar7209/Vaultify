'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LinkDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [link, setLink] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/link/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      .then(res => setLink(res.data.data))
  }, [id])

  if (!link) {
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

      <section className="max-w-3xl mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6 shadow-xl">
        <span className="text-xs text-emerald-400 uppercase">
          {link.category}
        </span>

        <h1 className="text-3xl font-bold text-slate-100 mt-2">
          {link.title}
        </h1>

        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            mt-6
            text-emerald-400
            hover:text-emerald-300
            transition
          "
        >
          Visit link <ExternalLink size={16} />
        </a>
      </section>
    </main>
  )
}
