const API_BASE_URL = process.env.FIELD_FLOW_API_URL || 'http://127.0.0.1:8000';

import PortalShell from '@/components/site/portal-shell';
import PortalDocumentPanel from '@/components/site/portal-document-panel';

async function getDocs() {
  try {
    const [docsResp, commentsResp] = await Promise.all([
      fetch(`${API_BASE_URL}/documents/`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/documents/comments`, { cache: 'no-store' }),
    ]);
    const docsData = docsResp.ok ? await docsResp.json() : { items: [] };
    const commentsData = commentsResp.ok ? await commentsResp.json() : { items: [] };
    return { documents: Array.isArray(docsData?.items) ? docsData.items : [], comments: Array.isArray(commentsData?.items) ? commentsData.items : [] };
  } catch {
    return { documents: [], comments: [] };
  }
}

export default async function PortalDocumentsPage() {
  const { documents, comments } = await getDocs();
  return (
    <PortalShell title="Portal Documents" description="Upload revisions, review spec and PDF records, and add pinned notes from the browser.">
      <PortalDocumentPanel initialDocuments={documents} initialComments={comments} />
    </PortalShell>
  );
}
