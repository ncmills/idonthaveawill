import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FUNNEL_EVENT_NAMES, POSTHOG_ONLY_EVENT_NAMES } from "../tracking-events";

const src = readFileSync("src/lib/tracking.ts", "utf8");

test("every new event name exists in tracking.ts", () => {
  for (const name of POSTHOG_ONLY_EVENT_NAMES) assert.ok(src.includes(`"${name}"`), name);
  for (const name of FUNNEL_EVENT_NAMES) assert.ok(src.includes(`"${name}"`), name);
});
test("new events are PostHog-only and not in the funnel list", () => {
  for (const name of POSTHOG_ONLY_EVENT_NAMES) assert.ok(!(FUNNEL_EVENT_NAMES as readonly string[]).includes(name));
});
