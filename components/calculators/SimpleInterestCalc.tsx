'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SimpleInterestCalc() {
  const { logCalculation } = useCalculation('simple-interest')
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { interest, total } = useMemo(() => {
    if (!calculated) return { interest: 0, total: 0 }
    const si = (principal * rate * years) / 100
    return { interest: Math.round(si), total: Math.round(principal + si) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, years })
  }

  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Principal" value={principal} set={setPrincipal} min={1000} max={10000000} step={1000} fmt="currency" />
          <Slider label="Rate of Interest (p.a.)" value={rate} set={setRate} min={1} max={30} step={0.5} fmt="percent" />
          <Slider label="Time Period" value={years} set={setYears} min={1} max={30} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} />}
      </div>
      {calculated && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Principal" value={principal} />
          <StatCard label="Interest" value={interest} accent="secondary" />
          <StatCard label="Total" value={total} accent="primary" />
        </div>
      )}
      <CalculatorInfoSections calcKey="simple-interest" />
    </div>
  )
}
