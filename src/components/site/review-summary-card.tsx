type ReviewSummaryCardProps = {
  title: string;
  value: string | number;
  caption: string;
};

export function ReviewSummaryCard({ title, value, caption }: ReviewSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{caption}</div>
    </div>
  );
}
