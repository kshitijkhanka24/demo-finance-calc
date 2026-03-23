import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { LoanCalc } from '@/components/calculators/LoanCalc'
export default function Page() {
  return <CalculatorLayout title="Car Loan Calculator" description="Calculate EMI for your car loan and plan your purchase."><LoanCalc id="car-loan" defaultPrincipal={800000} maxPrincipal={5000000} defaultRate={9} defaultYears={5} maxYears={7} /></CalculatorLayout>
}
