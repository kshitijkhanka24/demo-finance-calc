'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, CalculateButton, DataTable, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SimpleInterestCalc() {
  const { logCalculation } = useCalculation('simple-interest')
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [months, setMonths] = useState(12)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

  const { interest, total } = useMemo(() => {
    if (!calculated) return { interest: 0, total: 0 }
    const si = (principal * rate * (months / 12)) / 100
    return { interest: Math.round(si), total: Math.round(principal + si) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ principal, rate, months, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedTotal = useMemo(() => calculated && inflationEnabled ? calculateInflationAdjusted(total, inflationRate, months / 12) : total, [calculated, inflationEnabled, inflationRate, months, total])

  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: interest }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Principal" value={principal} set={setPrincipal} min={10000} max={1000000} step={10000} fmt="currency" />
          <Slider label="Rate of Interest (p.a.)" value={rate} set={setRate} min={5} max={30} step={0.5} fmt="percent" />
          <Slider label="Time Period (Months)" value={months} set={setMonths} min={2} max={60} step={1} fmt="months" />
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Principal" value={principal} />
            <StatCard label="Interest" value={interest} accent="secondary" />
            <StatCard label={inflationEnabled ? "Total" : "Total"} value={total} accent="primary" />
            {inflationEnabled && (
              <StatCard label="Adjusted Total" value={adjustedTotal} accent="primary" />
            )}
          </div>
          <DataTable
            columns={['Principal', 'Interest Earned', 'Total Amount']}
            rows={[[principal, interest, total]]}
            filename="simple-interest-report"
            calcKey="simple-interest"
            inputs={[
              { label: 'Principal', value: principal },
              { label: 'Interest Rate', value: `${rate}%` },
              { label: 'Time Period', value: `${months} Months` }
            ]}
            outputs={[
              { label: 'Principal', value: principal },
              { label: 'Interest Earned', value: interest },
              { label: 'Total Amount', value: total },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedTotal }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="simple-interest" />
    </div>
  )
}
