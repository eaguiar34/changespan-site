import { cookies } from "next/headers";

export const PORTAL_SESSION_COOKIE = "changespan_portal_session";

export type PortalRole = "viewer" | "reviewer" | "editor" | "publisher" | "admin";

export type PortalSession = {
  userId: string;
  role: PortalRole;
  selectedProjectId?: string | null;
  selectedSnapshotId?: string | null;
};

export async function getPortalSession(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}
