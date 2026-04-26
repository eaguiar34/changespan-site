import Link from "next/link";
import PortalShell from "@/components/site/portal-shell";
import { getAttachmentDownloadUrl, getReviewPackageDetail } from "@/lib/api";

export default async function PortalPackageDetailPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  const pkg = await getReviewPackageDetail(packageId);
  return (
    <PortalShell title={pkg.title} description="Package detail with threaded comments, attachments, decisions, and sync receipts.">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 text-sm"><div><div className="text-slate-500">Status</div><div className="mt-1 font-semibold">{pkg.status}</div></div><div><div className="text-slate-500">Decision</div><div className="mt-1 font-semibold">{pkg.decision}</div></div><div><div className="text-slate-500">Cost delta</div><div className="mt-1 font-semibold">${pkg.cost_delta.toLocaleString()}</div></div><div><div className="text-slate-500">Schedule delta</div><div className="mt-1 font-semibold">{pkg.schedule_delta_days} days</div></div></div>
          <h2 className="mt-6 text-xl font-semibold">Threaded comments</h2>
          <div className="mt-4 space-y-3">{pkg.comments.map((comment: any) => <div key={comment.id} className={`rounded-xl border p-4 ${comment.parent_id ? "ml-6 border-slate-200 bg-slate-50" : "border-slate-200 bg-white"}`}><div className="text-sm font-semibold text-slate-900">{comment.author}</div><div className="mt-1 text-sm text-slate-500">{comment.created_at}</div><div className="mt-3 text-sm text-slate-700">{comment.body}</div></div>)}</div>
        </section>
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold">Attachments</h2><div className="mt-4 space-y-3">{pkg.attachments.map((item: any) => <a key={item.id} href={getAttachmentDownloadUrl(item.id)} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:bg-slate-100"><span>{item.name}</span><span className="text-slate-500">Download</span></a>)}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold">Receipts & audit</h2><div className="mt-4 space-y-3">{pkg.receipts.map((item: any) => <div key={item.id} className="rounded-xl bg-slate-50 p-4 text-sm"><div className="font-semibold text-slate-900">{item.status}</div><div className="mt-1 text-slate-700">{item.detail}</div><div className="mt-1 text-slate-500">{item.created_at}</div></div>)}</div><Link href="/portal/revision-compare" className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Open revision compare</Link></div>
        </section>
      </div>
    </PortalShell>
  );
}
