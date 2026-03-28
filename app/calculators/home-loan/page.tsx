import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Home Loan Calculator" description="Calculate your home loan EMI, total interest, and view the amortization schedule."><LoanCalc id="home-loan" defaultPrincipal={3000000} minP={100000} maxP={100000000} stepP={100000} defaultRate={8.5} minR={5} maxR={20} defaultYears={20} minY={1} maxY={30} /></CalculatorLayout>
}
