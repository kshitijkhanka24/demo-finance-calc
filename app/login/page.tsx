'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const { signIn, user, profile, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'admin' || profile.role === 'superadmin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    }
  }, [user, profile, loading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error: err } = await signIn(email, password)
    if (err) {
      setError(err)
      setSubmitting(false)
    }
    // Redirect is handled by useEffect above
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
              <LogIn className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Welcome back</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>Sign in to your KYFS Finance account</p>
          </div>

          {error && (
            <div className="p-3 mb-6 rounded-lg text-sm" style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)', border: '1px solid color-mix(in srgb, #ef4444 25%, transparent)', color: '#ef4444' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type="email"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm transition-colors focus:outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm transition-colors focus:outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg-subtle)' }}>
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-fg)',
                boxShadow: '0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
            >
              {submitting ? 'Signing in...' : 'Sign In'}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--fg-subtle)' }}>
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold transition-colors" style={{ color: 'var(--accent)' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
