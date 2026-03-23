import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { SwpCalc } from '@/components/calculators/SwpCalc'
export default function Page() {
  return <CalculatorLayout title="SWP Calculator" description="Plan systematic withdrawals from your mutual fund corpus while the rest continues to earn returns."><SwpCalc /></CalculatorLayout>
}
