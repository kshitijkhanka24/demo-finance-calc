import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { FlatVsReducingCalc } from '@/components/calculators/FlatVsReducingCalc'
export default function Page() {
  return <CalculatorLayout title="Flat vs Reducing Rate Calc" description="Compare flat rate and reducing balance EMIs side by side."><FlatVsReducingCalc /></CalculatorLayout>
}
