'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
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
    <div className="mt-2 space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ background: i <= passed ? color : 'var(--card-border)' }}
            />
          ))}
        </div>
        <span className="ml-3 text-xs font-medium" style={{ color }}>{strength}</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1">
            {c.pass
              ? <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#22c55e' }} />
              : <XCircle className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--fg-subtle)' }} />
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

  // Derived state for password match feedback
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [user, loading, router])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

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
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-card p-8 w-full max-w-md text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'color-mix(in srgb, #22c55e 15%, transparent)' }}>
            <CheckCircle className="w-7 h-7" style={{ color: '#22c55e' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Check your email</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
            We've sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account.
          </p>
          <Link href="/login" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'color-mix(in srgb, var(--accent2) 15%, transparent)' }}>
              <UserPlus className="w-6 h-6" style={{ color: 'var(--accent2)' }} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Create account</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>Start using KYFS Finance calculators</p>
          </div>

          {error && (
            <div className="p-3 mb-6 rounded-lg text-sm" style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)', border: '1px solid color-mix(in srgb, #ef4444 25%, transparent)', color: '#ef4444' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm transition-colors focus:outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--fg-subtle)' }}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrengthIndicator password={password} />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  type={showConfirmPwd ? 'text' : 'password'}
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3 text-sm transition-colors focus:outline-none"
                  style={{
                    background: 'var(--input-bg)',
                    border: `1px solid ${passwordsMatch ? '#22c55e' : passwordsMismatch ? '#ef4444' : 'var(--input-border)'}`,
                    color: 'var(--fg)',
                  }}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--fg-subtle)' }}
                  aria-label={showConfirmPwd ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Live match feedback */}
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {passwordsMatch
                    ? <><CheckCircle className="w-3.5 h-3.5" style={{ color: '#22c55e' }} /><span className="text-xs" style={{ color: '#22c55e' }}>Passwords match</span></>
                    : <><XCircle className="w-3.5 h-3.5" style={{ color: '#ef4444' }} /><span className="text-xs" style={{ color: '#ef4444' }}>Passwords don't match</span></>
                  }
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || passwordsMismatch}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-fg)',
                boxShadow: '0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
            >
              {submitting ? 'Creating account...' : 'Create Account'}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl text-xs" style={{ background: 'var(--input-bg)', color: 'var(--fg-subtle)' }}>
            By creating an account, you agree to our{' '}
            <Link href="/terms-of-service" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/cookies-policy" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Cookie Policy</Link>.
          </div>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--fg-subtle)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold transition-colors" style={{ color: 'var(--accent)' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
