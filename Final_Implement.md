# Calculator Comparison

This README was generated from the workbook **Calculator Comparision.xlsx** and preserves the details provided in the sheet.

## Workbook summary

- Sheet count: 1
- Active sheet: Sheet1
- Total rows in sheet: 24
- Total columns in sheet: 9

## Calculator index

| # | Calculator Name | Inputs | Outputs |
|---:|---|---|---|
| 1 | Compound Interest Calc | Principal Amount in rs (P)<br>Rate of Interest in % (R)<br>Time in Years (T)<br>Compounding Frequency in year (N) | Calculated Amount<br>Interest Generated |
| 2 | FD Calc | Principal Amount in rs (P)<br>Rate of Interest in % (R)<br>Time in years (T)<br>Compounding Frequency in year (N) (fixed/default 4) | Total Amount<br>Interest |
| 3 | Gratuity Calc | Last Drawn (Basic + D.A.) (monthly) (S)<br>Years Of Service<br>Months Of Service<br>Actual No. Of Years (T)<br>Is Company Private Sector? | Total Amount |
| 4 | Recurring Deposit Calc | Monthly Deposit (S)<br>Annual Rate of Interest in % (R)<br>Quarterly Interest (i)<br>Time in Years (T)<br>No. Of Quarters<br>Compunding Frequency | Total Amount<br>Total Deposit<br>Interest |
| 5 | Lumpsum Calc | Principle Investment (P)<br>Annual Rate of Interest in % (R)<br>No. Of Years (T) | Total Amount<br>Total Deposit<br>Interest |
| 6 | SIP Calc | Monthly Deposit (S)<br>Annual Rate of Interest in % (R) range (0 to 25)<br>Montly Interest (i)<br>No. Of Years (Must be Whole Num) range (0 to 60)<br>Total No. Of Months (n) | Total Amount<br>Total Deposit<br>Interest |
| 7 | Simple Interest Calc | Principal Amount in rs (P)<br>Rate of Interest in % (R)<br>Time in months (T) | Interest<br>Total Amount |
| 8 | Step Up SIP | Initial Monthly Deposit (P)<br>Annual Rate of Interest in % (R)<br>No. Of Years (n)<br>Yearly Step-Up (G)<br>Monthly Interest in % (i) | "Amount Future Value<br>(A)"<br><br>"Total Amount<br>(r != g)"<br><br>"Total Amount<br>(r = g)"<br><br>Total Deposits<br><br>Interest |
| 9 | NPS Calc | Monthly Investment (P)<br>Expected Annual Rate of Return in % (R) [range 8:25]<br>Compunding Frequency (n)<br>Current Age range (19-60)<br>Time in years (T) [60 - current age]<br>Annuity Plan Return Rate (aR) [range 3:15] | Interest<br>Total Corpus<br>Lumpsum<br>Annuity<br>Monthly Pension<br>Total Investment |
| 10 | NSC Calc | Principal Amount in rs (P)<br>Rate of Interest in % (R) (Fixed by Govt)<br>Time in years (T) Fixed (5 years)<br>Compounding Frequency in year (N) (Fixed 1 or 2) | Calculated Amount<br>Interest Generated |
| 11 | PPF Calc | Yearly Contribution (max 1.5L)<br>Annual Rate of Return in % (R) (Fixed)<br>Compunding Frequency (n) (Yearly Fixed)<br>Time in years (T) (Atleast 15) range (15 - 40) | Interest<br>Total Amount<br>Total Deposit |
| 12 | Sukanaya Samriddhi Yojana Calc | Yearly Deposit (P) range (250 - 1.5L)<br>Annual Rate of Interest in % (r)<br>Phase 1: No. Of Years (14 fixed)<br>Phase 2: No. Of Years (7 Fixed)<br>Compunding Frequency (n) (1 Fixed)<br>Starting Year<br>Girl Age range (0 to 10) | "Total Amount<br>(at Year 18)"<br>Interest<br>Total Deposit<br><br>"Total Maturity<br>(at Year 21)"<br>Interest<br><br>Maturity Year |
| 13 | EMI Amount Calculator | Loan Principal (P)<br>Rate Of Interest (R)<br>Monthly Interest (i)<br>Total No. Years (T)<br>Number of Installments (N) | EMI Amount |
| 14 | Home Loan Calc | Loan Principal (P)<br>EMI Amount (Amt)<br>Rate Of Interest (R) range(5 to 12)<br>Monthly Interest (i)<br>Total No. Years (T)<br>Number of Installments (N) | Total Interest<br>Principal |
| 15 | Personal Loan Calc | Loan Principal (P)<br>EMI Amount (Amt)<br>Rate Of Interest (R) range(10 to 15)<br>Monthly Interest (i)<br>Total No. Years (T) range(1 to 5)<br>Number of Installments (N) | Total Interest<br>Principal |
| 16 | 2 Wheeler Loan Calc | Loan Principal (P)<br>Rate Of Interest (R) <br>Monthly Interest (i)<br>Total No. Years (T) range(1 to 3)<br>Number of Installments (N) | Total Interest<br>Principal<br>Total Amount<br>EMI Amount |
| 17 | Car Loan Calc | Loan Principal (P)<br>EMI Amount (Amt)<br>Rate Of Interest (R) range(10 to 15)<br>Monthly Interest (i)<br>Total No. Years (T) range(3 to 7)<br>Number of Installments (N) | Total Interest<br>Principal |
| 18 | Credit Card Loan Calc | Loan Amount (P)<br>Annual Interest Rate (R)<br>Tenure (Months) (n)<br>Processing Fee %<br>GST %<br>Prepayment Charge % (Optional)<br>Monthly Interest Rate (r)<br>EMI<br>Processing Fee Amount<br>GST on Processing Fee<br>Net Disbursed Amount | Total Interest<br>Total EMI<br>Total Cost Of Loan |
| 19 | Education Loan Calc | Loan Principal (P0)<br>Course Tenure (Tc) in years range(2 to 4)<br>Buffere Period (Tb) in years option(0.5 / 1)<br>Total Moratorium Period (Tm) in years<br>Annual Rate of Interest (R) in %<br>Interest Calculated on Moratorium Period<br>"Does Student Pay Interest during Moratorium Period<br>Or Receive Government Scheme Support"<br>Final Loan Principal (P)<br>Monthly Interest (i)<br>Total No. Years (T) range(5 to 10)<br>Number of Installments (N) | EMI Amount<br><br>Total Principal<br><br>Total Interest Paid |
| 20 | Loan Against Security | Security Value<br>Security Type<br>Security LTV %<br>Eligible Loan (P)<br>Rate Of Interest (R) range(5 to 12)<br>Monthly Interest (i)<br>Tenure in years (T)<br>Number of Installments (N)<br>EMI Amt | Total Interest<br><br>Principal<br><br>Total EMI / Paid |
| 21 | SWP Calc | Total Investment (P)<br>Withdrawal Per Month (W)<br>Rate Of Interest (R) range(5 to 20)<br>Monthly Interest (i)<br>Total No. Years (T) range(4 to 20)<br>Number of Months / Withdrawals (N) | Total Withdrawal<br><br>Total Investment<br><br>"Future Value (Remaining Corpus)" |
| 22 | Flat vs Reducing vs Reducing Rate Loan Calc | Inputs Fields Attributes:<br>Loan Amount (P)<br>Annual Interest Rate (%)<br>Tenure (Years)<br>Reducing Rate (if different, else same as above)<br><br>DERIVED VALUES<br>Total Months (N)<br>Monthly Rate (Flat)<br>Monthly Rate (Reducing)<br><br>FLAT LOAN CALCULATION<br>Flat Total Interest<br>Flat Total Payment<br>Flat EMI<br><br>REDUCING LOAN CALCULATION<br>Reducing EMI<br>Reducing Total Payment<br>Reducing Total Interest<br><br>REDUCING RATE (ALTERNATE RATE)<br>Reducing Rate EMI<br>Reducing Rate Total Payment<br>Reducing Rate Total Interest | COMPARISON        <br>Interest Saved (Reducing vs Flat)<br>Interest Saved (Reducing Rate vs Flat) |
| 23 | Overdraft Calc | OverDraft Account Limit<br>Overdraft Amt Principal (P)<br>Rate Of Interest (R) p.a.<br>Daily Interest (i) = R/365<br>Total No. Days (D) | — |

