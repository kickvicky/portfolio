import { ImageResponse } from "next/og";
import { OgCanvas, OgChip, OgWordmark, ogContentType, ogFonts, ogSize, palette } from "@/lib/og";
import { site } from "@/lib/site";

// Default social preview for the home page (and any route without its own opengraph-image).
export const alt = `${site.name} — Backend Engineer building distributed systems`;
export const size = ogSize;
export const contentType = ogContentType;

const stack = ["GO", "REACT", "KAFKA", "POSTGIS", "DISTRIBUTED SYSTEMS"];

export default async function Image() {
  return new ImageResponse(
    (
      <OgCanvas>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: "52px 64px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <OgWordmark />
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Space Mono", fontSize: 20, fontWeight: 700 }}>
              <div style={{ display: "flex", width: 18, height: 18, border: `3px solid ${palette.ink}`, background: palette.lime }} />
              AVAILABLE FOR AMBITIOUS BUILDS
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 54,
              fontSize: 148,
              fontWeight: 700,
              lineHeight: 0.8,
              letterSpacing: "-0.07em",
            }}
          >
            <div style={{ display: "flex" }}>VIGNESH</div>
            <div style={{ display: "flex" }}>
              ANNAMALAI<span style={{ color: palette.pink }}>.DEV</span>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: 40, fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Backend Engineer at
            <span style={{ display: "flex", margin: "0 12px", padding: "0 8px", background: palette.yellow }}>Walmart Global Tech</span>
            building distributed systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `5px solid ${palette.ink}`,
            background: palette.yellow,
            padding: "22px 64px",
            fontFamily: "Space Mono",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", gap: 18 }}>
            {stack.map((item, index) => (
              <div key={item} style={{ display: "flex", gap: 18 }}>
                {index > 0 && <span style={{ color: palette.pink }}>//</span>}
                {item}
              </div>
            ))}
          </div>
          <OgChip>PORTFOLIO</OgChip>
        </div>
      </OgCanvas>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
