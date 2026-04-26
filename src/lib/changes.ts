export type ChangeRecord = {
  id: string;
  kind: string;
  title: string;
  status: string;
  priority: string;
  source_module: string;
  responsible_party: string;
  due_date: string;
  impact_summary: string;
  linked_activity_ids: string[];
  linked_cost_ids: string[];
  snapshot_id: string;
  review_state: string;
  history: { event_type: string; actor: string; note: string; created_at: string }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function getChanges(): Promise<ChangeRecord[]> {
  const res = await fetch(`${API_BASE}/changes/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load changes");
  return res.json();
}

export async function getChange(changeId: string): Promise<ChangeRecord> {
  const res = await fetch(`${API_BASE}/changes/${changeId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load change");
  return res.json();
}

export async function getCommandCenter() {
  const res = await fetch(`${API_BASE}/command-center/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load command center");
  return res.json();
}
