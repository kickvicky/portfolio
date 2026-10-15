import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import { colors } from "@/lib/theme";

// Shared building blocks for the generated social preview images (opengraph-image.tsx files).
// ImageResponse renders with Satori: inline styles only (no Tailwind / globals.css), flexbox layout,
// and every element with more than one child needs an explicit `display: "flex"`.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori needs raw font files (ttf/otf/woff — not woff2). Read once per build, at module scope.
const fontDir = join(process.cwd(), "src/assets/fonts");
const fontFiles = Promise.all([
  readFile(join(fontDir, "space-grotesk-latin-700-normal.woff")),
  readFile(join(fontDir, "space-mono-latin-400-normal.woff")),
  readFile(join(fontDir, "space-mono-latin-700-normal.woff")),
]);

export async function ogFonts() {
  const [groteskBold, monoRegular, monoBold] = await fontFiles;
  return [
    { name: "Space Grotesk", data: groteskBold, weight: 700 as const, style: "normal" as const },
    { name: "Space Mono", data: monoRegular, weight: 400 as const, style: "normal" as const },
    { name: "Space Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
  ];
}

/** Cream page with the site's faint graph-paper grid. */
export function OgCanvas({ children, background = colors.paper }: { children: ReactNode; background?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background,
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.085) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.085) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        color: colors.ink,
        fontFamily: "Space Grotesk",
      }}
    >
      {children}
    </div>
  );
}

/** Black monospace label chip, e.g. "CASE STUDY". */
export function OgChip({ children, background = colors.ink, color = colors.white }: { children: ReactNode; background?: string; color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        border: `3px solid ${colors.ink}`,
        background,
        color,
        padding: "6px 14px",
        fontFamily: "Space Mono",
        fontSize: 20,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

/** The "VA.DEV" wordmark from the nav. */
export function OgWordmark({ size = 34 }: { size?: number }) {
  return (
    <div style={{ display: "flex", fontSize: size, fontWeight: 700, letterSpacing: "-0.06em" }}>
      VA<span style={{ color: colors.pink }}>.</span>DEV
    </div>
  );
}
