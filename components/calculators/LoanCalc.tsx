'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function LoanCalc({ 
  id, title, 
  defaultPrincipal = 500000, minP = 10000, maxP = 10000000, stepP = 10000,
  defaultRate = 10, minR = 1, maxR = 30, stepR = 0.5,
  defaultYears = 5, minY = 1, maxY = 30, stepY = 1
}: {
  id: string; title?: string; 
  defaultPrincipal?: number; minP?: number; maxP?: number; stepP?: number;
  defaultRate?: number; minR?: number; maxR?: number; stepR?: number;
  defaultYears?: number; minY?: number; maxY?: number; stepY?: number;
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
          <Slider label="Loan Amount" value={principal} set={setPrincipal} min={minP} max={maxP} step={stepP} fmt="currency" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={minR} max={maxR} step={stepR} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={minY} max={maxY} step={stepY} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id={`${id}-chart`} pieData={pieData} detailedData={detailedData} gradientId={`${id}Grad`} areaLabel="Cumulative Payments" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Monthly EMI" value={emi} />
            <StatCard label="Total Interest" value={totalInterest} accent="secondary" />
            <StatCard label="Total Payment" value={totalPayment} accent="primary" />
          </div>
          <DataTable 
            columns={['Year','Principal Paid','Interest Paid','Balance']} 
            rows={chartData.map(r => [String(r.year), r.principalPaid, r.interestPaid, r.balance])} 
            filename={`${id}-report`}
            calcKey={id}
            chartId={`${id}-chart`}
            inputs={[
              { label: 'Loan Amount', value: principal },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Tenure', value: `${years} Years` }
            ]}
            outputs={[
              { label: 'Monthly EMI', value: emi },
              { label: 'Total Interest', value: totalInterest },
              { label: 'Total Payment', value: totalPayment }
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey={id} />
    </div>
  )
}
