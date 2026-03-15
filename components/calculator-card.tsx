'use client';

import { Sliders } from 'lucide-react';

interface CalculatorCardProps {
  monthlyInvestment: number;
  rateOfReturn: number;
  timePeriod: number;
  onMonthlyInvestmentChange: (value: number) => void;
  onRateOfReturnChange: (value: number) => void;
  onTimePeriodChange: (value: number) => void;
  onCalculate: () => void;
}

export default function CalculatorCard({
  monthlyInvestment,
  rateOfReturn,
  timePeriod,
  onMonthlyInvestmentChange,
  onRateOfReturnChange,
  onTimePeriodChange,
  onCalculate,
}: CalculatorCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Sliders size={20} className="text-primary" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-foreground">Parameters</h2>
      </div>

      {/* Monthly Investment */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Monthly Investment
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <span className="text-xl md:text-2xl font-bold text-primary">₹</span>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => onMonthlyInvestmentChange(Number(e.target.value))}
            className="flex-1 px-4 py-3 bg-white/50 border border-white/30 rounded-lg text-base md:text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={monthlyInvestment}
            onChange={(e) => onMonthlyInvestmentChange(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1,000</span>
            <span>₹100,000</span>
          </div>
        </div>
      </div>

      {/* Rate of Return */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Annual Rate of Return (%)
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <input
            type="number"
            value={rateOfReturn}
            onChange={(e) => onRateOfReturnChange(Number(e.target.value))}
            step="0.1"
            className="flex-1 px-4 py-3 bg-white/50 border border-white/30 rounded-lg text-base md:text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="text-xl md:text-2xl font-bold text-secondary">%</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={rateOfReturn}
            onChange={(e) => onRateOfReturnChange(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>
      </div>

      {/* Time Period */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Investment Period (Years)
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(Number(e.target.value))}
            min="1"
            max="50"
            className="flex-1 px-4 py-3 bg-white/50 border border-white/30 rounded-lg text-base md:text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="text-xl md:text-2xl font-bold text-accent">Y</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Year</span>
            <span>50 Years</span>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={onCalculate}
        className="w-full py-3 md:py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
      >
        Calculate Now
      </button>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span>💡</span> <strong>Tip:</strong> Use the sliders to see how different parameters affect your returns instantly.
        </p>
      </div>
    </div>
  );
}
