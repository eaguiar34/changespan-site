import Link from "next/link";

export const mdxComponents = {
  a: (props: any) => (
    <Link {...props} className="underline underline-offset-4 hover:opacity-80" />
  ),
  h2: (props: any) => <h2 {...props} className="mt-10 text-2xl font-semibold" />,
  h3: (props: any) => <h3 {...props} className="mt-8 text-xl font-semibold" />,
  p: (props: any) => <p {...props} className="mt-4 leading-7 text-slate-700" />,
  ul: (props: any) => <ul {...props} className="mt-4 list-disc pl-6 text-slate-700" />,
  ol: (props: any) => <ol {...props} className="mt-4 list-decimal pl-6 text-slate-700" />,
  code: (props: any) => (
    <code {...props} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.95em]" />
  ),
  pre: (props: any) => (
    <pre {...props} className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-slate-50" />
  ),
};