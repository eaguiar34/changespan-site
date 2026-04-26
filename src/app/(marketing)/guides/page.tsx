export default function GuidesPage() {
  const guides = [
    {
      title: "How ChangeSpan fits a desktop-first controls workflow",
      summary: "Start with local authoring, publish only when the package is ready, and keep the browser as the review layer instead of the main workspace.",
      paragraphs: [
        "ChangeSpan is built around local-first authoring. Desktop users do the heavy project controls work locally, then publish reviewable snapshots when collaboration is needed.",
        "The portal is the review layer, not the primary authoring system. That helps preserve a cleaner project record and a more explainable workflow.",
        "The result is a closed loop that supports both desktop rigor and browser collaboration.",
      ],
    },
    {
      title: "Publishing snapshots for stakeholder review",
      summary: "Treat snapshots as stable review packages so comments, approvals, and rejections stay tied to a known revision.",
      paragraphs: [
        "A snapshot gives reviewers a stable revision to comment on, approve, or reject. That keeps feedback tied to something concrete instead of a constantly changing desktop state.",
        "This makes portal review cleaner because the conversation is about a known revision, not an uncertain moving target.",
        "When those review events sync back into the desktop app, the workflow becomes easier to explain and easier to audit later.",
      ],
    },
    {
      title: "Syncing portal comments back to desktop",
      summary: "Review events are most useful when they return to the operating workspace and inform the next action instead of living only in the browser.",
      paragraphs: [
        "Portal comments, approvals, and rejections are most useful when they do not remain browser-only. ChangeSpan treats them as review events that can be pulled back into the desktop workflow.",
        "That helps keep the project record more complete and makes it easier to understand not just what changed, but how the team responded.",
        "The overall workflow becomes desktop publish, portal review, desktop sync, then action.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Guides</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Practical walkthroughs for the ChangeSpan workflow.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            These guides explain how the desktop app, portal, and review sync loop fit together in
            real project controls work, without forcing you into extra pages.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {guides.map((guide) => (
            <section key={guide.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{guide.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{guide.summary}</p>

              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                {guide.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
