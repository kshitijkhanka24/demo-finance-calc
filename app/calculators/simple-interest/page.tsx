import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { SimpleInterestCalc } from '@/components/calculators/SimpleInterestCalc'
export default function Page() {
  return <CalculatorLayout title="Simple Interest Calculator" description="Calculate interest using the basic SI formula: SI = P × R × T / 100."><SimpleInterestCalc /></CalculatorLayout>
}
