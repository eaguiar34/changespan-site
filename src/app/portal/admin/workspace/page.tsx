"use client";

import { FormEvent, useEffect, useState } from "react";
import { getWorkspaceSettings, getWorkspaceUsers, inviteWorkspaceUser } from "@/lib/api";

export default function WorkspaceAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("reviewer");
  const [status, setStatus] = useState("");

  async function load() {
    setUsers(await getWorkspaceUsers());
    setSettings(await getWorkspaceSettings());
  }

  useEffect(() => {
    load().catch((err) => setStatus(String(err)));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Inviting...");
    try {
      await inviteWorkspaceUser({ email, display_name: displayName, role });
      setEmail("");
      setDisplayName("");
      setRole("reviewer");
      setStatus("Invite created.");
      await load();
    } catch (err) {
      setStatus(String(err));
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Workspace Admin</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Administration and onboarding</h1>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Invite user</h2>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-4">
          <input className="rounded-2xl border border-slate-300 px-4 py-2" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" />
          <input className="rounded-2xl border border-slate-300 px-4 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <select className="rounded-2xl border border-slate-300 px-4 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="reviewer">Reviewer</option>
            <option value="manager">Manager</option>
            <option value="contributor">Contributor</option>
          </select>
          <button className="rounded-2xl bg-slate-950 px-4 py-2 text-white">Invite</button>
        </form>
        {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Settings</h2>
        <pre className="mt-4 overflow-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
{JSON.stringify(settings, null, 2)}
        </pre>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Users</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium text-slate-900">{user.display_name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">{user.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
