'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function NscCalc() {
  const { logCalculation } = useCalculation('nsc')
  const [principal, setPrincipal] = useState(100000)
  const [rate] = useState(7.7)
  const [years] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [submittedYears, setSubmittedYears] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

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
    setSubmittedYears(years)
    logCalculation({ principal, rate, years, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedMaturity = useMemo(
    () => (calculated && inflationEnabled && submittedYears > 0)
      ? calculateInflationAdjusted(maturity, inflationRate, submittedYears)
      : maturity,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calculated, inflationEnabled, inflationRate, submittedYears, maturity]
  )


  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Investment Amount" value={principal} set={setPrincipal} min={10000} max={1000000} step={500} fmt="currency" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Interest Rate (p.a.)</label>
            <div className="w-full rounded-lg px-3 py-2.5 text-sm font-semibold" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}>
              7.7% (Fixed)
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Tenure</label>
            <div className="w-full rounded-lg px-3 py-2.5 text-sm font-semibold" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }}>
              5 Years (Fixed)
            </div>
          </div>
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="nsc-chart" pieData={pieData} areaData={chartData} areaDataKey="total" gradientId="nscGrad" gradientColor="var(--chart-2)" areaLabel="Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Principal" value={principal} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label={inflationEnabled ? "Maturity" : "Maturity"} value={maturity} accent="primary" />
            {inflationEnabled && (
              <StatCard label="Adjusted Maturity" value={adjustedMaturity} accent="primary" />
            )}
          </div>
          <DataTable 
            columns={['Year','Value']} 
            rows={chartData.map(r => [String(r.year), r.total])} 
            filename="nsc-report" 
            calcKey="nsc"
            chartId="nsc-chart"
            inputs={[
              { label: 'Investment Amount', value: principal },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Tenure', value: `${years} Years` }
            ]}
            outputs={[
              { label: 'Principal', value: principal },
              { label: 'Interest', value: interest },
              { label: 'Maturity', value: maturity },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedMaturity }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="nsc" />
    </div>
  )
}
