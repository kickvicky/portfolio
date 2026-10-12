import Image from "next/image";
import SectionHeading from "@/components/home/SectionHeading";
import Star from "@/components/icons/Star";
import { hobbies, type Hobby } from "@/data/hobbies";

function HobbyPhoto({ hobby }: { hobby: Hobby }) {
  return (
    <>
      <Image src={hobby.src} alt={hobby.alt} fill sizes={hobby.sizes} />
      <div className={`photo-label ${hobby.labelColor}`}>{hobby.label}</div>
    </>
  );
}

export default function OffDuty() {

  return (
    <section id="about" className="section-shell">
      <SectionHeading number="02" eyebrow="// WHEN I'M OFFLINE" numberClassName="bg-[#ff4fa3]">
        OUTSIDE<br />THE TERMINAL.
      </SectionHeading>

      <div className="bento mt-14">
        <article className="bento-climb">
          <HobbyPhoto hobby={hobbies.climb} />
          <Star className="absolute right-3 top-3 z-10 w-20 rotate-12 text-[#b8ff69] drop-shadow-[4px_4px_0_#090909] md:w-24" />
        </article>
        <article className="bento-note bg-[#b8ff69]">
          <p className="eyebrow">// BETA LOG</p>
          <strong>V6</strong>
          <p className="font-mono text-xs font-bold uppercase">Current project grade</p>
          <div className="mt-auto barcode" />
        </article>
        <article className="bento-mount">
          <HobbyPhoto hobby={hobbies.mount} />
        </article>
        <article className="bento-surf">
          <HobbyPhoto hobby={hobbies.surf} />
        </article>
        <article className="bento-run">
          <HobbyPhoto hobby={hobbies.run} />
        </article>
        <article className="bento-ski">
          <HobbyPhoto hobby={hobbies.ski} />
          <div className="absolute right-4 top-4 rotate-6 border-2 border-black bg-[#b8ff69] p-2 font-mono text-[10px] font-bold">
            POWDER<br />HUNTER
          </div>
        </article>
      </div>
    </section>
  );
}
