import { getNetworkSites } from "@/lib/network-sites";

/**
 * The cross-site strip — the other free legal tools from the same desk.
 *
 * Two things changed on 2026-08-18 and both were defects, not preferences:
 *
 * 1. The descriptor sat in a `title=` attribute. A tooltip is not anchor text,
 *    so the anchor read "AISSDI" and said nothing about what AISSDI is. It is
 *    inside the <a> now.
 * 2. It rendered at 10px on `rgba(0,0,0,0.25)` over cream — roughly 2.3:1
 *    against the 4.5:1 floor. "Understated" is the brief; a link the reader
 *    cannot read is not understated, it is hidden, and a hidden cross-site link
 *    is the exact thing the visible-network rule exists to prevent.
 *
 * dofollow on purpose — do NOT add rel="nofollow".
 */
export function NetworkFooter({ currentDomain }: { currentDomain: string }) {
  const sites = getNetworkSites(currentDomain);
  if (sites.length === 0) return null;
  return (
    <nav aria-label="Sister sites">
      <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-sage-deep)]">
        Also free, from the same desk
      </p>
      <ul className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-8">
        {sites.map((s) => (
          <li key={s.domain}>
            <a
              href={`https://${s.domain}`}
              rel="noopener"
              className="inline-flex min-h-[44px] items-center text-[13px] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              <span className="font-[family-name:var(--font-display)] text-[15px] text-[var(--color-ink)]">
                {s.label}
              </span>
              <span>&nbsp;— {s.tagline}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
