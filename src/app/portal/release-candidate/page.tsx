import Link from "next/link";
import { getCorePackages, getFeatureFlags, getPlatformVersion } from "@/lib/api";

export default async function ReleaseCandidatePage() {
  const [packages, flags, version] = await Promise.all([
    getCorePackages(),
    getFeatureFlags(),
    getPlatformVersion(),
  ]);

  return (
    <main className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm text-slate-500">Portal status</div>
        <div className="mt-1 text-lg font-semibold text-slate-900">
          {version.api_name} • v{version.version}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Canonical Workflow</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Release candidate packages</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          CPM, cost, RFIs, and spec/submittal matching should converge into this package core instead of fragmenting the workflow.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Core tools</div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {Object.values(flags.core_workflow).filter(Boolean).length}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Supported tools</div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {Object.values(flags.supported_tools).filter(Boolean).length}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Experimental enabled</div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {Object.values(flags.experimental_tools).filter(Boolean).length}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Package list</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="pb-2">Title</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Schedule</th>
                <th className="pb-2">Cost</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg: any) => (
                <tr key={pkg.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium text-slate-900">{pkg.title}</td>
                  <td className="py-2">{pkg.status}</td>
                  <td className="py-2">{pkg.schedule_delta_days} d</td>
                  <td className="py-2">${Number(pkg.cost_delta).toLocaleString()}</td>
                  <td className="py-2">
                    <Link href={`/portal/release-candidate/${pkg.id}`} className="font-semibold underline text-slate-900">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
