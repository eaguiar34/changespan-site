export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          About
        </p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          ChangeSpan is aimed at practical project controls work.
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
          <p>
            The product direction is simple: keep the heavy controls work in a desktop
            environment, then add a browser portal for review, comments, and decisions.
          </p>
          <p>
            That makes the collaboration layer useful without forcing every step of the
            workflow into the cloud. The desktop record still matters.
          </p>
          <p>
            The goal is a workflow that is easier to explain, easier to audit, and
            better aligned with how engineering and construction teams actually work.
          </p>
        </div>
      </div>
    </main>
  );
}