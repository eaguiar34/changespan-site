import Link from "next/link";

export default function SubmittalsSpecMatchingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Feature Detail
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Submittals / Spec Matching
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Keep spec requirements and submittal workflows tied together so review
          tracking stays cleaner and missing requirements are easier to spot.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">Key capabilities</h2>
          <div className="mt-4 space-y-3 text-slate-600">
            <p>• Requirement linkage</p>
            <p>• Submittal status visibility</p>
            <p>• Review comment context</p>
            <p>• Better traceability across document workflows</p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/features"
            className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            ← Back to Features
          </Link>
        </div>
      </div>
    </main>
  );
}