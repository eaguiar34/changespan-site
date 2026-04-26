"use client";

import { useEffect, useState } from "react";

import { getNotificationRules, getSyncFailures } from "@/lib/api";

export default function NotificationsPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [failures, setFailures] = useState<any[]>([]);
  useEffect(() => {
    getNotificationRules().then(setRules).catch(() => setRules([]));
    getSyncFailures().then(setFailures).catch(() => setFailures([]));
  }, []);
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Notification rules</h2>
        <p className="mt-2 text-sm text-slate-600">Workspace rules that drive reviewer notifications and follow-up actions.</p>
        <div className="mt-6 space-y-3">{rules.map((rule) => <div key={rule.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="font-semibold">{rule.event_type}</div><div className="text-sm text-slate-600">Delivery: {rule.delivery} • Enabled: {String(rule.enabled)} • Role: {rule.target_role || "—"}</div></div>)}</div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Recent sync failures</h2>
        <div className="mt-6 space-y-3">{failures.length === 0 ? <div className="text-sm text-slate-500">No failed sync activity.</div> : failures.map((row) => <div key={row.receipt_id} className="rounded-2xl border border-rose-200 bg-rose-50 p-4"><div className="font-semibold">{row.package_id || row.receipt_id}</div><div className="text-sm text-slate-600">{row.error}</div><div className="text-xs text-slate-500">{row.failed_at}</div></div>)}</div>
      </div>
    </section>
  );
}
