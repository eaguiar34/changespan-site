"use client";

type Project = { id: string; name: string };
type Filters = { project_id?: string; status?: string };

export default function FilterBar({ projects, filters, onChange }: { projects: Project[]; filters: Filters; onChange: (next: Filters) => void; }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm">
          <div className="mb-1 text-slate-500">Project</div>
          <select className="w-full rounded-xl border border-slate-300 px-3 py-2" value={filters.project_id || ""} onChange={(e) => onChange({ ...filters, project_id: e.target.value || undefined })}>
            <option value="">All projects</option>
            {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <div className="mb-1 text-slate-500">Status</div>
          <select className="w-full rounded-xl border border-slate-300 px-3 py-2" value={filters.status || ""} onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}>
            <option value="">All statuses</option>
            <option value="assigned">assigned</option>
            <option value="in_progress">in_progress</option>
            <option value="blocked">blocked</option>
            <option value="done">done</option>
          </select>
        </label>
      </div>
    </div>
  );
}
