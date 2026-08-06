import { ImageResponse } from "next/og";
import { profile } from "@/lib/content/profile";
import { proofStats } from "@/lib/content/proof-stats";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const stats = proofStats.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#71717a",
            marginBottom: 24,
          }}
        >
          {profile.targetCompany} · {profile.targetRole}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {profile.headline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1a1",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {profile.subhead}
        </div>

        <div style={{ display: "flex", gap: 48, marginTop: 56 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#fafafa",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: "#71717a",
                  marginTop: 6,
                  maxWidth: 220,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
