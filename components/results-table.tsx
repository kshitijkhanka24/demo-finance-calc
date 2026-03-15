'use client';

interface ResultRow {
  year: number;
  investment: number;
  interest: number;
  corpus: number;
}

interface ResultsTableProps {
  data: ResultRow[];
}

export default function ResultsTable({ data }: ResultsTableProps) {
  // Show only every nth row for large datasets on mobile
  const displayData = data.length > 15 ? data.filter((_, i) => i % 2 === 0) : data;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs md:text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-foreground">Year</th>
            <th className="px-2 md:px-4 py-3 md:py-4 text-right font-semibold text-foreground">Investment</th>
            <th className="px-2 md:px-4 py-3 md:py-4 text-right font-semibold text-foreground">Interest</th>
            <th className="px-2 md:px-4 py-3 md:py-4 text-right font-semibold text-foreground">Total Corpus</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, index) => (
            <tr key={index} className="border-b border-white/10 hover:bg-white/20 transition-colors">
              <td className="px-2 md:px-4 py-2 md:py-4 text-foreground font-medium">{Math.round(row.year)}</td>
              <td className="px-2 md:px-4 py-2 md:py-4 text-right text-foreground font-medium">₹{(row.investment / 100000).toFixed(1)}L</td>
              <td className="px-2 md:px-4 py-2 md:py-4 text-right text-accent font-medium">₹{(row.interest / 100000).toFixed(1)}L</td>
              <td className="px-2 md:px-4 py-2 md:py-4 text-right text-primary font-bold">₹{(row.corpus / 100000).toFixed(1)}L</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
