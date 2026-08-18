/**
 * The idonthaveawill mark — "I."
 *
 * The brand name is a sentence someone says about themselves. The mark is that
 * sentence compressed to its first word and its full stop: a letterpress slab
 * serif capital I, and the oversized sage period the wordmark already ends on.
 *
 * Why not a document, a folded page, a seal, a gavel or scales: those are the
 * category's stock icons, they say "legal" rather than "this site", and the
 * folded-page outline this replaces was invisible on a dark browser tab. A
 * letterform carries mass, so it survives 16px, which is the size a favicon
 * actually renders at.
 *
 * Two shapes and one dot, one fill each. Drawn as paths, never as <text>, so
 * the mark is identical in the browser tab, in the Satori-rendered OG card and
 * on an iOS home screen — none of which can load Lora.
 *
 * Kept in sync by hand with `public/icon.svg`, `public/apple-touch-icon` and
 * `src/app/opengraph-image.tsx`. Any change to the geometry or the palette
 * must update all of them in the SAME commit.
 */

type MarkProps = {
  /** px size of the square plate. Default 32. */
  size?: number;
  /**
   * `plate` — cream letterform on the sage plate (default; the tab icon).
   * `mono` — single-color letterform, no plate, inherits `currentColor`.
   */
  variant?: "plate" | "mono";
  className?: string;
  title?: string;
};

export function Mark({
  size = 32,
  variant = "plate",
  className,
  title = "idonthaveawill.com",
}: MarkProps) {
  const plate = variant === "plate";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
    >
      {plate ? <rect width="32" height="32" rx="7.5" fill="var(--color-sage, #7a8a6f)" /> : null}
      <g fill={plate ? "var(--color-cream, #f8f3ea)" : "currentColor"}>
        {/* The I, as three slabs: top serif, stem, foot serif. */}
        <rect x="8.2" y="8.5" width="10.8" height="2.8" rx="0.7" />
        <rect x="12.1" y="8.5" width="3" height="15" />
        <rect x="8.2" y="20.7" width="10.8" height="2.8" rx="0.7" />
        {/* The full stop. The same period the wordmark ends on. */}
        <circle cx="23.5" cy="21.6" r="2.35" />
      </g>
    </svg>
  );
}

/**
 * Mark + wordmark. The wordmark stays live Lora text rather than an SVG of
 * Lora, so it reflows, inherits color and copy-pastes as
 * "idonthaveawill.com" — a wordmark that pastes as "idonthaveawill com" is a
 * bug, not a flourish.
 */
export function Wordmark({
  size = 22,
  markSize = 26,
  className = "",
}: {
  size?: number;
  markSize?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={markSize} />
      <span
        className="font-[family-name:var(--font-display)] font-medium text-[var(--color-ink)] tracking-[-0.01em] leading-none"
        style={{ fontSize: `${size}px` }}
      >
        idonthaveawill
        <span
          className="inline-block text-[var(--color-sage)] font-semibold"
          style={{ fontSize: "1.3em", lineHeight: 0, verticalAlign: "baseline" }}
          aria-hidden="true"
        >
          .
        </span>
        <span className="sr-only">.</span>
        com
      </span>
    </span>
  );
}
