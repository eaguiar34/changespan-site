import { getExecutiveDashboard } from "@/lib/api";

function MiniBars({ points }: { points: Array<{ label: string; value: number }> }) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div className="space-y-2">
      {points.map((p) => (
        <div key={p.label} className="grid grid-cols-[52px_1fr_64px] items-center gap-3 text-sm">
          <div className="text-slate-500">{p.label}</div>
          <div className="h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-slate-900"
              style={{ width: `${(p.value / max) * 100}%` }}
            />
          </div>
          <div className="text-right text-slate-700">{p.value}</div>
        </div>
      ))}
    </div>
  );
}

export default async function ExecutiveDashboardPage() {
  const data = await getExecutiveDashboard();

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Executive Controls
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Decision dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          High-level view of cost exposure, schedule impact, risk-ranked packages, reviewer workload,
          and forecast signals for project decision-making.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          ["Packages", data.summary.total_packages],
          ["Overdue", data.summary.overdue_packages],
          ["Due Soon", data.summary.due_soon_packages],
          ["Critical", data.summary.critical_packages],
          ["Cost Exposure", `$${data.summary.total_cost_exposure.toLocaleString()}`],
          ["Schedule Delta", `${data.summary.total_schedule_exposure_days} d`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Cost exposure trend</h2>
          <div className="mt-4">
            <MiniBars points={data.summary.cost_trend} />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Schedule impact trend</h2>
          <div className="mt-4">
            <MiniBars points={data.summary.schedule_trend} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Top risk packages</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-2">Package</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Cost</th>
                  <th className="pb-2">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {data.top_risk_packages.map((pkg: any) => (
                  <tr key={pkg.id} className="border-t border-slate-100">
                    <td className="py-2 font-medium text-slate-900">{pkg.title}</td>
                    <td className="py-2">{pkg.status}</td>
                    <td className="py-2">${Number(pkg.cost_delta).toLocaleString()}</td>
                    <td className="py-2">{pkg.schedule_delta_days} d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Reviewer workload</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-2">Reviewer</th>
                  <th className="pb-2">Active</th>
                  <th className="pb-2">Overdue</th>
                  <th className="pb-2">Pending</th>
                </tr>
              </thead>
              <tbody>
                {data.reviewer_workload.map((row: any) => (
                  <tr key={row.reviewer_id} className="border-t border-slate-100">
                    <td className="py-2 font-medium text-slate-900">{row.reviewer_name}</td>
                    <td className="py-2">{row.active_count}</td>
                    <td className="py-2">{row.overdue_count}</td>
                    <td className="py-2">{row.pending_approvals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Forecasting and reporting</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-slate-500">ML-style signal</div>
            <p className="mt-2 text-slate-700">{data.forecasting.ml_signal}</p>
          </div>
          <div>
            <div className="text-sm text-slate-500">Customer-ready sections</div>
            <ul className="mt-2 list-disc pl-5 text-slate-700">
              {data.reporting.customer_ready_sections.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
