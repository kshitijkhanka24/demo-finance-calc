'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SwpCalc() {
  const { logCalculation } = useCalculation('swp')
  const [corpus, setCorpus] = useState(1000000)
  const [withdrawal, setWithdrawal] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { finalValue, totalWithdrawn, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { finalValue: 0, totalWithdrawn: 0, chartData: [], detailedData: [] }
    const mr = (rate/12)/100, months = years*12; let bal = corpus; const data = [], detailed = []
    let cumWithdrawn = 0
    for (let m = 1; m <= months; m++) {
      bal = bal * (1+mr) - withdrawal
      if (bal < 0) bal = 0
      cumWithdrawn += withdrawal
      if (m % 12 === 0 || m === months) {
        data.push({ year: Math.ceil(m/12), balance: Math.round(bal) })
        detailed.push({ year: Math.ceil(m/12), principal: Math.round(bal), interest: Math.round(cumWithdrawn) })
      }
    }
    return { finalValue: Math.round(bal), totalWithdrawn: withdrawal * months, chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ corpus, withdrawal, rate, years })
  }

  const pieData = [{ name: 'Remaining', value: Math.max(0, finalValue) }, { name: 'Withdrawn', value: totalWithdrawn }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Total Investment" value={corpus} set={setCorpus} min={50000} max={50000000} step={50000} fmt="currency" />
          <Slider label="Monthly Withdrawal" value={withdrawal} set={setWithdrawal} min={500} max={500000} step={500} fmt="currency" />
          <Slider label="Expected Return (p.a.)" value={rate} set={setRate} min={5} max={30} step={0.5} fmt="percent" />
          <Slider label="Period" value={years} set={setYears} min={1} max={50} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="swp-chart" pieData={pieData} detailedData={detailedData} gradientId="swpGrad" areaLabel="Balance vs Withdrawn" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Total Withdrawn" value={totalWithdrawn} prefix="₹" />
            <StatCard label="Remaining Corpus" value={Math.max(0, finalValue)} accent="primary" />
            <StatCard label="Investment" value={corpus} />
          </div>
          <DataTable 
            columns={['Year','Balance']} 
            rows={chartData.map(r => [String(r.year), r.balance])} 
            filename="swp-report"
            calcKey="swp"
            chartId="swp-chart"
            inputs={[
              { label: 'Total Investment', value: corpus },
              { label: 'Monthly Withdrawal', value: withdrawal },
              { label: 'Expected Return', value: `${rate}%` },
              { label: 'Period', value: `${years} Years` }
            ]}
            outputs={[
              { label: 'Total Withdrawn', value: totalWithdrawn },
              { label: 'Remaining Corpus', value: Math.max(0, finalValue) },
              { label: 'Investment', value: corpus }
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="swp" />
    </div>
  )
}
