import { getExecutiveReport } from "@/lib/api";

export default async function ExecutiveReportPage() {
  const report = await getExecutiveReport();

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Executive Report</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Decision delivery report</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Packages", report.package_count],
          ["Cost Exposure", `$${Number(report.total_cost_exposure).toLocaleString()}`],
          ["Schedule Exposure", `${report.total_schedule_exposure_days} d`],
          ["Statuses", Object.keys(report.by_status).length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Top risk packages</h2>
          <ul className="mt-4 space-y-3">
            {report.top_risk_packages.map((pkg: any) => (
              <li key={pkg.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{pkg.title}</div>
                <div className="text-sm text-slate-500">
                  {pkg.status} • ${Number(pkg.cost_delta).toLocaleString()} • {pkg.schedule_delta_days} d
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Customer-ready sections</h2>
          <ul className="mt-4 list-disc pl-5 text-slate-700">
            {report.report_sections.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
