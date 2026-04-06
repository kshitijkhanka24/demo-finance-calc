import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// ─── Rate limiting (simple in-memory, use Redis/Upstash in production) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 30

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

export async function GET(request: Request) {
  try {
    // ── 1. Rate limiting ──────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // ── 2. Auth check — server-side session validation ────────────
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── 3. Role check — only admin / superadmin ───────────────────
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!['admin', 'superadmin'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // ── 4. Fetch metrics ──────────────────────────────────────────

    // Total registered users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Total calculations all-time
    const { count: totalCalculations } = await supabase
      .from('calculator_usage')
      .select('*', { count: 'exact', head: true })

    // Calculations this month
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { count: monthlyCalculations } = await supabase
      .from('calculator_usage')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', thirtyDaysAgo)

    // New users this month
    const { count: newUsersThisMonth } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    // Active Monthly Users (distinct users who ran a calculation in last 30 days)
    // We pull user_ids and deduplicate in JS since Supabase JS doesn't support COUNT(DISTINCT)
    const { data: activeUserRows } = await supabase
      .from('calculator_usage')
      .select('user_id')
      .gte('timestamp', thirtyDaysAgo)
      .not('user_id', 'is', null)

    const activeMonthlyUsers = activeUserRows
      ? new Set(activeUserRows.map((r) => r.user_id)).size
      : 0

    // Calculator usage breakdown (all-time)
    const { data: usageData } = await supabase
      .from('calculator_usage')
      .select('calculator_id, timestamp, user_id')

    // Group by calculator
    const calcMap: Record<string, { total: number; monthly: number; uniqueUsers: Set<string> }> = {}
    const thirtyDaysAgoMs = Date.now() - 30 * 24 * 60 * 60 * 1000

    for (const row of usageData ?? []) {
      const id = row.calculator_id
      if (!calcMap[id]) {
        calcMap[id] = { total: 0, monthly: 0, uniqueUsers: new Set() }
      }
      calcMap[id].total++
      if (new Date(row.timestamp).getTime() >= thirtyDaysAgoMs) {
        calcMap[id].monthly++
      }
      if (row.user_id) calcMap[id].uniqueUsers.add(row.user_id)
    }

    const calculatorStats = Object.entries(calcMap)
      .map(([id, stats]) => ({
        id,
        name: id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        total: stats.total,
        monthly: stats.monthly,
        uniqueUsers: stats.uniqueUsers.size,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 12)

    // Daily usage for the past 14 days
    const { data: recentUsage } = await supabase
      .from('calculator_usage')
      .select('timestamp')
      .gte('timestamp', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: true })

    const dailyMap: Record<string, number> = {}
    for (const row of recentUsage ?? []) {
      const day = row.timestamp.slice(0, 10) // YYYY-MM-DD
      dailyMap[day] = (dailyMap[day] || 0) + 1
    }
    const dailyUsage = Object.entries(dailyMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Role distribution
    const { data: roleData } = await supabase
      .from('profiles')
      .select('role')

    const roleMap: Record<string, number> = {}
    for (const row of roleData ?? []) {
      roleMap[row.role] = (roleMap[row.role] || 0) + 1
    }

    // ── 5. Return metrics ─────────────────────────────────────────
    return NextResponse.json(
      {
        summary: {
          totalUsers: totalUsers ?? 0,
          activeMonthlyUsers,
          totalCalculations: totalCalculations ?? 0,
          monthlyCalculations: monthlyCalculations ?? 0,
          newUsersThisMonth: newUsersThisMonth ?? 0,
          topCalculator: calculatorStats[0]?.name ?? 'N/A',
        },
        calculatorStats,
        dailyUsage,
        roleDistribution: Object.entries(roleMap).map(([role, count]) => ({ role, count })),
      },
      {
        headers: {
          // No caching — data must always be fresh for admin
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    )
  } catch (err) {
    console.error('[Admin/Metrics] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
