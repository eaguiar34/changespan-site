import Link from "next/link";

export default function DesktopFirstControlsWorkflowGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Guide
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          How ChangeSpan fits a desktop-first controls workflow
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            ChangeSpan is built around local-first authoring. Desktop users do the
            heavy project controls work locally, then publish reviewable snapshots
            when collaboration is needed.
          </p>
          <p>
            The portal is the review layer, not the primary authoring system. That
            helps preserve a cleaner project record and a more explainable workflow.
          </p>
          <p>
            The result is a closed loop that supports both desktop rigor and browser
            collaboration.
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