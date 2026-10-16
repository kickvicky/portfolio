import Link from "next/link";
import Arrow from "@/components/icons/Arrow";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <p className="eyebrow">{"// ERROR 404"}</p>
      <h1 className="detail-title">LOST<br />PACKET.</h1>
      <p className="max-w-md font-mono text-xs font-bold uppercase">This route doesn&apos;t exist. It may have been moved or never shipped.</p>
      <Link href="/" className="brutal-button inline-flex items-center gap-3 bg-yellow px-5 py-3 font-mono text-xs font-black uppercase">
        <span className="rotate-180"><Arrow /></span> Back to home
      </Link>
    </main>
  );
}
