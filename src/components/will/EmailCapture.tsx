"use client";

import { useState } from "react";
import { trackEmailCaptured } from "@/lib/tracking";

interface EmailCaptureProps {
  stateAbbr: string;
}

export default function EmailCapture({ stateAbbr }: EmailCaptureProps) {
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
        body: JSON.stringify({ email, state: stateAbbr }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEmailCaptured("review");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg">
            ✓
          </div>
          <div>
            <p className="font-semibold text-green-800">You&apos;re signed up.</p>
            <p className="text-green-600 text-sm mt-0.5">
              We&apos;ll send you a reminder once a year to review your will. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
          📅
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Get a free annual reminder to review your will
          </h3>
          <p className="mt-1 text-gray-500 text-sm">
            Life changes — marriages, moves, new kids. We&apos;ll email you once a year to
            remind you to check if your will needs updating. That&apos;s it.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
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
            We only store your email and state. No names, no will content, nothing else.
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
