import Link from "next/link";

export default function PublishingSnapshotsForReviewGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Guide
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Publishing snapshots for stakeholder review
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            A snapshot gives reviewers a stable revision to comment on, approve, or
            reject. That keeps feedback tied to something concrete instead of a
            constantly changing desktop state.
          </p>
          <p>
            This makes portal review cleaner and supports a stronger audit trail when
            desktop users sync those review events back into the project record.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/guides"
            className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            ← Back to Guides
          </Link>
        </div>
      </div>
    </main>
  );
}