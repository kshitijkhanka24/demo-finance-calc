'use client'
import { useState, useMemo } from 'react'
import { useCalculation } from '@/hooks/useCalculation'
import { Slider, StatCard, DataTable, CalculateButton, formatINR } from './shared'
import { CalculatorInfoSections } from './CalculatorInfoSections'

export function GratuityCalc() {
  const { logCalculation } = useCalculation('gratuity')
  const [salary, setSalary] = useState(50000)
  const [yearsOfService, setYearsOfService] = useState(15)
  const [calculated, setCalculated] = useState(true)
  const [calcKey, setCalcKey] = useState(0)

  const gratuity = useMemo(() => {
    if (!calculated) return 0
    return Math.round((15 * salary * yearsOfService) / 26)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcKey])

  const handleCalculate = () => {
    setCalculated(true)
    setCalcKey(k => k + 1)
    logCalculation({ salary, yearsOfService })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-5">
          <Slider label="Last Drawn Salary (Basic + DA)" value={salary} set={setSalary} min={10000} max={1000000} step={1000} fmt="currency" />
          <Slider label="Years of Service" value={yearsOfService} set={setYearsOfService} min={1} max={50} step={1} fmt="years" />
          <CalculateButton onClick={handleCalculate} />
        </div>
        {calculated && (
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>Gratuity Payable</p>
            <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--accent)' }}>₹{formatINR(gratuity)}</p>
            <p className="text-xs mt-3" style={{ color: 'var(--fg-subtle)' }}>Formula: (15 × Salary × Years) / 26</p>
          </div>
        )}
      </div>
      {calculated && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Monthly Salary" value={salary} />
            <StatCard label="Gratuity" value={gratuity} accent="primary" />
          </div>
          <DataTable 
            columns={['Calculation Component','Value']} 
            rows={[
              ['Monthly Salary Phase', String(salary)],
              ['Service Years Equivalent', String(yearsOfService)],
              ['Calculated Gratuity (15/26 factor)', String(gratuity)]
            ]} 
            filename="gratuity-report" 
            calcKey="gratuity"
            inputs={[
              { label: 'Last Drawn Salary', value: salary },
              { label: 'Years of Service', value: `${yearsOfService} Years` }
            ]}
            outputs={[
              { label: 'Calculated Gratuity', value: gratuity }
            ]}
          />
        </>
      )}
      <CalculatorInfoSections calcKey="gratuity" />
    </div>
  )
}
