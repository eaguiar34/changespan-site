"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_FIELD_FLOW_API_URL || "http://127.0.0.1:8000";

type UploadRecord = {
  id: string;
  title: string;
  category: string;
  linked_request_id: string;
  notes: string;
  original_name: string;
  created_at: string;
  download_url: string;
  content_type: string;
  size_bytes: number;
};

type Props = {
  requestIds: string[];
  initialItems: UploadRecord[];
};

export default function PortalUploadPanel({ requestIds, initialItems }: Props) {
  const [items, setItems] = useState<UploadRecord[]>(initialItems);
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/portal-uploads/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to upload file.");
      }
      const record = (await response.json()) as UploadRecord;
      setItems((prev) => [record, ...prev]);
      const form = document.getElementById("portal-upload-form") as HTMLFormElement | null;
      form?.reset();
      setState("idle");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  return (
    <div className="space-y-6">
      <form id="portal-upload-form" action={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Title</label>
            <input name="title" type="text" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm" placeholder="Progress photos - north apron" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Category</label>
            <select name="category" defaultValue="progress" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm">
              <option value="progress">Progress</option>
              <option value="issue">Issue</option>
              <option value="rfi-support">RFI Support</option>
              <option value="estimate-support">Estimate Support</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Linked demo request</label>
            <select name="linked_request_id" defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm">
              <option value="">Not linked</option>
              {requestIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">File</label>
            <input name="file" type="file" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm" accept="image/*,.pdf,.doc,.docx,.xlsx,.csv" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">Notes</label>
          <textarea name="notes" rows={3} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm" placeholder="Why this upload matters or what it clarifies." />
        </div>
        {state === "error" ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{errorMessage}</div>
        ) : null}
        <button type="submit" disabled={state === "submitting"} className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {state === "submitting" ? "Uploading..." : "Upload to portal"}
        </button>
      </form>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No portal uploads yet.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-base font-semibold text-slate-950">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{item.original_name} • {item.category} • {item.created_at}</div>
                  {item.notes ? <div className="mt-2 text-sm text-slate-700">{item.notes}</div> : null}
                </div>
                <a href={`${API_BASE_URL}${item.download_url}`} target="_blank" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900">Open file</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
