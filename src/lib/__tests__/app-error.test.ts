import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { appErrorVendorProps, appErrorFirstPartyBody, APP_ERROR_MESSAGE_MAX } from "../app-error";

const err = { name: "TypeError", message: "Cannot read properties of undefined (reading 'x')", digest: "123" };

test("vendor props carry name and digest only, never message", () => {
  assert.deepEqual(appErrorVendorProps(err), { name: "TypeError", digest: "123" });
});
test("first-party body keeps the message, capped", () => {
  const b = appErrorFirstPartyBody({ ...err, message: "x".repeat(500) });
  assert.equal(b.event, "app_error");
  assert.equal(b.message.length, APP_ERROR_MESSAGE_MAX);
});
test("error.tsx no longer sends error.message to PostHog", () => {
  const src = readFileSync("src/app/error.tsx", "utf8");
  assert.ok(!/message:\s*error\.message/.test(src));
  assert.ok(src.includes("appErrorVendorProps(error)"));
});
test("funnel route accepts app_error with capped message", () => {
  const src = readFileSync("src/app/api/funnel/route.ts", "utf8");
  assert.ok(src.includes('"app_error"'));
  assert.ok(/MAX_LEN[^=]*=\s*\{\s*message:\s*200\s*\}/.test(src));
});
