// Calculator educational content — structured data for rich info sections
// Data sourced from Calculator Reports.txt

export interface BulletPoint { title: string; description: string }
export interface FormulaBlock { formula: string; variables: { symbol: string; meaning: string }[]; assumptions?: string[] }

export interface CalcContent {
  title: string
  whatIsIt: string[]
  howItWorks: { text: string[]; points: BulletPoint[] }
  formula?: FormulaBlock
  benefits: BulletPoint[]
  disclaimer: string[]
  // Keep legacy fields for backward compat
  explanation: string
}

export const calculatorContent: Record<string, CalcContent> = {

  // ─── 1. Loan Against Security ───
  'loan-against-security': {
    title: 'Loan Against Security',
    whatIsIt: [
      'A Loan Against Security (LAS) allows you to borrow funds by pledging financial assets such as shares, mutual funds, bonds, or insurance policies as collateral. Instead of selling your investments, you temporarily pledge them and receive a loan based on a percentage of their market value.',
      'This percentage is called Loan-to-Value (LTV). LAS uses a reducing balance method, which means you pay interest only on whatever you still owe, not the original amount throughout the entire loan.',
    ],
    howItWorks: {
      text: [
        'Lenders won\'t hand over cash equal to your full portfolio value — they need a buffer in case markets tumble. For example, if you own shares worth ₹1,00,000 and your lender offers a 50% LTV, you can borrow ₹50,000 while your shares stay pledged.',
        'Because the lender has your investments as collateral, LAS typically charges much lower interest than personal loans or credit cards.',
      ],
      points: [
        { title: 'Reducing Balance Interest', description: 'Interest charged only on outstanding principal, not the original amount' },
        { title: 'Lower Interest Rates', description: 'Typically cheaper than personal loans or credit cards due to collateral backing' },
        { title: 'Retain Ownership', description: 'Your investments stay pledged — you still benefit from any market appreciation' },
      ],
    },
    formula: {
      formula: 'Loan Amount = Security Value × LTV Ratio',
      variables: [
        { symbol: 'Security Value', meaning: 'Current market value of pledged assets' },
        { symbol: 'LTV', meaning: 'Loan-to-Value ratio set by the lender' },
        { symbol: 'EMI', meaning: 'Calculated using standard reducing balance formula' },
      ],
      assumptions: ['Reducing balance interest', 'Fixed interest rate', 'Monthly EMI payments'],
    },
    benefits: [
      { title: 'No Need to Sell', description: 'Access funds without liquidating your investments' },
      { title: 'Lower Rates', description: 'Secured loans enjoy lower interest rates than unsecured options' },
      { title: 'Market Upside', description: 'Continue to benefit from appreciation in pledged securities' },
      { title: 'Quick Disbursement', description: 'Faster processing compared to traditional loans' },
    ],
    disclaimer: [
      'This is general educational explanation only. This is not financial advice, and this is not a recommendation to take out a loan against security.',
      'All example numbers used here are for illustration only. Interest rates, LTV ratios, eligibility rules and margin call terms vary widely between lenders.',
      'Always read and fully understand the margin call rules of any lender before you sign anything. If you would not be able to come up with additional cash or collateral in the event of a 30% market crash, you should not use this product.',
    ],
    explanation: 'A Loan Against Security (LAS) lets you borrow funds by pledging financial assets as collateral. The LTV ratio determines how much you can borrow relative to your portfolio value.',
  },

  // ─── 2. SWP ───
  'swp': {
    title: 'Systematic Withdrawal Plan',
    whatIsIt: [
      'A Systematic Withdrawal Plan (SWP) is a facility offered by mutual funds that allows investors to withdraw a fixed amount of money at regular intervals from their investment. Instead of redeeming the entire investment at once, SWP lets you receive periodic payouts while the remaining money stays invested and continues to grow.',
      'It is commonly used by investors who want a steady income stream from their mutual fund investments.',
    ],
    howItWorks: {
      text: [
        'Suppose you invest ₹10,00,000 in a mutual fund and choose an SWP of ₹10,000 per month. Every month, the fund redeems a small number of units from your investment to provide the withdrawal amount.',
        'Since the remaining units stay invested in the market, your investment still has the potential to grow over time, depending on the fund\'s performance.',
      ],
      points: [
        { title: 'Regular Withdrawals', description: 'Monthly, quarterly, or annual payouts from your investment' },
        { title: 'Remaining Investment Grows', description: 'Undrawn amount stays invested and continues to earn returns' },
        { title: 'Flexible Amounts', description: 'Choose your withdrawal amount and frequency based on your needs' },
        { title: 'Regular Income', description: 'Useful for creating a predictable income from investments' },
      ],
    },
    benefits: [
      { title: 'Steady Income', description: 'Create a regular cash flow from existing investments' },
      { title: 'Continued Growth', description: 'Remaining corpus stays invested in the market' },
      { title: 'Flexibility', description: 'Adjust withdrawal amounts and frequency any time' },
      { title: 'Retirement Friendly', description: 'Ideal for retirees converting investments to income' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Mutual fund returns are market-linked and not guaranteed.',
      'Withdrawal amounts, tax implications, and fund performance can affect the longevity of your investment. Always review the scheme details and consult financial professionals before making investment decisions.',
    ],
    explanation: 'A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount at regular intervals from a mutual fund investment. The remaining money stays invested and continues to grow.',
  },

  // ─── 3. Home Loan ───
  'home-loan': {
    title: 'Home Loan',
    whatIsIt: [
      'A Home Loan is a long-term loan provided by banks or financial institutions to help individuals purchase, build, or renovate a residential property. The borrower repays the loan through monthly EMIs (Equated Monthly Installments) over a selected tenure, typically ranging from 10 to 30 years.',
      'Home loans usually follow a reducing balance interest calculation, where interest is charged only on the remaining outstanding principal.',
    ],
    howItWorks: {
      text: [
        'When you take a home loan, the total loan amount is repaid through fixed monthly EMIs that include both principal repayment and interest. With every EMI payment, the outstanding loan balance reduces.',
        'In the early years of the loan, a larger portion of the EMI goes toward interest, while later EMIs contribute more toward principal repayment.',
      ],
      points: [
        { title: 'EMI-Based Repayment', description: 'Fixed monthly installments covering principal + interest' },
        { title: 'Reducing Balance', description: 'Interest calculated on remaining outstanding principal' },
        { title: 'Prepayment Option', description: 'Lump sum prepayments directly reduce outstanding principal' },
        { title: 'Foreclosure', description: 'Option to close the loan before the original tenure' },
      ],
    },
    formula: {
      formula: 'EMI = P × [i(1 + i)^N] / [(1 + i)^N − 1]',
      variables: [
        { symbol: 'P', meaning: 'Loan principal amount' },
        { symbol: 'i', meaning: 'Monthly interest rate (Annual Rate ÷ 12 ÷ 100)' },
        { symbol: 'N', meaning: 'Total number of monthly installments' },
      ],
      assumptions: ['Reducing balance interest', 'Fixed interest rate', 'Monthly compounding'],
    },
    benefits: [
      { title: 'Long Tenure', description: 'Flexible tenure from 10 to 30 years for manageable EMIs' },
      { title: 'Lower Rates', description: 'Secured loans typically have lower interest rates' },
      { title: 'Tax Benefits', description: 'Deductions available on principal and interest repayment' },
      { title: 'Prepayment Flexibility', description: 'Reduce total interest by making lump sum prepayments' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Actual home loan terms such as interest rates, prepayment rules, foreclosure conditions, and tenure options vary between lenders.',
      'Always review the official loan agreement and terms before applying for a home loan.',
    ],
    explanation: 'A Home Loan is a long-term loan to purchase, build, or renovate residential property. It follows reducing balance interest calculation.',
  },

  // ─── 4. EMI ───
  'emi': {
    title: 'EMI (Equated Monthly Installment)',
    whatIsIt: [
      'An EMI (Equated Monthly Installment) Calculator helps borrowers estimate the fixed monthly payment required to repay a loan over a chosen tenure. EMIs are commonly used for loans such as home loans, personal loans, car loans, and education loans.',
      'Each EMI includes two components: principal repayment and interest payment. Over time, the interest portion decreases while the principal repayment increases, because interest is calculated on the remaining loan balance.',
    ],
    howItWorks: {
      text: [
        'Suppose you take a loan of ₹5,00,000 at 10% annual interest for 5 years. The calculator determines the fixed monthly payment required to repay the loan within the selected tenure.',
      ],
      points: [
        { title: 'Fixed Monthly Payment', description: 'Same EMI amount throughout the loan tenure' },
        { title: 'Reducing Interest', description: 'Interest portion decreases as principal is repaid' },
        { title: 'Increasing Principal', description: 'More of each EMI goes toward principal over time' },
      ],
    },
    formula: {
      formula: 'M = P × [i(1 + i)^N] / [(1 + i)^N − 1]',
      variables: [
        { symbol: 'M', meaning: 'Monthly EMI' },
        { symbol: 'P', meaning: 'Loan Principal (amount borrowed)' },
        { symbol: 'i', meaning: 'Monthly interest rate (Annual Rate ÷ 12 ÷ 100)' },
        { symbol: 'N', meaning: 'Total number of monthly installments' },
      ],
      assumptions: ['Reducing balance interest', 'Fixed interest rate throughout tenure', 'Monthly compounding'],
    },
    benefits: [
      { title: 'Monthly EMI Amount', description: 'Know your exact monthly commitment' },
      { title: 'Total Interest Payable', description: 'See the true cost of borrowing' },
      { title: 'Compare Tenures', description: 'Evaluate different loan durations and rates' },
      { title: 'Plan Finances', description: 'Match loan repayments to your financial capacity' },
    ],
    disclaimer: [
      'This calculator provides estimated values for educational and planning purposes only. Actual EMI amounts may vary depending on lender policies, processing fees, rounding methods, or interest rate changes.',
      'Always confirm final loan terms with your bank or financial institution before making borrowing decisions.',
    ],
    explanation: 'An EMI Calculator estimates the fixed monthly payment to repay a loan. The standard formula is M = P × [i(1+i)^N] / [(1+i)^N - 1].',
  },

  // ─── 5. SSY ───
  'ssy': {
    title: 'Sukanya Samriddhi Yojana',
    whatIsIt: [
      'Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme in India designed to support the future education and marriage expenses of a girl child. The scheme offers high interest rates, tax benefits, and guaranteed returns, making it one of the most popular long-term savings options for parents.',
    ],
    howItWorks: {
      text: [
        'The SSY account runs for a total of 21 years from the account opening date. Parents or guardians can deposit money every year for 14 consecutive years (Deposit Phase). After deposits stop, the accumulated amount continues to earn interest for the next 7 years (Compounding Phase).',
      ],
      points: [
        { title: 'Deposit Phase (14 Years)', description: 'Annual deposits made by parents or guardians' },
        { title: 'Compounding Phase (7 Years)', description: 'Amount grows with interest, no additional contributions needed' },
        { title: 'Partial Withdrawal at 18', description: 'Up to 50% can be withdrawn when the girl turns 18' },
        { title: 'Full Maturity at 21 Years', description: 'Complete amount withdrawable after 21 years' },
      ],
    },
    formula: {
      formula: 'Amt = P × ((1 + r)^14 − 1) / r\nFinal Amount = Amt × (1 + r)^7',
      variables: [
        { symbol: 'P', meaning: 'Yearly deposit amount' },
        { symbol: 'r', meaning: 'Annual interest rate' },
        { symbol: 'Amt', meaning: 'Accumulated amount after 14 years of deposits' },
      ],
      assumptions: ['Yearly compounding', 'Fixed annual deposits for 14 years', 'Government-declared interest rate'],
    },
    benefits: [
      { title: 'High Interest', description: 'Government-backed interest rates higher than most fixed-income options' },
      { title: 'Tax Benefits', description: 'Deduction up to ₹1.5 lakh under Section 80C' },
      { title: 'EEE Benefit', description: 'Tax-free deposits, interest, and maturity amount' },
      { title: 'Guaranteed Returns', description: 'Backed by the Government of India' },
      { title: 'Girl Child Security', description: 'Designed specifically for financial security of girl children' },
    ],
    disclaimer: [
      'This information is for educational purposes only and does not constitute financial advice. Interest rates for Sukanya Samriddhi Yojana are determined by the Government of India and may change periodically.',
      'Always verify the latest rates and scheme rules through official government sources before investing.',
    ],
    explanation: 'Sukanya Samriddhi Yojana (SSY) is a government savings scheme for girl children (ages 0-10). Account runs for 21 years: deposits for first 14 years, then interest compounds for remaining 7 years.',
  },

  // ─── 6. Gratuity ───
  'gratuity': {
    title: 'Gratuity',
    whatIsIt: [
      'A Gratuity Calculator helps employees estimate the lump-sum amount they may receive from their employer when leaving a job, provided they meet the eligibility conditions. Gratuity is a financial benefit given by employers as a reward for long-term service.',
      'It is commonly applicable to employees who have worked with the same organization for at least 5 years.',
    ],
    howItWorks: {
      text: [
        'Gratuity is calculated based on the last drawn salary (usually Basic + Dearness Allowance) and the total years of service. If remaining months of service are 6 or more, the year is rounded up.',
      ],
      points: [
        { title: 'Eligibility After 5 Years', description: 'Employees qualify after 5 years of continuous service (4.5+ years rounds up)' },
        { title: 'Last Drawn Salary Based', description: 'Calculated on Basic + Dearness Allowance at the time of leaving' },
        { title: 'One-Time Lump Sum', description: 'Paid as a single payment upon leaving the company' },
      ],
    },
    formula: {
      formula: 'Gratuity = (S × T × 15) / 26',
      variables: [
        { symbol: 'S', meaning: 'Last drawn monthly salary (Basic + DA)' },
        { symbol: 'T', meaning: 'Total years of service' },
        { symbol: '15', meaning: '15 days of salary for each completed year' },
        { symbol: '26', meaning: 'Number of working days in a month' },
      ],
      assumptions: ['Private sector max: ₹20 lakh', 'Government max: ₹25 lakh', 'Months ≥ 6 rounded up to next year'],
    },
    benefits: [
      { title: 'Reward for Service', description: 'Financial recognition for long-term commitment' },
      { title: 'Predictable Calculation', description: 'Standard formula makes estimation straightforward' },
      { title: 'Tax Benefits', description: 'Gratuity up to certain limits is tax-exempt' },
    ],
    disclaimer: [
      'This calculator provides an estimate based on standard gratuity rules and assumptions. Actual gratuity payouts may vary depending on employer policies, employment contracts, and applicable laws.',
      'Always verify the final amount with your employer or HR department.',
    ],
    explanation: 'Gratuity is a financial benefit given by employers as a reward for long-term service. Calculated as (S × T × 15) / 26.',
  },

  // ─── 7. SIP ───
  'sip': {
    title: 'Systematic Investment Plan',
    whatIsIt: [
      'A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds where investors contribute a fixed amount at regular intervals, usually every month. Instead of investing a large lump sum at once, SIP allows you to build wealth gradually over time through consistent investments and compounding.',
      'SIPs are widely used for long-term financial goals such as retirement, education planning, or wealth creation.',
    ],
    howItWorks: {
      text: [
        'In a SIP, a fixed amount is automatically invested in a mutual fund every month. Each investment purchases units of the fund based on the current market price.',
        'Over time, this approach benefits from compounding returns, rupee cost averaging, and disciplined investing.',
      ],
      points: [
        { title: 'Compounding Returns', description: 'Earnings generate their own earnings over time' },
        { title: 'Rupee Cost Averaging', description: 'Buy more units at low prices, fewer at high prices' },
        { title: 'Disciplined Investing', description: 'Regular contributions build wealth systematically' },
      ],
    },
    formula: {
      formula: 'M = S × [((1 + i)ⁿ − 1) / i] × (1 + i)',
      variables: [
        { symbol: 'M', meaning: 'Total value at maturity' },
        { symbol: 'S', meaning: 'Monthly investment amount (SIP)' },
        { symbol: 'i', meaning: 'Monthly interest rate (Annual rate ÷ 12)' },
        { symbol: 'n', meaning: 'Total number of monthly investments' },
      ],
      assumptions: ['Monthly contributions', 'Monthly compounding', 'Fixed annual rate', 'Converted to monthly rate'],
    },
    benefits: [
      { title: 'Disciplined Investing', description: 'Regular contributions foster consistent habit formation' },
      { title: 'Compounding Power', description: 'Long-term wealth building through exponential growth' },
      { title: 'Market Timing Risk', description: 'Reduced impact of market volatility over time' },
      { title: 'Flexibility', description: 'Adjust amounts and durations based on your needs' },
      { title: 'Low Entry', description: 'Start with affordable monthly amounts' },
      { title: 'Goal-Oriented', description: 'Perfect for retirement, education, and wealth creation' },
    ],
    disclaimer: [
      'This calculator provides estimated returns for educational and planning purposes only. Mutual fund investments are market-linked, and actual returns may vary depending on market performance, fund management, and economic conditions.',
      'Always review scheme details and consult financial professionals before making investment decisions.',
    ],
    explanation: 'A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds where you contribute a fixed amount at regular intervals.',
  },

  // ─── 8. Lumpsum ───
  'lumpsum': {
    title: 'Lumpsum Investment',
    whatIsIt: [
      'A Lumpsum Investment Calculator helps estimate the future value of a one-time investment over a selected period of time. Instead of investing regularly like in SIPs, a lumpsum investment involves investing the entire amount at once and allowing it to grow through compounding.',
      'This type of investment is commonly used for mutual funds, fixed deposits, bonds, or other long-term investments.',
    ],
    howItWorks: {
      text: [
        'A single amount is invested at the beginning. The investment earns returns at a fixed or assumed annual rate, and returns are compounded yearly.',
        'Over time, the investment grows due to the power of compounding.',
      ],
      points: [
        { title: 'One-Time Investment', description: 'Entire amount invested at the beginning' },
        { title: 'Annual Compounding', description: 'Returns are compounded yearly for exponential growth' },
        { title: 'Long-Term Growth', description: 'Maximizes the benefit of compounding over time' },
      ],
    },
    formula: {
      formula: 'M = P × (1 + R)^n',
      variables: [
        { symbol: 'M', meaning: 'Total amount at the end of the investment period' },
        { symbol: 'P', meaning: 'Initial investment amount (principal)' },
        { symbol: 'R', meaning: 'Annual rate of return (in decimal form)' },
        { symbol: 'n', meaning: 'Investment period in years' },
      ],
      assumptions: ['One-time lump sum investment', 'Annual compounding', 'Constant return rate'],
    },
    benefits: [
      { title: 'Simple Calculation', description: 'Easy-to-understand investment growth formula' },
      { title: 'Maximum Compounding', description: 'Entire amount compounds from day one' },
      { title: 'Surplus Capital', description: 'Ideal when you have surplus funds available for investment' },
    ],
    disclaimer: [
      'This calculator provides estimated results for educational and planning purposes only. Actual investment returns may vary depending on market conditions, financial products, and investment risks.',
      'Always review the investment terms and consult financial professionals before making investment decisions.',
    ],
    explanation: 'A Lumpsum Investment Calculator estimates the future value of a one-time investment using compound interest formula M = P × (1+R)^n.',
  },

  // ─── 9. Step-Up SIP ───
  'step-up-sip': {
    title: 'Step-Up SIP (Top-Up SIP)',
    whatIsIt: [
      'A Step-Up SIP (also called Top-Up SIP) is a variation of a regular SIP where the investment amount increases every year by a fixed percentage. This allows investors to gradually increase their contributions as their income grows, helping build a larger investment corpus over time.',
      'Unlike a regular SIP where the monthly investment stays constant, a Step-Up SIP increases the SIP amount once every year by a fixed step-up rate.',
    ],
    howItWorks: {
      text: [
        'For example, if your SIP starts at ₹10,000 per month and you choose a 10% annual step-up, your monthly SIP becomes: Year 1: ₹10,000, Year 2: ₹11,000, Year 3: ₹12,100, and so on.',
        'This approach helps investors align investments with salary growth and significantly increase long-term returns through compounding.',
      ],
      points: [
        { title: 'Monthly Investments', description: 'Regular monthly contributions like a standard SIP' },
        { title: 'Annual Step-Up', description: 'SIP amount increases yearly by a fixed percentage' },
        { title: 'Monthly Compounding', description: 'Interest is compounded monthly for maximum growth' },
        { title: 'Annuity Due Model', description: 'SIP invested at the start of each month for extra compounding' },
      ],
    },
    formula: {
      formula: 'M = A × ((1 + R)^n − (1 + G)^n) / (R − G)',
      variables: [
        { symbol: 'M', meaning: 'Final investment value (corpus)' },
        { symbol: 'A', meaning: 'Annual SIP value adjusted for monthly compounding' },
        { symbol: 'R', meaning: 'Annual investment return rate' },
        { symbol: 'G', meaning: 'Annual step-up growth rate' },
        { symbol: 'n', meaning: 'Number of years invested' },
      ],
      assumptions: ['Monthly investments', 'Annual step-up increase', 'Monthly compounding', 'If R = G, simplified formula applies'],
    },
    benefits: [
      { title: 'Income Aligned', description: 'Investments grow with your income over the years' },
      { title: 'Larger Corpus', description: 'Builds a much bigger corpus compared to regular SIP' },
      { title: 'Compounding Maximized', description: 'Increasing contributions amplify long-term compounding' },
      { title: 'Salary Increment Friendly', description: 'Ideal for investors expecting annual raises' },
    ],
    disclaimer: [
      'This calculator provides estimated projections for planning purposes only. Mutual fund investments are market-linked, and actual returns may vary depending on market conditions and fund performance.',
      'Always review scheme details and consult financial professionals before making investment decisions.',
    ],
    explanation: 'A Step-Up SIP (Top-Up SIP) increases the investment amount every year by a fixed percentage, helping build a larger corpus as income grows.',
  },

  // ─── 10. RD ───
  'rd': {
    title: 'Recurring Deposit',
    whatIsIt: [
      'A Recurring Deposit (RD) is a savings scheme offered by banks where you deposit a fixed amount every month for a chosen tenure and earn interest on it. It is designed for individuals who want to build savings gradually while earning guaranteed returns.',
      'An RD Calculator helps estimate the maturity amount and total interest earned from regular monthly deposits.',
    ],
    howItWorks: {
      text: [
        'A fixed amount is deposited every month. Interest is compounded quarterly (every 3 months) in most banks.',
        'Each monthly installment earns interest for a different duration — the first installment earns interest for the entire tenure, while later installments earn for fewer months.',
      ],
      points: [
        { title: 'Monthly Fixed Deposits', description: 'Same amount deposited every month without fail' },
        { title: 'Quarterly Compounding', description: 'Interest is compounded every 3 months by most banks' },
        { title: 'Predictable Returns', description: 'Low-risk investment with guaranteed returns' },
        { title: 'Flexible Tenure', description: 'Suitable for short- to medium-term financial goals' },
      ],
    },
    formula: {
      formula: 'Total = S × ((1 + i)^n − 1) / (1 − (1 + i)^(−1/3))',
      variables: [
        { symbol: 'S', meaning: 'Monthly deposit amount' },
        { symbol: 'i', meaning: 'Interest rate per compounding period' },
        { symbol: 'n', meaning: 'Total number of installments (months)' },
      ],
      assumptions: ['Monthly deposits', 'Quarterly compounding', 'Fixed interest rate'],
    },
    benefits: [
      { title: 'Disciplined Saving', description: 'Builds consistent monthly saving habits' },
      { title: 'Stable Returns', description: 'Predictable and guaranteed interest income' },
      { title: 'Low Risk', description: 'Lower risk compared to market-linked investments' },
      { title: 'Flexible Tenure', description: 'Multiple tenure options available with most banks' },
    ],
    disclaimer: [
      'This calculator provides estimated results for planning purposes only. Actual RD returns may vary depending on bank policies, interest rate changes, compounding rules, taxes, and premature withdrawal conditions.',
      'Always verify the final terms with your bank before investing.',
    ],
    explanation: 'A Recurring Deposit (RD) is a savings scheme where you deposit a fixed amount every month for a chosen tenure and earn interest. Interest is compounded quarterly.',
  },

  // ─── 11. FD ───
  'fd': {
    title: 'Fixed Deposit',
    whatIsIt: [
      'A Fixed Deposit (FD) is a savings instrument offered by banks and financial institutions where you deposit a lump sum amount for a fixed tenure and earn interest at a predetermined rate. It is considered a low-risk investment because the interest rate is fixed at the time of deposit.',
      'An FD Calculator helps investors estimate the maturity amount and interest earned on their deposit over the selected tenure.',
    ],
    howItWorks: {
      text: [
        'When you open a Fixed Deposit, you invest a specific amount for a chosen period such as 1 year, 3 years, or 5 years. The bank pays interest on this amount, which is compounded quarterly in most Indian banks.',
        'Compounding means that the interest earned is added to the principal, and future interest is calculated on this increased amount.',
      ],
      points: [
        { title: 'Lump Sum Investment', description: 'Entire amount deposited at the beginning' },
        { title: 'Quarterly Compounding', description: 'Interest compounded every 3 months in most banks' },
        { title: 'Fixed Rate', description: 'Interest rate locked at the time of deposit' },
      ],
    },
    formula: {
      formula: 'Amount = P × (1 + R/n)^(n × T)',
      variables: [
        { symbol: 'P', meaning: 'Principal amount invested' },
        { symbol: 'R', meaning: 'Annual interest rate (in decimal form)' },
        { symbol: 'n', meaning: 'Compounding periods per year (4 for quarterly)' },
        { symbol: 'T', meaning: 'Tenure in years' },
      ],
      assumptions: ['Quarterly compounding', 'Fixed interest rate', 'No premature withdrawal'],
    },
    benefits: [
      { title: 'Maturity Amount', description: 'Know exactly what you will receive at the end' },
      { title: 'Interest Earned', description: 'See total interest generated over the tenure' },
      { title: 'Compare Options', description: 'Evaluate different interest rates and tenures' },
      { title: 'Low Risk', description: 'Guaranteed returns with no market exposure' },
    ],
    disclaimer: [
      'This calculator provides estimated values for planning purposes only. Actual returns may vary depending on bank policies, interest rate changes, premature withdrawal rules, and taxes.',
      'Always verify the final FD terms with your bank or financial institution before investing.',
    ],
    explanation: 'A Fixed Deposit (FD) is a savings instrument with a fixed tenure and predetermined interest rate. Compounded quarterly in most banks.',
  },

  // ─── 12. NSC ───
  'nsc': {
    title: 'National Savings Certificate',
    whatIsIt: [
      'A National Savings Certificate (NSC) is a government-backed savings scheme offered through the Post Office in India. It is designed as a low-risk investment option that encourages long-term savings while providing guaranteed returns and tax benefits.',
      'An NSC Calculator helps estimate the maturity amount and total interest earned on a lump-sum investment over the fixed tenure of the scheme.',
    ],
    howItWorks: {
      text: [
        'A lump-sum principal amount is invested at the start. The interest rate is fixed by the Government of India. The investment tenure is commonly 5 years.',
        'Interest is compounded yearly — interest earned each year is added to the principal for the next year\'s calculation.',
      ],
      points: [
        { title: 'One-Time Investment', description: 'Lump sum deposited at the start of the scheme' },
        { title: 'Government-Backed', description: 'Guaranteed returns backed by the Government of India' },
        { title: 'Fixed Tenure', description: 'Commonly 5-year investment period' },
        { title: 'Yearly Compounding', description: 'Interest compounds annually for steady growth' },
      ],
    },
    formula: {
      formula: 'Amount = P × (1 + R)^T',
      variables: [
        { symbol: 'P', meaning: 'Principal amount invested' },
        { symbol: 'R', meaning: 'Annual interest rate (in decimal form)' },
        { symbol: 'T', meaning: 'Investment tenure in years' },
      ],
      assumptions: ['Yearly compounding', 'Fixed government interest rate', '5-year tenure'],
    },
    benefits: [
      { title: 'Section 80C Deduction', description: 'Tax deduction up to ₹1.5 lakh per year' },
      { title: 'Government Backed', description: 'Safe investment with guaranteed returns' },
      { title: 'Conservative Investors', description: 'Ideal for those seeking predictable returns' },
    ],
    disclaimer: [
      'This calculator provides estimated values for educational and planning purposes only. NSC interest rates are periodically announced by the Government of India and may change for new investments.',
      'Always verify the latest rates and official scheme details before investing.',
    ],
    explanation: 'National Savings Certificate (NSC) is a government-backed post office savings scheme with a fixed 5-year tenure and yearly compounding.',
  },

  // ─── 13. PPF ───
  'ppf': {
    title: 'Public Provident Fund',
    whatIsIt: [
      'The Public Provident Fund (PPF) is a long-term savings scheme backed by the Government of India, designed to encourage disciplined savings while offering tax benefits and guaranteed returns. It is widely used for goals such as retirement planning, wealth accumulation, and long-term financial security.',
      'A PPF Calculator helps estimate the maturity value and total interest earned based on yearly contributions over the investment period.',
    ],
    howItWorks: {
      text: [
        'A fixed amount is deposited every year (up to the allowed government limit). The interest rate is determined by the Government of India and may change periodically. Interest is compounded annually.',
        'The scheme has a 15-year maturity period, but it can be extended in blocks of 5 years. Deposits are made until year N, but the final maturity is received in year N+1.',
      ],
      points: [
        { title: 'Annual Deposits', description: 'Fixed yearly contributions up to the government limit' },
        { title: 'Annual Compounding', description: 'Interest compounds once per year' },
        { title: '15-Year Lock-In', description: 'Maturity after 15 years, extendable in 5-year blocks' },
        { title: 'EEE Tax Benefit', description: 'Deposits, interest, and maturity are all tax-free' },
      ],
    },
    formula: {
      formula: 'Amt = P × ((1 + R)^T − 1) / R\nTotal = Amt × (1 + R)',
      variables: [
        { symbol: 'P', meaning: 'Yearly deposit amount' },
        { symbol: 'R', meaning: 'Annual interest rate (in decimal form)' },
        { symbol: 'T', meaning: 'Total number of years deposits are made' },
      ],
      assumptions: ['Annual compounding', 'Fixed annual deposits', 'Final year interest added before maturity'],
    },
    benefits: [
      { title: 'Government Backed', description: 'Guaranteed returns from the Government of India' },
      { title: 'Tax Free', description: 'EEE benefit — deposits, interest, and maturity all exempt' },
      { title: 'Section 80C', description: 'Annual tax deduction on deposits' },
      { title: 'Long-Term Growth', description: '15-year compounding for substantial wealth creation' },
    ],
    disclaimer: [
      'This calculator provides estimated projections for planning purposes only. PPF interest rates are declared periodically by the Government of India and may change over time.',
      'Actual returns may vary based on the prevailing interest rate and deposit timing rules. Always verify official scheme guidelines before investing.',
    ],
    explanation: 'The Public Provident Fund (PPF) is a long-term government-backed savings scheme with 15-year lock-in. Annual compounding with EEE tax benefit.',
  },

  // ─── 14. NPS ───
  'nps': {
    title: 'National Pension System',
    whatIsIt: [
      'The National Pension System (NPS) is a government-backed retirement savings scheme designed to help individuals build a retirement corpus through regular contributions. It is a voluntary investment scheme, meaning individuals can choose to invest independently even if their employer does not contribute.',
      'An NPS Calculator helps estimate the future value of investments, retirement corpus, lump sum withdrawal, and potential monthly pension.',
    ],
    howItWorks: {
      text: [
        'Investors contribute regularly during their working years. Contributions are invested in market-linked assets such as equities, corporate bonds, and government securities. Investment grows through monthly compounding.',
      ],
      points: [
        { title: 'Lump Sum Withdrawal (60%)', description: 'Up to 60% of the total corpus can be withdrawn tax-free at retirement' },
        { title: 'Annuity Purchase (40%)', description: 'At least 40% must be used to buy an annuity for regular pension income' },
        { title: 'Voluntary Scheme', description: 'Invest independently even without employer contribution' },
        { title: 'Market-Linked Growth', description: 'Invested in equities, bonds, and government securities' },
      ],
    },
    formula: {
      formula: 'Total = P × [((1 + R/n)^(n×T) − 1) / (R/n)] × (1 + R/n)',
      variables: [
        { symbol: 'P', meaning: 'Monthly contribution amount' },
        { symbol: 'R', meaning: 'Annual rate of return' },
        { symbol: 'n', meaning: 'Compounding periods per year (12 for monthly)' },
        { symbol: 'T', meaning: 'Total investment period in years' },
      ],
      assumptions: ['Monthly compounding', 'Fixed return rate', 'Lump sum = 60% of corpus', 'Annuity = 40% of corpus'],
    },
    benefits: [
      { title: 'Retirement Savings', description: 'Long-term market-linked growth for retirement corpus' },
      { title: 'Tax Benefits', description: 'Deductions under multiple sections of Income Tax Act' },
      { title: 'Dual Benefit', description: 'Both lump sum withdrawal and regular pension income' },
      { title: 'Government Regulated', description: 'Transparent and regulated investment structure' },
    ],
    disclaimer: [
      'This calculator provides estimated projections for educational and planning purposes only. Actual returns depend on market performance, asset allocation, annuity rates, and government regulations.',
      'Always review the latest NPS guidelines and consult financial professionals before making retirement planning decisions.',
    ],
    explanation: 'The National Pension System (NPS) is a government-backed retirement savings scheme with market-linked growth. At retirement: 60% lump sum, 40% annuity.',
  },

  // ─── 15. Compound Interest ───
  'compound-interest': {
    title: 'Compound Interest',
    whatIsIt: [
      'A Compound Interest Calculator helps determine how an investment or savings amount grows over time when interest is earned not only on the original principal but also on the accumulated interest.',
      'This concept is known as "interest on interest", and it is one of the most powerful mechanisms for long-term wealth growth.',
    ],
    howItWorks: {
      text: [
        'When interest is compounded, the interest earned in each period is added to the principal, and the next period\'s interest is calculated on the new increased amount.',
        'For example, if you invest ₹1,00,000 at 10% annually, the interest earned in the first year becomes part of the principal in the second year. This process continues, allowing growth at an accelerating rate.',
      ],
      points: [
        { title: 'Interest on Interest', description: 'Each period\'s interest is added to the principal for next calculation' },
        { title: 'Multiple Frequencies', description: 'Can compound monthly, quarterly, or yearly' },
        { title: 'Exponential Growth', description: 'Investments grow faster over longer time periods' },
      ],
    },
    formula: {
      formula: 'A = P × (1 + R/n)^(n × T)',
      variables: [
        { symbol: 'A', meaning: 'Final amount after interest' },
        { symbol: 'P', meaning: 'Initial principal amount' },
        { symbol: 'R', meaning: 'Annual interest rate (in decimal form)' },
        { symbol: 'n', meaning: 'Number of compounding periods per year' },
        { symbol: 'T', meaning: 'Time period in years' },
      ],
      assumptions: ['Compounding at chosen frequency', 'Fixed interest rate', 'No additional contributions'],
    },
    benefits: [
      { title: 'Future Value', description: 'Calculate the future value of any investment' },
      { title: 'Total Interest', description: 'See exactly how much interest you earn over time' },
      { title: 'Multiple Frequencies', description: 'Compare monthly, quarterly, and yearly compounding' },
      { title: 'Long-Term Impact', description: 'Understand how compounding accelerates wealth growth' },
    ],
    disclaimer: [
      'This calculator provides estimated results for educational and planning purposes only. Actual returns may vary depending on the investment instrument, compounding frequency, taxes, and financial institution policies.',
      'Always review the specific terms of your investment before making financial decisions.',
    ],
    explanation: 'A Compound Interest Calculator determines how an investment grows with interest on interest. Formula: A = P × (1 + R/n)^(n×T).',
  },

  // ─── 16. Simple Interest ───
  'simple-interest': {
    title: 'Simple Interest',
    whatIsIt: [
      'A Simple Interest Calculator helps determine the interest earned or payable on a principal amount over a fixed period, where interest is calculated only on the original principal and not on previously earned interest.',
      'Unlike compound interest, simple interest does not accumulate interest on interest, making the calculation straightforward and easy to understand.',
    ],
    howItWorks: {
      text: [
        'In simple interest calculations, the interest amount remains constant for each period because it is always calculated on the original principal.',
        'For example, if you invest ₹1,00,000 at 10% interest for 3 years, the interest is calculated on ₹1,00,000 each year, regardless of how long the money remains invested.',
      ],
      points: [
        { title: 'Constant Interest', description: 'Same interest amount earned every period' },
        { title: 'Original Principal Only', description: 'Interest calculated only on the initial amount' },
        { title: 'Linear Growth', description: 'Investment grows at a steady, predictable rate' },
      ],
    },
    formula: {
      formula: 'Simple Interest = (P × R × T) / 100',
      variables: [
        { symbol: 'P', meaning: 'Principal amount' },
        { symbol: 'R', meaning: 'Annual interest rate (%)' },
        { symbol: 'T', meaning: 'Time period in years' },
      ],
      assumptions: ['Interest on original principal only', 'No compounding', 'Total Amount = Principal + SI'],
    },
    benefits: [
      { title: 'Easy Calculation', description: 'Simple and straightforward formula' },
      { title: 'Predictable Returns', description: 'Consistent interest amount every period' },
      { title: 'Short-Term Use', description: 'Commonly used for short-term loans or investments' },
      { title: 'Transparent', description: 'Easy to understand the true cost of borrowing or returns' },
    ],
    disclaimer: [
      'This calculator provides estimated values for educational and planning purposes only. Actual interest calculations may vary depending on lender policies, compounding rules, and financial product terms.',
      'Always review the official terms before making financial decisions.',
    ],
    explanation: 'Simple Interest is calculated only on the original principal using the formula SI = (P × R × T) / 100.',
  },

  // ─── 17. Car Loan ───
  'car-loan': {
    title: 'Car Loan',
    whatIsIt: [
      'A Car Loan is a secured loan provided by banks or financial institutions to help individuals purchase a car. The vehicle itself acts as collateral for the loan, which is repaid through fixed monthly EMIs over a chosen tenure.',
      'Car loans generally follow a reducing balance interest calculation, meaning interest is charged only on the remaining outstanding principal.',
    ],
    howItWorks: {
      text: [
        'Each EMI includes both principal repayment and interest. As you continue paying EMIs, the loan balance decreases, and interest for the next month is calculated on the reduced principal amount.',
      ],
      points: [
        { title: 'Vehicle as Collateral', description: 'The car serves as security for the loan' },
        { title: 'Reducing Balance', description: 'Interest charged only on outstanding principal' },
        { title: 'Fixed EMI', description: 'Same monthly payment throughout the loan tenure' },
        { title: '36–84 Month Tenure', description: 'Flexible tenure ranging from 3 to 7 years' },
      ],
    },
    formula: {
      formula: 'EMI = P × [i(1 + i)^N] / [(1 + i)^N − 1]',
      variables: [
        { symbol: 'P', meaning: 'Loan principal (car price minus down payment)' },
        { symbol: 'i', meaning: 'Monthly interest rate' },
        { symbol: 'N', meaning: 'Total number of monthly installments' },
      ],
      assumptions: ['Reducing balance interest', 'Fixed interest rate', 'Monthly EMI payments'],
    },
    benefits: [
      { title: 'Secured Loan', description: 'Lower interest rates due to vehicle collateral' },
      { title: 'Fixed Payments', description: 'Predictable monthly EMIs for easy budgeting' },
      { title: 'Flexible Tenure', description: 'Choose tenure that fits your financial capacity' },
      { title: 'Ownership Benefit', description: 'Drive the car while paying for it over time' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, loan limits, processing fees, and repayment conditions vary across banks and financial institutions.',
      'Always review the official loan terms and conditions before applying for a car loan.',
    ],
    explanation: 'Car loans follow a reducing balance interest calculation — interest is charged only on the remaining outstanding principal. Tenure typically ranges from 36 to 84 months.',
  },

  // ─── 18. Two-Wheeler Loan ───
  'two-wheeler-loan': {
    title: 'Two-Wheeler Loan',
    whatIsIt: [
      'A Two-Wheeler Loan is a loan offered by banks or financial institutions to help individuals purchase motorcycles, scooters, or other two-wheelers. The loan is typically repaid through fixed monthly EMIs over a tenure that usually ranges from 1 to 5 years.',
      'These loans are generally secured by the vehicle itself, meaning the lender retains a charge on the vehicle until the loan is fully repaid.',
    ],
    howItWorks: {
      text: [
        'Many two-wheeler loans use a flat interest rate calculation method. In this method, interest is calculated on the entire original loan amount for the full loan tenure, regardless of how much principal has already been repaid.',
        'The EMI is calculated as: Total Amount ÷ (Tenure in Months). The interest is evenly distributed across the entire loan period.',
      ],
      points: [
        { title: 'Flat Rate Interest', description: 'Interest calculated on the full original loan amount' },
        { title: 'Fixed EMI', description: 'Same monthly payment throughout the loan' },
        { title: '12–60 Month Tenure', description: 'Short- to medium-term loan periods' },
        { title: 'Vehicle as Security', description: 'Two-wheeler serves as collateral for the loan' },
      ],
    },
    formula: {
      formula: 'Interest = P × R × T\nEMI = (P + Interest) ÷ (T × 12)',
      variables: [
        { symbol: 'P', meaning: 'Loan principal amount' },
        { symbol: 'R', meaning: 'Annual interest rate (flat rate)' },
        { symbol: 'T', meaning: 'Tenure in years' },
      ],
      assumptions: ['Flat rate interest calculation', 'Fixed EMI', 'Interest on full principal for entire tenure'],
    },
    benefits: [
      { title: 'Quick Approval', description: 'Faster processing compared to larger secured loans' },
      { title: 'Easy Access', description: 'Available from most banks and NBFCs' },
      { title: 'Affordable EMIs', description: 'Manageable monthly payments for two-wheeler purchase' },
      { title: 'Flexible Tenure', description: 'Choose from 1 to 5 years of repayment' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, loan limits, processing fees, and repayment terms vary between lenders and financial institutions.',
      'Always review the official loan agreement and conditions before applying for a two-wheeler loan.',
    ],
    explanation: 'A Two-Wheeler Loan helps purchase motorcycles or scooters. Many use flat interest rate calculation where interest is on the full principal for the entire tenure.',
  },

  // ─── 19. Personal Loan ───
  'personal-loan': {
    title: 'Personal Loan',
    whatIsIt: [
      'A Personal Loan is an unsecured loan provided by banks or financial institutions to meet personal financial needs such as medical expenses, travel, education, home renovation, or other emergencies. Since these loans typically do not require collateral, they usually come with higher interest rates compared to secured loans.',
      'Personal loans are repaid through fixed monthly EMIs over a selected tenure, usually ranging from 1 to 5 years.',
    ],
    howItWorks: {
      text: [
        'Personal loans generally follow a reducing balance interest calculation. Interest is charged only on the remaining outstanding principal.',
        'Each EMI consists of two parts: interest and principal repayment. As the loan progresses and the principal decreases, the interest portion gradually reduces while the principal portion increases.',
      ],
      points: [
        { title: 'No Collateral', description: 'Unsecured loan without any asset pledged' },
        { title: 'Reducing Balance', description: 'Interest calculated on remaining outstanding principal' },
        { title: 'Fixed EMI', description: 'Same monthly payment throughout the tenure' },
        { title: 'Higher Interest', description: 'Rates generally higher than secured loans' },
      ],
    },
    formula: {
      formula: 'EMI = P × [i(1 + i)^N] / [(1 + i)^N − 1]',
      variables: [
        { symbol: 'P', meaning: 'Loan principal (amount borrowed)' },
        { symbol: 'i', meaning: 'Monthly interest rate' },
        { symbol: 'N', meaning: 'Total number of monthly installments' },
      ],
      assumptions: ['Reducing balance interest', 'Fixed interest rate', '12–60 month tenure'],
    },
    benefits: [
      { title: 'No Collateral', description: 'Avail loans without pledging any assets' },
      { title: 'Quick Disbursement', description: 'Fast approval and disbursement process' },
      { title: 'Flexible Usage', description: 'Use funds for any personal financial need' },
      { title: 'Fixed EMI', description: 'Predictable monthly payments for easy budgeting' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, loan limits, processing fees, and repayment terms vary between lenders.',
      'Always review the official loan terms and conditions before applying for a personal loan.',
    ],
    explanation: 'A Personal Loan is an unsecured loan for personal financial needs. It follows reducing balance interest calculation with fixed EMIs.',
  },

  // ─── 20. Education Loan ───
  'education-loan': {
    title: 'Education Loan',
    whatIsIt: [
      'An Education Loan helps students finance higher education expenses such as tuition fees, accommodation, books, and other academic costs. Unlike most loans, education loans usually include a moratorium period, which allows students to focus on studies before starting full EMI repayments.',
    ],
    howItWorks: {
      text: [
        'Education loans typically have three phases: Study Period (2-4 years), Moratorium Period (study + 6-12 months after graduation), and Repayment Period (full EMIs on reducing balance).',
        'During the moratorium, simple interest accumulates. Some loans let students pay interest during this phase to reduce total cost.',
      ],
      points: [
        { title: 'Study Period', description: 'Duration of the course, usually 2-4 years' },
        { title: 'Moratorium Period', description: 'Study period + 6-12 months after graduation before EMIs begin' },
        { title: 'Interest Options', description: 'Pay interest during moratorium or let it accumulate' },
        { title: 'Reducing Balance EMI', description: 'Standard EMI repayment after moratorium ends' },
      ],
    },
    benefits: [
      { title: 'Moratorium Period', description: 'No EMI payments during studies and a buffer period after' },
      { title: 'No Foreclosure Penalty', description: 'Most education loans allow early closure without penalty' },
      { title: 'Tax Benefits', description: 'Tax deductions available on interest payments' },
      { title: 'Education Focused', description: 'Specifically designed to support higher education funding' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, government subsidies, moratorium rules, and repayment terms may vary by bank, financial institution, or government scheme.',
      'Always review the official loan agreement and eligibility conditions before applying for an education loan.',
    ],
    explanation: 'An Education Loan finances higher education. It includes a moratorium period allowing students to focus on studies before starting EMI repayments.',
  },

  // ─── 21. Credit Card Loan ───
  'credit-card-loan': {
    title: 'Loan on Credit Card',
    whatIsIt: [
      'A Credit Card Loan is a pre-approved loan offered by banks to existing credit card holders. Instead of applying for a separate personal loan, you can convert a portion of your available credit limit into a loan, which is then repaid through fixed monthly EMIs.',
      'The loan amount is either credited directly to your bank account or temporarily added to your card balance.',
    ],
    howItWorks: {
      text: [
        'Suppose your credit card limit is ₹2,00,000 and the bank offers you a credit card loan of ₹1,00,000. Once you accept, the amount is disbursed and you repay through EMIs over 3 to 48 months.',
        'Unlike regular credit card spending, this loan follows a fixed repayment schedule.',
      ],
      points: [
        { title: 'Pre-Approved', description: 'No separate application needed — offered to existing cardholders' },
        { title: 'Quick Disbursement', description: 'Instant approval and disbursement to your account' },
        { title: 'Fixed EMIs', description: 'Repay through fixed monthly installments' },
        { title: 'Credit Limit Impact', description: 'Loan reduces your available credit limit until repaid' },
      ],
    },
    benefits: [
      { title: 'No Documentation', description: 'Usually no additional paperwork required' },
      { title: 'Instant Access', description: 'Quick approval and disbursement' },
      { title: 'Fixed Repayment', description: 'Clear EMI schedule unlike revolving credit' },
      { title: 'Convenient', description: 'Avail directly from your credit card account' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, loan limits, processing fees, and repayment terms vary between banks and credit card providers.',
      'Credit card loans often have higher interest rates than traditional personal loans. Missed payments can lead to late fees, penalty interest, and a negative impact on your credit score.',
      'Always review the official terms and conditions before accepting a credit card loan offer.',
    ],
    explanation: 'A Credit Card Loan is a pre-approved loan for existing cardholders. Repaid through fixed EMIs over 3-48 months.',
  },

  // ─── 22. Flat vs Reducing (Loan Comparison) ───
  'flat-vs-reducing': {
    title: 'Loan Comparison (Flat vs Reducing)',
    whatIsIt: [
      'When taking a loan, the way interest is calculated can significantly affect how much you actually pay. The three most common interest calculation methods are Flat Rate, Reducing Balance, and Reducing Rate (Alternate Rate).',
      'This calculator helps you compare these methods side by side to understand the true cost of borrowing.',
    ],
    howItWorks: {
      text: [
        'In a Flat Rate loan, interest is calculated on the entire original amount for the full tenure. In Reducing Balance, interest is only on the remaining principal. The Reducing Rate shows the equivalent reducing-balance rate for the same EMI as a flat rate loan.',
      ],
      points: [
        { title: 'Flat Rate', description: 'Interest on full principal for entire tenure — looks cheaper but costs more' },
        { title: 'Reducing Balance', description: 'Interest only on outstanding principal — used by modern loans' },
        { title: 'Alternate Rate', description: 'Equivalent reducing balance rate for a flat rate EMI — reveals true cost' },
      ],
    },
    benefits: [
      { title: 'True Cost Comparison', description: 'See the real difference between flat and reducing rates' },
      { title: 'Effective Rate', description: 'A 10% flat rate may be 17-19% on reducing balance basis' },
      { title: 'Fair Comparison', description: 'Compare loan offers from different lenders accurately' },
      { title: 'Informed Decisions', description: 'Make better borrowing decisions with full transparency' },
    ],
    disclaimer: [
      'This explanation is for educational purposes only. Actual loan terms, interest rates, and calculation methods may vary by lender.',
      'Always review the loan agreement and repayment structure before making borrowing decisions.',
    ],
    explanation: 'Compare Flat Rate vs Reducing Balance interest methods. A 10% flat rate may actually be equivalent to 17-19% on reducing balance.',
  },

  // ─── 23. Overdraft ───
  'overdraft': {
    title: 'Overdraft Loan',
    whatIsIt: [
      'An Overdraft (OD) is a credit facility that allows you to withdraw more money than the balance in your bank account, up to a pre-approved limit. Unlike a traditional loan, an overdraft works like a flexible credit line — you can withdraw money when needed and repay it anytime.',
      'The biggest advantage is that interest is charged only on the amount you use and only for the number of days you use it.',
    ],
    howItWorks: {
      text: [
        'If your overdraft limit is ₹5,00,000 and you withdraw ₹2,00,000 for 10 days, you pay interest only on ₹2,00,000 for those 10 days. Once repaid, interest stops.',
      ],
      points: [
        { title: 'Secured Overdraft', description: 'Backed by FD, property, shares, or mutual funds — higher limits, lower rates' },
        { title: 'Unsecured Overdraft', description: 'Based on income and credit history — lower limits, higher rates' },
        { title: 'Pay-Per-Use', description: 'Interest charged only on the amount used and days used' },
        { title: 'Flexible Repayment', description: 'Withdraw and repay anytime without fixed EMIs' },
      ],
    },
    formula: {
      formula: 'Interest = (Amount Used × Rate × Days) / 365',
      variables: [
        { symbol: 'Amount Used', meaning: 'The actual amount withdrawn from the OD limit' },
        { symbol: 'Rate', meaning: 'Annual interest rate (in decimal form)' },
        { symbol: 'Days', meaning: 'Number of days the amount is used' },
      ],
      assumptions: ['Daily interest calculation', 'Interest only on amount used', 'No fixed EMI structure'],
    },
    benefits: [
      { title: 'Pay Only for Usage', description: 'Interest charged only on the amount used, not the full limit' },
      { title: 'Flexible Access', description: 'Withdraw and repay as needed, anytime' },
      { title: 'Short-Term Solution', description: 'Ideal for temporary cash flow gaps' },
      { title: 'Bank Account Linked', description: 'Can be linked directly to your existing bank account' },
    ],
    disclaimer: [
      'This information is for educational purposes only and not financial advice. Interest rates, limits, and terms vary by bank or financial institution.',
      'Overdrafts are best used for short-term financial needs or temporary cash flow gaps, not for long-term borrowing. Always review the official terms and conditions before applying.',
    ],
    explanation: 'An Overdraft (OD) is a flexible credit facility. Interest is charged only on the amount used and only for the days it is used.',
  },
}
