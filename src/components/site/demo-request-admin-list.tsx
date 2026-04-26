"use client";

import { useMemo, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_FIELD_FLOW_API_URL || "http://127.0.0.1:8000";

type RequestDemoRecord = {
  id: string;
  created_at: string;
  updated_at?: string;
  status: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  role: string;
  contact_preference?: string;
  notes: string;
};

type DemoRequestAdminListProps = {
  initialItems: RequestDemoRecord[];
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"] as const;
const FILTER_OPTIONS = ["all", "new", "contacted", "qualified", "closed"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];
type SortOption = "newest" | "oldest";

function statusClasses(status: string) {
  switch (status) {
    case "qualified":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "contacted":
      return "border-blue-200 bg-blue-50 text-blue-800";
    case "closed":
      return "border-slate-200 bg-slate-100 text-slate-700";
    default:
      return "border-amber-200 bg-amber-50 text-amber-800";
  }
}

function matchesSearch(item: RequestDemoRecord, query: string) {
  if (!query.trim()) return true;

  const haystack = [
    item.name,
    item.email,
    item.phone || "",
    item.company,
    item.role,
    item.notes,
    item.status,
    item.contact_preference || "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function asTime(value: string | undefined) {
  const time = value ? Date.parse(value) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

export default function DemoRequestAdminList({
  initialItems,
}: DemoRequestAdminListProps) {
  const [items, setItems] = useState<RequestDemoRecord[]>(initialItems);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const counts = useMemo(() => {
    return {
      total: items.length,
      new: items.filter((x) => x.status === "new").length,
      contacted: items.filter((x) => x.status === "contacted").length,
      qualified: items.filter((x) => x.status === "qualified").length,
      closed: items.filter((x) => x.status === "closed").length,
      openPipeline: items.filter((x) => x.status !== "closed").length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    let next = [...items];

    if (activeFilter !== "all") {
      next = next.filter((item) => item.status === activeFilter);
    }

    next = next.filter((item) => matchesSearch(item, search));

    next.sort((a, b) => {
      const aTime = asTime(a.created_at);
      const bTime = asTime(b.created_at);
      return sortBy === "newest" ? bTime - aTime : aTime - bTime;
    });

    return next;
  }, [items, activeFilter, search, sortBy]);

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/request-demos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update status.");
      }

      const updated = (await response.json()) as RequestDemoRecord;
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update status."
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Total
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {counts.total}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            New
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            {counts.new}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Contacted
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-900">
            {counts.contacted}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Qualified
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-900">
            {counts.qualified}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Closed
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {counts.closed}
          </div>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
            Open Pipeline
          </div>
          <div className="mt-2 text-2xl font-bold text-violet-900">
            {counts.openPipeline}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto]">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, phone, company, role, notes..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                    activeFilter === option
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Show all
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("new")}
            className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-amber-900 transition hover:bg-amber-50"
          >
            New only
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("qualified")}
            className="rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-900 transition hover:bg-emerald-50"
          >
            Qualified only
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setSearch("");
              setSortBy("newest");
            }}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Reset view
          </button>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {errorMessage}
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          No demo requests match the current search and filter settings.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isBusy = busyId === item.id;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-slate-950">
                        {item.name}
                      </h3>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">
                      {item.email}
                      {item.phone ? ` • ${item.phone}` : ""}
                      {item.company ? ` • ${item.company}` : ""}
                      {item.role ? ` • ${item.role}` : ""}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Preferred contact: {item.contact_preference || "email"}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Submitted: {item.created_at}
                      {item.updated_at ? ` • Updated: ${item.updated_at}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={isBusy || item.status === status}
                        onClick={() => updateStatus(item.id, status)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isBusy ? "Updating..." : status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
                    {item.notes || "No notes provided."}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Quick contact
                    </p>

                    <div className="mt-3 space-y-2">
                      <a
                        href={`mailto:${item.email}`}
                        className="block rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                      >
                        Email {item.name.split(" ")[0] || "lead"}
                      </a>

                      {item.phone ? (
                        <a
                          href={`tel:${item.phone}`}
                          className="block rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                        >
                          Call {item.phone}
                        </a>
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-500">
                          No phone provided
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}