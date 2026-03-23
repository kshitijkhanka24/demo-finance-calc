'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function FlatVsReducingCalc() {
  const { logCalculation } = useCalculation('flat-vs-reducing')
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { flatEmi, flatTotal, flatInterest, reducingEmi, reducingTotal, reducingInterest, flatDetailedData, reducingDetailedData } = useMemo(() => {
    if (!calculated) return { flatEmi: 0, flatTotal: 0, flatInterest: 0, reducingEmi: 0, reducingTotal: 0, reducingInterest: 0, flatDetailedData: [], reducingDetailedData: [] }
    const n = years * 12

    // Flat: interest on full principal
    const flatI = (principal * rate * years) / 100
    const fE = Math.round((principal + flatI) / n), fT = fE * n

    // Reducing balance
    const mr = (rate / 12) / 100
    let rE = mr === 0 ? principal/n : principal * ((mr * Math.pow(1+mr,n))/(Math.pow(1+mr,n)-1))
    if (isNaN(rE) || !isFinite(rE)) rE = 0
    const rEr = Math.round(rE), rT = rEr * n

    // Detailed data for Flat Rate
    const flatDetailed = []
    const flatYearlyInterest = (principal * rate) / 100
    for (let yr = 1; yr <= years; yr++) {
      flatDetailed.push({ year: yr, principal: Math.round(fE * 12 * yr - flatYearlyInterest * yr), interest: Math.round(flatYearlyInterest * yr) })
    }

    // Detailed data for Reducing Rate
    const reducingDetailed = []
    let rem = principal, cumI = 0, cumP = 0
    for (let m = 1; m <= n; m++) {
      const im = rem * mr, pm = rEr - im; rem = Math.max(0, rem - pm); cumI += im; cumP += pm
      if (m % 12 === 0 || m === n) {
        reducingDetailed.push({ year: Math.ceil(m/12), principal: Math.round(cumP), interest: Math.round(cumI) })
      }
    }

    return {
      flatEmi: fE, flatTotal: fT, flatInterest: fT - principal,
      reducingEmi: rEr, reducingTotal: rT, reducingInterest: rT - principal,
      flatDetailedData: flatDetailed, reducingDetailedData: reducingDetailed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, years })
  }

  const savings = flatTotal - reducingTotal

  const flatPie = [{ name: 'Principal', value: principal }, { name: 'Interest', value: flatInterest }]
  const reducingPie = [{ name: 'Principal', value: principal }, { name: 'Interest', value: reducingInterest }]

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 space-y-5 max-w-lg">
        <Slider label="Loan Amount" value={principal} set={setPrincipal} min={10000} max={10000000} step={10000} fmt="currency" />
        <Slider label="Interest Rate (p.a.)" value={rate} set={setRate} min={1} max={30} step={0.5} fmt="percent" />
        <Slider label="Tenure" value={years} set={setYears} min={1} max={30} step={1} fmt="years" />
        <CalculateButton onClick={handleCalculate} />
      </div>

      {calculated && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider px-1" style={{ color: 'var(--fg-subtle)' }}>Flat Rate</h3>
              <ChartSection pieData={flatPie} detailedData={flatDetailedData} gradientId="flatGrad" areaLabel="Flat Rate — Year-on-Year" />
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="EMI" value={flatEmi} />
                <StatCard label="Interest" value={flatInterest} accent="secondary" />
                <StatCard label="Total" value={flatTotal} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider px-1" style={{ color: 'var(--fg-subtle)' }}>Reducing Balance</h3>
              <ChartSection pieData={reducingPie} detailedData={reducingDetailedData} gradientId="redGrad" areaLabel="Reducing — Year-on-Year" />
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="EMI" value={reducingEmi} />
                <StatCard label="Interest" value={reducingInterest} accent="secondary" />
                <StatCard label="Total" value={reducingTotal} />
              </div>
            </div>
          </div>

          {savings > 0 && (
            <div className="glass-card p-5 text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--fg-muted)' }}>You save with Reducing Balance</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>₹{formatINR(savings)}</p>
            </div>
          )}
        </>
      )}

      <CalculatorInfoSections calcKey="flat-vs-reducing" />
    </div>
  )
}
