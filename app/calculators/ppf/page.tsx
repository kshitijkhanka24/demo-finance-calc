import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { PpfCalc } from '@/components/calculators/PpfCalc'
export default function Page() {
  return <CalculatorLayout title="PPF Calculator" description="Estimate returns from the Public Provident Fund over a 15-year lock-in period."><PpfCalc /></CalculatorLayout>
}
