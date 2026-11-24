export default function IconoFutbol({ className = 'text-3xl' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 72 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block h-[1em] w-[1.5em] shrink-0 ${className}`}
    >
      <rect x="2" y="2" width="68" height="44" rx="3" />
      <path d="M36 2v44M2 14h11v20H2m68-20H59v20h11" />
      <path d="M2 18h5v12H2m68-12h-5v12h5" />
      <circle cx="36" cy="24" r="7" />
      <circle cx="36" cy="24" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
