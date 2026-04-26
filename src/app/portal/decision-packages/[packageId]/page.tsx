import Link from "next/link";
import {
  getAttachmentDownloadUrl,
  getDecisionPackageDetail,
  getPackageExportCsvUrl,
  getPackageExportJsonUrl,
} from "@/lib/api";

export default async function DecisionPackageDetailPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  const detail = await getDecisionPackageDetail(packageId);
  const pkg = detail.package;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Decision package
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{pkg.title}</h1>
        <p className="mt-4 text-slate-700">{pkg.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white" href={getPackageExportCsvUrl(packageId)}>
            Export CSV
          </a>
          <a className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900" href={getPackageExportJsonUrl(packageId)}>
            Export JSON
          </a>
          <Link
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900"
            href={`/portal/external-share/${pkg.id}?token=${pkg.external_share_token}`}
          >
            External share view
          </Link>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Attachments</h2>
          <ul className="mt-4 space-y-2">
            {detail.attachments.map((a: any) => (
              <li key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-slate-800">{a.filename}</span>
                <a className="text-sm font-semibold text-slate-900 underline" href={getAttachmentDownloadUrl(a.id)}>
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Comments</h2>
          <div className="mt-4 space-y-3">
            {detail.comments.map((comment: any) => (
              <div key={comment.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">{comment.author_name}</div>
                <div className="text-xs text-slate-500">{comment.created_at}</div>
                <p className="mt-2 text-slate-700">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
