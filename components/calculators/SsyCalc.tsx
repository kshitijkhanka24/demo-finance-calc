'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SsyCalc() {
  const { logCalculation } = useCalculation('ssy')
  const [yearly, setYearly] = useState(50000)
  const [rate, setRate] = useState(8.2)
  const [girlAge, setGirlAge] = useState(1)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  // Deposit for 14 years, compound for 7 more = 21 years total
  const { maturityAt21, totalInvested, interest, chartData } = useMemo(() => {
    if (!calculated) return { maturityAt21: 0, totalInvested: 0, interest: 0, chartData: [] }
    const r = rate / 100, inv = yearly * 14; const data = []
    let amt = 0
    // Phase 1: 14 years deposits
    for (let yr = 1; yr <= 14; yr++) {
      amt = (amt + yearly) * (1 + r)
      data.push({ year: yr, invested: yearly * yr, value: Math.round(amt) })
    }
    // Phase 2: 7 years compounding without deposits
    for (let yr = 15; yr <= 21; yr++) {
      amt = amt * (1 + r)
      data.push({ year: yr, invested: inv, value: Math.round(amt) })
    }
    return { maturityAt21: Math.round(amt), totalInvested: inv, interest: Math.round(amt - inv), chartData: data }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ yearly, rate, girlAge })
  }

  const maturityYear = new Date().getFullYear() + (21 - girlAge)
  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Yearly Deposit" value={yearly} set={setYearly} min={250} max={150000} step={1000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={7} max={10} step={0.1} fmt="percent" />
          <Slider label="Girl's Age" value={girlAge} set={setGirlAge} min={0} max={10} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} areaData={chartData} areaDataKey="value" gradientId="ssyGrad" gradientColor="var(--chart-2)" areaLabel="Corpus Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label="Maturity (Year 21)" value={maturityAt21} accent="primary" />
            <div className="glass-card p-4"><p className="text-xs mb-1" style={{ color: 'var(--fg-muted)' }}>Maturity Year</p><p className="text-lg font-bold" style={{ color: 'var(--fg)' }}>{maturityYear}</p></div>
          </div>
          <DataTable columns={['Year','Invested','Corpus']} rows={chartData.map(r => [String(r.year), r.invested, r.value])} filename="ssy-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="ssy" />
    </div>
  )
}
