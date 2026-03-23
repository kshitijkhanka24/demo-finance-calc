import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { RdCalc } from '@/components/calculators/RdCalc'
export default function Page() {
  return <CalculatorLayout title="Recurring Deposit Calculator" description="Calculate the maturity value of your monthly recurring deposit."><RdCalc /></CalculatorLayout>
}
