// Shared calculator UI primitives with Indian number formatting and responsive inputs

'use client'

import { useState, useCallback, ReactNode } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChevronDown, ChevronRight, Download, Calculator } from 'lucide-react'

// Indian number format
export function formatINR(n: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(n))
}

export const tooltipStyle = { backgroundColor: 'var(--dropdown-bg)', border: '1px solid var(--dropdown-border)', borderRadius: '8px', fontSize: '12px', color: 'var(--fg)' }
export const CHART_COLORS = ['var(--chart-1)', 'var(--chart-2)']
const CHART_COLORS_RAW_LIGHT = ['#0d9488', '#8b5cf6']
const CHART_COLORS_RAW_DARK = ['#2dd4bf', '#a78bfa']

// Custom label renderer for pie chart — shows amount next to each arc
function renderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, value, name }: any) {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 28
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const anchor = x > cx ? 'start' : 'end'
  const formatted = value >= 10000000 ? `₹${(value / 10000000).toFixed(2)}Cr` :
                    value >= 100000 ? `₹${(value / 100000).toFixed(2)}L` :
                    `₹${formatINR(value)}`

  return (
    <text x={x} y={y} fill="var(--fg-muted)" textAnchor={anchor} dominantBaseline="central" style={{ fontSize: '11px', fontWeight: 600 }}>
      {formatted}
    </text>
  )
}

// ─── Responsive Slider + Input ───
export function Slider({ label, value, set, min, max, step, fmt }: {
  label: string; value: number; set: (v: number) => void;
  min: number; max: number; step: number; fmt: 'currency' | 'percent' | 'years' | 'months' | 'number'
}) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const display = fmt === 'currency' ? `₹${formatINR(value)}` : fmt === 'percent' ? `${value}%` : fmt === 'years' ? `${value} yr` : fmt === 'months' ? `${value} mo` : formatINR(value)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>{label}</label>
        <input
          type="text"
          inputMode="decimal"
          className="text-sm font-semibold text-right tabular-nums bg-transparent border-none outline-none w-32"
          style={{ color: 'var(--fg)' }}
          value={editing ? editValue : display}
          onChange={(e) => {
            if (editing) {
              // Allow free typing — no clamping during edit
              setEditValue(e.target.value)
            }
          }}
          onFocus={(e) => {
            setEditing(true)
            setEditValue(String(value))
            setTimeout(() => e.target.select(), 0)
          }}
          onBlur={() => {
            setEditing(false)
            const raw = editValue.replace(/[^0-9.]/g, '')
            const num = parseFloat(raw)
            if (!isNaN(num) && num >= min) {
              set(Math.min(max, Math.round(num / step) * step))
            }
            // If invalid or below min, revert to current value (no change)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              (e.target as HTMLInputElement).blur()
            }
          }}
        />
      </div>
      {/* Slider: hidden on mobile */}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="hidden md:block"
      />
    </div>
  )
}

// ─── StatCard ───
export function StatCard({ label, value, accent, prefix = '₹' }: { label: string; value: number; accent?: 'primary' | 'secondary'; prefix?: string }) {
  const color = accent === 'primary' ? 'var(--accent)' : accent === 'secondary' ? 'var(--accent2)' : 'var(--fg)'
  return (
    <div className="glass-card p-4">
      <p className="text-xs mb-1" style={{ color: 'var(--fg-muted)' }}>{label}</p>
      <p className="text-lg font-bold tabular-nums" style={{ color }}>{prefix}{formatINR(value)}</p>
    </div>
  )
}

// ─── Calculate Button ───
export function CalculateButton({ onClick, label = 'Calculate' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
      style={{
        background: 'var(--accent)',
        color: 'var(--accent-fg)',
        boxShadow: '0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px color-mix(in srgb, var(--accent) 40%, transparent)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)' }}
    >
      <Calculator className="w-4 h-4" />
      {label}
    </button>
  )
}

