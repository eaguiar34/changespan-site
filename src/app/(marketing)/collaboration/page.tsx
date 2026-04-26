import Link from "next/link";

export default function CollaborationPage() {
  const steps = [
    {
      title: "1. Desktop authoring",
      text:
        "The working project record stays in the desktop app, where the team updates schedules, controls records, and project context.",
    },
    {
      title: "2. Snapshot publishing",
      text:
        "A reviewable revision is published so browser reviewers can comment on a stable project state instead of a constantly changing working file.",
    },
    {
      title: "3. Portal review",
      text:
        "Stakeholders add comments, approvals, and rejections in the browser portal against the published revision.",
    },
    {
      title: "4. Desktop sync",
      text:
        "Those review events are synced back into the desktop workflow so the local record remains complete and auditable.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Collaboration
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Review in the browser, keep control in the desktop workflow.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            ChangeSpan is designed around a closed-loop review model. The portal is there
            to support communication and decisions, while the desktop app remains the
            main authoring and recordkeeping environment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <section
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-950">
            Why this matters
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-8">
            <p>
              Many teams still need a local working environment for serious project
              controls tasks. ChangeSpan keeps that workflow intact instead of trying to
              force every action into a browser-only system.
            </p>
            <p>
              At the same time, browser review makes it easier to get comments and
              decisions from stakeholders who do not need the full desktop tool.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/portal"
            className="inline-flex min-w-[140px] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open Portal
          </Link>
          <Link
            href="/guides"
            className="inline-flex min-w-[140px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Read Guides
          </Link>
        </div>
      </div>
    </main>
  );
}