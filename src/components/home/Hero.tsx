import Arrow from "@/components/icons/Arrow";
import Star from "@/components/icons/Star";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[820px] flex-col justify-center px-4 pb-20 pt-28 md:px-8 lg:px-14">
      <div className="page-counter absolute right-4 top-24 md:right-8 md:top-28">
        <span>PAGE</span>
        <strong>01</strong>
        <span>/ 04</span>
      </div>
      <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase">
        <span className="inline-block h-3 w-3 animate-pulse border-2 border-black bg-lime" />
        Available for ambitious builds
      </div>
      <h1 className="hero-title hero-title-long max-w-[1400px]">
        VIGNESH
        <br />
        <span className="relative inline-block">
          ANNAMALAI
          <Star className="absolute -right-20 -top-3 hidden w-16 rotate-12 text-yellow sm:block md:w-24" />
        </span>
        <span className="text-stroke"> .DEV</span>
      </h1>
      <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="brutal-button flex items-center gap-4 bg-black px-6 py-4 font-mono text-sm font-black uppercase text-white">
            View my work <Arrow />
          </a>
          <a href="#contact" className="brutal-button flex items-center gap-4 bg-lime px-6 py-4 font-mono text-sm font-black uppercase">
            Contact me <Arrow diagonal />
          </a>
        </div>
        <p className="max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight md:text-4xl">
          Software Engineer at <span className="marker">Walmart Global Tech</span> building resilient distributed systems.
        </p>
      </div>
      <div className="absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] font-bold uppercase md:flex">
        Scroll to explore <span className="flex h-10 w-7 items-center justify-center rounded-full border-2 border-black">↓</span>
      </div>
    </section>
  );
}
