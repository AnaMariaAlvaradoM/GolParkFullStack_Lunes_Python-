import { Link } from 'react-router';

export default function NoEncontrada() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-emerald-900/10 bg-white p-8 text-center shadow-lg shadow-emerald-950/5 sm:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Error 404</p>
      <h2 className="mt-3 text-3xl font-black text-slate-900">Página no encontrada</h2>
      <p className="mt-3 text-slate-600">Parece que este turno se fue fuera de la cancha.</p>
      <Link
        to="/"
        className="mt-7 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/25"
      >
        Volver al inicio
      </Link>
    </section>
  );
}