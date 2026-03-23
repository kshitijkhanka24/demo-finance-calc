'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { supabase } from '@/lib/supabase'
import { Users, Activity, Target, LogOut, Shield, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts'
import Link from 'next/link'
import { formatINR } from '@/components/calculators/shared'

export default function Dashboard() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut, isAdmin, isSuperAdmin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCalculations: 0,
    topCalculator: 'N/A'
  })
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (authLoading) return

    if (!user || !isAdmin) {
      router.push('/login')
      return
    }

    async function fetchDashboardData() {
      try {
        // Fetch User Count
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Fetch Calculator Usage
        const { data: usageData } = await supabase
          .from('calculator_usage')
          .select('calculator_id')

        let groupedData: { [key: string]: number } = {}
        let totalCalcs = 0

        if (usageData && usageData.length > 0) {
          totalCalcs = usageData.length
          usageData.forEach((row) => {
            groupedData[row.calculator_id] = (groupedData[row.calculator_id] || 0) + 1
          })
        } else {
          // Fallback demo data
          groupedData = {
            'compound-interest': 142,
            'emi': 215,
            'sip': 310,
            'home-loan': 189,
            'swp': 95
          }
          totalCalcs = 951
        }

        const formattedData = Object.keys(groupedData)
          .map(key => ({
            name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            uses: groupedData[key]
          }))
          .sort((a, b) => b.uses - a.uses)
          .slice(0, 8)

        setChartData(formattedData)
        setStats({
          totalUsers: userCount || 0,
          activeCalculations: totalCalcs,
          topCalculator: formattedData[0]?.name || 'N/A'
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, isAdmin, authLoading, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--card-border)', borderTopColor: 'var(--accent)' }}></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Admin Dashboard</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Welcome, {profile?.email} &middot; <span className="font-medium" style={{ color: 'var(--accent)' }}>{profile?.role}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isSuperAdmin && (
            <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors" style={{ background: 'color-mix(in srgb, var(--accent2) 12%, transparent)', color: 'var(--accent2)', border: '1px solid color-mix(in srgb, var(--accent2) 20%, transparent)' }}>
              <Shield className="w-4 h-4" /> Manage Users
            </Link>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors" style={{ background: 'var(--input-bg)', color: 'var(--fg-muted)', border: '1px solid var(--input-border)' }}>
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6" style={{ borderBottom: '3px solid var(--accent)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>Registered Users</h3>
          </div>
          <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--fg)' }}>{stats.totalUsers.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6" style={{ borderBottom: '3px solid var(--accent2)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--accent2) 12%, transparent)' }}>
              <Activity className="w-5 h-5" style={{ color: 'var(--accent2)' }} />
            </div>
            <h3 className="text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>Total Calculations</h3>
          </div>
          <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--fg)' }}>{stats.activeCalculations.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6" style={{ borderBottom: '3px solid var(--chart-3)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--chart-3) 12%, transparent)' }}>
              <Target className="w-5 h-5" style={{ color: 'var(--chart-3)' }} />
            </div>
            <h3 className="text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>Top Calculator</h3>
          </div>
          <p className="text-xl font-bold truncate" style={{ color: 'var(--fg)' }}>{stats.topCalculator}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-card p-6 h-[420px]">
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--fg-muted)' }}>Calculator Popularity</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-muted)', fontSize: 11 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} />
            <YAxis stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip
              cursor={{ fill: 'var(--glass-hover)' }}
              contentStyle={{ backgroundColor: 'var(--dropdown-bg)', borderColor: 'var(--dropdown-border)', borderRadius: '8px', color: 'var(--fg)', fontSize: '12px' }}
            />
            <Bar dataKey="uses" radius={[6, 6, 0, 0]} fill="var(--accent)">
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--accent)' : index === 1 ? 'var(--accent2)' : 'var(--chart-3)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
