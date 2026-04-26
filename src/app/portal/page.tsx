"use client";

import { useEffect, useState } from "react";

import { getCommandCenterSummary, getProjects, getSyncStatus, type Project } from "@/lib/api";

export default function PortalPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [sync, setSync] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getProjects(), getCommandCenterSummary(), getSyncStatus()])
      .then(([projectsData, summaryData, syncData]) => {
        setProjects(projectsData || []);
        setSummary(summaryData);
        setSync(syncData);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Portal data could not be loaded."));
  }, []);

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Integrated workflow overview</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">This view rolls projects, snapshots, assignments, notifications, attachments, and sync receipts into one portal landing page.</p>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricCard label="Projects" value={projects.length} />
          <MetricCard label="Published reviews" value={summary?.published_reviews ?? 0} />
          <MetricCard label="Open assignments" value={summary?.open_assignments ?? 0} />
          <MetricCard label="Sync receipts" value={sync?.receipt_count ?? 0} />
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Active projects</h3>
        <div className="mt-4 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">{project.name}</div>
              <div className="text-sm text-slate-600">{project.description || "No description"}</div>
            </div>
          ))}
          {projects.length === 0 ? <div className="text-sm text-slate-500">No projects available yet.</div> : null}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm text-slate-500">{label}</div><div className="mt-1 text-2xl font-bold text-slate-950">{value}</div></div>;
}