// ─── Chart Wrapper with Simple/Detailed toggle ───
export function ChartSection({ pieData, detailedData, areaData, areaDataKey, gradientId, gradientColor, areaLabel = 'Growth' }: {
  pieData: { name: string; value: number }[]
  detailedData?: { year: number; principal: number; interest: number }[]
  areaData?: { year: number; [key: string]: number }[]
  areaDataKey?: string
  gradientId?: string
  gradientColor?: string
  areaLabel?: string
}) {
  const [detailed, setDetailed] = useState(false)

  // Determine if we have data for detailed view — prefer detailedData (stacked principal/interest)
  const hasDetailed = (detailedData && detailedData.length > 0) || (areaData && areaData.length > 0)

  return (
    <div className="glass-card p-5 h-[380px] flex flex-col chart-animate" key={detailed ? 'detail' : 'simple'}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>
          {detailed ? areaLabel : 'Breakdown'}
        </h3>
        {hasDetailed && (
          <button onClick={() => setDetailed(!detailed)} className="flex items-center gap-1 text-xs transition-colors" style={{ color: 'var(--accent)' }}>
            {detailed ? 'Simple' : 'Detailed'} <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0">
        {!detailed ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={800}
                label={renderPieLabel}
                labelLine={false}
              >
                {pieData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i]} />))}
              </Pie>
              <RechartsTooltip formatter={(v: number) => `₹${formatINR(v)}`} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--fg-muted)' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : detailedData && detailedData.length > 0 ? (
          // Stacked area chart showing year-on-year principal vs interest
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={detailedData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`${gradientId || 'det'}_principal`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id={`${gradientId || 'det'}_interest`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
              <XAxis dataKey="year" stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-subtle)', fontSize: 11 }} />
              <YAxis stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-subtle)', fontSize: 11 }} tickFormatter={(v) => v >= 10000000 ? `${(v/10000000).toFixed(1)}Cr` : `${(v/100000).toFixed(0)}L`} />
              <RechartsTooltip
                formatter={(v: number, name: string) => [`₹${formatINR(v)}`, name]}
                labelFormatter={(l) => `Year ${l}`}
                contentStyle={tooltipStyle}
              />
              <Area type="monotone" dataKey="principal" name="Principal" stackId="1" stroke="var(--chart-1)" strokeWidth={2} fill={`url(#${gradientId || 'det'}_principal)`} animationBegin={0} animationDuration={800} />
              <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke="var(--chart-2)" strokeWidth={2} fill={`url(#${gradientId || 'det'}_interest)`} animationBegin={0} animationDuration={800} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--fg-muted)' }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : areaData && areaDataKey && gradientId && gradientColor ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={gradientColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
              <XAxis dataKey="year" stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-subtle)', fontSize: 11 }} />
              <YAxis stroke="var(--fg-subtle)" tick={{ fill: 'var(--fg-subtle)', fontSize: 11 }} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
              <RechartsTooltip formatter={(v: number) => `₹${formatINR(v)}`} labelFormatter={(l) => `Year ${l}`} contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey={areaDataKey} stroke={gradientColor} strokeWidth={2} fill={`url(#${gradientId})`} animationBegin={0} animationDuration={800} />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  )
}

// ─── Table with Download ───
export function DataTable({ columns, rows, filename }: {
  columns: string[]
  rows: (string | number)[][]
  filename: string
}) {
  const download = useCallback(() => {
    const csv = [columns.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${filename}.csv`; a.click()
    URL.revokeObjectURL(url)
  }, [columns, rows, filename])

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--card-border)' }}>
        <h3 className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>Schedule</h3>
        <button onClick={download} className="flex items-center gap-1.5 text-xs font-medium transition-colors" style={{ color: 'var(--accent)' }}>
          <Download className="w-3 h-3" /> Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--card-border)' }}>
              {columns.map((c) => (
                <th key={c} className="px-5 py-3 font-medium" style={{ color: 'var(--fg-muted)' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b transition-colors" style={{ borderColor: 'var(--card-border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--glass-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {r.map((cell, j) => (
                  <td key={j} className="px-5 py-3 tabular-nums" style={{ color: j === 0 ? 'var(--fg)' : 'var(--fg-muted)' }}>{typeof cell === 'number' ? `₹${formatINR(cell)}` : cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Educational Content ───
export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>{title}</h3>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--fg-subtle)' }} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed space-y-3" style={{ color: 'var(--fg-muted)' }}>
          {children}
        </div>
      )}
    </div>
  )
}
