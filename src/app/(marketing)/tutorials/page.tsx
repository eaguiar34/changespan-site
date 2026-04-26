import Link from "next/link";
import { Container } from "@/components/site/container";
import { getAllTutorials } from "@/lib/content/tutorials";

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Tutorials</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Practical workflows for scheduling, RFIs, submittals, and reporting. No fluff.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tutorials.map((t) => (
              <Link
                key={t.slug}
                href={`/tutorials/${t.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow"
              >
                <div className="text-sm text-slate-500">
                  {t.frontmatter.date} • {t.readingTimeText}
                  {t.frontmatter.level ? ` • ${t.frontmatter.level}` : ""}
                </div>
                <div className="mt-2 text-xl font-semibold">{t.frontmatter.title}</div>
                <p className="mt-2 text-slate-700">{t.frontmatter.description}</p>

                {t.frontmatter.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}