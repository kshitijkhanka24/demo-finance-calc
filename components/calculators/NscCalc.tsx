'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function NscCalc() {
  const { logCalculation } = useCalculation('nsc')
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7.7)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { maturity, interest, chartData } = useMemo(() => {
    if (!calculated) return { maturity: 0, interest: 0, chartData: [] }
    const data = []
    for (let yr = 1; yr <= years; yr++) {
      const amt = principal * Math.pow(1 + rate/100, yr)
      data.push({ year: yr, total: Math.round(amt) })
    }
    const mat = data[data.length-1]?.total || principal
    return { maturity: mat, interest: mat - principal, chartData: data }
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
          <Slider label="Investment Amount" value={principal} set={setPrincipal} min={1000} max={5000000} step={1000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={10} step={0.1} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={5} max={10} step={5} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} areaData={chartData} areaDataKey="total" gradientId="nscGrad" gradientColor="var(--chart-2)" areaLabel="Growth" />}
      </div>
      {calculated && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Principal" value={principal} />
          <StatCard label="Interest" value={interest} accent="secondary" />
          <StatCard label="Maturity" value={maturity} accent="primary" />
        </div>
      )}
      <CalculatorInfoSections calcKey="nsc" />
    </div>
  )
}
