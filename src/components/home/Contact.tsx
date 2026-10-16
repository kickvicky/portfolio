import ContactForm from "@/components/contact/ContactForm";
import VisitorCounter from "@/components/home/VisitorCounter";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="border-t-4 border-black bg-pink px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-center font-mono text-xs font-black uppercase">// Connection request pending</p>
        <h2 className="mb-12 text-center font-display text-5xl font-black leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-9xl">
          SAY HELLO.
        </h2>
        <div className="os-window">
          <div className="os-bar">
            <span className="font-mono text-xs font-black">NEW_MESSAGE.EXE</span>
            <div className="flex gap-2" aria-hidden="true">
              <button type="button" tabIndex={-1}>_</button>
              <button type="button" tabIndex={-1}>□</button>
              <button type="button" tabIndex={-1} className="bg-yellow">×</button>
            </div>
          </div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border-b-4 border-black bg-charcoal p-7 text-white lg:border-b-0 lg:border-r-4">
              <p className="font-display text-3xl font-black leading-none">
                LET&apos;S BUILD<br />SOMETHING<br /><span className="text-lime">SOLID.</span>
              </p>
              <p className="mt-6 max-w-xs font-mono text-xs leading-relaxed text-white/70">
                Have a hard systems problem, an interesting role, or a very specific coffee recommendation?
              </p>
              <div className="mt-12 space-y-3 font-mono text-xs font-bold">
                <a href={site.socials.github} target="_blank" rel="noreferrer" className="social-link">GITHUB ↗</a>
                <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="social-link">LINKEDIN ↗</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
        <footer className="mt-10 flex flex-col justify-between gap-4 border-t-2 border-black pt-5 font-mono text-[10px] font-bold uppercase sm:flex-row">
          {/* Server Component on a static page: the year is fixed at build time (refreshes on each deploy). */}
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed with intent / Built with caffeine</span>
          <VisitorCounter />
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
