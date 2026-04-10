'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function safeRedirectPath(next: string | undefined, fallback: string) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return fallback
  return next
}

/** Pre-filled for local demo; any non-empty email/password also works with existing auth. */
export const DEMO_LOGIN_EMAIL = 'demo@lash.local'
export const DEMO_LOGIN_PASSWORD = 'listings123'

export function LoginForm({
  actionClassName,
  mutedClassName,
  redirectTo,
}: {
  actionClassName: string
  mutedClassName: string
  redirectTo?: string
}) {
  const [email, setEmail] = useState(DEMO_LOGIN_EMAIL)
  const [password, setPassword] = useState(DEMO_LOGIN_PASSWORD)
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const afterLogin = safeRedirectPath(redirectTo, '/listings')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login(email, password)
    router.push(afterLogin)
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div>
        <label className={`text-xs font-medium ${mutedClassName}`} htmlFor="login-email">
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="mt-1.5 h-12 rounded-xl border-zinc-200 bg-white"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className={`text-xs font-medium ${mutedClassName}`} htmlFor="login-password">
          Password
        </label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="mt-1.5 h-12 rounded-xl border-zinc-200 bg-white"
          placeholder="••••••••"
          required
        />
      </div>
      <p className={`rounded-xl border border-[#ff2d55]/20 bg-[#ff2d55]/5 px-3 py-2 text-xs leading-relaxed ${mutedClassName}`}>
        Local demo: use <span className="font-semibold text-zinc-800">{DEMO_LOGIN_EMAIL}</span> /{' '}
        <span className="font-semibold text-zinc-800">{DEMO_LOGIN_PASSWORD}</span> — or any email and password; your session is stored in this browser.
      </p>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
