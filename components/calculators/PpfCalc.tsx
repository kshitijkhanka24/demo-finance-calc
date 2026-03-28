'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function PpfCalc() {
  const { logCalculation } = useCalculation('ppf')
  const [yearly, setYearly] = useState(100000)
  const [rate] = useState(7.1)
  const [years, setYears] = useState(15)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

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
    logCalculation({ yearly, rate, years, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedMaturity = useMemo(() => calculated && inflationEnabled ? calculateInflationAdjusted(maturity, inflationRate, years) : maturity, [calculated, inflationEnabled, inflationRate, years, maturity])

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Yearly Deposit" value={yearly} set={setYearly} min={500} max={150000} step={500} fmt="currency" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Interest Rate (p.a.)</label>
            <div className="w-full rounded-lg px-3 py-2.5 text-sm font-semibold" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}>
              7.1% (Fixed)
            </div>
          </div>
          <Slider label="Period" value={years} set={setYears} min={15} max={40} step={1} fmt="years" />
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="ppf-chart" pieData={pieData} areaData={chartData} areaDataKey="value" gradientId="ppfGrad" gradientColor="var(--chart-2)" areaLabel="Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label={inflationEnabled ? "Maturity" : "Maturity"} value={maturity} accent="primary" />
            {inflationEnabled && (
              <StatCard label="Adjusted Maturity" value={adjustedMaturity} accent="primary" />
            )}
          </div>
          <DataTable 
            columns={['Year','Invested','Value']} 
            rows={chartData.map(r => [String(r.year), r.invested, r.value])} 
            filename="ppf-report"
            calcKey="ppf"
            chartId="ppf-chart"
            inputs={[
              { label: 'Yearly Deposit', value: yearly },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Period', value: `${years} Years` }
            ]}
            outputs={[
              { label: 'Invested', value: totalInvested },
              { label: 'Interest', value: interest },
              { label: 'Maturity', value: maturity },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedMaturity }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="ppf" />
    </div>
  )
}