## Detailed specifications

### 1. Compound Interest Calc

#### Inputs
- Principal Amount in rs (P)
- Rate of Interest in % (R)
- Time in Years (T)
- Compounding Frequency in year (N)

#### Outputs
- Calculated Amount
- Interest Generated

#### Formula
```text
Calculated Amount = P(1+R/n)^(n*T*12)

Interest Generated = Amt - P
```

#### Input limits
- P: 10000 to 10000000
- R: 5% to 30%
- T: 2 to 30 Years

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Deposit | Interest | Amount

### 2. FD Calc

#### Inputs
- Principal Amount in rs (P)
- Rate of Interest in % (R)
- Time in years (T)
- Compounding Frequency in year (N) (fixed/default 4)

#### Outputs
- Total Amount
- Interest

#### Formula
```text
"Calculated Amount = P(1+R/n)^(n*T*12)

Interest Generated = Amt - P"
```

#### Input limits
- P: 10000 to 10000000
- R: 5% to 30%
- T: 2 to 30 Years

#### Assumptions / notes
```text
Assumptions:
1. Bank Compounds Quaterly
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Deposit | Interest | Amount

### 3. Gratuity Calc

#### Inputs
- Last Drawn (Basic + D.A.) (monthly) (S)
- Years Of Service
- Months Of Service
- Actual No. Of Years (T)
- Is Company Private Sector?

#### Outputs
- Total Amount

#### Formula
```text
Total Amount = S*T*15/26
```

#### Input limits
- S: 10000 to 1000000
- T: 2 to 30

#### Assumptions / notes
```text
Assumptions:
1. In some comapnies eligibility criteria might be different
2. If Months greater than equal to 6, its calculated year + 1
3. At Pvt Sector, Max Cap is 20L. In Gov max cap is 25L
4. Calculated with last months salary
5. In Government Venture, minimum 5 yrs (4.5+) to get gratuity
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Output)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- No need

