'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff, ArrowRight, TrendingUp, CheckCircle, XCircle, Star } from 'lucide-react'
import Link from 'next/link'

function PasswordStrengthIndicator({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', pass: /[a-z]/.test(password) },
    { label: 'Number', pass: /\d/.test(password) },
  ]
  const passed = checks.filter((c) => c.pass).length
  const strength = passed <= 1 ? 'Weak' : passed <= 2 ? 'Fair' : passed <= 3 ? 'Good' : 'Strong'
  const color = passed <= 1 ? '#ef4444' : passed <= 2 ? '#f97316' : passed <= 3 ? '#eab308' : '#22c55e'

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ background: i <= passed ? color : 'var(--card-border)' }}
            />
          ))}
        </div>
        <span className="text-xs font-medium w-10 text-right" style={{ color }}>{strength}</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.pass
              ? <CheckCircle className="w-3 h-3 shrink-0" style={{ color: '#22c55e' }} />
              : <XCircle className="w-3 h-3 shrink-0" style={{ color: 'var(--fg-subtle)' }} />
            }
            <span className="text-xs" style={{ color: c.pass ? 'var(--fg-muted)' : 'var(--fg-subtle)' }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TESTIMONIALS = [
  { text: 'Finally a calculator that shows inflation-adjusted returns. Game changer!', name: 'Rahul S.' },
  { text: 'Best SIP and PPF planner I\'ve used. Clean, fast, and truly free.', name: 'Priya K.' },
  { text: 'Used it to plan my home purchase. The EMI breakdown is excellent.', name: 'Amit D.' },
]

export default function SignupPage() {
  const { signUp, user, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword

  useEffect(() => {
    if (!loading && user) router.push('/')
  }, [user, loading, router])

  // Rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setError('Password must contain uppercase, lowercase, and a number')
      return
    }

    setSubmitting(true)
    const { error: err } = await signUp(email, password)
    if (err) {
      setError(err)
      setSubmitting(false)
    } else {
      setSuccess(true)
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'color-mix(in srgb, #22c55e 15%, transparent)' }}>
            <CheckCircle className="w-8 h-8" style={{ color: '#22c55e' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Check your email</h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            We've sent a confirmation link to <strong style={{ color: 'var(--fg)' }}>{email}</strong>.
            Click the link to activate your account and start calculating.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
          >
            Go to Sign In <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel: Product Branding ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent2) 80%, var(--accent)) 0%, var(--accent) 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-15" style={{ background: 'white' }} />
        <div className="absolute bottom-12 -left-12 w-56 h-56 rounded-full opacity-10" style={{ background: 'white' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">KYFS Finance</span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
              <span className="text-white/90 text-xs font-medium">100% Free forever</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-3">
              Start planning<br />your wealth today
            </h2>
            <p className="text-white/75 text-base leading-relaxed max-w-sm">
              Join thousands of Indians using KYFS to make smarter financial decisions — from SIP to retirement.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '23+', label: 'Calculators' },
              { value: '10K+', label: 'Users' },
              { value: '100%', label: 'Free' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/15">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/65 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Rotating testimonial */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
            <p className="text-white/85 text-sm leading-relaxed italic mb-3 transition-all duration-500">
              "{TESTIMONIALS[testimonialIdx].text}"
            </p>
            <p className="text-white/60 text-xs font-medium">— {TESTIMONIALS[testimonialIdx].name}</p>
            {/* Dots */}
            <div className="flex gap-1.5 mt-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ background: i === testimonialIdx ? 'white' : 'rgba(255,255,255,0.35)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-white/50 text-xs">No credit card required · No ads · No data selling</p>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-fg)' }} />
            </div>
            <span className="font-bold text-base" style={{ color: 'var(--fg)' }}>KYFS Finance</span>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight mb-1.5" style={{ color: 'var(--fg)' }}>Create your account</h1>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              Free forever. No credit card needed.
            </p>
          </div>

          {error && (
            <div className="p-3 mb-5 rounded-xl text-sm flex items-start gap-2" style={{ background: 'color-mix(in srgb, #ef4444 10%, transparent)', border: '1px solid color-mix(in srgb, #ef4444 25%, transparent)', color: '#ef4444' }}>
              <span className="shrink-0 mt-0.5">⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg-subtle)' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type="email"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg-subtle)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none transition-all"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg-subtle)' }}>
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrengthIndicator password={password} />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg-subtle)' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showConfirmPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    background: 'var(--input-bg)',
                    border: `1px solid ${passwordsMatch ? '#22c55e' : passwordsMismatch ? '#ef4444' : 'var(--input-border)'}`,
                    color: 'var(--fg)',
                  }}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--fg-subtle)' }}>
                  {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {passwordsMatch
                    ? <><CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: '#22c55e' }} /><span className="text-xs" style={{ color: '#22c55e' }}>Passwords match</span></>
                    : <><XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: '#ef4444' }} /><span className="text-xs" style={{ color: '#ef4444' }}>Passwords don't match</span></>
                  }
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || passwordsMismatch}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              style={{
                background: submitting || passwordsMismatch ? 'var(--fg-subtle)' : 'var(--accent)',
                color: 'var(--accent-fg)',
                boxShadow: submitting || passwordsMismatch ? 'none' : '0 2px 16px color-mix(in srgb, var(--accent) 35%, transparent)',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account…</>
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-5 p-3.5 rounded-xl text-xs" style={{ background: 'var(--input-bg)', color: 'var(--fg-subtle)' }}>
            By creating an account, you agree to our{' '}
            <Link href="/terms-of-service" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/cookies-policy" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Cookie Policy</Link>.
          </div>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--fg-subtle)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: 'var(--accent)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
