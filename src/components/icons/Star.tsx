export default function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d="M50 2 59 34 87 17 67 42 99 50 67 59 86 84 59 67 50 99 41 67 15 84 33 59 1 50 33 42 14 17 41 34Z"
        fill="currentColor"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
}
