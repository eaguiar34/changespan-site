import Link from "next/link";
import { Container } from "@/components/site/container";
import { releases, releaseSlug } from "@/lib/releases";

export default function ReleaseNotesIndexPage() {
  const sorted = [...releases].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Release notes</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            What changed, what it enables, and known issues—so teams can evaluate with confidence.
          </p>

          <div className="mt-10 grid gap-4">
            {sorted.map((r) => {
              const slug = releaseSlug(r);
              return (
                <Link
                  key={slug}
                  href={`/release-notes/${slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-lg font-semibold">v{r.version}</div>
                    <div className="text-sm text-slate-600">{r.date}</div>
                  </div>
                  <div className="mt-3 text-sm text-slate-700">
                    {r.highlights?.[0] ?? "Release details"}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-slate-900">View notes →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}