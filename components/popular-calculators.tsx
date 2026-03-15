'use client';

import { TrendingUp, PiggyBank, Target, Zap } from 'lucide-react';

const calculators = [
  {
    id: 1,
    name: 'Lump Sum',
    description: 'One-time investment returns',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: 'PPF',
    description: 'Public Provident Fund',
    icon: PiggyBank,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    name: 'Retirement',
    description: 'Plan your retirement',
    icon: Target,
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 4,
    name: 'EMI',
    description: 'Loan EMI calculator',
    icon: Zap,
    color: 'from-orange-500 to-orange-600',
  },
];

export default function PopularCalculators() {
  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg h-full">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-6">Popular Calculators</h2>
      
      <div className="space-y-3">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <button
              key={calc.id}
              className="w-full group text-left transition-all"
            >
              <div className="backdrop-blur-sm bg-gradient-to-r p-0.5 rounded-xl" style={{backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`}}>
                <div className="bg-white/60 hover:bg-white/80 backdrop-blur-md rounded-xl p-3 md:p-4 transition-all group-hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${calc.color} shadow-md`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm md:text-base text-foreground">{calc.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{calc.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
