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

  if (count === null) return null;

  return (
    <p className="mt-6 text-sm text-gray-400">
      <span className="text-white font-semibold">{count.toLocaleString()}</span>{" "}
      wills drafted so far
    </p>
  );
}
