import { Fragment, type CSSProperties } from "react";
import { site } from "@/lib/site";

export default function Ticker() {
  return (
    <div className="ticker-wrap -rotate-2 border-y-4 border-black bg-yellow py-4">
      <div
        className="ticker font-display text-3xl font-black uppercase md:text-5xl"
        // Seconds per item: lower = faster. 3.5 was the original speed (7 items / 24s).
        style={{ "--ticker-duration": `${site.stack.length * 2.2}s` } as CSSProperties}
      >
        {Array.from({ length: 2 }).map((_, copy) => (
          <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {site.stack.map((item) => (
              <Fragment key={item}>
                {item} <i>✦</i>{" "}
              </Fragment>
            ))}
            &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
