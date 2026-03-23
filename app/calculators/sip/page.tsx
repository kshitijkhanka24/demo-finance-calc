import { CalculatorLayout } from '@/components/calculators/CalculatorLayout'
import { SipCalc } from '@/components/calculators/SipCalc'

export default function SipPage() {
  return (
    <CalculatorLayout 
      title="SIP & Lumpsum Calculator" 
      description="Calculate the future value of your monthly Systemic Investment Plan (SIP) or one-time Lumpsum investments."
    >
      <SipCalc />
    </CalculatorLayout>
  )
}
