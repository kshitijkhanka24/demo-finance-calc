import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="2 Wheeler Loan Calculator" description="Calculate EMI for your bike or scooter loan."><LoanCalc id="two-wheeler-loan" defaultPrincipal={100000} minP={10000} maxP={1000000} stepP={10000} defaultRate={10} minR={7} maxR={25} defaultYears={3} minY={1} maxY={7} /></CalculatorLayout>
}
