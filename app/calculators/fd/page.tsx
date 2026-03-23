import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { FdCalc } from '@/components/calculators/FdCalc'
export default function FdPage() {
  return <CalculatorLayout title="Fixed Deposit Calculator" description="Calculate maturity amount and interest earned on your FD investment."><FdCalc /></CalculatorLayout>
}
