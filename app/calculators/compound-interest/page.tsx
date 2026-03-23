import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { CompoundInterestCalc } from '@/components/calculators/CompoundInterestCalc'

export default function CompoundInterestPage() {
  return (
    <CalculatorLayout 
      title="Compound Interest Calculator" 
      description="Calculate the magic of compounding over time and see how your investments grow exponentially."
    >
      <CompoundInterestCalc />
    </CalculatorLayout>
  )
}
