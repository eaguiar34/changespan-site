import Link from "next/link";

const tiers = [
  {
    name: "Beta",
    price: "Contact us",
    description: "Early access for teams testing the desktop + portal workflow.",
    points: [
      "Desktop app access",
      "Portal review access",
      "Snapshot publish + sync workflow",
      "Direct product feedback loop",
    ],
  },
  {
    name: "Team",
    price: "Planned",
    description: "For teams standardizing local controls and shared review.",
    points: [
      "Broader team rollout",
      "Release download hub",
      "Expanded collaboration workflow",
      "Cleaner shared review process",
    ],
  },
  {
    name: "Enterprise",
    price: "Planned",
    description: "For organizations that need broader deployment and governance.",
    points: [
      "Organization-level rollout",
      "Governed access model",
      "Deeper admin support",
      "More formal reporting and controls workflows",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pricing
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Start simple, grow into a stronger controls workflow.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pricing is still being finalized, but the direction is straightforward:
            keep the product practical, useful, and aligned with real project controls
            work rather than bloating it too early.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <section
              key={tier.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{tier.name}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight">{tier.price}</p>
              <p className="mt-4 text-slate-600">{tier.description}</p>
              <div className="mt-6 space-y-3 text-slate-600">
                {tier.points.map((point) => (
                  <p key={point}>• {point}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/download"
            className="inline-flex min-w-[160px] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Download
          </Link>
        </div>
      </div>
    </main>
  );
}