'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function RdCalc() {
  const { logCalculation } = useCalculation('rd')
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [submittedYears, setSubmittedYears] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

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
    setSubmittedYears(years)
    logCalculation({ monthly, rate, years, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedMaturity = useMemo(
    () => (calculated && inflationEnabled && submittedYears > 0)
      ? calculateInflationAdjusted(maturity, inflationRate, submittedYears)
      : maturity,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calculated, inflationEnabled, inflationRate, submittedYears, maturity]
  )


  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Monthly Deposit" value={monthly} set={setMonthly} min={10000} max={1000000} step={10000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={30} step={0.5} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={2} max={30} step={1} fmt="years" />
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="rd-chart" pieData={pieData} detailedData={detailedData} gradientId="rdGrad" areaLabel="Year-on-Year Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            filename="rd-report" 
            calcKey="rd"
            chartId="rd-chart"
            inputs={[
              { label: 'Monthly Deposit', value: monthly },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Tenure', value: `${years} Years` }
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
      <CalculatorInfoSections calcKey="rd" />
    </div>
  )
}
