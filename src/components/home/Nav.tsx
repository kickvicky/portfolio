export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b-4 border-black bg-[#f8f5ec] px-4 md:px-8">
      <a href="#top" className="font-display text-xl font-black tracking-[-0.06em]">
        VA<span className="text-[#ff4fa3]">.</span>DEV
      </a>
      <div className="hidden items-center gap-8 font-mono text-xs font-bold uppercase md:flex">
        <a className="nav-link" href="#experience">01 / Experience</a>
        <a className="nav-link" href="#projects">02 / Projects</a>
        <a className="nav-link" href="#about">03 / Off-duty</a>
      </div>
      <a href="#contact" className="brutal-button bg-[#ffea00] px-4 py-2 font-mono text-xs font-black uppercase">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}
