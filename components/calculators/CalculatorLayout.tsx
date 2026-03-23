import { ReactNode } from 'react'

interface CalculatorLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function CalculatorLayout({ title, description, children }: CalculatorLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>{title}</h1>
        <p className="text-sm max-w-xl" style={{ color: 'var(--fg-muted)' }}>{description}</p>
      </div>
      {children}
    </div>
  )
}
