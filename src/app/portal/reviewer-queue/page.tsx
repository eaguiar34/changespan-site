import Link from "next/link";
import { getReviewerQueue } from "@/lib/api";

export default async function ReviewerQueuePage() {
  const items = await getReviewerQueue();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reviewer Queue</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Packages awaiting reviewer action</h1>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="pb-2">Title</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Due</th>
              <th className="pb-2">Cost</th>
              <th className="pb-2">Schedule</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((pkg: any) => (
              <tr key={pkg.id} className="border-t border-slate-100">
                <td className="py-2 font-medium text-slate-900">{pkg.title}</td>
                <td className="py-2">{pkg.status}</td>
                <td className="py-2">{pkg.due_date || "—"}</td>
                <td className="py-2">${Number(pkg.cost_delta).toLocaleString()}</td>
                <td className="py-2">{pkg.schedule_delta_days} d</td>
                <td className="py-2">
                  <Link href={`/portal/decision-delivery/${pkg.id}`} className="font-semibold underline text-slate-900">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
