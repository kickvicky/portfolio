import type { ProjectArtType } from "@/data/projects";

export default function ProjectArt({ type }: { type: ProjectArtType }) {
  if (type === "map") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="absolute inset-0 wire-grid" />
        <svg viewBox="0 0 400 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-20 160 C60 80 85 205 165 120 S285 20 430 90" fill="none" stroke="black" strokeWidth="5" />
          <path d="M40 0 C110 55 88 100 150 140 S255 190 350 125" fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="165" cy="120" r="13" className="fill-pink" stroke="black" strokeWidth="4" />
          <circle cx="303" cy="52" r="9" className="fill-yellow" stroke="black" strokeWidth="4" />
          <circle cx="74" cy="126" r="8" className="fill-lime" stroke="black" strokeWidth="4" />
        </svg>
        <span className="absolute right-3 top-3 border-2 border-black bg-black px-2 py-1 font-mono text-[10px] text-white">
          37.7749° N
        </span>
      </div>
    );
  }
  if (type === "stream") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-charcoal">
        <div className="flex w-[85%] items-center gap-2">
          {[20, 50, 32, 72, 43].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col gap-2">
              <div className="border-2 border-white bg-yellow p-2 font-mono text-[9px]">TOPIC_{index + 1}</div>
              <div className="border-2 border-white bg-white" style={{ height }} />
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-pink" />
      </div>
    );
  }
  return (
    <div className="relative grid h-full w-full grid-cols-5 gap-2 overflow-hidden bg-white p-5 wire-grid">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <div
          key={item}
          className={`border-2 border-black ${item === 3 || item === 7 ? "bg-lime" : "bg-white"}`}
        />
      ))}
      <div className="absolute bottom-3 right-3 border-2 border-black bg-pink px-3 py-1 font-mono text-xs font-bold">
        HIT 98.7%
      </div>
    </div>
  );
}
