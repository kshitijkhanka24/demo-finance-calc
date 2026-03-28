'use client'

import Link from 'next/link'
import { ArrowRight, Calculator, BarChart3, Download, Shield } from 'lucide-react'
import { calculatorsList } from '@/lib/data'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-24 max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--fg-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
            22 Financial Calculators
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5" style={{ color: 'var(--fg)' }}>
            Smart money decisions,{' '}
            <span style={{ color: 'var(--accent)' }}>simplified.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--fg-muted)' }}>
            From SIPs to home loans, plan every rupee with precision calculators, visual charts, and downloadable reports — all in one place.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="#calculators" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]" style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>
              Explore Calculators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calculator, title: '22 Calculators', desc: 'Investments, loans, and government schemes' },
            { icon: BarChart3, title: 'Visual Charts', desc: 'Interactive pie & area charts' },
            { icon: Download, title: 'Download Reports', desc: 'Export CSV tables instantly' },
            { icon: Shield, title: 'Privacy First', desc: 'All calculations run locally' },
          ].map((f) => (
            <div key={f.title} className="glass-card p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <f.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--fg)' }}>{f.title}</h3>
              <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator Directory */}
      <section id="calculators" className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="space-y-12">
          {calculatorsList.map((category) => (
            <div key={category.category}>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--fg-subtle)' }}>
                {category.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((calc) => {
                  const Icon = calc.icon
                  return (
                    <Link href={`/calculators/${calc.id}`} key={calc.id} className="group">
                      <div className="glass-card p-4 flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                          <Icon className="w-4 h-4 transition-colors" style={{ color: 'var(--fg-subtle)' }} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold transition-colors" style={{ color: 'var(--fg)' }}>{calc.name}</h3>
                          <p className="text-xs truncate" style={{ color: 'var(--fg-subtle)' }}>{calc.description}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--fg-subtle)' }} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
