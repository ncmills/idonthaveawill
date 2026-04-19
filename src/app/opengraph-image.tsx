import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "idonthaveawill.com — A free tool to help you draft a simple will";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          <span>idonthaveawill<span style={{ color: "#7a8a6f", fontFamily: "Georgia, serif", fontSize: "26px", fontWeight: 700 }}>.</span>com</span>
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
            marginTop: "48px",
          }}
        >
          <div
            style={{
              fontSize: "108px",
              color: "#1a1815",
              lineHeight: 1.04,
              letterSpacing: "-2px",
              fontWeight: 600,
            }}
          >
            You Don&apos;t Have a Will.
          </div>
          <div
            style={{
              fontSize: "108px",
              color: "#1a1815",
              lineHeight: 1.04,
              letterSpacing: "-2px",
              fontStyle: "italic",
              fontWeight: 500,
              marginTop: "4px",
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
