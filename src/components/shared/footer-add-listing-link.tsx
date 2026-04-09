'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export function FooterAddListingLink() {
  const { isAuthenticated, isReady } = useAuth()
  const href =
    !isReady ? '/create/listing' : isAuthenticated ? '/create/listing' : '/login?next=/create/listing'

  return (
    <Link href={href} className="flex items-start gap-2 text-sm text-zinc-600 transition hover:text-[#ff2d55]">
      <span className="select-none text-zinc-400" aria-hidden>
        »
      </span>
      Add listing
    </Link>
  )
}
