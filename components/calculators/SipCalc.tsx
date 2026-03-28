'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, ChartSection, DataTable, CalculateButton, formatINR, InflationToggle, calculateInflationAdjusted } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function SipCalc() {
  const { logCalculation } = useCalculation('sip')
  const [mode, setMode] = useState<'sip'|'lumpsum'>('sip')
  const [investment, setInvestment] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)
  const [inflationEnabled, setInflationEnabled] = useState(false)
  const [inflationRate, setInflationRate] = useState(6)

  const { totalInvested, totalReturns, maturity, chartData, detailedData } = useMemo(() => {
    if (!calculated) return { totalInvested: 0, totalReturns: 0, maturity: 0, chartData: [], detailedData: [] }
    const mr = (rate/12)/100, months = years * 12; const data = [], detailed = []; let tI = 0, mM = 0
    if (mode === 'sip') {
      tI = investment * months; mM = mr === 0 ? tI : investment * ((Math.pow(1+mr,months)-1)/mr)*(1+mr)
      for (let yr = 1; yr <= years; yr++) {
        const m = yr*12, inv = investment*m, val = investment*((Math.pow(1+mr,m)-1)/mr)*(1+mr)
        data.push({ year: yr, invested: inv, value: Math.round(val) })
        detailed.push({ year: yr, principal: inv, interest: Math.round(val - inv) })
      }
    } else {
      tI = investment; mM = investment * Math.pow(1+(rate/100), years)
      for (let yr = 1; yr <= years; yr++) {
        const val = investment * Math.pow(1+(rate/100), yr)
        data.push({ year: yr, invested: tI, value: Math.round(val) })
        detailed.push({ year: yr, principal: tI, interest: Math.round(val - tI) })
      }
    }
    return { totalInvested: Math.round(tI), totalReturns: Math.round(mM-tI), maturity: Math.round(mM), chartData: data, detailedData: detailed }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ mode, investment, rate, years, inflationRate: inflationEnabled ? inflationRate : undefined })
  }

  const adjustedMaturity = useMemo(() => calculated && inflationEnabled ? calculateInflationAdjusted(maturity, inflationRate, years) : maturity, [calculated, inflationEnabled, inflationRate, years, maturity])

  const pieData = [{ name: 'Invested', value: totalInvested }, { name: 'Returns', value: totalReturns }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <div className="flex rounded-lg p-0.5" style={{ background: 'var(--input-bg)' }}>
            <button className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors`} style={{ background: mode==='sip' ? 'var(--card-bg)' : 'transparent', color: mode==='sip' ? 'var(--fg)' : 'var(--fg-subtle)', border: mode==='sip' ? '1px solid var(--card-border)' : '1px solid transparent' }} onClick={() => setMode('sip')}>Monthly SIP</button>
            <button className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors`} style={{ background: mode==='lumpsum' ? 'var(--card-bg)' : 'transparent', color: mode==='lumpsum' ? 'var(--fg)' : 'var(--fg-subtle)', border: mode==='lumpsum' ? '1px solid var(--card-border)' : '1px solid transparent' }} onClick={() => setMode('lumpsum')}>Lumpsum</button>
          </div>
          <Slider label={mode==='sip'?'Monthly Amount':'Investment'} value={investment} set={setInvestment} min={mode==='sip'?500:10000} max={mode==='sip'?1000000:10000000} step={mode==='sip'?500:10000} fmt="currency" />
          <Slider label="Expected Return (p.a.)" value={rate} set={setRate} min={5} max={30} step={0.5} fmt="percent" />
          <Slider label="Time Period" value={years} set={setYears} min={1} max={mode==='sip'?60:30} step={1} fmt="years" />
          <InflationToggle enabled={inflationEnabled} setEnabled={setInflationEnabled} rate={inflationRate} setRate={setInflationRate} />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && <ChartSection id="sip-chart" pieData={pieData} detailedData={detailedData} gradientId="sipGrad" areaLabel="Year-on-Year Growth" />}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Invested" value={totalInvested} />
            <StatCard label="Returns" value={totalReturns} accent="secondary" />
            <StatCard label={inflationEnabled ? "Total" : "Total"} value={maturity} accent="primary" />
            {inflationEnabled && (
              <StatCard label="Adjusted Total" value={adjustedMaturity} accent="primary" />
            )}
          </div>
          <DataTable 
            columns={['Year','Invested','Value']} 
            rows={chartData.map(r => [String(r.year), r.invested, r.value])} 
            filename="sip-report" 
            calcKey="sip"
            chartId="sip-chart"
            inputs={[
              { label: 'Investment Mode', value: mode === 'sip' ? 'Monthly SIP' : 'Lumpsum' },
              { label: mode === 'sip' ? 'Monthly Amount' : 'Investment Amount', value: investment },
              { label: 'Expected Return', value: `${rate}%` },
              { label: 'Time Period', value: `${years} Years` }
            ]}
            outputs={[
              { label: 'Total Invested', value: totalInvested },
              { label: 'Est. Returns', value: totalReturns },
              { label: 'Total Value', value: maturity },
              ...(inflationEnabled ? [{ label: 'Inflation Adjusted Value', value: adjustedMaturity }] : [])
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="sip" />
    </div>
  )
}
