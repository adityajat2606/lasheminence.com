import type { ReactNode } from 'react'
import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'
import { FooterAddListingLink } from '@/components/shared/footer-add-listing-link'

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

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

function FootHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-bold text-zinc-800">
      {children}
      <span className="mt-2 block h-0.5 w-9 rounded-full bg-[#ff2d55]" aria-hidden />
    </h3>
  )
}

function FootLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-start gap-2 text-sm text-zinc-600 transition hover:text-[#ff2d55]">
      <span className="select-none text-zinc-400" aria-hidden>
        »
      </span>
      {children}
    </Link>
  )
}

function ListingDirectoryFooter({ variant = 'default' }: { variant?: 'default' | 'dense' | 'editorial' }) {
  const isDense = variant === 'dense'
  const isEditorial = variant === 'editorial'

  return (
    <footer className="border-t border-zinc-200 bg-gradient-to-b from-[#f6f7f9] to-[#eef0f4] text-zinc-700">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {isEditorial ? (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/25 bg-[#ff2d55]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff2d55]">
                <Sparkles className="h-3.5 w-3.5" />
                Directory highlights
              </div>
            ) : null}
            <FootHeading>{isEditorial ? 'Our story' : 'About'}</FootHeading>
            <p className="mt-5 text-sm leading-relaxed text-zinc-600">
              {isEditorial
                ? `${SITE_CONFIG.name} highlights trusted listings and local spots so visitors can compare options quickly and owners can present their business clearly.`
                : `${SITE_CONFIG.name} helps people discover local businesses and book-worthy spots. List your space, keep details fresh, and get found by the right customers.`}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {isEditorial
                ? 'Save favorites, search by category or area, and jump into listings when you are ready to act.'
                : 'Browse curated listings, save favorites, and manage your posts from your account.'}
            </p>
          </div>
          <div>
            <FootHeading>Useful links</FootHeading>
            <ul className="mt-5 space-y-3">
              <li>
                <FootLink href="/">Home</FootLink>
              </li>
              <li>
                <FootLink href="/listings">Browse listings</FootLink>
              </li>
              <li>
                <FootLink href="/privacy">Privacy</FootLink>
              </li>
              <li>
                <FootLink href="/contact">Contact</FootLink>
              </li>
            </ul>
          </div>
          <div>
            <FootHeading>Explore</FootHeading>
            <ul className="mt-5 space-y-3">
              <li>
                <FootLink href="/search">Search</FootLink>
              </li>
              <li>
                <FootLink href="/about">About us</FootLink>
              </li>
              <li>
                <FootLink href="/help">How it works</FootLink>
              </li>
              <li>
                <FootLink href="/terms">Terms</FootLink>
              </li>
            </ul>
          </div>
          <div>
            <FootHeading>Help</FootHeading>
            <ul className="mt-5 space-y-3">
              <li>
                <FootLink href="/login">Sign in</FootLink>
              </li>
              <li>
                <FootLink href="/register">Create account</FootLink>
              </li>
              <li>
                <FooterAddListingLink />
              </li>
              <li>
                <FootLink href="/help">Help center</FootLink>
              </li>
            </ul>
          </div>
        </div>

        {isDense ? (
          <div className="mt-12 grid gap-10 border-t border-zinc-200/80 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <FootHeading>Listings &amp; surfaces</FootHeading>
              <ul className="mt-5 space-y-3">
                {footerLinks.platform.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-[#ff2d55]"
                      >
                        {Icon ? <Icon className="h-4 w-4 shrink-0 text-zinc-400" /> : null}
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <FootHeading>Resources</FootHeading>
              <ul className="mt-5 space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <FootLink href={item.href}>{item.name}</FootLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FootHeading>Legal</FootHeading>
              <ul className="mt-5 space-y-3">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <FootLink href={item.href}>{item.name}</FootLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FootHeading>Connect</FootHeading>
              <p className="mt-5 text-sm text-zinc-600">Follow {SITE_CONFIG.name} for updates and new listings.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:border-[#ff2d55]/40 hover:text-[#ff2d55]"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {isEditorial && !isDense ? (
          <div className="mt-10 border-t border-zinc-200/80 pt-10">
            <FootHeading>Company</FootHeading>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <FootLink href={item.href}>{item.name}</FootLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 border-t border-zinc-200/80 pt-6 text-center text-sm text-zinc-500">
          Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()

  if (recipe.footer === 'minimal-footer') {
    return <ListingDirectoryFooter />
  }

  if (recipe.footer === 'dense-footer') {
    return <ListingDirectoryFooter variant="dense" />
  }

  if (recipe.footer === 'editorial-footer') {
    return <ListingDirectoryFooter variant="editorial" />
  }

  return <ListingDirectoryFooter />
}
