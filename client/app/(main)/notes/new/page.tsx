'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function NewNotePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    subject: '',
    title: '',
    content: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await axios.post(
      '/api/v1/notes',
      form,
      { headers: { Authorization: localStorage.getItem('token') } }
    )

    router.push('/notes')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 pt-28">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <form
        onSubmit={submit}
        className="max-w-3xl mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-slate-100">
          New Note
        </h1>

        <input
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          className="input-dark"
        />

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="input-dark"
        />

        <textarea
          name="content"
          placeholder="Write your note..."
          rows={6}
          onChange={handleChange}
          className="input-dark"
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl text-white transition"
        >
          {loading ? 'Saving...' : 'Create Note'}
        </button>
      </form>
    </main>
  )
}
