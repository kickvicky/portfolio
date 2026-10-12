import SectionHeading from "@/components/home/SectionHeading";
import { roles } from "@/data/roles";

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading number="01" eyebrow="// SELECTED STOPS">
        THE ROUTE<br />SO FAR.
      </SectionHeading>

      <div className="timeline mx-auto mt-16 max-w-5xl">
        {roles.map((role, index) => (
          <article key={role.date} className="timeline-row">
            <div className="timeline-date">{role.date}</div>
            <div className={`timeline-node ${role.color}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="brutal-card timeline-card">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3>{role.title}</h3>
                  <p className="font-mono text-xs font-bold">{role.company}</p>
                </div>
                {index === 0 && (
                  <span className="border-2 border-black bg-[#b8ff69] px-2 py-1 font-mono text-[10px] font-bold">CURRENT</span>
                )}
              </div>
              <p className="max-w-2xl text-lg font-medium leading-snug">{role.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
