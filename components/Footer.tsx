import Link from 'next/link'
import { Activity, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-12 mt-12" style={{ borderColor: 'var(--card-border)', background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Activity className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
                KYFS <span style={{ color: 'var(--accent)' }}>Finance</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
              Empowering your financial future with precision.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-subtle)' }}>
                <Mail className="w-4 h-4" /> support@kyfs.com
              </p>
              <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-subtle)' }}>
                <Phone className="w-4 h-4" /> +91 98765 43210
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--fg)' }}>Important Disclaimer</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
              All calculators and tools provided by KYFS Finance are for educational and planning purposes only.
              Actual returns, interest rates, and loan terms may vary depending on market conditions, financial institution policies, and other external factors.
              Please consult a certified financial advisor or your respective bank before making any financial decisions based on these calculations.
            </p>
          </div>
        </div>
        <div className="border-t pt-8 text-center" style={{ borderColor: 'var(--card-border)' }}>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
            © 2026 K Y Financial Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
