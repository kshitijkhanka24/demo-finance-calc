'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Activity, Sun, Moon, Menu, X, ChevronDown, LogIn, LogOut, LayoutDashboard } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'
import { calculatorsList } from '@/lib/data'

export function Navbar() {
  const { theme, toggle } = useTheme()
  const { user, profile, signOut, isAdmin, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredCat, setHoveredCat] = useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Activity className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-bold tracking-tight">
            KYFS <span style={{ color: 'var(--accent)' }}>Finance</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {calculatorsList.map((cat) => (
            <div
              key={cat.category}
              className="relative"
              onMouseEnter={() => setHoveredCat(cat.category)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-md transition-colors"
                style={{ color: 'var(--fg-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
              >
                {cat.category}
                <ChevronDown className="w-3 h-3" />
              </button>

              {hoveredCat === cat.category && (
                <div className="absolute top-full left-0 mt-1 w-64 dropdown-panel p-2 shadow-xl z-50">
                  {cat.items.map((calc) => {
                    const Icon = calc.icon
                    return (
                      <Link
                        key={calc.id}
                        href={`/calculators/${calc.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors"
                        style={{ color: 'var(--fg-muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--glass-hover)'; e.currentTarget.style.color = 'var(--fg)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-muted)' }}
                        onClick={() => setHoveredCat(null)}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
                        <div>
                          <p className="font-medium" style={{ color: 'inherit' }}>{calc.name}</p>
                          <p className="mt-0.5" style={{ color: 'var(--fg-subtle)', fontSize: '10px' }}>{calc.description}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--fg-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--glass-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!loading && (
            <>
              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  {isAdmin && (
                    <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ color: 'var(--fg-muted)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ background: 'var(--input-bg)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--accent)' }}>
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{user.email?.split('@')[0]}</span>
                  </div>
                  <button onClick={() => signOut()} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--fg-subtle)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--glass-hover)'; e.currentTarget.style.color = 'var(--fg)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg-subtle)' }}
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 8%, transparent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogIn className="w-3.5 h-3.5" /> Login
                </Link>
              )}
            </>
          )}

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--fg-muted)' }}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: 'var(--nav-border)', background: 'var(--bg)' }}>
          <div className="container mx-auto px-6 py-4 space-y-4">
            {calculatorsList.map((cat) => (
              <div key={cat.category}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--fg-subtle)' }}>{cat.category}</p>
                <div className="grid grid-cols-2 gap-1">
                  {cat.items.map((calc) => (
                    <Link key={calc.id} href={`/calculators/${calc.id}`}
                      className="text-xs px-3 py-2 rounded-lg transition-colors"
                      style={{ color: 'var(--fg-muted)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t pt-3" style={{ borderColor: 'var(--card-border)' }}>
              {user ? (
                <div className="space-y-2">
                  <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{user.email}</p>
                  {isAdmin && (
                    <Link href="/admin/dashboard" className="block text-xs font-medium px-3 py-2 rounded-lg" style={{ color: 'var(--accent)' }} onClick={() => setMobileOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setMobileOpen(false) }} className="text-xs font-medium px-3 py-2 rounded-lg w-full text-left" style={{ color: 'var(--fg-muted)' }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login" className="block text-xs font-medium px-3 py-2 rounded-lg" style={{ color: 'var(--accent)' }} onClick={() => setMobileOpen(false)}>
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
