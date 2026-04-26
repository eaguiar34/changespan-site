import PortalShell from "@/components/site/portal-shell";
import { getAssignments } from "@/lib/api";
export default async function PortalAssignmentsPage() {
  const data = await getAssignments();
  return <PortalShell title="Assignments" description="Reviewer queue with due dates, priorities, and ball-in-court visibility."><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-600"><tr><th className="px-4 py-3">Package</th><th className="px-4 py-3">Reviewer</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Due</th><th className="px-4 py-3">Priority</th></tr></thead><tbody>{data.items.map((row: any) => <tr key={row.id} className="border-t border-slate-200"><td className="px-4 py-3">{row.package_id}</td><td className="px-4 py-3">{row.reviewer}</td><td className="px-4 py-3">{row.status}</td><td className="px-4 py-3">{row.due_date}</td><td className="px-4 py-3">{row.priority}</td></tr>)}</tbody></table></div></PortalShell>;
}
