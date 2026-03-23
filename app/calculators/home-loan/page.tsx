import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Home Loan Calculator" description="Calculate your home loan EMI, total interest, and view the amortization schedule."><LoanCalc id="home-loan" defaultPrincipal={3000000} maxPrincipal={50000000} defaultRate={8.5} defaultYears={20} maxYears={30} /></CalculatorLayout>
}
