// TypeScript mirror of the `@theme` colour tokens in src/app/globals.css — keep the two in sync.
// Only needed where CSS can't reach: OG images (Satori renders inline styles only) and the
// `themeColor` viewport meta tag. Everywhere else, use the Tailwind classes (`bg-yellow`, `text-pink`, …).
export const colors = {
  ink: "#090909",
  paper: "#f8f5ec",
  charcoal: "#111111",
  yellow: "#ffea00",
  lime: "#b8ff69",
  pink: "#ff4fa3",
  white: "#ffffff",
} as const;

/** Colours content entries (projects, roles, hobbies) can use as their highlight. */
export type Accent = "yellow" | "lime" | "pink" | "white";

// Full class names are spelled out on purpose: Tailwind finds classes by scanning source text,
// so a template like `bg-${accent}` would never be generated.
export const accentBg: Record<Accent, string> = {
  yellow: "bg-yellow",
  lime: "bg-lime",
  pink: "bg-pink",
  white: "bg-white",
};
