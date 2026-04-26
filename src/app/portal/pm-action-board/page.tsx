import Link from "next/link";
import { getPmActionBoard } from "@/lib/api";

function Section({ title, rows }: { title: string; rows: any[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.length === 0 ? <p className="text-slate-500">None.</p> : rows.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-900">{pkg.title}</div>
                <div className="text-sm text-slate-500">{pkg.status} • Due {pkg.due_date || "—"}</div>
              </div>
              <Link href={`/portal/decision-delivery/${pkg.id}`} className="font-semibold underline text-slate-900">
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function PmActionBoardPage() {
  const data = await getPmActionBoard();

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PM Action Board</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">What needs attention today</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Overdue" rows={data.overdue} />
        <Section title="Due Soon" rows={data.due_soon} />
        <Section title="Ball in Court: PM" rows={data.pm_actions} />
      </div>
    </main>
  );
}
