'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function FdCalc() {
  const { logCalculation } = useCalculation('fd')
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [compFreq, setCompFreq] = useState(4)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { maturity, interest, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { maturity: 0, interest: 0, chartData: [], detailedData: [] }
    const data = [], detailed = []
    for (let yr = 1; yr <= years; yr++) {
      const amt = principal * Math.pow(1 + (rate/100)/compFreq, compFreq * yr)
      const int = Math.round(amt - principal)
      data.push({ year: yr, total: Math.round(amt), principal, interest: int })
      detailed.push({ year: yr, principal, interest: int })
    }
    const mat = data[data.length-1]?.total || principal
    return { maturity: mat, interest: mat - principal, chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, years, compFreq })
  }

  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Deposit Amount" value={principal} set={setPrincipal} min={10000} max={10000000} step={10000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={1} max={15} step={0.25} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={1} max={10} step={1} fmt="years" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Compounding</label>
            <select className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }} value={compFreq} onChange={(e) => setCompFreq(Number(e.target.value))}>
              <option value={1}>Annually</option><option value={2}>Half-Yearly</option><option value={4}>Quarterly</option><option value={12}>Monthly</option>
            </select>
          </div>
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} detailedData={detailedData} gradientId="fdGrad" areaLabel="Year-on-Year Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Principal" value={principal} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label="Maturity" value={maturity} accent="primary" />
          </div>
          <DataTable columns={['Year','Principal','Interest','Total']} rows={chartData.map(r => [String(r.year), r.principal, r.interest, r.total])} filename="fd-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="fd" />
    </div>
  )
}
