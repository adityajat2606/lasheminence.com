'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChefHat, Dumbbell, Guitar, Hotel, Home, Briefcase, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'

const ROTATE = ['Restaurants', 'Salons', 'Studios', 'Retail', 'Services', 'Spaces']

const categories = [
  { label: 'Restaurant', icon: ChefHat, searchCategory: 'food' },
  { label: 'Fitness', icon: Dumbbell, searchCategory: 'service' },
  { label: 'Events', icon: Guitar, searchCategory: 'event' },
  { label: 'Hotels', icon: Hotel, searchCategory: 'travel' },
  { label: 'Real Estate', icon: Home, searchCategory: 'real-estate' },
  { label: 'Business', icon: Briefcase, searchCategory: 'business' },
] as const

export function DirectoryHero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2200)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find your nearby{' '}
          <span className="text-[#ff2d55]">
            {ROTATE[i]}
            <span className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-pulse bg-[#ff2d55]" aria-hidden />
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
          Discover trusted local businesses on {SITE_CONFIG.name} — search by category, area, or name.
        </p>

        <form
          action="/search"
          method="get"
          className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-full border border-white/10 bg-white p-2 shadow-2xl sm:flex-row sm:items-stretch sm:rounded-full sm:p-1.5"
        >
          <input type="hidden" name="master" value="1" />
          <div className="flex min-h-12 flex-1 items-center rounded-full bg-zinc-100 px-1 sm:px-0">
            <Input
              name="q"
              type="search"
              placeholder="What are you looking for?"
              className="h-12 min-h-12 border-0 bg-transparent px-4 text-sm text-zinc-900 shadow-none placeholder:text-zinc-500 focus-visible:ring-0"
              autoComplete="off"
            />
          </div>
          <div className="hidden min-h-12 flex-1 items-center rounded-full border border-zinc-200 bg-white px-1 sm:flex">
            <Input
              name="loc"
              type="text"
              placeholder="City or area"
              className="h-12 min-h-12 border-0 bg-transparent px-4 text-sm text-zinc-900 shadow-none placeholder:text-zinc-500 focus-visible:ring-0"
              autoComplete="off"
            />
          </div>
          <div className="hidden min-h-12 flex-1 items-center rounded-full border border-zinc-200 bg-white px-2 lg:flex">
            <select
              name="category"
              defaultValue=""
              aria-label="Category"
              className="h-12 w-full cursor-pointer rounded-full border-0 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:ring-0"
            >
              <option value="">All categories</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-[#ff2d55] px-8 text-sm font-semibold text-white hover:bg-[#e6294d] sm:h-auto sm:min-h-12"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </span>
          </Button>
        </form>

        <p className="mt-10 text-sm font-medium text-white/90">Or browse popular categories</p>
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ label, icon: Icon, searchCategory }) => (
            <Link
              key={label}
              href={`/search?master=1&category=${encodeURIComponent(searchCategory)}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/35 px-3 py-5 text-white backdrop-blur-sm transition hover:border-[#ff2d55]/40 hover:bg-black/45"
            >
              <Icon className="h-7 w-7 text-white" />
              <span className="mt-2 text-xs font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
