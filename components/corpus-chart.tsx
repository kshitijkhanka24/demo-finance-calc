'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ChartData {
  year: number;
  investment: number;
  corpus: number;
  interest: number;
}

interface CorpusChartProps {
  data: ChartData[];
}

export default function CorpusChart({ data }: CorpusChartProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <ChartContainer
      config={{
        investment: {
          label: 'Investment Amount',
          color: 'hsl(var(--color-chart-1))',
        },
        corpus: {
          label: 'Total Corpus',
          color: 'hsl(var(--color-chart-2))',
        },
        interest: {
          label: 'Interest Earned',
          color: 'hsl(var(--color-chart-3))',
        },
      }}
      className="h-80 md:h-96 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="year"
            label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  undefined,
                ]}
              />
            }
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Area
            type="monotone"
            dataKey="investment"
            stroke="hsl(var(--color-chart-1))"
            fillOpacity={1}
            fill="url(#colorInvestment)"
          />
          <Area
            type="monotone"
            dataKey="corpus"
            stroke="hsl(var(--color-chart-2))"
            fillOpacity={1}
            fill="url(#colorCorpus)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
