/**
 * Minimal shape of the Supabase client this route needs, so the query logic
 * can be unit-tested with a fake client instead of a live Supabase project.
 */
export type WillStatsClient = {
  from(table: string): {
    select(
      columns: string,
      opts: { count: "exact"; head: true }
    ): {
      eq(
        column: string,
        value: boolean
      ): PromiseLike<{ count: number | null; error: { message: string } | null }>;
    };
  };
};

export type WillCountResult = { ok: true; count: number } | { ok: false; error: string };

/** Real, non-test wills only — `is_test` rows are harness/e2e traffic. */
export async function getWillCount(client: WillStatsClient): Promise<WillCountResult> {
  try {
    const { count, error } = await client
      .from("will_stats")
      .select("*", { count: "exact", head: true })
      .eq("is_test", false);

    if (error) {
      console.error("[stats/count] error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true, count: count ?? 0 };
  } catch (error) {
    console.error("[stats/count] error:", error);
    return { ok: false, error: error instanceof Error ? error.message : "unknown error" };
  }
}
