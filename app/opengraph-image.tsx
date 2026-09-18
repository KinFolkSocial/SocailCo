import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";

export const alt = `${brand.name} — Event Planning Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#0E0B0A",
          color: "#F6F1E8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#E2A03F", textTransform: "uppercase" }}>
          {brand.markets.primary}
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, marginTop: 24, lineHeight: 1, textTransform: "uppercase" }}>
          {brand.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 32, color: "#a89f97", maxWidth: 900 }}>
          {brand.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
