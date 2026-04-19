"use client";

import { useEffect, useState } from "react";

export default function WillCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats/count")
      .then((r) => r.json())
      .then((data) => {
        if (data.count > 0) setCount(data.count);
      })
      .catch(() => {});
  }, []);

  if (count === null) {
    return <p className="mt-8 text-sm h-5" aria-hidden="true" />;
  }

  return (
    <p className="mt-8 text-[13px] text-[var(--color-ink-soft)]">
      <span className="font-[family-name:var(--font-display)] italic text-[var(--color-ink)] text-[15px]">
        {count.toLocaleString()}
      </span>{" "}
      wills drafted so far
    </p>
  );
}
