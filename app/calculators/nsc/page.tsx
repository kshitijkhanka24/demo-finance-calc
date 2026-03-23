import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { NscCalc } from '@/components/calculators/NscCalc'
export default function Page() {
  return <CalculatorLayout title="NSC Calculator" description="Calculate maturity value and interest earned on National Savings Certificates."><NscCalc /></CalculatorLayout>
}
