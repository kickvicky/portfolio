import type { ProjectArtType } from "@/data/projects";

export default function ProjectArt({ type }: { type: ProjectArtType }) {
  // RADIUS: a map with a highlighted search radius around one point.
  if (type === "map") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="absolute inset-0 wire-grid" />
        <svg viewBox="0 0 400 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-20 160 C60 80 85 205 165 120 S285 20 430 90" fill="none" stroke="black" strokeWidth="5" />
          <path d="M40 0 C110 55 88 100 150 140 S255 190 350 125" fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="165" cy="120" r="62" className="fill-lime/40" stroke="black" strokeWidth="3" strokeDasharray="6 6" />
          <circle cx="165" cy="120" r="13" className="fill-pink" stroke="black" strokeWidth="4" />
          <circle cx="303" cy="52" r="9" className="fill-yellow" stroke="black" strokeWidth="4" />
          <circle cx="120" cy="150" r="8" className="fill-yellow" stroke="black" strokeWidth="4" />
          <circle cx="205" cy="82" r="8" className="fill-yellow" stroke="black" strokeWidth="4" />
        </svg>
        <span className="absolute right-3 top-3 border-2 border-black bg-black px-2 py-1 font-mono text-[10px] text-white">
          ST_DWITHIN()
        </span>
      </div>
    );
  }

  // CCTV//LOG: a wall of camera feeds, one with a detected subject.
  if (type === "vision") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-charcoal p-4">
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
          {[0, 1, 2, 3].map((feed) => (
            <div key={feed} className="relative border-2 border-white bg-ink">
              <div className="absolute inset-0 opacity-30 wire-grid" />
              <span className="absolute left-1.5 top-1.5 font-mono text-[9px] font-bold text-white/70">CAM_0{feed + 1}</span>
              {feed === 1 && (
                <div className="absolute bottom-[14%] left-[38%] h-[58%] w-[26%] border-[3px] border-pink">
                  <span className="absolute -top-[18px] left-[-3px] bg-pink px-1 font-mono text-[8px] font-bold text-black">SUBJECT_01</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="absolute bottom-3 right-3 border-2 border-black bg-yellow px-2 py-1 font-mono text-[10px] font-bold text-black">
          ● REC 00:42:17
        </span>
      </div>
    );
  }

  // FLEET//TRACK: a site perimeter with vehicles inside and one outside the line.
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <div className="absolute inset-0 wire-grid" />
      <svg viewBox="0 0 400 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points="60,40 250,22 335,95 290,180 110,170 40,110" className="fill-lime/40" stroke="black" strokeWidth="5" strokeLinejoin="round" />
        {[
          [110, 80],
          [190, 60],
          [235, 125],
          [140, 130],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 10} y={y - 10} width="20" height="20" className="fill-yellow" stroke="black" strokeWidth="3" />
        ))}
        <rect x="350" y="150" width="20" height="20" className="fill-pink" stroke="black" strokeWidth="3" />
        <path d="M335 140 L352 155" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      <span className="absolute right-3 top-3 border-2 border-black bg-black px-2 py-1 font-mono text-[10px] text-white">
        POINT-IN-POLYGON
      </span>
      <span className="absolute bottom-3 left-3 border-2 border-black bg-pink px-2 py-1 font-mono text-[10px] font-bold">
        4 IN / 1 OUT
      </span>
    </div>
  );
}
