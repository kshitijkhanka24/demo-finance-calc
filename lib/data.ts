import { Calculator, Landmark, PiggyBank, Briefcase, GraduationCap, Car, CreditCard, Building, ShieldCheck, TrendingUp, HandCoins } from 'lucide-react'

export const calculatorsList = [
  {
    category: "Savings & Investments",
    items: [
      { id: "compound-interest", name: "Compound Interest", description: "Calculate wealth growth over time", icon: TrendingUp },
      { id: "fd", name: "Fixed Deposit (FD)", description: "Guaranteed returns on your savings", icon: Landmark },
      { id: "rd", name: "Recurring Deposit (RD)", description: "Monthly savings with fixed returns", icon: PiggyBank },
      { id: "sip", name: "SIP + Lumpsum", description: "Mutual fund investment returns", icon: TrendingUp },
      { id: "step-up-sip", name: "Step Up SIP", description: "Increase SIP amount annually", icon: TrendingUp },
      { id: "swp", name: "SWP Calc", description: "Systematic Withdrawal Plan", icon: HandCoins },
      { id: "simple-interest", name: "Simple Interest", description: "Basic interest calculations", icon: Calculator },
    ]
  },
  {
    category: "Loans & Borrowings",
    items: [
      { id: "emi", name: "EMI Calculator", description: "Calculate monthly installments", icon: Calculator },
      { id: "home-loan", name: "Home Loan", description: "EMI & total interest payable", icon: Building },
      { id: "personal-loan", name: "Personal Loan", description: "Unsecured loan calculations", icon: Briefcase },
      { id: "two-wheeler-loan", name: "2 Wheeler Loan", description: "Bike/Scooter loan EMI", icon: Car },
      { id: "car-loan", name: "Car Loan", description: "Four-wheeler loan calculations", icon: Car },
      { id: "credit-card-loan", name: "Credit Card Loan", description: "Loan on credit card EMI", icon: CreditCard },
      { id: "education-loan", name: "Education Loan", description: "Student loan with moratorium", icon: GraduationCap },
      { id: "loan-against-security", name: "Loan Against Security", description: "LTV and interest calculations", icon: ShieldCheck },
      { id: "flat-vs-reducing", name: "Flat vs Reducing Loan", description: "Compare loan types", icon: Calculator },
      { id: "overdraft", name: "Overdraft Calc", description: "Daily interest for overdrafts", icon: Calculator },
    ]
  },
  {
    category: "Government Schemes & Retirement",
    items: [
      { id: "nps", name: "NPS Calc", description: "National Pension Scheme", icon: PiggyBank },
      { id: "nsc", name: "NSC Calc", description: "National Savings Certificate", icon: Landmark },
      { id: "ppf", name: "PPF Calc", description: "Public Provident Fund", icon: ShieldCheck },
      { id: "ssy", name: "Sukanya Samriddhi Yojana", description: "SSY scheme returns", icon: PiggyBank },
      { id: "gratuity", name: "Gratuity Calc", description: "Employee gratuity benefits", icon: Briefcase },
    ]
  }
]
