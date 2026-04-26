const API_BASE_URL = process.env.FIELD_FLOW_API_URL || 'http://127.0.0.1:8000';

async function getDocs() {
  try {
    const docsResp = await fetch(`${API_BASE_URL}/documents/`, { cache: 'no-store' });
    const docsData = docsResp.ok ? await docsResp.json() : { items: [] };
    return Array.isArray(docsData?.items) ? docsData.items : [];
  } catch {
    return [];
  }
}

export default async function AdminDocumentsPage() {
  const documents = await getDocs();
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Document admin</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">Revision history and admin-side document actions for portal review.</p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50"><tr>{['Title','Revision','Status','Spec Section','Type'].map((h)=><th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-900">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {documents.map((doc: any) => (
                <tr key={doc.id}>
                  <td className="px-4 py-3 text-sm text-slate-800">{doc.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{doc.revision}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{doc.status}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{doc.spec_section || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{doc.file_type || 'file'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
