import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { EmiCalc } from '@/components/calculators/EmiCalc'

export default function EmiPage() {
  return (
    <CalculatorLayout 
      title="EMI Amount Calculator" 
      description="Estimate the fixed monthly payment required to repay a loan over a chosen tenure, broken down into Principal and Interest."
    >
      <EmiCalc />
    </CalculatorLayout>
  )
}
