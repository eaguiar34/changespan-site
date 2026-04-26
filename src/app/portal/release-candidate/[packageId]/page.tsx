import {
  getCoreAttachmentDownloadUrl,
  getCorePackageDetail,
  getCorePackageExportCsvUrl,
  getCorePackageExportJsonUrl,
} from "@/lib/api";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  const detail = await getCorePackageDetail(packageId);
  const pkg = detail.package;

  return (
    <main className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Canonical Package Detail</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{pkg.title}</h1>
        <p className="mt-3 text-slate-600">{pkg.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={getCorePackageExportCsvUrl(packageId)} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">Export CSV</a>
          <a href={getCorePackageExportJsonUrl(packageId)} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">Export JSON</a>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Attachments</h2>
          <ul className="mt-4 space-y-2">
            {detail.attachments.map((a: any) => (
              <li key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>{a.filename}</span>
                <a className="underline font-semibold text-slate-900" href={getCoreAttachmentDownloadUrl(a.id)}>Download</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Tool impacts</h2>
          <pre className="mt-4 overflow-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
{JSON.stringify(detail.impacts, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}
