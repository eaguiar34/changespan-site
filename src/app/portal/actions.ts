"use client";

import { logout } from "@/lib/api";

export async function signOutOfPortal() {
  await logout();
}
