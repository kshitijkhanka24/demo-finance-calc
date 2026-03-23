import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="2 Wheeler Loan Calculator" description="Calculate EMI for your bike or scooter loan."><LoanCalc id="two-wheeler-loan" defaultPrincipal={100000} maxPrincipal={500000} defaultRate={10} defaultYears={3} maxYears={5} /></CalculatorLayout>
}
