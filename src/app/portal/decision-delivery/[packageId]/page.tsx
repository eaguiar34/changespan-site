"use client";

import { useEffect, useState } from "react";
import {
  closePackage,
  getAttachmentDownloadUrl,
  getDecisionPackageDetail,
  getPackageExportCsvUrl,
  getPackageExportJsonUrl,
  supersedePackage,
  uploadPackageAttachment,
} from "@/lib/api";

export default function DecisionDeliveryPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const [packageId, setPackageId] = useState<string>("");
  const [detail, setDetail] = useState<any>(null);
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    params.then(({ packageId }) => {
      setPackageId(packageId);
      getDecisionPackageDetail(packageId)
        .then((data) => {
          setDetail(data);
          setStatus("");
        })
        .catch((err) => setStatus(String(err)));
    });
  }, [params]);

  async function handleClose() {
    if (!packageId) return;
    setStatus("Closing package...");
    await closePackage(packageId, "Closed from portal.");
    const data = await getDecisionPackageDetail(packageId);
    setDetail(data);
    setStatus("Package closed.");
  }

  async function handleSupersede() {
    if (!packageId) return;
    setStatus("Superseding package...");
    await supersedePackage(packageId, "Superseded from portal.");
    const data = await getDecisionPackageDetail(packageId);
    setDetail(data);
    setStatus("Package superseded.");
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!packageId || !event.target.files?.[0]) return;
    setStatus("Uploading attachment...");
    await uploadPackageAttachment(packageId, event.target.files[0]);
    const data = await getDecisionPackageDetail(packageId);
    setDetail(data);
    setStatus("Attachment uploaded.");
  }

  if (!detail) {
    return <main className="mx-auto max-w-4xl px-6 py-10 text-slate-700">{status}</main>;
  }

  const pkg = detail.package;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Decision Delivery</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{pkg.title}</h1>
        <p className="mt-4 text-slate-700">{pkg.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={handleClose} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Close package</button>
          <button onClick={handleSupersede} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">Supersede package</button>
          <a className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900" href={getPackageExportCsvUrl(packageId)}>Export CSV</a>
          <a className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900" href={getPackageExportJsonUrl(packageId)}>Export JSON</a>
          <label className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 cursor-pointer">
            Upload attachment
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Attachments</h2>
          <ul className="mt-4 space-y-2">
            {detail.attachments.map((a: any) => (
              <li key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-slate-800">{a.filename} • {a.verification_status || "unknown"}</span>
                <a className="text-sm font-semibold text-slate-900 underline" href={getAttachmentDownloadUrl(a.id)}>
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Events / audit</h2>
          <div className="mt-4 space-y-3">
            {detail.events.map((item: any) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{item.event_type}</div>
                <div className="text-xs text-slate-500">{item.created_at}</div>
                <p className="mt-2 text-slate-700">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
