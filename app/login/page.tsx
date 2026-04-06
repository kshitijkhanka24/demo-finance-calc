'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff, ArrowRight, TrendingUp, ShieldCheck, BarChart3, Calculator } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Calculator,
    title: '23+ Financial Calculators',
    desc: 'SIP, FD, PPF, NPS, EMI and more — all in one place.',
  },
  {
    icon: TrendingUp,
    title: 'Inflation-Adjusted Projections',
    desc: 'See the real value of your money in today\'s terms.',
  },
  {
    icon: BarChart3,
    title: 'Visual Wealth Reports',
    desc: 'Interactive charts and downloadable PDF reports.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    desc: 'Your data stays yours. No tracking, no ads.',
  },
]

export default function LoginPage() {
  const { signIn, user, profile, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Redirect once auth state is resolved
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
    // On success: onAuthStateChange fires → profile loads → useEffect redirects
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel: Product Branding ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 60%, var(--accent2)) 100%)' }}
      >
        {/* Decorative radial blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: 'white' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, 30%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5" style={{ background: 'white', transform: 'translate(-50%, -50%)' }} />

        {/* Logo / Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">KYFS Finance</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-3">
              Your complete<br />financial toolkit
            </h2>
            <p className="text-white/75 text-base leading-relaxed max-w-sm">
              Plan smarter, invest better, and understand where your money goes — with calculators built for India.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/65 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white/80" />
            <span className="text-white/80 text-xs font-medium">Trusted by 10,000+ users · 100% free</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm">
          {/* Mobile-only logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-fg)' }} />
            </div>
            <span className="font-bold text-base" style={{ color: 'var(--fg)' }}>KYFS Finance</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1.5" style={{ color: 'var(--fg)' }}>Welcome back</h1>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="p-3 mb-6 rounded-xl text-sm flex items-start gap-2" style={{ background: 'color-mix(in srgb, #ef4444 10%, transparent)', border: '1px solid color-mix(in srgb, #ef4444 25%, transparent)', color: '#ef4444' }}>
              <span className="shrink-0 mt-0.5">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg-subtle)' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type="email"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm transition-all focus:outline-none"
                  style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--fg)',
                  }}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg-subtle)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm transition-all focus:outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 mt-6"
              style={{
                background: submitting ? 'var(--fg-subtle)' : 'var(--accent)',
                color: 'var(--accent-fg)',
                boxShadow: submitting ? 'none' : '0 2px 16px color-mix(in srgb, var(--accent) 35%, transparent)',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--fg-subtle)' }}>
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold transition-colors" style={{ color: 'var(--accent)' }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
