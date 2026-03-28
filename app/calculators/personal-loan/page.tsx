import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Personal Loan Calculator" description="Calculate EMI for an unsecured personal loan."><LoanCalc id="personal-loan" defaultPrincipal={500000} minP={10000} maxP={5000000} stepP={10000} defaultRate={12} minR={10} maxR={30} defaultYears={5} minY={1} maxY={7} /></CalculatorLayout>
}
