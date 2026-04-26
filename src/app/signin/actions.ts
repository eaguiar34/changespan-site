"use server";

// Sign-in now runs entirely through the client auth flow in src/lib/api.ts.
export async function signInToPortal() {
  throw new Error("Use the client-side sign-in form.");
}
