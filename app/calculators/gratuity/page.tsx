import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { GratuityCalc } from '@/components/calculators/GratuityCalc'
export default function Page() {
  return <CalculatorLayout title="Gratuity Calculator" description="Calculate gratuity based on the Payment of Gratuity Act, 1972. Formula: Gratuity = (15 × Last Drawn Salary × Years of Service) / 26."><GratuityCalc /></CalculatorLayout>
}
