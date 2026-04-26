const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export async function getFeatureFlags() {
  return apiGet<any>("/feature-flags");
}

export async function getNavModel() {
  return apiGet<any>("/nav-model");
}
