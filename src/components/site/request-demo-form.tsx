"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_FIELD_FLOW_API_URL || "http://127.0.0.1:8000";

export default function RequestDemoForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(formData: FormData) {
    setState("submitting");
    setErrorMessage("");

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      role: String(formData.get("role") || "").trim(),
      contact_preference: String(formData.get("contact_preference") || "email").trim(),
      notes: String(formData.get("notes") || "").trim(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/request-demos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit demo request.");
      }

      setSubmittedName(payload.name);
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the demo request."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-900">
          Demo request submitted
        </p>
        <p className="mt-2 text-sm leading-7 text-emerald-800">
          Thanks{submittedName ? `, ${submittedName}` : ""}. Your request has been
          saved to the ChangeSpan API and should now appear in the portal admin page.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Full name
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Emiliano Garcia"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Work email
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Phone
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Company
        </label>
        <input
          name="company"
          type="text"
          placeholder="Jacobs"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Role
        </label>
        <input
          name="role"
          type="text"
          placeholder="Project controls, scheduler, PM, estimator..."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Preferred contact method
        </label>
        <select
          name="contact_preference"
          defaultValue="email"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="either">Either</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          What do you want to see?
        </label>
        <textarea
          name="notes"
          rows={5}
          placeholder="Tell us which workflow matters most to your team."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {state === "error" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {errorMessage || "Failed to submit request."}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Submitting..." : "Request walkthrough"}
      </button>
    </form>
  );
}