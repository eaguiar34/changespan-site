"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Option = { id: string; label: string };

type Props = {
  projects: Option[];
  snapshots: Option[];
  selectedProjectId?: string | null;
  selectedSnapshotId?: string | null;
};

export default function PortalContextBar({ projects, snapshots, selectedProjectId, selectedSnapshotId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  function update(projectId?: string, snapshotId?: string) {
    const params = new URLSearchParams(search.toString());
    if (projectId) params.set("project", projectId); else params.delete("project");
    if (snapshotId) params.set("snapshot", snapshotId); else params.delete("snapshot");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex flex-col gap-1 text-sm text-slate-600">
        Active project
        <select
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900"
          value={selectedProjectId ?? ""}
          onChange={(e) => update(e.target.value || undefined, undefined)}
        >
          {projects.map((project) => <option key={project.id} value={project.id}>{project.label}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-600">
        Active snapshot
        <select
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900"
          value={selectedSnapshotId ?? ""}
          onChange={(e) => update(selectedProjectId ?? undefined, e.target.value || undefined)}
        >
          {snapshots.map((snapshot) => <option key={snapshot.id} value={snapshot.id}>{snapshot.label}</option>)}
        </select>
      </label>
      <div className="text-sm text-slate-500">Assignments, revisions, attachments, and notifications now follow the same selected scope.</div>
    </div>
  );
}
