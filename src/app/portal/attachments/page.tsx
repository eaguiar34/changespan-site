import PortalShell from "@/components/site/portal-shell";
import { getAttachmentDownloadUrl, listAttachments } from "@/lib/api";
export default async function PortalAttachmentsPage() {
  const data = await listAttachments();
  return <PortalShell title="Attachments" description="Linked documents and notes tied to package review and sync."><div className="space-y-4">{data.items.map((item: any) => <a key={item.id} href={getAttachmentDownloadUrl(item.id)} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"><div><div className="font-semibold text-slate-900">{item.name}</div><div className="mt-1 text-sm text-slate-500">{item.package_id} • {item.content_type} • {item.size} bytes</div></div><span className="text-sm font-semibold text-slate-700">Download</span></a>)}</div></PortalShell>;
}