#### Tabular structure
- No need

### 4. Recurring Deposit Calc

#### Inputs
- Monthly Deposit (S)
- Annual Rate of Interest in % (R)
- Quarterly Interest (i)
- Time in Years (T)
- No. Of Quarters
- Compunding Frequency

#### Outputs
- Total Amount
- Total Deposit
- Interest

#### Formula
```text
Total Amount = 
S x ((1 + i)^n - 1)/(1-(1+i)^(-1/3)
```

#### Input limits
- S: 10000 to 1000000
- T: 2 to 30
- R: 5% to 30%

#### Assumptions / notes
```text
Assumptions:
"1. Monthly Installments
2. Compunding Frequency is Quaterly"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Deposit | Interest | Amount

### 5. Lumpsum Calc

#### Inputs
- Principle Investment (P)
- Annual Rate of Interest in % (R)
- No. Of Years (T)

#### Outputs
- Total Amount
- Total Deposit
- Interest

#### Formula
```text
Total Amount = 
M= P x ((1 + R)^T)
```

#### Input limits
- P: 10000 to 10000000
- T: 2 to 30
- R: 5% to 30%

#### Assumptions / notes
```text
Assumptions:
"1. One time investment
2. Compunding Frequency is Yearly"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Interest Earned | Amount

### 6. SIP Calc

#### Inputs
- Monthly Deposit (S)
- Annual Rate of Interest in % (R) range (0 to 25)
- Montly Interest (i)
- No. Of Years (Must be Whole Num) range (0 to 60)
- Total No. Of Months (n)

