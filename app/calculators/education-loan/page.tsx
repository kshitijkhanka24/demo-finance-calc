import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Education Loan Calculator" description="Calculate EMI for education loans including moratorium period considerations."><LoanCalc id="education-loan" defaultPrincipal={1000000} maxPrincipal={10000000} defaultRate={10} defaultYears={7} maxYears={15} /></CalculatorLayout>
}
