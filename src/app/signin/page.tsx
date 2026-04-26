"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/portal/release-candidate";

  const [email, setEmail] = useState("admin@changespan.local");
  const [password, setPassword] = useState("password");
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");

    try {
      const result = await login(email, password);

      if (typeof window !== "undefined") {
        localStorage.setItem("changespan_access_token", result.access_token || "dev-local-token");
        localStorage.setItem("changespan_user", JSON.stringify(result.user || { email }));
      }

      setStatus("Signed in.");
      router.push(next);
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not sign in.");
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ChangeSpan Portal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Sign in</h1>
        <p className="mt-3 text-sm text-slate-600">
          This stabilization pass uses a compatibility sign-in path so older protected routes can compile and forward into the canonical portal flow.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
          >
            Continue
          </button>
        </form>

        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </div>
    </main>
  );
}
