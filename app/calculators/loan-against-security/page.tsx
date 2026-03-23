import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LasCalc } from '@/components/calculators/LasCalc'
export default function Page() {
  return <CalculatorLayout title="Loan Against Security Calculator" description="Calculate the loan amount you can avail against securities based on LTV ratio."><LasCalc /></CalculatorLayout>
}
