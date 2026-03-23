'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function OverdraftCalc() {
  const { logCalculation } = useCalculation('overdraft')
  const [amount, setAmount] = useState(200000)
  const [rate, setRate] = useState(12)
  const [days, setDays] = useState(30)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { dailyInterest, totalInterest, totalPayable } = useMemo(() => {
    if (!calculated) return { dailyInterest: 0, totalInterest: 0, totalPayable: 0 }
    const di = (amount * (rate / 100)) / 365
    const ti = di * days
    return { dailyInterest: Math.round(di), totalInterest: Math.round(ti), totalPayable: Math.round(amount + ti) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ amount, rate, days })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Overdraft Amount" value={amount} set={setAmount} min={10000} max={5000000} step={10000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={24} step={0.5} fmt="percent" />
          <Slider label="Number of Days" value={days} set={setDays} min={1} max={365} step={1} fmt="number" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && (
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Daily Interest</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent2)' }}>₹{formatINR(dailyInterest)}</p>
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Total Interest ({days} days)</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>₹{formatINR(totalInterest)}</p>
            </div>
          </div>
        )}
      </div>
      {calculated && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Principal" value={amount} />
          <StatCard label="Interest" value={totalInterest} accent="secondary" />
          <StatCard label="Total Payable" value={totalPayable} accent="primary" />
        </div>
      )}
      <CalculatorInfoSections calcKey="overdraft" />
    </div>
  )
}
