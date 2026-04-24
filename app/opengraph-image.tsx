import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spectra capabilities microsite preview";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0b1320",
          color: "#eaeaea",
          fontFamily: "Inter, Arial, sans-serif",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 54,
            left: 60,
            display: "flex",
            gap: 20,
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(234,234,234,0.55)"
          }}
        >
          <span>Capabilities Deck</span>
          <span>Rev. 2026.04</span>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "120px 64px 72px",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 28
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  border: "2px solid rgba(234,234,234,0.86)",
                  position: "relative"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 6,
                    height: 6,
                    right: -2,
                    top: -3,
                    borderRadius: 999,
                    background: "#e87e4a"
                  }}
                />
              </div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>SPECTRA</div>
            </div>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                maxWidth: 700
              }}
            >
              Nearshore operations, built for real estate & PropTech.
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.45,
                color: "rgba(234,234,234,0.76)",
                maxWidth: 620
              }}
            >
              Operational, accounting, and platform support for DACH and US real estate operators.
            </div>
          </div>
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: "1px solid rgba(234,234,234,0.12)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 36,
                borderRadius: "50%",
                border: "1px solid rgba(234,234,234,0.08)"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 210,
                height: 1,
                background: "rgba(234,234,234,0.14)"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 1,
                height: 220,
                background: "rgba(234,234,234,0.14)"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 138,
                top: 188,
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#eaeaea"
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 118,
                top: 120,
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#eaeaea"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 176,
                bottom: 112,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#e87e4a",
                boxShadow: "0 0 0 10px rgba(232,126,74,0.12)"
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
