'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SsyCalc() {
  const { logCalculation } = useCalculation('ssy')
  const [yearly, setYearly] = useState(50000)
  const [rate] = useState(8.2)
  const [girlAge, setGirlAge] = useState(1)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

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
    logCalculation({ yearly, rate, girlAge, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedMaturity = useMemo(() => calculated && inflationEnabled ? calculateInflationAdjusted(maturityAt21, inflationRate, 21) : maturityAt21, [calculated, inflationEnabled, inflationRate, maturityAt21])

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]
  const maturityYear = new Date().getFullYear() + (21 - girlAge)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Yearly Deposit" value={yearly} set={setYearly} min={250} max={150000} step={250} fmt="currency" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Interest Rate (p.a.)</label>
            <div className="w-full rounded-lg px-3 py-2.5 text-sm font-semibold" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}>
              8.2% (Fixed)
            </div>
          </div>
          <Slider label="Girl's Age" value={girlAge} set={setGirlAge} min={0} max={10} step={1} fmt="years" />
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="ssy-chart" pieData={pieData} areaData={chartData} areaDataKey="value" gradientId="ssyGrad" gradientColor="var(--chart-2)" areaLabel="Corpus Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label="Maturity (Year 21)" value={maturityAt21} accent="primary" />
            <div className="glass-card p-4"><p className="text-xs mb-1" style={{ color: 'var(--fg-muted)' }}>Maturity Year</p><p className="text-lg font-bold" style={{ color: 'var(--fg)' }}>{maturityYear}</p></div>
            {inflationEnabled && (
              <StatCard label="Adjusted Maturity" value={adjustedMaturity} accent="primary" />
            )}
          </div>
          <DataTable 
            columns={['Year','Invested','Corpus']} 
            rows={chartData.map(r => [String(r.year), r.invested, r.value])} 
            filename="ssy-report" 
            calcKey="ssy"
            chartId="ssy-chart"
            inputs={[
              { label: 'Yearly Deposit', value: yearly },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: "Girl's Age", value: `${girlAge} Years` }
            ]}
            outputs={[
              { label: 'Invested', value: totalInvested },
              { label: 'Interest', value: interest },
              { label: 'Maturity (Year 21)', value: maturityAt21 },
              { label: 'Maturity Year', value: maturityYear },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedMaturity }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="ssy" />
    </div>
  )
}
