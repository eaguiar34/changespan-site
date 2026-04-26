"use client";

import { useEffect, useState } from "react";

import { createEvent, getProjects, getRevisionCompare, getSnapshots } from "@/lib/api";

export default function RevisionsPage() {
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [compare, setCompare] = useState<any>(null);
  const [snapshots, setSnapshots] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then((rows) => {
      setProjects(rows || []);
      if (rows?.[0]?.id) setProjectId(rows[0].id);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!projectId) return;
    Promise.all([getRevisionCompare(projectId), getSnapshots(projectId)]).then(([cmp, snaps]) => {
      setCompare(cmp);
      setSnapshots(snaps || []);
    }).catch(() => undefined);
  }, [projectId]);

  async function addComment() {
    const current = compare?.current;
    if (!current) return;
    await createEvent({ project_id: current.project_id, event_type: "COMMENT_ADDED", source: "portal", body: "Portal reviewer left an integrated revision note.", target_type: "SNAPSHOT", target_id: current.id, target_revision: current.revision });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Revision compare</h2>
        <select className="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
        </select>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div>Baseline: {compare?.baseline?.revision ?? "—"}</div>
          <div>Current: {compare?.current?.revision ?? "—"}</div>
          <div>Changed fields: {(compare?.summary?.changed_fields || []).join(", ") || "—"}</div>
          <div>Attachments added: {compare?.summary?.attachment_delta?.added ?? 0}</div>
          <div>Attachments removed: {compare?.summary?.attachment_delta?.removed ?? 0}</div>
        </div>
        <button onClick={addComment} className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Add comment to latest revision</button>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Snapshot history</h2>
        <div className="mt-4 space-y-3">
          {snapshots.map((snapshot) => (
            <div key={snapshot.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-semibold">Rev {snapshot.revision} • {snapshot.title}</div>
              <div className="text-sm text-slate-600">Status: {snapshot.status} • Supersedes: {snapshot.supersedes_snapshot_id || "—"}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
