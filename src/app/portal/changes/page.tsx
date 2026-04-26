async function getChanges() {
  try {
    const res = await fetch("http://127.0.0.1:8000/changes/", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load changes");
    return res.json();
  } catch {
    return { items: [] };
  }
}

export default async function PortalChangesPage() {
  const data = await getChanges();
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-black">Portal Changes</h1>
      <div className="mt-6 space-y-3">
        {data.items.map((item: any) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{item.id} · {item.kind}</div>
            <div className="mt-1 text-lg font-semibold">{item.title}</div>
            <div className="mt-2 text-sm text-slate-600">{item.impact_summary}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
