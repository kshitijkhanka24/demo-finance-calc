'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function LasCalc() {
  const { logCalculation } = useCalculation('loan-against-security')
  const [securityValue, setSecurityValue] = useState(1000000)
  const [ltv, setLtv] = useState(50)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { loanAmount, emi, totalPayment, totalInterest, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { loanAmount: 0, emi: 0, totalPayment: 0, totalInterest: 0, chartData: [], detailedData: [] }
    const loan = (securityValue * ltv) / 100
    const mr = (rate/12)/100, n = years * 12
    let e = mr === 0 ? loan/n : loan * ((mr * Math.pow(1+mr,n))/(Math.pow(1+mr,n)-1))
    if (isNaN(e) || !isFinite(e)) e = 0
    const data = [], detailed = []; let rem = loan, cumI = 0, cumP = 0, totalCumI = 0, totalCumP = 0
    for (let m = 1; m <= n; m++) {
      const im = rem * mr, pm = e - im; rem = Math.max(0, rem - pm); cumI += im; cumP += pm; totalCumI += im; totalCumP += pm
      if (m % 12 === 0 || m === n) {
        data.push({ year: Math.ceil(m/12), balance: Math.round(rem), interestPaid: Math.round(cumI), principalPaid: Math.round(cumP) })
        detailed.push({ year: Math.ceil(m/12), principal: Math.round(totalCumP), interest: Math.round(totalCumI) })
        cumI = 0; cumP = 0
      }
    }
    return { loanAmount: Math.round(loan), emi: Math.round(e), totalPayment: Math.round(e*n), totalInterest: Math.max(0, Math.round(e*n - loan)), chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ securityValue, ltv, rate, years })
  }

  const pieData = [{ name: 'Principal', value: loanAmount }, { name: 'Interest', value: totalInterest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Security Value" value={securityValue} set={setSecurityValue} min={50000} max={50000000} step={50000} fmt="currency" />
          <Slider label="LTV Ratio" value={ltv} set={setLtv} min={10} max={80} step={5} fmt="percent" />
          <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={5} max={20} step={0.5} fmt="percent" />
          <Slider label="Tenure" value={years} set={setYears} min={1} max={15} step={1} fmt="years" />
          <div className="glass-card p-3 text-center">
            <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Eligible Loan Amount</p>
            <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>₹{formatINR((securityValue * ltv) / 100)}</p>
          </div>
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} detailedData={detailedData} gradientId="lasGrad" areaLabel="Cumulative Payments" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Monthly EMI" value={emi} />
            <StatCard label="Total Interest" value={totalInterest} accent="secondary" />
            <StatCard label="Total Payment" value={totalPayment} accent="primary" />
          </div>
          <DataTable columns={['Year','Principal Paid','Interest Paid','Balance']} rows={chartData.map(r => [String(r.year), r.principalPaid, r.interestPaid, r.balance])} filename="las-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="loan-against-security" />
    </div>
  )
}
