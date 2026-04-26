import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { getReleaseBySlug, releaseSlug, releases } from "@/lib/releases";

export function generateStaticParams() {
  return releases.map((r) => ({ slug: releaseSlug(r) }));
}

export default function ReleaseNotesDetailPage({ params }: { params: { slug: string } }) {
  const r = getReleaseBySlug(params.slug);
  if (!r) return notFound();

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <div className="text-sm text-slate-500">Release notes</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">v{r.version}</h1>
          <div className="mt-2 text-sm text-slate-600">{r.date}</div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Highlights</div>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                {r.highlights.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold">Download</div>
              <div className="mt-2 text-sm text-slate-700">{r.fileName}</div>
              <Link
                href="/download/windows"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Download for Windows
              </Link>
              <div className="mt-4 text-xs text-slate-600">
                Checksum verification available on the Windows download page.
              </div>
            </div>
          </div>

          {r.fixes && r.fixes.length ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Fixes</div>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                {r.fixes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {r.knownIssues && r.knownIssues.length ? (
            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="text-sm font-semibold text-amber-900">Known issues</div>
              <ul className="mt-3 list-disc pl-5 text-amber-900">
                {r.knownIssues.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12">
            <Link href="/release-notes" className="text-sm font-semibold text-slate-900 hover:underline">
              ← All release notes
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}