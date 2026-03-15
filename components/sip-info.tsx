'use client';

import { Info, CheckCircle, AlertCircle, Zap } from 'lucide-react';

export default function SIPInfo() {
  return (
    <div className="mt-12 space-y-8">
      {/* What is SIP Section */}
      <section className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info size={24} className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">What is a Systematic Investment Plan?</h2>
        </div>
        
        <div className="prose prose-sm md:prose-base max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">
            A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds where investors contribute a fixed amount at regular intervals, usually every month. Instead of investing a large lump sum at once, SIP allows you to build wealth gradually over time through consistent investments and compounding.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            SIPs are widely used for long-term financial goals such as retirement, education planning, or wealth creation.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Zap size={24} className="text-secondary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">How SIP Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In a SIP, a fixed amount is automatically invested in a mutual fund every month. Each investment purchases units of the fund based on the current market price.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over time, this approach benefits from:
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm md:text-base">Compounding Returns</p>
                <p className="text-xs md:text-sm text-muted-foreground">Earnings generate their own earnings over time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm md:text-base">Rupee Cost Averaging</p>
                <p className="text-xs md:text-sm text-muted-foreground">Buy more units at low prices, fewer at high prices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm md:text-base">Disciplined Investing</p>
                <p className="text-xs md:text-sm text-muted-foreground">Regular contributions build wealth systematically</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Method Section */}
      <section className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Calculation Method</h2>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-xl p-6 mb-6">
          <p className="text-sm md:text-base font-semibold text-foreground mb-4">Future Value Formula:</p>
          <div className="font-mono text-sm md:text-base text-foreground bg-white/50 backdrop-blur-sm p-4 rounded-lg overflow-x-auto">
            <p>M = S × [((1 + i)ⁿ − 1) / i] × (1 + i)</p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs md:text-sm font-semibold text-foreground mb-2">Where:</p>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                <li><span className="font-semibold">M</span> = Total value at maturity</li>
                <li><span className="font-semibold">S</span> = Monthly investment amount (SIP)</li>
                <li><span className="font-semibold">i</span> = Monthly interest rate</li>
                <li><span className="font-semibold">n</span> = Total number of investments</li>
              </ul>
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-foreground mb-2">Assumptions:</p>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                <li>✓ Monthly contributions</li>
                <li>✓ Monthly compounding</li>
                <li>✓ Fixed annual rate</li>
                <li>✓ Converted to monthly rate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Key Benefits of SIP</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Disciplined Investing', desc: 'Regular contributions foster consistent habit formation' },
            { title: 'Compounding Power', desc: 'Long-term wealth building through exponential growth' },
            { title: 'Market Timing Risk', desc: 'Reduced impact of market volatility over time' },
            { title: 'Flexibility', desc: 'Adjust amounts and durations based on your needs' },
            { title: 'Low Entry', desc: 'Start with affordable monthly amounts' },
            { title: 'Goal-Oriented', desc: 'Perfect for retirement, education, and wealth creation' },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/20 transition-colors">
              <p className="font-semibold text-sm md:text-base text-foreground mb-2">{benefit.title}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="backdrop-blur-md bg-red-500/10 border border-red-200 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">Important Disclaimer</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              This calculator provides estimated returns for educational and planning purposes only. Mutual fund investments are market-linked, and actual returns may vary depending on market performance, fund management, and economic conditions.
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Always review scheme details and consult financial professionals before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
