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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            You Don&apos;t Have a Will.
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#16a34a",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Let&apos;s Fix That.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              textAlign: "center",
              marginTop: "16px",
              lineHeight: 1.4,
            }}
          >
            Free. 10 minutes. All 50 states + DC. No account needed.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#64748b",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            idonthaveawill.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
