import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "idonthaveawill.com — A free tool to help you draft a simple will";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The "I." mark, byte-identical in geometry to src/app/icon.svg and
// src/components/shared/Brand.tsx. Inlined because Satori renders this card on
// the edge with no filesystem and no stylesheet.
const MARK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="44" height="44">' +
      '<rect width="32" height="32" rx="7.5" fill="#7a8a6f"/>' +
      '<g fill="#f8f3ea">' +
      '<rect x="8.2" y="8.5" width="10.8" height="2.8" rx="0.7"/>' +
      '<rect x="12.1" y="8.5" width="3" height="15"/>' +
      '<rect x="8.2" y="20.7" width="10.8" height="2.8" rx="0.7"/>' +
      '<circle cx="23.5" cy="21.6" r="2.35"/>' +
      "</g></svg>",
  );

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8f3ea",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: "Georgia, 'Iowan Old Style', serif",
          position: "relative",
        }}
      >
        {/* Top editorial rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#5a544d",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <img width={44} height={44} src={MARK} alt="" />
          {/* One size, one baseline. The oversized Georgia period the header
              uses does not survive Satori — it dropped below the baseline and
              opened a gap mid-word. The mark beside it already carries the
              full stop. */}
          <span>idonthaveawill<span style={{ color: "#7a8a6f" }}>.</span>com</span>
          <div style={{ flex: 1, height: "1px", background: "#d9d1be" }} />
          <span>Vol. I · Plain Language</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: "84px",
              color: "#1a1815",
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
              fontWeight: 600,
            }}
          >
            You Don&apos;t Have a Will.
          </div>
          <div
            style={{
              fontSize: "84px",
              color: "#1a1815",
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
              fontStyle: "italic",
              fontWeight: 500,
              marginTop: "2px",
            }}
          >
            Let&apos;s Fix That.
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#5a544d",
              marginTop: "48px",
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
            }}
          >
            A free tool. Drafts prepared for all fifty states.
          </div>
        </div>

        {/* Bottom rule + stats line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#5a544d",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            marginTop: "32px",
          }}
        >
          <span>100% Free</span>
          <span style={{ color: "#d9d1be" }}>·</span>
          <span>Ten Minutes</span>
          <span style={{ color: "#d9d1be" }}>·</span>
          <span>No Account</span>
          <div style={{ flex: 1, height: "1px", background: "#d9d1be" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
