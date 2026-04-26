const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export async function getPlatformVersion() {
  return apiGet<any>("/version");
}

export async function getFeatureFlags() {
  return apiGet<any>("/platform/feature-flags");
}

export async function getNavModel() {
  return apiGet<any>("/platform/nav-model");
}

export async function getCorePackages() {
  return apiGet<any[]>("/core/packages");
}

export async function getCorePackageDetail(packageId: string) {
  return apiGet<any>(`/core/packages/${packageId}`);
}

export function getCoreAttachmentDownloadUrl(attachmentId: string) {
  return `${API_BASE}/core/attachments/${attachmentId}/download`;
}

export function getCorePackageExportCsvUrl(packageId: string) {
  return `${API_BASE}/core/packages/${packageId}/export.csv`;
}

export function getCorePackageExportJsonUrl(packageId: string) {
  return `${API_BASE}/core/packages/${packageId}/export.json`;
}
