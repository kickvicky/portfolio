import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { OgCanvas, OgChip, OgWordmark, hexFromBgClass, ogContentType, ogFonts, ogSize, palette } from "@/lib/og";
import { site } from "@/lib/site";

// Per-project social preview: one PNG per slug, generated at build time from src/data/projects.ts.
export const alt = `Project case study — ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  const accent = hexFromBgClass(project.color);

  return new ImageResponse(
    (
      <OgCanvas>
        <div style={{ display: "flex", flex: 1, padding: "44px 56px 56px 44px" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              border: `5px solid ${palette.ink}`,
              background: "#fff",
              boxShadow: `14px 14px 0 ${palette.ink}`,
            }}
          >
            <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: "34px 44px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Space Mono", fontSize: 20, fontWeight: 700 }}>
                  <OgChip>CASE STUDY</OgChip>
                  <span>PROJECT_{project.number}</span>
                  <span>/</span>
                  <span>{project.year}</span>
                </div>
                <OgWordmark size={30} />
              </div>

              <div style={{ display: "flex", marginTop: 34, fontSize: 132, fontWeight: 700, lineHeight: 0.85, letterSpacing: "-0.06em" }}>
                {project.title}
              </div>

              <div style={{ display: "flex", maxWidth: 900, marginTop: 26, fontSize: 32, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                {project.description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                borderTop: `5px solid ${palette.ink}`,
                background: accent,
                padding: "20px 44px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {project.stack.slice(0, 5).map((technology) => (
                  <OgChip key={technology} background={palette.paper} color={palette.ink}>
                    {technology.toUpperCase()}
                  </OgChip>
                ))}
              </div>
              <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 20, fontWeight: 700 }}>FILE_{project.number}</div>
            </div>
          </div>
        </div>
      </OgCanvas>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
