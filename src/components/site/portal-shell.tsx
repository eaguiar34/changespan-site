import Link from "next/link";
import { ReactNode } from "react";

type PortalShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  roleLabel?: string;
};

const links = [
  { href: "/portal/command-center", label: "Command Center" },
  { href: "/portal/packages", label: "Packages" },
  { href: "/portal/assignments", label: "Assignments" },
  { href: "/portal/notifications", label: "Notifications" },
  { href: "/portal/revision-compare", label: "Revision Compare" },
  { href: "/portal/attachments", label: "Attachments" },
];

export default function PortalShell({ children, title, description, roleLabel }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">ChangeSpan Portal</div>
            <div className="text-sm text-slate-500">{description ?? "Review package operations, assignments, revisions, and attachments."}</div>
          </div>
          <div className="flex items-center gap-3">
            {roleLabel ? <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{roleLabel}</div> : null}
            <nav className="flex flex-wrap gap-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-8">{title ? <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1> : null}{children}</div>
    </div>
  );
}
