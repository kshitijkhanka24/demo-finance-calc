import { NextResponse } from 'next/server'
import { z } from 'zod'

// ─── Input validation ───
const baseSchema = z.object({
  type: z.string().min(1).max(50),
})

// ─── Math Engines ───

function calcSip(input: Record<string, number>) {
  const { investment, rate, years, mode } = input
  const mr = (rate / 12) / 100
  const months = years * 12
  let totalInvested = 0, maturity = 0
  const chartData: Record<string, number>[] = []

  if (mode === 0) {
    // SIP mode
    totalInvested = investment * months
    maturity = mr === 0 ? totalInvested : investment * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)
    for (let yr = 1; yr <= years; yr++) {
      const m = yr * 12
      const inv = investment * m
      const val = investment * ((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr)
      chartData.push({ year: yr, invested: inv, value: Math.round(val) })
    }
  } else {
    // Lumpsum mode
    totalInvested = investment
    maturity = investment * Math.pow(1 + (rate / 100), years)
    for (let yr = 1; yr <= years; yr++) {
      const val = investment * Math.pow(1 + (rate / 100), yr)
      chartData.push({ year: yr, invested: totalInvested, value: Math.round(val) })
    }
  }

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(maturity - totalInvested),
    maturity: Math.round(maturity),
    chartData,
  }
}

function calcEmi(input: Record<string, number>) {
  const { principal, rate, years } = input
  const mr = (rate / 12) / 100
  const n = years * 12
  let e = mr === 0 ? principal / n : principal * ((mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1))
  if (isNaN(e) || !isFinite(e)) e = 0
  const chartData: Record<string, number>[] = []
  let rem = principal
  let yI = 0, yP = 0, totalCumI = 0, totalCumP = 0
  for (let m = 1; m <= n; m++) {
    const im = rem * mr, pm = e - im
    rem -= pm; yI += im; yP += pm; totalCumI += im; totalCumP += pm
    if (m % 12 === 0 || m === n) {
      chartData.push({
        year: Math.ceil(m / 12),
        balance: Math.max(0, Math.round(rem)),
        interest: Math.round(yI),
        principal: Math.round(yP),
      })
      yI = 0; yP = 0
    }
  }
  return {
    emi: Math.round(e),
    totalPayment: Math.round(e * n),
    totalInterest: Math.max(0, Math.round(e * n - principal)),
    chartData,
  }
}

function calcFd(input: Record<string, number>) {
  const { principal, rate, years, compFreq } = input
  const chartData: Record<string, number>[] = []
  for (let yr = 1; yr <= years; yr++) {
    const amt = principal * Math.pow(1 + (rate / 100) / compFreq, compFreq * yr)
    chartData.push({ year: yr, total: Math.round(amt), principal, interest: Math.round(amt - principal) })
  }
  const maturity = chartData[chartData.length - 1]?.total || principal
  return { maturity, interest: maturity - principal, chartData }
}

function calcPpf(input: Record<string, number>) {
  const { yearlyDeposit, years } = input
  const rate = 7.1
  const chartData: Record<string, number>[] = []
  let balance = 0, totalInvested = 0
  for (let yr = 1; yr <= Math.max(years, 15); yr++) {
    totalInvested += yearlyDeposit
    balance = (balance + yearlyDeposit) * (1 + rate / 100)
    chartData.push({ year: yr, invested: totalInvested, value: Math.round(balance) })
  }
  return {
    totalInvested,
    interest: Math.round(balance) - totalInvested,
    maturity: Math.round(balance),
    chartData,
  }
}

// ─── Main handler ───
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const base = baseSchema.safeParse(body)
    if (!base.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { type, ...inputs } = body
    const numericInputs: Record<string, number> = {}
    for (const [k, v] of Object.entries(inputs)) {
      if (typeof v === 'number') numericInputs[k] = v
    }

    let result: Record<string, unknown>

    switch (type) {
      case 'sip':
        result = calcSip(numericInputs)
        break
      case 'emi':
      case 'home-loan':
      case 'car-loan':
      case 'personal-loan':
      case 'education-loan':
      case 'business-loan':
      case 'gold-loan':
      case 'loan-against-security':
        result = calcEmi(numericInputs)
        break
      case 'fd':
        result = calcFd(numericInputs)
        break
      case 'ppf':
        result = calcPpf(numericInputs)
        break
      default:
        return NextResponse.json({ error: `Unknown calculator type: ${type}` }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    console.error('[Calculate API] Error:', err)
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 })
  }
}
