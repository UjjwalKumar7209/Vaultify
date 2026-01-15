'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Vault, Mail, Lock, Loader2 } from 'lucide-react'

interface ILoginFormInput {
  email: string
  password: string
}

export default function LoginComp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormInput>()

  /* ---------------- REDIRECT IF LOGGED IN ---------------- */
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [router])

  /* ---------------- SUBMIT ---------------- */
  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/login',
        data
      )

      localStorage.setItem('token', `Bearer ${res.data.jwt}`)
      router.push('/')
    } catch (e) {
      alert('Invalid credentials or server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%)]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-md
          rounded-2xl
          bg-white/90
          backdrop-blur-xl
          border border-white/30
          shadow-2xl
          p-8
          space-y-6
          animate-fade-in
        "
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
            <Vault className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">
            Login to access your notes & links
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="
                w-full
                rounded-lg
                border border-slate-300
                pl-10 pr-3 py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="
                w-full
                rounded-lg
                border border-slate-300
                pl-10 pr-3 py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            flex items-center justify-center gap-2
            rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            py-2.5
            text-sm font-semibold text-white
            shadow-md
            hover:shadow-lg
            hover:scale-[1.02]
            active:scale-95
            disabled:opacity-70
            transition
          "
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
