import {
  BarChart3,
  GitBranch,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "CPM Scheduling",
      summary:
        "Build schedules, set baselines, compare updates, and export defensible artifacts.",
      details: [
        "ChangeSpan supports a desktop-first CPM workflow where the team can keep its working schedule local, compare baseline and active states, and review logic without forcing everything into a browser.",
        "The goal is not just to calculate dates, but to make schedule movement easier to explain. That means better visibility into what changed, where sequence risk is building, and how updates compare against the original plan.",
        "This makes the workflow more useful for real project controls work, where schedule discussion, documentation, and defensibility matter just as much as raw computation.",
      ],
      bullets: [
        "Baseline vs active comparison",
        "Logic-focused schedule review",
        "Scenario testing support",
        "Export-friendly outputs",
      ],
      icon: GitBranch,
    },
    {
      title: "Submittals / Spec Matching",
      summary:
        "Track requirements and submittals so scope doesn’t slip through cracks.",
      details: [
        "ChangeSpan is designed to help teams keep specification requirements tied to the actual submittal workflow instead of letting the two drift apart.",
        "That matters because missed requirements usually do not happen from one big failure. They happen when review status, package status, and specification obligations become disconnected across too many files and conversations.",
        "By keeping those records closer together, the workflow becomes easier to track, easier to explain, and easier to use when follow-up is needed.",
      ],
      bullets: [
        "Requirement linkage",
        "Submittal status visibility",
        "Review comment context",
        "Better traceability across document workflows",
      ],
      icon: ClipboardCheck,
    },
    {
      title: "RFIs + Impact Modeling",
      summary:
        "Connect events to impacts and keep your narrative straight.",
      details: [
        "ChangeSpan helps tie RFIs and other field-driven issues to the actual project impact conversation rather than treating them as disconnected log entries.",
        "That gives the team a better way to explain how questions, clarifications, and unresolved issues relate to schedule effects, workflow disruption, and the broader change story.",
        "This is especially important when the project needs a defensible, coherent record instead of a scattered set of notes and attachments.",
      ],
      bullets: [
        "Event-to-impact mapping",
        "Better change narratives",
        "Stronger record support",
        "Cleaner reporting context",
      ],
      icon: FileText,
    },
    {
      title: "Cost / Time-Phased Curves",
      summary:
        "Time-phase costs and visualize trends with curves built for reporting.",
      details: [
        "ChangeSpan supports a more readable view of time-phased cost and progress so reporting can move beyond static spreadsheets and disconnected summaries.",
        "The point is not only to visualize data, but to help project teams communicate trend movement, forecast changes, and progress relationships more clearly.",
        "That makes reporting more practical for internal reviews, management updates, and client-facing conversations.",
      ],
      bullets: [
        "Time-phased reporting support",
        "Curve-based trend visibility",
        "Better cost/progress communication",
        "Cleaner presentation for updates and forecasts",
      ],
      icon: BarChart3,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Features
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-950">
            Practical project controls workflows, all on one page.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            ChangeSpan is built around desktop-first project controls work with a connected
            browser review layer. These feature areas show where the product is trying to
            be useful in real engineering and construction workflows.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <section
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <Icon className="h-7 w-7 text-slate-900" />
                      </div>
                      <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                        {feature.title}
                      </h2>
                    </div>

                    <p className="mt-4 text-lg leading-8 text-slate-600">
                      {feature.summary}
                    </p>

                    <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                      {feature.details.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Key capabilities
                    </p>
                    <div className="mt-4 space-y-3 text-slate-700">
                      {feature.bullets.map((bullet) => (
                        <p key={bullet}>• {bullet}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}