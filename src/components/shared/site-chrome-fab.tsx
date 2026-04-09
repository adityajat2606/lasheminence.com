'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronUp, Settings } from 'lucide-react'

export function SiteChromeFab() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 380)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Link
        href="/settings"
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center justify-center rounded-l-full bg-zinc-900 px-2.5 py-4 text-white shadow-lg transition hover:bg-zinc-800"
        aria-label="Site settings"
      >
        <Settings className="h-5 w-5" />
      </Link>
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="listing-scroll-top fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:opacity-90"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      ) : null}
    </>
  )
}
