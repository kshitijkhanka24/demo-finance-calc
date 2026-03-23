import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Personal Loan Calculator" description="Calculate EMI for an unsecured personal loan."><LoanCalc id="personal-loan" defaultPrincipal={500000} maxPrincipal={5000000} defaultRate={12} defaultYears={5} maxYears={7} /></CalculatorLayout>
}
