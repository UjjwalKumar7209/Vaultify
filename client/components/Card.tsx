'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface CardProps {
  title: string
  content: string
  href: string
}

export default function ContentCard({ title, content, href }: CardProps) {
  return (
    <div
      className="
        group relative
        rounded-2xl
        bg-slate-900/60
        border border-white/10
        p-5
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-indigo-500/10
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-cyan-500/10" />

      <h3 className="relative text-base font-semibold text-slate-100 line-clamp-1">
        {title}
      </h3>

      <p className="relative mt-2 text-sm text-slate-400 leading-relaxed line-clamp-4">
        {content}
      </p>

      <Link
        href={href}
        className="
          relative mt-4 inline-flex items-center gap-1
          text-sm font-medium text-indigo-400
          group-hover:text-indigo-300 transition
        "
      >
        Read more <ArrowUpRight size={16} />
      </Link>
    </div>
  )
}
