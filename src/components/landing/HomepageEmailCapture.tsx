"use client";

import { useState } from "react";
import { trackEmailCaptured } from "@/lib/tracking";

export default function HomepageEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state: "XX" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEmailCaptured("homepage");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <p className="font-semibold text-green-800">You&apos;re signed up.</p>
            <p className="text-green-600 text-sm mt-1">
              We&apos;ll send you a reminder once a year to review your will.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--color-brand)]">
          Get a free annual reminder to review your will
        </h3>
        <p className="mt-2 text-gray-500 text-sm">
          Life changes. We&apos;ll email you once a year to check if your will needs updating. That&apos;s it.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2.5 bg-[var(--color-brand)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? "Signing up..." : "Remind Me"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-2 text-red-600 text-xs">{errorMsg}</p>
        )}

        <p className="mt-3 text-gray-400 text-xs">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
