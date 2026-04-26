export default function RoadmapPage() {
  const roadmap = [
    {
      phase: "Now",
      items: [
        "Desktop publish snapshot workflow",
        "Portal review timeline",
        "Sync comments, approvals, and rejections back to desktop",
        "Download hub and website portal entry",
      ],
    },
    {
      phase: "Next",
      items: [
        "Stronger desktop publish dialog",
        "Cleaner review inbox and sync summaries",
        "Real installer links and checksum workflow",
        "Portal access controls and fuller auth model",
      ],
    },
    {
      phase: "Later",
      items: [
        "Company-level workspaces",
        "Attachment mirroring and lazy download",
        "Cross-linking between schedule, controls, and review records",
        "Deeper admin and reporting workflows",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Roadmap
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            A practical build path for a desktop-first controls product.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            The roadmap is focused on making ChangeSpan genuinely useful in stages:
            first strengthen the desktop workflow, then add browser collaboration
            without losing the project record.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {roadmap.map((section) => (
            <section
              key={section.phase}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{section.phase}</h2>
              <div className="mt-4 space-y-3 text-slate-600">
                {section.items.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}