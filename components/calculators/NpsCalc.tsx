'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function NpsCalc() {
  const { logCalculation } = useCalculation('nps')
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(25)
  const [annuityRate, setAnnuityRate] = useState(6)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { totalCorpus, totalInvested, lumpsum, annuityValue, monthlyPension, chartData } = useMemo(() => {
    if (!calculated) return { totalCorpus: 0, totalInvested: 0, lumpsum: 0, annuityValue: 0, monthlyPension: 0, chartData: [] }
    const mr = (rate/12)/100, months = years * 12; const data = []; let amt = 0
    for (let m = 1; m <= months; m++) {
      amt = (amt + monthly) * (1 + mr)
      if (m % 12 === 0) data.push({ year: m/12, value: Math.round(amt) })
    }
    const inv = monthly * months, ls = amt * 0.6, an = amt * 0.4, mp = (an * (annuityRate/100)) / 12
    return { totalCorpus: Math.round(amt), totalInvested: inv, lumpsum: Math.round(ls), annuityValue: Math.round(an), monthlyPension: Math.round(mp), chartData: data }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ monthly, rate, years, annuityRate })
  }

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Returns', value: totalCorpus - totalInvested }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Monthly Contribution" value={monthly} set={setMonthly} min={500} max={50000} step={500} fmt="currency" />
          <Slider label="Expected Return (p.a.)" value={rate} set={setRate} min={5} max={15} step={0.5} fmt="percent" />
          <Slider label="Investment Period" value={years} set={setYears} min={5} max={40} step={1} fmt="years" />
          <Slider label="Annuity Rate" value={annuityRate} set={setAnnuityRate} min={1} max={10} step={0.5} fmt="percent" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} areaData={chartData} areaDataKey="value" gradientId="npsGrad" gradientColor="var(--chart-2)" areaLabel="Corpus Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total Corpus" value={totalCorpus} accent="primary" />
            <StatCard label="Lumpsum (60%)" value={lumpsum} />
            <StatCard label="Annuity (40%)" value={annuityValue} />
            <StatCard label="Monthly Pension" value={monthlyPension} accent="secondary" />
          </div>
          <DataTable columns={['Year','Corpus Value']} rows={chartData.map(r => [String(r.year), r.value])} filename="nps-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="nps" />
    </div>
  )
}
