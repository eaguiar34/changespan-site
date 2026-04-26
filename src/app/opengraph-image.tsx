import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#0B1220",
          color: "white",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "white",
              color: "#0B1220",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "24px",
            }}
          >
            FF
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700 }}>ChangeSpan</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "56px", fontWeight: 800, lineHeight: 1.1 }}>
            Project controls that stays practical.
          </div>
          <div style={{ fontSize: "26px", opacity: 0.9, maxWidth: "980px" }}>
            Desktop software for CPM scheduling, RFIs, submittals, and time-phased reporting.
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", fontSize: "18px", opacity: 0.85 }}>
          <div style={{ padding: "10px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)" }}>
            CPM Scheduling
          </div>
          <div style={{ padding: "10px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)" }}>
            RFIs + Impact
          </div>
          <div style={{ padding: "10px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)" }}>
            Submittals
          </div>
          <div style={{ padding: "10px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)" }}>
            Curves
          </div>
        </div>
      </div>
    ),
    size
  );
}