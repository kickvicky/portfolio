export default function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 ${diagonal ? "-rotate-45" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}
