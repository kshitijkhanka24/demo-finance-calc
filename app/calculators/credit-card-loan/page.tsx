import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Credit Card Loan Calculator" description="Calculate EMI for converting your credit card balance into a loan."><LoanCalc id="credit-card-loan" defaultPrincipal={100000} maxPrincipal={1000000} defaultRate={18} defaultYears={2} maxYears={5} /></CalculatorLayout>
}
