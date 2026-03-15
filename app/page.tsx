'use client';

import { useState } from 'react';
import Header from '@/components/header';
import CalculatorCard from '@/components/calculator-card';
import ResultsTable from '@/components/results-table';
import CorpusChart from '@/components/corpus-chart';
import PopularCalculators from '@/components/popular-calculators';
import SIPInfo from '@/components/sip-info';

export default function Home() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [rateOfReturn, setRateOfReturn] = useState(6);
  const [timePeriod, setTimePeriod] = useState(5);
  const [results, setResults] = useState<any[]>([]);

  const calculateSIP = () => {
    const monthlyRate = rateOfReturn / 12 / 100;
    const months = timePeriod * 12;
    let principal = 0;
    let corpus = 0;
    const yearlyData = [];

    for (let month = 1; month <= months; month++) {
      principal += monthlyInvestment;
      corpus = monthlyInvestment * (((1 + monthlyRate) ** month - 1) / monthlyRate);

      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          investment: Math.round(principal),
          interest: Math.round(corpus - principal),
          corpus: Math.round(corpus),
        });
      }
    }

    setResults(yearlyData);
  };

  const totalInvestment = Math.round(monthlyInvestment * timePeriod * 12);
  const totalCorpus = results[results.length - 1]?.corpus || 0;
  const totalInterest = totalCorpus - totalInvestment;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            SIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Systematic Investment Plan returns and watch your wealth grow
          </p>
        </div>

        {/* Main Section: Calculator (60%) and Popular Calculators (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Parameters Card - 60% */}
          <div className="lg:col-span-3">
            <CalculatorCard
              monthlyInvestment={monthlyInvestment}
              rateOfReturn={rateOfReturn}
              timePeriod={timePeriod}
              onMonthlyInvestmentChange={setMonthlyInvestment}
              onRateOfReturnChange={setRateOfReturn}
              onTimePeriodChange={setTimePeriod}
              onCalculate={calculateSIP}
            />
          </div>

          {/* Popular Calculators - 40% */}
          <div className="lg:col-span-2">
            <PopularCalculators />
          </div>
        </div>

        {/* Results Cards and Chart Section - 50-50 Split */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Results Cards */}
            <div>
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Total Investment</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">₹{totalInvestment.toLocaleString()}</p>
                </div>

                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Interest Earned</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent">₹{totalInterest.toLocaleString()}</p>
                </div>

                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Total Corpus</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">₹{totalCorpus.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Investment Growth</h2>
              <CorpusChart data={results} />
            </div>
          </div>
        )}

        {/* Table Section */}
        {results.length > 0 && (
          <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Year-wise Breakdown</h2>
            <div className="overflow-x-auto">
              <ResultsTable data={results} />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-shadow text-sm md:text-base">
                Download Report
              </button>
              <button className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors text-sm md:text-base">
                Share
              </button>
            </div>
          </div>
        )}

        {/* SIP Information Section */}
        <SIPInfo />
      </div>
    </main>
  );
}