#### Outputs
- Total Amount
- Total Deposit
- Interest

#### Formula
```text
Total Amount = 
M= S x (((1 + i)^n - 1)  / (i)) x (1 + i)

Monthly Return = {(1 + Annual Return)^1/12} – 1
```

#### Input limits
- S: 10000 to 1000000
- T: 2 to 60
- R: 5% to 30%

#### Assumptions / notes
```text
Assumptions:
1. Monthly Installments
2. Compunding Frequency is Monthly
3. R is in % formatting already
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Deposit | Interest Earned | Amount

### 7. Simple Interest Calc

#### Inputs
- Principal Amount in rs (P)
- Rate of Interest in % (R)
- Time in months (T)

#### Outputs
- Interest
- Total Amount

#### Formula
```text
Interest = (P x R x (T / 12))/100
Total Amount = P + Interest
```

#### Input limits
- P: 10000 to 1000000
- T: 2 to 60
- R: 5% to 30%

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit

#### Tabular structure
- No need

### 8. Step Up SIP

#### Inputs
- Initial Monthly Deposit (P)
- Annual Rate of Interest in % (R)
- No. Of Years (n)
- Yearly Step-Up (G)
- Monthly Interest in % (i)

#### Outputs
- "Amount Future Value
- (A)"
- "Total Amount
- (r != g)"
- "Total Amount
- (r = g)"
- Total Deposits
- Interest

#### Formula
```text
"Total Amount (R != G) = 
M= A x ((1 + R)^n - (1 + G)^n) / (R - G)"

"When R = G
M= A x n x (1+R)^(n-1)"

"Total Deposit =
P x 12 x ((1 + G)^n - 1) / (G)"

A = (P x ((1 + i)^12 - 1) / i)*(1+i)

Monthly Return = {(1 + Annual Return)^1/12} – 1
```

#### Input limits
- P: 10000 to 1000000
- T: 2 to 60
- R: 5% to 30%
- G: 5% to 25%

#### Assumptions / notes
```text
Assumptions:
1. Monthly Installments
2. Compunding Frequency is Monthly
3. Step up is Yearly, and fixed
4. Formula follows Annuity Due i.e. SIP is done at start of month, therefore we get 1 month's additional interest)
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- Table View:
- 1. Year | Deposit | Interest | Amount

### 9. NPS Calc

#### Inputs
- Monthly Investment (P)
- Expected Annual Rate of Return in % (R) [range 8:25]
- Compunding Frequency (n)
- Current Age range (19-60)
- Time in years (T) [60 - current age]
- Annuity Plan Return Rate (aR) [range 3:15]

#### Outputs
- Interest
- Total Corpus
- Lumpsum
- Annuity
- Monthly Pension
- Total Investment

#### Formula
```text
"Total Amount (Future Value) 
= P * (((1 + R/n)^(n*T) - 1) / (R/n))*(1 + R/n)"

Lumpsum = Total Amount * 60%
Annuity = Total Amount * 40%
Monthly Pension = Annuity * (aR) / 12
```

#### Input limits
- P: 10000 to 1000000
- T: 2 to 60
- R: 5% to 30%
- G: 5% to 25%

#### Assumptions / notes
```text
Assumptions:
1. Compunding Frequency is Monthly
2. Its a voluntary scheme employee can invest in after EPF, so Employer doesn't need to invest
3. Only max 10% can be invested of salary (Basic + D.A.)
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- "Simple Graph:
- 1. Total Corpus
- 2. Annuity and  Lump Sum Value
- 3. Total Investment & Total Gain Value"

#### Tabular structure
- No need

### 10. NSC Calc

#### Inputs
- Principal Amount in rs (P)
- Rate of Interest in % (R) (Fixed by Govt)
- Time in years (T) Fixed (5 years)
- Compounding Frequency in year (N) (Fixed 1 or 2)

#### Outputs
- Calculated Amount
- Interest Generated

#### Formula
```text
Calculated Amount = P(1+R)^(T)

