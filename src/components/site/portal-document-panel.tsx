"use client";

import { useMemo, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_FIELD_FLOW_API_URL || "http://127.0.0.1:8000";

type DocumentItem = { id: string; project_id: string; title: string; file_name: string; stored_path: string; file_type: string; revision: string; status: string; spec_section?: string; };
type CommentItem = { id: string; document_id: string; page_number: number; section_ref: string; marker_type: string; title: string; body: string; };

export default function PortalDocumentPanel({ initialDocuments, initialComments }: { initialDocuments: DocumentItem[]; initialComments: CommentItem[]; }) {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [selectedId, setSelectedId] = useState<string>(initialDocuments[0]?.id || "");
  const [message, setMessage] = useState("");

  const selectedDoc = useMemo(() => documents.find((x) => x.id === selectedId) || null, [documents, selectedId]);
  const selectedComments = useMemo(() => comments.filter((x) => x.document_id === selectedId), [comments, selectedId]);

  async function refreshAll() {
    const [docsResp, commentsResp] = await Promise.all([
      fetch(`${API_BASE_URL}/documents/`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/documents/comments`, { cache: "no-store" }),
    ]);
    const docsData = docsResp.ok ? await docsResp.json() : { items: [] };
    const commentsData = commentsResp.ok ? await commentsResp.json() : { items: [] };
    setDocuments(Array.isArray(docsData?.items) ? docsData.items : []);
    setComments(Array.isArray(commentsData?.items) ? commentsData.items : []);
  }

  async function handleUpload(formData: FormData) {
    setMessage("");
    const response = await fetch(`${API_BASE_URL}/documents/`, { method: "POST", body: formData });
    if (!response.ok) { setMessage("Upload failed."); return; }
    await refreshAll();
    setMessage("Document uploaded.");
  }

  async function addComment(formData: FormData) {
    if (!selectedId) return;
    const payload = { document_id: selectedId, page_number: Number(formData.get("page_number") || 1), section_ref: String(formData.get("section_ref") || ""), marker_type: String(formData.get("marker_type") || "note"), title: String(formData.get("title") || "Pinned Note"), body: String(formData.get("body") || "") };
    const response = await fetch(`${API_BASE_URL}/documents/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) { setMessage("Comment failed."); return; }
    await refreshAll();
    setMessage("Pinned note saved.");
  }

  async function updateStatus(status: string) {
    if (!selectedId) return;
    const response = await fetch(`${API_BASE_URL}/documents/${selectedId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) { setMessage("Status update failed."); return; }
    await refreshAll();
    setMessage(`Status updated to ${status}.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">Documents</h2>
        <form action={handleUpload} className="mt-5 space-y-3">
          <input name="file" type="file" required className="block w-full rounded-2xl border border-slate-300 px-3 py-3 text-sm" />
          <input name="title" type="text" placeholder="Document title" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="revision" type="text" defaultValue="A" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
            <input name="spec_section" type="text" placeholder="Spec Section" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Upload Document</button>
        </form>
        <div className="mt-6 space-y-3">
          {documents.map((doc) => (
            <button key={doc.id} type="button" onClick={() => setSelectedId(doc.id)} className={`block w-full rounded-2xl border px-4 py-4 text-left ${selectedId === doc.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}>
              <div className="text-sm font-semibold">{doc.title}</div>
              <div className="mt-1 text-xs opacity-80">Rev {doc.revision} • {doc.file_type || "file"} • {doc.status}</div>
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">{selectedDoc ? selectedDoc.title : "Select a document"}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{selectedDoc ? `Revision ${selectedDoc.revision} • ${selectedDoc.status} • ${selectedDoc.file_name}` : "Choose a document from the list."}</p>
          {selectedDoc ? <div className="mt-4 flex gap-3"><button type="button" onClick={() => updateStatus("active")} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm">Mark Active</button><button type="button" onClick={() => updateStatus("superseded")} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm">Mark Superseded</button><button type="button" onClick={() => updateStatus("under_review")} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm">Mark Under Review</button></div> : null}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-950">Pinned notes / markers</h3>
          <form action={addComment} className="mt-4 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <input name="page_number" type="number" min="1" defaultValue="1" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
              <input name="section_ref" type="text" placeholder="Section ref" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
              <input name="marker_type" type="text" defaultValue="note" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
            </div>
            <input name="title" type="text" placeholder="Marker title" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
            <textarea name="body" rows={4} placeholder="Comment body" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm" />
            <button type="submit" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Save pinned note</button>
          </form>
          {message ? <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div> : null}
          <div className="mt-5 space-y-3">
            {selectedComments.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-950">Page {item.page_number} • {item.section_ref || "No section"} • {item.marker_type}</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{item.body || "No body."}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
