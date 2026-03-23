'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function RdCalc() {
  const { logCalculation } = useCalculation('rd')
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { maturity, interest, totalInvested, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { maturity: 0, interest: 0, totalInvested: 0, chartData: [], detailedData: [] }
    const months = years * 12, qr = rate / 400; let mat = 0
    for (let i = 1; i <= months; i++) { mat += monthly * Math.pow(1 + qr, (months - i + 1) / 3) }
    const inv = monthly * months
    const data = [], detailed = []
    for (let yr = 1; yr <= years; yr++) {
      const m = yr * 12; let v = 0
      for (let i = 1; i <= m; i++) { v += monthly * Math.pow(1 + qr, (m - i + 1) / 3) }
      const invested = monthly * m
      data.push({ year: yr, invested, value: Math.round(v) })
      detailed.push({ year: yr, principal: invested, interest: Math.round(v - invested) })
    }
    return { maturity: Math.round(mat), interest: Math.round(mat - inv), totalInvested: inv, chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ monthly, rate, years })
  }

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Monthly Deposit" value={monthly} set={setMonthly} min={500} max={100000} step={500} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={1} max={12} step={0.25} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={1} max={10} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} detailedData={detailedData} gradientId="rdGrad" areaLabel="Year-on-Year Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label="Maturity" value={maturity} accent="primary" />
          </div>
          <DataTable columns={['Year','Invested','Value']} rows={chartData.map(r => [String(r.year), r.invested, r.value])} filename="rd-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="rd" />
    </div>
  )
}