Interest Generated = Amt - P
```

#### Input limits
- P: 10000 to 1000000
- T: 5 fixed
- R: 7.7% Fixed
- N: 1 or 2

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit at Maturity

#### Tabular structure
- No need

### 11. PPF Calc

#### Inputs
- Yearly Contribution (max 1.5L)
- Annual Rate of Return in % (R) (Fixed)
- Compunding Frequency (n) (Yearly Fixed)
- Time in years (T) (Atleast 15) range (15 - 40)

#### Outputs
- Interest
- Total Amount
- Total Deposit

#### Formula
```text
Amt = P*((1 + R)^T - 1)/(R))

Total Amount = Amt (1 + R)
```

#### Input limits
- P: 1 to 150000
- R: 7.1% Fixed
- N: 1 Fixed
- T: 15 to 40 yr

#### Assumptions / notes
```text
"Note:
1. Deposit till N yrs, Total Amount is received at N+1... Therefore add interest for that additional year"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Corpus
- 2. Annuity and  Lump Sum Value
- 3. Total Investment & Total Gain Value

#### Tabular structure
- No need

### 12. Sukanaya Samriddhi Yojana Calc

#### Inputs
- Yearly Deposit (P) range (250 - 1.5L)
- Annual Rate of Interest in % (r)
- Phase 1: No. Of Years (14 fixed)
- Phase 2: No. Of Years (7 Fixed)
- Compunding Frequency (n) (1 Fixed)
- Starting Year
- Girl Age range (0 to 10)

#### Outputs
- "Total Amount
- (at Year 18)"
- Interest
- Total Deposit
- "Total Maturity
- (at Year 21)"
- Interest
- Maturity Year

#### Formula
```text
"Amount after Phase 1 = 

Interest= P x (1 + r/1) ^ 1x14
Amt = P x ((1 + r)^14 - 1)/r"

"Amount after Phase 2 = 

Final = Amt x (1+ r/1)^1x7"
```

#### Input limits
- P: 250 to 150000
- R: 8.2% Fixed
- N: 1 Fixed
- T: Fixed, 14 and 7. Total 21.

#### Assumptions / notes
```text
Note:
1. Show Government Rates Table
https://www.nsiindia.gov.in/(S(e3b0dojgo1wlcr45lzsu3j45))/InternalPage.aspx?Id_Pk=179

2. Account opening date se 21 years pe mature hoga

3. Girl can prematurely withdraw when she attains age of 18 in case of marraige / medical condition
https://www.nsiindia.gov.in/(S(mqgx0x55xvin2cmzngvn52qs))/InternalPage.aspx?Id_Pk=89

4. Government provides High Interest Rate, Tax Free withdrawal and Ensurity of receiving, Tax benefits for parent upto 1.5L under 80C"

Assumptions:
"1. Can only enroll if girl child age is between 0 - 10
2. Deposits are made for 14 Consecutive Years (15 Deposits)
3. Compunding Frequency is Yearly
4. From Year 15 to 21 (7 Years) the money compunds
5. Partial withdrawal can be made when girl is 18 for studies, marraige with affadavit or other geniune reason
6. Complete withdrawal can be made on 21
7. You can make partial withdrawal upto 50% for 5 years, till amount reaches maturity"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Amount: Interest + Deposit
- 2. Partial Withdrawal Amount At 18 (Girls Age) only number

#### Tabular structure
- No need

### 13. EMI Amount Calculator

#### Inputs
- Loan Principal (P)
- Rate Of Interest (R)
- Monthly Interest (i)
- Total No. Years (T)
- Number of Installments (N)

#### Outputs
- EMI Amount

#### Formula
```text
EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))
```

#### Input limits
- P: 100000 to 10000000
- R: 5% to 25%
- T: 3 to 30 years

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Output)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- No need

#### Tabular structure
- No need

### 14. Home Loan Calc

#### Inputs
- Loan Principal (P)
- EMI Amount (Amt)
- Rate Of Interest (R) range(5 to 12)
- Monthly Interest (i)
- Total No. Years (T)
- Number of Installments (N)

#### Outputs
- Total Interest
- Principal

#### Formula
```text
EMI Amt:
1. Interest for current payment = Current Balance * monthly interest
2. Rest is Principal which gets deducted from Current Balance, thus reducing next month's interest portion

"EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))"
```

#### Input limits
- P: 100000 to 10000000
- R: 5% to 25%
- T: 3 to 30 years

#### Assumptions / notes
```text
Note:
1. Implementation of Foreclosure
2. Implementation of Lumpsum prepayment on top of EMI
3. EMI Amount & Time (Year) changing feature

Assumptions:
"1. Monthly reductions in balance
2. Reducing Balance Calc
3. Its in Fixed Rate of Interest, not Floating. For that we need to add feature, mid tenure change of rate
4. Rounding to nearest rupee"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Amount

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 15. Personal Loan Calc

#### Inputs
- Loan Principal (P)
- EMI Amount (Amt)
- Rate Of Interest (R) range(10 to 15)
- Monthly Interest (i)
- Total No. Years (T) range(1 to 5)
- Number of Installments (N)

#### Outputs
- Total Interest
- Principal

#### Formula
```text
EMI Amt:
1. Interest for current payment = Current Balance * monthly interest
2. Rest is Principal which gets deducted from Current Balance, thus reducing next month's interest portion

"EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))"
```

#### Input limits
- P: 100000 to 10000000
- R: 5% to 25%
- T: 1 to 10 years

#### Assumptions / notes
```text
Assumptions:
"1. Monthly reductions in balance
2. Reducing Balance Calc
3. Its in Fixed Rate of Interest, not Floating. For that we need to add feature, mid tenure change of rate
4. Rounding to nearest rupee
5. Higher Rates of Interest"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Amount

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 16. 2 Wheeler Loan Calc

#### Inputs
- Loan Principal (P)
- Rate Of Interest (R)
- Monthly Interest (i)
- Total No. Years (T) range(1 to 3)
- Number of Installments (N)

#### Outputs
- Total Interest
- Principal
- Total Amount
- EMI Amount

#### Formula
```text
Interest Paid = P x R x T
Total Amt = Principal + Interest
EMI = Total Amt / (T x 12)
```

#### Input limits
- P: 50000 to 1000000
- R: 5% to 25%
- T: 1 to 5 years

#### Assumptions / notes
```text
Assumptions:
"1. Monthly reductions in balance
2. Flat Interest Calc
3. Its in Fixed Rate of Interest, not Floating. For that we need to add feature, mid tenure change of rate
4. Rounding to nearest rupee
5. Higher Rates of Interest"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Amount

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 17. Car Loan Calc

#### Inputs
- Loan Principal (P)
- EMI Amount (Amt)
- Rate Of Interest (R) range(10 to 15)
- Monthly Interest (i)
- Total No. Years (T) range(3 to 7)
- Number of Installments (N)

#### Outputs
- Total Interest
- Principal

#### Formula
```text
EMI Amt:
1. Interest for current payment = Current Balance * monthly interest
2. Rest is Principal which gets deducted from Current Balance, thus reducing next month's interest portion

"EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))"
```

#### Input limits
- P: 100000 to 10000000
- R: 5% to 25%
- T: 3 to 10 years

