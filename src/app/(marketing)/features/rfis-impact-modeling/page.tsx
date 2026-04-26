import Link from "next/link";

export default function RFIsImpactModelingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Feature Detail
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          RFIs + Impact Modeling
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Connect RFIs and related field events to project impacts so the narrative
          behind delay, disruption, and change stays clearer.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">Key capabilities</h2>
          <div className="mt-4 space-y-3 text-slate-600">
            <p>• Event-to-impact mapping</p>
            <p>• Better change narratives</p>
            <p>• Stronger record support</p>
            <p>• Cleaner reporting context</p>
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