import Link from "next/link";

export default function SyncingPortalCommentsBackToDesktopGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Guide
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Syncing portal comments back to desktop
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            Portal comments, approvals, and rejections are most useful when they do
            not remain browser-only. ChangeSpan treats them as review events that can
            be pulled into the desktop workflow.
          </p>
          <p>
            That keeps the record more complete and helps explain what changed, why it
            changed, and how the team responded.
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