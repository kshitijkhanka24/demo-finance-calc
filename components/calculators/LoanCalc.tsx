'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function LoanCalc({ id, title, defaultPrincipal = 500000, defaultRate = 10, defaultYears = 5, maxP = 10000000 }: {
  id: string; title: string; defaultPrincipal?: number; defaultRate?: number; defaultYears?: number; maxP?: number
}) {
  const { logCalculation } = useCalculation(id)
  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [rate, setRate] = useState(defaultRate)
  const [years, setYears] = useState(defaultYears)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { emi, totalPayment, totalInterest, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { emi: 0, totalPayment: 0, totalInterest: 0, chartData: [], detailedData: [] }
    const mr = (rate / 12) / 100, n = years * 12
    let e = mr === 0 ? principal / n : principal * ((mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1))
    if (isNaN(e) || !isFinite(e)) e = 0
    const data = [], detailed = []; let rem = principal, cumI = 0, cumP = 0, totalCumI = 0, totalCumP = 0
    for (let m = 1; m <= n; m++) {
      const im = rem * mr, pm = e - im; rem = Math.max(0, rem - pm); cumI += im; cumP += pm; totalCumI += im; totalCumP += pm
      if (m % 12 === 0 || m === n) {
        data.push({ year: Math.ceil(m/12), balance: Math.round(rem), interestPaid: Math.round(cumI), principalPaid: Math.round(cumP) })
        detailed.push({ year: Math.ceil(m/12), principal: Math.round(totalCumP), interest: Math.round(totalCumI) })
        cumI = 0; cumP = 0
      }
    }
    return { emi: Math.round(e), totalPayment: Math.round(e*n), totalInterest: Math.max(0, Math.round(e*n - principal)), chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, years })
  }

  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: totalInterest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Loan Amount" value={principal} set={setPrincipal} min={10000} max={maxP} step={10000} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={1} max={30} step={0.5} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={1} max={30} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} detailedData={detailedData} gradientId={`${id}Grad`} areaLabel="Cumulative Payments" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Monthly EMI" value={emi} />
            <StatCard label="Total Interest" value={totalInterest} accent="secondary" />
            <StatCard label="Total Payment" value={totalPayment} accent="primary" />
          </div>
          <DataTable columns={['Year','Principal Paid','Interest Paid','Balance']} rows={chartData.map(r => [String(r.year), r.principalPaid, r.interestPaid, r.balance])} filename={`${id}-report`} />
        </>
      )}
      <CalculatorInfoSections calcKey={id} />
    </div>
  )
}