#### Assumptions / notes
```text
Assumptions:
"1. Monthly reductions in balance
2. Reducing Balance Calc
3. Its in Fixed Rate of Interest, not Floating. For that we need to add feature, mid tenure change of rate
4. Rounding to nearest rupee
5. Higher Rates of Interest"
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Amount

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 18. Credit Card Loan Calc

#### Inputs
- Loan Amount (P)
- Annual Interest Rate (R)
- Tenure (Months) (n)
- Processing Fee %
- GST %
- Prepayment Charge % (Optional)
- Monthly Interest Rate (r)
- EMI
- Processing Fee Amount
- GST on Processing Fee
- Net Disbursed Amount

#### Outputs
- Total Interest
- Total EMI
- Total Cost Of Loan

#### Formula
```text
EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))
```

#### Input limits
- P: 10000 to 500000
- R: 5% to 50%
- n: 2 to 24

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Amount, Cost of Loan

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 19. Education Loan Calc

#### Inputs
- Loan Principal (P0)
- Course Tenure (Tc) in years range(2 to 4)
- Buffere Period (Tb) in years option(0.5 / 1)
- Total Moratorium Period (Tm) in years
- Annual Rate of Interest (R) in %
- Interest Calculated on Moratorium Period
- "Does Student Pay Interest during Moratorium Period
- Or Receive Government Scheme Support"
- Final Loan Principal (P)
- Monthly Interest (i)
- Total No. Years (T) range(5 to 10)
- Number of Installments (N)

#### Outputs
- EMI Amount
- Total Principal
- Total Interest Paid

#### Formula
```text
"EMI Amt:
1. Interest for current payment = Current Balance * monthly interest
2. Rest is Principal which gets deducted from Current Balance, thus reducing next month's interest portion"

EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))
```

#### Input limits
- P0: 100000 to 2500000
- Tc: 2 to 4
- Tb: 0.5 or 1
- Tm = Tc + Tb
- R: 5% to 20%
- T: 5 to 10 years

#### Assumptions / notes
```text
"Note:
1. There exists Government Schemes where Gov pays the interest accumulated in Moratorium Period, thus student only pays interest on principal.
2. Need to give various toggles: Moratorium Period is 6 month / 12 months.
3. Student choosing to pay interest during moratorium period.
4. No foreclosure penalty + Has Tax Benefits."
Assumptions:
"1. 3 Phases: Studying (2-4yrs) | Moratorium (Studying + 6/12 months) | Repayment
2. Student Selects course tenure, usually 2 to 4 yrs.
3. Moratorium period is Studying + 6/12 months buffer to find job.
4. Student can choose to pay interest during Moratorium, in that case Principal remains same for loan.
5. During Moratorium Phase, Simple Interest is Calculated & Added to Principal at Year End.
6. Then Repayment Phase begins until Repayment Tenure, EMI is calculated accordingly.
7. During Repayment phase, interest is calculated on rolling principal."
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Paid

#### Tabular structure
- "Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)"

### 20. Loan Against Security

#### Inputs
- Security Value
- Security Type
- Security LTV %
- Eligible Loan (P)
- Rate Of Interest (R) range(5 to 12)
- Monthly Interest (i)
- Tenure in years (T)
- Number of Installments (N)
- EMI Amt

#### Outputs
- Total Interest
- Principal
- Total EMI / Paid

#### Formula
```text
Loan Amount = Security Value x LTV

EMI Amt (M) = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))
```

#### Input limits
- Security Value: 10000 to 10000000
- R: 5 to 20%

#### Assumptions / notes
```text
Security Name	Shares (Equity)	Mutual Funds	Insurance Policy	FD	Bonds	ETFs
Associated LTV	40 - 60 %	"Equity MF: 50 - 60 %
Debt MF: 70 - 80 %"	80 - 90 %	85 - 95 %	"Government Bonds (G-Sec): 70% – 90%
AAA Corporate Bonds: 60% – 75%
Lower Rated Bonds: 50% – 65% "	"Nifty / Index ETF: 50% – 60%
Gold ETF: 60% – 70%
Sectoral ETF: 40% – 50%"
Reason	Highly Volatile	Medium Risk	Very Stable	Very Stable	Market price fluctuation	Market volatility
Interest Charged	Higher	Medium	Lower	Lower	Medium	Higher
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Pie / Doughnut Chart: Total Interest + Principal
- 2. In middle Total Paid

#### Tabular structure
- Table View:
- 1. Month / Payment No | Current Balance | Interest | Principal (To be Dedeucted)

### 21. SWP Calc

#### Inputs
- Total Investment (P)
- Withdrawal Per Month (W)
- Rate Of Interest (R) range(5 to 20)
- Monthly Interest (i)
- Total No. Years (T) range(4 to 20)
- Number of Months / Withdrawals (N)

#### Outputs
- Total Withdrawal
- Total Investment
- "Future Value (Remaining Corpus)"

#### Formula
```text
"If: FV < 0
""Corpus exhausted before selected time period"""

"If: W = P x i
""Capital never exhausts / Preserved"""

