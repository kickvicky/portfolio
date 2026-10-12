import type { ReactNode } from "react";

type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  children: ReactNode;
  numberClassName?: string;
};

export default function SectionHeading({ number, eyebrow, children, numberClassName = "" }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className={`section-number ${numberClassName}`}>{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{children}</h2>
      </div>
    </header>
  );
}
