import { getNetworkSites } from "@/lib/network-sites";

/**
 * Small, low-contrast cross-site footer.
 * Visible to users and crawlers. Intentionally understated.
 *
 * Uses light-theme colors to match idonthaveawill.com's design.
 * Do NOT use rel="nofollow" — we want to pass link equity across the network.
 */
export function NetworkFooter({ currentDomain }: { currentDomain: string }) {
  const sites = getNetworkSites(currentDomain);
  if (sites.length === 0) return null;
  return (
    <div
      aria-label="Sister sites"
      style={{
        marginTop: "1rem",
        paddingTop: "0.75rem",
        borderTop: "1px solid rgba(0,0,0,0.04)",
        fontSize: "10px",
        lineHeight: 1.6,
        color: "rgba(0,0,0,0.25)",
        textAlign: "center",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ marginRight: "0.4em" }}>From our network:</span>
      {sites.map((s, i) => (
        <span key={s.domain}>
          {i > 0 && <span style={{ opacity: 0.4 }}> · </span>}
          <a
            href={`https://${s.domain}`}
            title={s.tagline}
            rel="noopener"
            style={{ color: "rgba(0,0,0,0.3)", textDecoration: "none" }}
          >
            {s.label}
          </a>
        </span>
      ))}
    </div>
  );
}
