'use client'

import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function CompoundInterestCalc() {
  const { logCalculation } = useCalculation('compound-interest')

  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)
  const [compFreq, setCompFreq] = useState(1)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

  const { totalAmount, totalInterest, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { totalAmount: 0, totalInterest: 0, chartData: [], detailedData: [] }
    const pr = (rate / 100) / compFreq
    const data = []
    const detailed = []
    for (let yr = 1; yr <= years; yr++) {
      const amt = principal * Math.pow(1 + pr, yr * compFreq)
      const interest = Math.round(amt - principal)
      data.push({ year: yr, principal, interest, total: Math.round(amt) })
      detailed.push({ year: yr, principal, interest })
    }
    const final = data[data.length - 1]?.total || principal
    return { totalAmount: final, totalInterest: final - principal, chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, years, compFreq, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedAmount = useMemo(() => calculated && inflationEnabled ? calculateInflationAdjusted(totalAmount, inflationRate, years) : totalAmount, [calculated, inflationEnabled, inflationRate, years, totalAmount])

  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: totalInterest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Principal Amount" value={principal} set={setPrincipal} min={10000} max={10000000} step={10000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={30} step={0.5} fmt="percent" />
          <Slider label="Time Period" value={years} set={setYears} min={2} max={30} step={1} fmt="years" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>Compounding</label>
            <select className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--fg)' }} value={compFreq} onChange={(e) => setCompFreq(Number(e.target.value))}>
              <option value={1}>Annually</option><option value={2}>Half-Yearly</option><option value={4}>Quarterly</option><option value={12}>Monthly</option>
            </select>
          </div>
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="ci-chart" pieData={pieData} detailedData={detailedData} gradientId="ciGrad" areaLabel="Year-on-Year Growth" />}
      </div>

      {calculated && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Principal" value={principal} />
            <StatCard label="Interest Earned" value={totalInterest} accent="secondary" />
            <StatCard label={inflationEnabled ? "Total" : "Total Amount"} value={totalAmount} accent="primary" />
            {inflationEnabled && (
              <StatCard label="Adjusted Total" value={adjustedAmount} accent="primary" />
            )}
          </div>
          <DataTable
            columns={['Year', 'Principal', 'Interest', 'Total']}
            rows={chartData.map(r => [String(r.year), r.principal, r.interest, r.total])}
            filename="compound-interest-report"
            calcKey="compound-interest"
            chartId="ci-chart"
            inputs={[
              { label: 'Principal Amount', value: principal },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Time Period', value: `${years} Years` },
              { label: 'Compounding Frequency', value: compFreq === 1 ? 'Annually' : compFreq === 2 ? 'Half-Yearly' : compFreq === 4 ? 'Quarterly' : 'Monthly' }
            ]}
            outputs={[
              { label: 'Principal', value: principal },
              { label: 'Interest Earned', value: totalInterest },
              { label: 'Total Amount', value: totalAmount },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedAmount }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="compound-interest" />
    </div>
  )
}
