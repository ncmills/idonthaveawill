import { test } from "node:test";
import assert from "node:assert/strict";
import { getWillCount, type WillStatsClient } from "./logic";

// Positive control: this test must FAIL on origin/main (no `.eq("is_test", false)`
// filter, and a failed read returns `{ count: 0 }` indistinguishable from a real
// empty count) and PASS after the fix.

function fakeClient(opts: {
  eqCalls: Array<[string, boolean]>;
  count?: number | null;
  error?: { message: string } | null;
}): WillStatsClient {
  return {
    from(table: string) {
      assert.equal(table, "will_stats");
      return {
        select(_columns: string, selectOpts: { count: "exact"; head: true }) {
          assert.deepEqual(selectOpts, { count: "exact", head: true });
          return {
            eq(column: string, value: boolean) {
              opts.eqCalls.push([column, value]);
              return Promise.resolve({
                count: opts.count ?? null,
                error: opts.error ?? null,
              });
            },
          };
        },
      };
    },
  };
}

test("getWillCount filters out test rows with is_test = false", async () => {
  const eqCalls: Array<[string, boolean]> = [];
  const client = fakeClient({ eqCalls, count: 42 });

  const result = await getWillCount(client);

  assert.deepEqual(eqCalls, [["is_test", false]]);
  assert.deepEqual(result, { ok: true, count: 42 });
});

test("getWillCount reports a Supabase error as ok:false, never a disguised 0", async () => {
  const eqCalls: Array<[string, boolean]> = [];
  const client = fakeClient({
    eqCalls,
    count: null,
    error: { message: "connection reset" },
  });

  const result = await getWillCount(client);

  assert.deepEqual(result, { ok: false, error: "connection reset" });
  // The failure must never be reported as a real count of 0.
  assert.notDeepEqual(result, { ok: true, count: 0 });
});

test("getWillCount surfaces a thrown error as ok:false, never a disguised 0", async () => {
  const throwingClient: WillStatsClient = {
    from() {
      throw new Error("network down");
    },
  };

  const result = await getWillCount(throwingClient);

  assert.deepEqual(result, { ok: false, error: "network down" });
});
