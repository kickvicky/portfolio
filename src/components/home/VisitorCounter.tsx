"use client";

import { useEffect, useState } from "react";

/** Retro hit counter. Renders a placeholder until the count arrives, and nothing if counting is unavailable. */
export default function VisitorCounter() {
  // undefined = loading, null = unavailable (no Upstash configured, or Redis down)
  const [count, setCount] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/views", { method: "POST", signal: controller.signal })
      .then((response) => response.json() as Promise<{ count: number | null }>)
      .then((data) => setCount(data.count))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setCount(null);
      });
    return () => controller.abort();
  }, []);

  if (count === null) return null;

  // Same-width placeholder (monospace) so the footer doesn't shift when the number loads.
  return <span>VISITOR #{count === undefined ? "------" : String(count).padStart(6, "0")}</span>;
}
