import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/site/container";
import { getTutorialSlugs, getTutorialBySlug } from "@/lib/content/tutorials";
import { mdxComponents } from "@/components/mdx/mdx-components";
import Link from "next/link";

export function generateStaticParams() {
  return getTutorialSlugs().map((slug) => ({ slug }));
}

export default function TutorialDetailPage({ params }: { params: { slug: string } }) {
  let tutorial;
  try {
    tutorial = getTutorialBySlug(params.slug);
  } catch {
    return notFound();
  }

  const { frontmatter, content, readingTimeText } = tutorial;

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <div className="text-sm text-slate-500">
            {frontmatter.date} • {readingTimeText}
            {frontmatter.level ? ` • ${frontmatter.level}` : ""}
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{frontmatter.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">{frontmatter.description}</p>

          {frontmatter.videoUrl ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                className="aspect-video w-full"
                src={frontmatter.videoUrl}
                title={frontmatter.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          <article className="mt-10">
            <MDXRemote source={content} components={mdxComponents as any} />
          </article>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-lg font-semibold">Want the Demo Pack?</div>
            <p className="mt-2 text-slate-700">
              Download ChangeSpan + sample project files and follow a guided workflow.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/demo-pack"
                className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get the Demo Pack
              </Link>
              <Link
                href="/download/windows"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                Download for Windows
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}