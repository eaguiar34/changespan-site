import PortalShell from "@/components/site/portal-shell";
import { getChange } from "@/lib/changes";

export default async function PortalChangeDetailPage({ params }: { params: Promise<{ changeId: string }> }) {
  const { changeId } = await params;
  const change = await getChange(changeId);

  return (
    <PortalShell title={change.title} description="Shared change detail view for traceability, impacts, and review history.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Summary</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</dt><dd className="mt-1 text-sm text-slate-900">{change.status}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Review</dt><dd className="mt-1 text-sm text-slate-900">{change.review_state}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Owner</dt><dd className="mt-1 text-sm text-slate-900">{change.responsible_party || "Unassigned"}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Source</dt><dd className="mt-1 text-sm text-slate-900">{change.source_module}</dd></div>
          </dl>
          <h3 className="mt-6 text-sm font-semibold text-slate-900">Impact summary</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">{change.impact_summary || "No impact summary yet."}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Traceability</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Activities: {change.linked_activity_ids.join(", ") || "None"}</p>
            <p>Cost items: {change.linked_cost_ids.join(", ") || "None"}</p>
            <p>Snapshot: {change.snapshot_id || "Not published"}</p>
          </div>
          <h3 className="mt-6 text-sm font-semibold text-slate-900">Review history</h3>
          <div className="mt-3 space-y-3">
            {change.history.map((event, idx) => (
              <div key={`${event.created_at}-${idx}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{event.event_type}</div>
                <div>{event.actor} · {event.created_at}</div>
                <div>{event.note}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
