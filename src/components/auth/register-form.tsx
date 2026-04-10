'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function RegisterForm({
  actionClassName,
  mutedClassName,
}: {
  actionClassName: string
  mutedClassName: string
}) {
  const [name, setName] = useState('Demo Lister')
  const [email, setEmail] = useState('demo@lash.local')
  const [password, setPassword] = useState('listings123')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/listings')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div>
        <label className={`text-xs font-medium ${mutedClassName}`} htmlFor="reg-name">
          Full name
        </label>
        <Input
          id="reg-name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="mt-1.5 h-12 rounded-xl border-zinc-200 bg-white"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className={`text-xs font-medium ${mutedClassName}`} htmlFor="reg-email">
          Email
        </label>
        <Input
          id="reg-email"
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
        <label className={`text-xs font-medium ${mutedClassName}`} htmlFor="reg-password">
          Password
        </label>
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="mt-1.5 h-12 rounded-xl border-zinc-200 bg-white"
          placeholder="••••••••"
          required
        />
      </div>
      <p className={`rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs leading-relaxed ${mutedClassName}`}>
        Registration is simulated in the browser only — no server account is created.
      </p>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
