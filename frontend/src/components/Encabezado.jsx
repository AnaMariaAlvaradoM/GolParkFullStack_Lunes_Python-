export default function Encabezado() {
  return (
    <header className="border-b border-lime-400/30 bg-slate-950 px-4 py-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="text-4xl" aria-hidden="true">⚽</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-lime-400">GolPark</h1>
      </div>
      <p className="mt-2 text-slate-300">Reserva tu cancha de fútbol 5</p>
    </header>
  );
}
