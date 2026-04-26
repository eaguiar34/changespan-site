"use client";

import { useEffect, useState } from "react";

import { getAuditExport, getSyncStatus } from "@/lib/api";

export default function PortalAdminPage() {
  const [audit, setAudit] = useState<any>(null);
  const [sync, setSync] = useState<any>(null);
  useEffect(() => {
    Promise.all([getAuditExport(), getSyncStatus()]).then(([auditData, syncData]) => {
      setAudit(auditData);
      setSync(syncData);
    }).catch(() => undefined);
  }, []);
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Audit export summary</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div>Snapshots: {audit?.snapshots?.length ?? 0}</div>
          <div>Events: {audit?.events?.length ?? 0}</div>
          <div>Assignments: {audit?.assignments?.length ?? 0}</div>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Sync receipts</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div>Receipt count: {sync?.receipt_count ?? 0}</div>
          <div>Latest receipt: {sync?.latest_receipt_at || "—"}</div>
          <div>Latest snapshot: {sync?.latest_snapshot_at || "—"}</div>
        </div>
      </section>
    </div>
  );
}
