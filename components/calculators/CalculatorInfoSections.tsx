'use client'

import { Info, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import { calculatorContent } from '@/lib/calculator-content'

export function CalculatorInfoSections({ calcKey }: { calcKey: string }) {
  const c = calculatorContent[calcKey]
  if (!c) return null

  return (
    <div className="mt-10 space-y-6">

      {/* ── What is X? ── */}
      <section className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg" style={{ background: 'var(--accent-bg, rgba(99,102,241,0.1))' }}>
            <Info size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--fg)' }}>
            What is {c.title}?
          </h2>
        </div>
        <div className="space-y-3">
          {c.whatIsIt.map((p, i) => (
            <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{p}</p>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg" style={{ background: 'var(--accent2-bg, rgba(168,85,247,0.1))' }}>
            <Zap size={22} style={{ color: 'var(--accent2)' }} />
          </div>
          <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--fg)' }}>
            How {c.title} Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {c.howItWorks.text.map((p, i) => (
              <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{p}</p>
            ))}
          </div>
          <div className="space-y-3">
            {c.howItWorks.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                <div>
                  <p className="font-semibold text-sm md:text-base" style={{ color: 'var(--fg)' }}>{pt.title}</p>
                  <p className="text-xs md:text-sm" style={{ color: 'var(--fg-muted)' }}>{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculation Method ── */}
      {c.formula && (
        <section className="glass-card p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-5" style={{ color: 'var(--fg)' }}>Calculation Method</h2>
          <div className="rounded-xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, var(--accent-bg, rgba(99,102,241,0.06)), var(--accent2-bg, rgba(168,85,247,0.06)))', border: '1px solid var(--card-border)' }}>
            <p className="text-sm md:text-base font-semibold mb-3" style={{ color: 'var(--fg)' }}>Formula:</p>
            <div className="font-mono text-sm md:text-base p-4 rounded-lg overflow-x-auto whitespace-pre-line" style={{ background: 'var(--card-bg)', color: 'var(--fg)', border: '1px solid var(--card-border)' }}>
              {c.formula.formula}
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs md:text-sm font-semibold mb-2" style={{ color: 'var(--fg)' }}>Where:</p>
                <ul className="text-xs md:text-sm space-y-1" style={{ color: 'var(--fg-muted)' }}>
                  {c.formula.variables.map((v, i) => (
                    <li key={i}><span className="font-semibold" style={{ color: 'var(--fg)' }}>{v.symbol}</span> = {v.meaning}</li>
                  ))}
                </ul>
              </div>
              {c.formula.assumptions && c.formula.assumptions.length > 0 && (
                <div>
                  <p className="text-xs md:text-sm font-semibold mb-2" style={{ color: 'var(--fg)' }}>Assumptions:</p>
                  <ul className="text-xs md:text-sm space-y-1" style={{ color: 'var(--fg-muted)' }}>
                    {c.formula.assumptions.map((a, i) => (
                      <li key={i}>✓ {a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Key Benefits ── */}
      {c.benefits.length > 0 && (
        <section className="glass-card p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-5" style={{ color: 'var(--fg)' }}>Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-xl p-4 transition-colors"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--card-border)')}
              >
                <p className="font-semibold text-sm md:text-base mb-1" style={{ color: 'var(--fg)' }}>{b.title}</p>
                <p className="text-xs md:text-sm" style={{ color: 'var(--fg-muted)' }}>{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Disclaimer ── */}
      <section className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="flex-shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
          <div>
            <h2 className="text-base md:text-lg font-bold mb-2" style={{ color: 'var(--fg)' }}>Important Disclaimer</h2>
            {c.disclaimer.map((p, i) => (
              <p key={i} className="text-sm md:text-base leading-relaxed mb-2" style={{ color: 'var(--fg-muted)' }}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
