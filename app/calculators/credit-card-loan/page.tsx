import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Credit Card Loan Calculator" description="Calculate EMI for converting your credit card balance into a loan."><LoanCalc id="credit-card-loan" defaultPrincipal={100000} minP={10000} maxP={1000000} stepP={10000} defaultRate={18} minR={10} maxR={30} defaultYears={2} minY={1} maxY={5} /></CalculatorLayout>
}
