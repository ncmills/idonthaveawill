// Log hygiene for /api/subscribe. Run: npx tsx --test src/app/api/subscribe-log-pii.test.ts
// (CI does not run this repo's tests: no test script.)
// A durable store (email_subscribers upsert OR Resend audience sync) holds the address -> no address in any console call.
// Both failed -> the log line is the only record and keeps email=.
import test, { afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";

const EMAIL = "sentinel_sub_q9@realdomain.com";
const METHODS = ["log", "info", "warn", "error", "debug"] as const;
const calls: unknown[][] = [];
const originals: Record<string, (...a: unknown[]) => void> = {};

beforeEach(() => {
  calls.length = 0;
  for (const m of METHODS) {
    originals[m] = console[m];
    console[m] = (...a: unknown[]) => void calls.push([m, ...a]);
  }
});
afterEach(() => {
  for (const m of METHODS) console[m] = originals[m];
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
});
const logged = () => JSON.stringify(calls).toLowerCase();

function stub(id: string, exports: unknown) {
  const filename = require.resolve(id);
  require.cache[filename] = { id: filename, filename, loaded: true, exports, children: [], paths: [] } as unknown as NodeJS.Module;
}
function load(opts: { upsertError: boolean; audience: "ok" | "throw" | "error" | "off" }) {
  if (opts.audience !== "off") {
    process.env.RESEND_API_KEY = "test-key-not-real";
    process.env.RESEND_AUDIENCE_ID = "aud";
  }
  stub("@/lib/supabase", {
    supabaseAdmin: { from: () => ({ upsert: async () => ({ error: opts.upsertError ? { message: "boom" } : null }) }) },
  });
  stub("resend", {
    Resend: class {
      contacts = {
        create: async () => {
          if (opts.audience === "throw") throw new Error("resend down");
          return opts.audience === "error" ? { data: null, error: { message: "bad" } } : { data: { id: "c" }, error: null };
        },
      };
    },
  });
  delete require.cache[require.resolve("./subscribe/route")];
  return require("./subscribe/route") as typeof import("./subscribe/route");
}
const post = () =>
  new Request("https://idonthaveawill.com/api/subscribe", {
    method: "POST",
    body: JSON.stringify({ email: EMAIL, state: "ca" }),
  });
const leadLine = () => calls.find((c) => String(c[1]).startsWith("[LEAD] subscribe"));

for (const [name, opts] of [
  ["upsert ok, audience off", { upsertError: false, audience: "off" }],
  ["upsert ok, audience ok", { upsertError: false, audience: "ok" }],
  ["upsert ok, audience throws", { upsertError: false, audience: "throw" }],
  ["upsert fails, audience ok", { upsertError: true, audience: "ok" }],
] as const) {
  test(`${name}: no console call carries the address; [LEAD] line remains`, async () => {
    const { POST } = load(opts);
    assert.equal((await POST(post())).status, 200);
    assert.ok(!logged().includes(EMAIL), "leaked email");
    const line = leadLine();
    assert.ok(line);
    assert.match(String(line[1]), /state=CA stored=\w+ audienceSynced=\w+/);
  });
}

for (const audience of ["off", "throw", "error"] as const) {
  test(`upsert fails + audience ${audience}: log is the only record, keeps email`, async () => {
    const { POST } = load({ upsertError: true, audience });
    assert.equal((await POST(post())).status, 200);
    const line = leadLine();
    assert.ok(line);
    assert.ok(String(line[1]).includes(`email=${EMAIL}`));
    assert.ok(String(line[1]).includes("stored=false audienceSynced=false"));
  });
}
