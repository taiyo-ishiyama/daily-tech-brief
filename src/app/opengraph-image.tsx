import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0a0b10",
          color: "#e8e8ed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#6366f1",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "28px", fontWeight: 600 }}>{SITE_NAME}</span>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.2,
          }}
        >
          The Intelligence Brief.
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#9ca3af",
            marginTop: "16px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          AI-curated summaries of the most significant tech developments.
        </div>
      </div>
    ),
    { ...size }
  );
}
