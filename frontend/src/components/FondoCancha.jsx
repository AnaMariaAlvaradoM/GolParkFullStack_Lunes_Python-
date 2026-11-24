export default function FondoCancha({ tono = 'tarjeta' }) {
  const estilo = tono === 'pagina'
    ? 'text-emerald-900 opacity-[0.07]'
    : 'text-emerald-900 opacity-[0.1]';

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${estilo}`}
    >
      <rect x="10" y="10" width="380" height="220" rx="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="10" x2="200" y2="230" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="120" r="32" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="120" r="3" fill="currentColor" />
      <path d="M10 58h62v124H10M390 58h-62v124h62" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 84h28v72H10M390 84h-28v72h28" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
