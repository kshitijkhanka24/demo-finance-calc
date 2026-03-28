import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Car Loan Calculator" description="Calculate EMI for your car loan and plan your purchase."><LoanCalc id="car-loan" defaultPrincipal={800000} minP={100000} maxP={10000000} stepP={50000} defaultRate={9} minR={7} maxR={20} defaultYears={5} minY={1} maxY={7} /></CalculatorLayout>
}
