export default function Ticker() {
  return (
    <div className="ticker-wrap -rotate-2 border-y-4 border-black bg-[#ffea00] py-4">
      <div className="ticker font-display text-3xl font-black uppercase md:text-5xl">
        {Array.from({ length: 2 }).map((_, copy) => (
          <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            GO <i>✦</i> REACT <i>✦</i> KAFKA <i>✦</i> POSTGIS <i>✦</i> DISTRIBUTED SYSTEMS <i>✦</i>&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
