import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { OverdraftCalc } from '@/components/calculators/OverdraftCalc'
export default function Page() {
  return <CalculatorLayout title="Overdraft Calculator" description="Calculate daily interest on your overdraft facility."><OverdraftCalc /></CalculatorLayout>
}
