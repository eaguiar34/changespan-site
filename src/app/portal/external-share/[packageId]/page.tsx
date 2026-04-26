const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default async function ExternalSharePage({
  params,
  searchParams,
}: {
  params: Promise<{ packageId: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { packageId } = await params;
  const { token } = await searchParams;
  const response = await fetch(`${API_BASE}/decision-packages/${packageId}/share?token=${encodeURIComponent(token || "")}`, { cache: "no-store" });

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-950">External share unavailable</h1>
        <p className="mt-4 text-slate-600">The share token is invalid or the package is unavailable.</p>
      </main>
    );
  }

  const detail = await response.json();
  const pkg = detail.package;

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">External reviewer</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{pkg.title}</h1>
        <p className="mt-3 text-slate-700">{pkg.summary}</p>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <div><div className="text-sm text-slate-500">Status</div><div className="font-semibold">{pkg.status}</div></div>
          <div><div className="text-sm text-slate-500">Cost delta</div><div className="font-semibold">${Number(pkg.cost_delta).toLocaleString()}</div></div>
          <div><div className="text-sm text-slate-500">Schedule delta</div><div className="font-semibold">{pkg.schedule_delta_days} d</div></div>
        </div>
      </section>
    </main>
  );
}
