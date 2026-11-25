import { Link } from "react-router";

function NoEncontrada() {
  return (
    <section className="surface-card mx-auto max-w-xl px-6 py-14 text-center">
      <span className="font-display mb-4 block text-7xl font-bold tracking-tighter text-[#198650]">404</span>
      <h2 className="font-display mb-3 text-2xl font-bold text-[#183b2a]">Página no encontrada</h2>
      <p className="mb-7 text-[#7b887e]">Parece que esta jugada salió fuera de la cancha.</p>
      <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[#198650] px-5 py-3 font-bold text-white transition hover:bg-[#126b3f]">
        Volver al inicio <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default NoEncontrada;