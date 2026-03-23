'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function StepUpSipCalc() {
  const { logCalculation } = useCalculation('step-up-sip')
  const [monthlySip, setMonthlySip] = useState(5000)
  const [annualIncrease, setAnnualIncrease] = useState(10)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const { totalInvested, maturity, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { totalInvested: 0, maturity: 0, chartData: [], detailedData: [] }
    const mr = (rate/12)/100; let totalVal = 0, totalInv = 0, currentSip = monthlySip; const data = [], detailed = []
    for (let yr = 1; yr <= years; yr++) {
      for (let m = 1; m <= 12; m++) { totalInv += currentSip; totalVal = (totalVal + currentSip) * (1 + mr) }
      data.push({ year: yr, invested: Math.round(totalInv), value: Math.round(totalVal) })
      detailed.push({ year: yr, principal: Math.round(totalInv), interest: Math.round(totalVal - totalInv) })
      currentSip = currentSip * (1 + annualIncrease / 100)
    }
    return { totalInvested: Math.round(totalInv), maturity: Math.round(totalVal), chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ monthlySip, annualIncrease, rate, years })
  }

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Returns', value: maturity - totalInvested }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Starting Monthly SIP" value={monthlySip} set={setMonthlySip} min={500} max={100000} step={500} fmt="currency" />
          <Slider label="Annual Increase" value={annualIncrease} set={setAnnualIncrease} min={1} max={50} step={1} fmt="percent" />
          <Slider label="Expected Return (p.a.)" value={rate} set={setRate} min={1} max={30} step={0.5} fmt="percent" />
          <Slider label="Time Period" value={years} set={setYears} min={1} max={30} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection pieData={pieData} detailedData={detailedData} gradientId="stepGrad" areaLabel="Year-on-Year Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Wealth Gained" value={maturity - totalInvested} accent="secondary" />
            <StatCard label="Total Value" value={maturity} accent="primary" />
          </div>
          <DataTable columns={['Year','Invested','Value']} rows={chartData.map(r => [String(r.year), r.invested, r.value])} filename="step-up-sip-report" />
        </>
      )}
      <CalculatorInfoSections calcKey="step-up-sip" />
    </div>
  )
}
