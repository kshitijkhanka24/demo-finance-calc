import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { NpsCalc } from '@/components/calculators/NpsCalc'
export default function Page() {
  return <CalculatorLayout title="NPS Calculator" description="Estimate corpus and pension under the National Pension Scheme."><NpsCalc /></CalculatorLayout>
}