FV = Px(1+i)^N - ( W x ((1+i)^N - 1) / i )
```

#### Input limits
- P: 100000 to 10000000
- R: 5 to 20%
- T: 4 to 20 Years

#### Assumptions / notes
```text
1. Amount is invested lumpsum at beginning
2. Withdrawals are made monthly & interest generated on rest of money
3. Unlike SIP, money is withdrawn here
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- Simple Graph:
- 1. Total Future Value vs Total Investment vs Total Withdrawal

#### Tabular structure
- Table View:
- 1. Month No | Opening Balance | Interest | Withdrawal | Closing Balance

### 22. Flat vs Reducing vs Reducing Rate Loan Calc

#### Inputs
- Inputs Fields Attributes:
- Loan Amount (P)
- Annual Interest Rate (%)
- Tenure (Years)
- Reducing Rate (if different, else same as above)
- DERIVED VALUES
- Total Months (N)
- Monthly Rate (Flat)
- Monthly Rate (Reducing)
- FLAT LOAN CALCULATION
- Flat Total Interest
- Flat Total Payment
- Flat EMI
- REDUCING LOAN CALCULATION
- Reducing EMI
- Reducing Total Payment
- Reducing Total Interest
- REDUCING RATE (ALTERNATE RATE)
- Reducing Rate EMI
- Reducing Rate Total Payment
- Reducing Rate Total Interest

#### Outputs
- COMPARISON
- Interest Saved (Reducing vs Flat)
- Interest Saved (Reducing Rate vs Flat)

#### Formula
```text
N = Tenure x 12
Flat = Rate / 12
Reducing = Rate / 12

Flat Loan:
Interest = P x R x T
Total Payment = P + Interest
EMI = Total / No. of Months

Reducing Loan:
"EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))"
Total Payment = EMI x Months
Flat EMI = Amt - Principal

Reducing Rate:
"EMI Amt:
M = P x ((i x (1 + i)^N) / ((1 + i)^N - 1))"
Total Payable = EMI x Months
Total Interest = Amt - Principal
```

#### Input limits
—

#### Assumptions / notes
—

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Simple Graph)
- 3. Tabular Calculation
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
—

#### Tabular structure
—

### 23. Overdraft Calc

#### Inputs
- OverDraft Account Limit
- Overdraft Amt Principal (P)
- Rate Of Interest (R) p.a.
- Daily Interest (i) = R/365
- Total No. Days (D)

#### Outputs
—

#### Formula
```text
Interest for D days: P x i x D
Daily Interest: Interest / D
```

#### Input limits
- 0 to OverDraft Account Limit given by user

#### Assumptions / notes
```text
None
```

#### Page structure
- 1. Header (Nav bar)
- 1.5. Title Of Calculator
- 2. Main (Input Params + Outputs)
- 3. No need
- 4. Download Reports Button
- 5. Assumptions Taken in Calculation
- 6. Explanation of Calculator Theory
- 7. Dummy Clear & Concise Example
- 8. Footer (Branding, Disclaimer, Contact Us)

#### Graph structure / data
- No Need

#### Tabular structure
- No Need

## Notes

- The wording, formulas, and some spellings were kept close to the sheet content.
- A few cells contain placeholder-style entries such as **No need** or **No Need**; these were preserved as-is.
- Some formulas in the sheet appear to be simplified or presentation-oriented rather than production-validated formulas.
