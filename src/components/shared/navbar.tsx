'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, LogIn, UserPlus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const shell = 'border-b border-zinc-200/90 bg-white/95 text-zinc-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md'
    const navBtn =
      'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900'
    const navActive = 'bg-[#ff2d55]/12 text-[#ff2d55]'
    const cta = 'rounded-full bg-[#ff2d55] text-white shadow-sm hover:bg-[#e6294d]'

    const linkClass = (href: string) => cn(navBtn, pathname === href || (href !== '/' && pathname.startsWith(href)) ? navActive : '')

    return (
      <header className={cn('sticky top-0 z-50 w-full', shell)}>
        <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2d55]/12">
              <MapPin className="h-5 w-5 text-[#ff2d55]" aria-hidden />
            </span>
            <div className="min-w-0 leading-tight">
              <span className="block truncate text-lg font-bold tracking-tight">{SITE_CONFIG.name}</span>
              <span className="block truncate text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            <Link href="/" className={linkClass('/')}>
              Home
            </Link>
            <Link href="/listings" className={linkClass('/listings')}>
              Browse listings
            </Link>
            <Link href="/search" className={linkClass('/search')}>
              Search
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navBtn, 'data-[state=open]:bg-zinc-100')}>
                My hub
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[12rem]">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/listings">My listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/saved">Saved</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Account settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navBtn, 'data-[state=open]:bg-zinc-100')}>
                Company
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[11rem]">
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">Help</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/privacy">Privacy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Button size="sm" asChild className={cn('h-9 gap-1.5 px-4', cta)}>
                  <Link href="/create/listing">
                    <UserPlus className="h-4 w-4" />
                    Add listing
                  </Link>
                </Button>
                <NavbarAuthControls directoryNav />
              </div>
            ) : (
              <>
                <Button size="sm" asChild className={cn('hidden h-9 gap-1.5 px-4 sm:flex', cta)}>
                  <Link href="/login">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild className="h-9 border-zinc-200 px-4 text-zinc-800 hover:bg-zinc-50">
                  <Link href="/register">Create account</Link>
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen ? (
          <div className="border-t border-zinc-100 bg-white lg:hidden">
            <div className="space-y-1 px-4 py-4">
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700">
                <Search className="h-4 w-4" />
                Search listings
              </Link>
              {[
                { href: '/', label: 'Home' },
                { href: '/listings', label: 'Browse listings' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-sm font-semibold',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? navActive : 'text-zinc-800 hover:bg-zinc-50',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild className={cn('w-full rounded-full', cta)}>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full border-zinc-200">
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Create account
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="pt-2">
                  <Button asChild className={cn('w-full rounded-full', cta)}>
                    <Link href="/create/listing" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add listing
                    </Link>
                  </Button>
                </div>
              )}
              {isAuthenticated ? (
                <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Account</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <NavbarAuthControls directoryNav />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <>
      <header data-mobile-nav="true" className={cn('sticky top-0 z-50 w-full xl:hidden', style.shell)}>
        <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="block truncate text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-70">{siteContent.navbar.tagline}</span>
              </div>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isAuthenticated ? (
              <Button size="sm" asChild className={cn('rounded-full', style.cta)}>
                <Link href="/register">
                  <Plus className="mr-1 h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            ) : (
              <NavbarAuthControls />
            )}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={style.mobile}>
            <div className="space-y-2 px-4 py-4">
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      <aside className={cn('hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:w-80 xl:flex-col xl:overflow-y-auto xl:border-r xl:px-6 xl:py-7', style.shell)}>
        <div className="flex h-full flex-col">
          <Link href="/" className="flex items-center gap-3">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.24em] opacity-70">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          <div className={cn('mt-7 rounded-[1.35rem] border border-current/10 px-4 py-4', isFloating ? 'bg-white/6 backdrop-blur' : isEditorial ? 'bg-white/70' : isUtility ? 'bg-white/80' : 'bg-slate-50')}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
              <Search className="h-3.5 w-3.5" />
              Quick Find
            </div>
            <p className="mt-2 text-sm leading-6 opacity-80">Browse by task, lane, or content type without cramped top navigation.</p>
          </div>

          {primaryTask ? (
            <Link href={primaryTask.route} className={cn('mt-5 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]', isFloating ? 'border border-white/10 bg-white/6 text-white/80' : 'border border-current/10 bg-white/70 opacity-80')}>
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <nav className="mt-8 space-y-2">
            {primaryNavigation.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              const isActive = pathname.startsWith(task.route)
              return (
                <Link key={task.key} href={task.route} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{task.label}</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-45" />
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 space-y-3">
            <div className={cn('rounded-[1.6rem] border border-current/10 px-4 py-4 text-sm', isFloating ? 'bg-white/6 text-slate-200' : 'bg-white/75')}>
              <div className="font-semibold">Navigation Note</div>
              <p className="mt-2 text-xs leading-6 opacity-75">Desktop navigation now sits on the left so long task labels do not collide with actions or utility controls.</p>
            </div>
          </div>

          <div className="mt-auto space-y-3 pt-8">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="space-y-3">
                <Button variant="ghost" size="sm" asChild className="w-full justify-center rounded-full px-4">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('w-full justify-center rounded-full', style.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )

}
