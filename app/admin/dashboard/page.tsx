'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import {
  Users, Activity, Target, LogOut, Shield, BarChart3,
  TrendingUp, Calendar, RefreshCw, AlertCircle, Award,
  PieChart as PieIcon, UserCheck
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
  LineChart, Line, PieChart, Pie, Legend, Area, AreaChart
} from 'recharts'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────
interface AdminMetrics {
  summary: {
    totalUsers: number
    activeMonthlyUsers: number
    totalCalculations: number
    monthlyCalculations: number
    newUsersThisMonth: number
    topCalculator: string
  }
  calculatorStats: { id: string; name: string; total: number; monthly: number; uniqueUsers: number }[]
  dailyUsage: { date: string; count: number }[]
  roleDistribution: { role: string; count: number }[]
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const CHART_PALETTE = [
  'var(--accent)',
  'var(--accent2)',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#f43f5e',
  '#14b8a6',
  '#8b5cf6',
]

const ROLE_COLORS: Record<string, string> = {
  user: 'var(--fg-muted)',
  'paid-user': 'var(--accent2)',
  admin: 'var(--accent)',
  superadmin: '#f59e0b',
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function MetricCard({
  icon: Icon, label, value, sub, accentVar, trend
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
  accentVar: string
  trend?: { up: boolean; text: string }
}) {
  return (
    <div
      className="glass-card p-5 flex flex-col gap-3"
      style={{ borderLeft: `3px solid ${accentVar}` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="p-2 rounded-lg"
          style={{ background: `color-mix(in srgb, ${accentVar} 12%, transparent)` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentVar }} />
        </div>
        {trend && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: trend.up
                ? 'color-mix(in srgb, #10b981 12%, transparent)'
                : 'color-mix(in srgb, #f43f5e 12%, transparent)',
              color: trend.up ? '#10b981' : '#f43f5e',
            }}
          >
            {trend.up ? '↑' : '↓'} {trend.text}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums tracking-tight" style={{ color: 'var(--fg)' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--fg-muted)' }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{sub}</p>}
      </div>
    </div>
  )
}

// ─── Tooltip Styles ───────────────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: 'var(--dropdown-bg)',
  border: '1px solid var(--dropdown-border)',
  borderRadius: '8px',
  fontSize: '12px',
  color: 'var(--fg)',
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut, isAdmin, isSuperAdmin } = useAuth()

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchMetrics = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/metrics', {
        credentials: 'include',
        headers: { 'Cache-Control': 'no-cache' },
      })

      if (res.status === 401 || res.status === 403) {
        router.push('/login')
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Error ${res.status}`)
      }

      const data: AdminMetrics = await res.json()
      setMetrics(data)
      setLastRefreshed(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [router])

  useEffect(() => {
    if (authLoading) return
    if (!user || !isAdmin) {
      router.push('/login')
      return
    }
    fetchMetrics()
  }, [user, isAdmin, authLoading, router, fetchMetrics])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  // ── Loading state ──
  if (authLoading || loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div
          className="w-12 h-12 rounded-full animate-spin"
          style={{ border: '3px solid var(--card-border)', borderTopColor: 'var(--accent)' }}
        />
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Loading dashboard…</p>
      </div>
    )
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-10 h-10" style={{ color: '#f43f5e' }} />
        <p className="font-semibold" style={{ color: 'var(--fg)' }}>Failed to load dashboard</p>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{error}</p>
        <button
          onClick={() => fetchMetrics()}
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const { summary, calculatorStats, dailyUsage, roleDistribution } = metrics!

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
              Admin Dashboard
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            {profile?.email} &middot;{' '}
            <span
              className="font-semibold px-1.5 py-0.5 rounded text-xs"
              style={{
                background: `color-mix(in srgb, ${ROLE_COLORS[profile?.role ?? 'user']} 15%, transparent)`,
                color: ROLE_COLORS[profile?.role ?? 'user'],
              }}
            >
              {profile?.role?.toUpperCase()}
            </span>
            {lastRefreshed && (
              <span className="ml-2 text-xs" style={{ color: 'var(--fg-subtle)' }}>
                · Last updated {lastRefreshed.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => fetchMetrics(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)', border: '1px solid var(--input-border)' }}
            title="Refresh metrics"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          {isSuperAdmin && (
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: 'color-mix(in srgb, var(--accent2) 12%, transparent)',
                color: 'var(--accent2)',
                border: '1px solid color-mix(in srgb, var(--accent2) 25%, transparent)',
              }}
            >
              <Shield className="w-4 h-4" /> Manage Users
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors"
            style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)', border: '1px solid var(--input-border)' }}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* ── Summary KPI Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          icon={Users}
          label="Registered Users"
          value={summary.totalUsers}
          sub={`+${summary.newUsersThisMonth} this month`}
          accentVar="var(--accent)"
          trend={{ up: summary.newUsersThisMonth > 0, text: `${summary.newUsersThisMonth} new` }}
        />
        <MetricCard
          icon={UserCheck}
          label="Monthly Active Users"
          value={summary.activeMonthlyUsers}
          sub="Unique users in last 30 days"
          accentVar="var(--accent2)"
        />
        <MetricCard
          icon={Activity}
          label="Total Calculations"
          value={summary.totalCalculations}
          sub={`${summary.monthlyCalculations.toLocaleString()} this month`}
          accentVar="#10b981"
          trend={{ up: true, text: `${summary.monthlyCalculations} this month` }}
        />
        <MetricCard
          icon={TrendingUp}
          label="Monthly Calculations"
          value={summary.monthlyCalculations}
          sub="Last 30 days"
          accentVar="#6366f1"
        />
        <MetricCard
          icon={Award}
          label="Top Calculator"
          value={summary.topCalculator}
          sub="Most used overall"
          accentVar="#f59e0b"
        />
        <MetricCard
          icon={Target}
          label="New Users (30d)"
          value={summary.newUsersThisMonth}
          sub="New signups this month"
          accentVar="#f43f5e"
        />
      </div>

      {/* ── Charts Row ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Daily Usage Line Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
              Daily Calculations (Last 14 Days)
            </h3>
          </div>
          {dailyUsage.length === 0 ? (
            <div className="h-52 flex items-center justify-center" style={{ color: 'var(--fg-muted)' }}>
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={dailyUsage} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="var(--fg-subtle)"
                  tick={{ fill: 'var(--fg-muted)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => {
                    const d = new Date(v)
                    return `${d.getMonth() + 1}/${d.getDate()}`
                  }}
                />
                <YAxis
                  stroke="var(--fg-subtle)"
                  tick={{ fill: 'var(--fg-muted)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <RechartsTooltip contentStyle={tooltipStyle} cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Calculations"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="url(#dailyGrad)"
                  dot={{ fill: 'var(--accent)', r: 3, strokeWidth: 0 }}
                  activeDot={{ fill: 'var(--accent)', r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Role Distribution Pie */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieIcon className="w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
              User Roles
            </h3>
          </div>
          {roleDistribution.length === 0 ? (
            <div className="h-52 flex items-center justify-center" style={{ color: 'var(--fg-muted)' }}>
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="45%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={3}
                >
                  {roleDistribution.map((entry) => (
                    <Cell
                      key={entry.role}
                      fill={ROLE_COLORS[entry.role] ?? 'var(--fg-subtle)'}
                    />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={tooltipStyle} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                      {String(value).replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Calculator Popularity Bar Chart ──────────────────────── */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-4 h-4" style={{ color: 'var(--fg-subtle)' }} />
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
            Calculator Popularity (All-Time)
          </h3>
        </div>
        {calculatorStats.length === 0 ? (
          <div className="h-64 flex items-center justify-center" style={{ color: 'var(--fg-muted)' }}>
            No calculator usage recorded yet. Data will appear here once users start calculating.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calculatorStats} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="var(--fg-subtle)"
                tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                angle={-30}
                textAnchor="end"
                height={70}
              />
              <YAxis
                stroke="var(--fg-subtle)"
                tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
                formatter={(value: number, name: string) => [value.toLocaleString(), name === 'total' ? 'All-Time' : 'Monthly']}
              />
              <Bar dataKey="total" name="All-Time" radius={[5, 5, 0, 0]} maxBarSize={48}>
                {calculatorStats.map((_, i) => (
                  <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Calculator Breakdown Table ───────────────────────────── */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--card-border)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
            Calculator Details
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'var(--input-bg)' }}>
                {['Calculator', 'All-Time Uses', 'Monthly Uses', 'Unique Users'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--fg-subtle)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calculatorStats.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center" style={{ color: 'var(--fg-muted)' }}>
                    No data yet
                  </td>
                </tr>
              ) : (
                calculatorStats.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: '1px solid var(--card-border)',
                      background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--accent) 2%, transparent)',
                    }}
                  >
                    <td className="px-5 py-3 font-medium" style={{ color: 'var(--fg)' }}>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: CHART_PALETTE[i % CHART_PALETTE.length] }}
                        />
                        {row.name}
                      </div>
                    </td>
                    <td className="px-5 py-3 tabular-nums font-semibold" style={{ color: 'var(--accent)' }}>
                      {row.total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                      {row.monthly.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 tabular-nums" style={{ color: 'var(--fg-muted)' }}>
                      {row.uniqueUsers.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
