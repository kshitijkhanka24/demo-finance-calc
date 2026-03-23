'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function PpfCalc() {
  const { logCalculation } = useCalculation('ppf')
  const [yearly, setYearly] = useState(100000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { maturity, totalInvested, interest, chartData } = useMemo(() => {
    if (!calculated) return { maturity: 0, totalInvested: 0, interest: 0, chartData: [] }
    const r = rate / 100, inv = yearly * years; const data = []
    let amt = 0
    for (let yr = 1; yr <= years; yr++) {
      amt = (amt + yearly) * (1 + r)
      data.push({ year: yr, invested: yearly * yr, value: Math.round(amt) })
    }
    return { maturity: Math.round(amt), totalInvested: inv, interest: Math.round(amt - inv), chartData: data }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ yearly, rate, years })
  }

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Yearly Deposit" value={yearly} set={setYearly} min={500} max={150000} step={1000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={10} step={0.1} fmt="percent" />
          <Slider label="Period" value={years} set={setYears} min={15} max={50} step={5} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} areaData={chartData} areaDataKey="value" gradientId="ppfGrad" gradientColor="var(--chart-2)" areaLabel="Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label="Maturity" value={maturity} accent="primary" />
          </div>
          <DataTable columns={['Year','Invested','Value']} rows={chartData.map(r => [String(r.year), r.invested, r.value])} filename="ppf-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="ppf" />
    </div>
  )
}
