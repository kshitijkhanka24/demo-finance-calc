import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Education Loan Calculator" description="Calculate EMI for education loans including moratorium period considerations."><LoanCalc id="education-loan" defaultPrincipal={1000000} minP={100000} maxP={15000000} stepP={100000} defaultRate={10} minR={5} maxR={20} defaultYears={7} minY={1} maxY={15} /></CalculatorLayout>
}
