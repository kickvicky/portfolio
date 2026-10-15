import { Fragment } from "react";
import Arrow from "@/components/icons/Arrow";
import type { Project } from "@/data/projects";
import { accentBg } from "@/lib/theme";

export default function ArchitectureDiagram({ project }: { project: Project }) {
  return (
    <div className="architecture-board">
      <div className="architecture-grid" />
      <div className="architecture-flow">
        {project.architecture.map((label, index) => (
          <Fragment key={label}>
            <div className={`architecture-node ${accentBg[index === 1 ? project.color : "white"]}`}>
              <span className="font-mono text-[9px] font-bold">NODE_{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <span className="status-dot">LIVE</span>
            </div>
            {index < project.architecture.length - 1 && (
              <div className="architecture-arrow" aria-hidden="true">
                <span />
                <Arrow />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="architecture-caption">
        <span>SYSTEM TOPOLOGY / PRODUCTION</span>
        <span>UPTIME 99.99%</span>
      </div>
    </div>
  );
}
