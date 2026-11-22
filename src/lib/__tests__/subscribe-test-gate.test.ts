import test from "node:test";
import assert from "node:assert/strict";

process.env.SIGNAL_TEST_SECRET = "s3cret";
process.env.RESEND_API_KEY = "re_fake";
process.env.RESEND_AUDIENCE_ID = "aud_fake";
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://fake.supabase.test";
process.env.SUPABASE_SERVICE_ROLE_KEY = "fake";

const calls: string[] = [];
globalThis.fetch = (async (input: unknown) => {
  calls.push(String(typeof input === "string" ? input : (input as { url?: string }).url ?? input));
  return new Response(JSON.stringify({ id: "x" }), { status: 200, headers: { "content-type": "application/json" } });
}) as typeof fetch;

function req(email: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({ email, state: "NC" }),
  });
}

test("test-flagged request: success, no supabase write, no Resend audience add", async () => {
  const { POST } = await import("../../app/api/subscribe/route");
  calls.length = 0;
  const res = await POST(req("visitor@gmail.com", { "x-sn-test-run": "s3cret" }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
  assert.equal(calls.length, 0);
});

test("test-flagged request with reserved email reaches success path, still writes nothing", async () => {
  const { POST } = await import("../../app/api/subscribe/route");
  calls.length = 0;
  const res = await POST(req("probe@example.com", { "x-sn-test-run": "s3cret" }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
  assert.equal(calls.length, 0);
});

test("normal request: writes to supabase and Resend", async () => {
  const { POST } = await import("../../app/api/subscribe/route");
  calls.length = 0;
  const res = await POST(req("visitor@gmail.com"));
  assert.equal(res.status, 200);
  assert.ok(calls.some((u) => u.includes("email_subscribers")), calls.join(","));
  assert.ok(calls.some((u) => u.includes("resend.com")), calls.join(","));
});

test("normal request with reserved email: still 400", async () => {
  const { POST } = await import("../../app/api/subscribe/route");
  calls.length = 0;
  const res = await POST(req("probe@example.com"));
  assert.equal(res.status, 400);
  assert.equal(calls.length, 0);
});

test("wrong test secret is not test-flagged (reserved email 400)", async () => {
  const { POST } = await import("../../app/api/subscribe/route");
  const res = await POST(req("probe@example.com", { "x-sn-test-run": "nope" }));
  assert.equal(res.status, 400);
});
