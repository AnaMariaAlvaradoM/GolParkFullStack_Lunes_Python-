import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center rounded-[2rem] bg-amber-400 px-8 py-14 text-center text-amber-950 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <p className="font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.35em]">Tarjeta amarilla</p>
      <p className="mt-2 font-[family-name:Oswald,sans-serif] text-7xl leading-none">OFFSIDE</p>
      <h2 className="mt-4 font-[family-name:Oswald,sans-serif] text-3xl uppercase">Página no encontrada</h2>
      <Link
        to="/"
        className="mt-8 rounded-full bg-emerald-950 px-6 py-3 font-[family-name:Oswald,sans-serif] uppercase tracking-wider text-amber-300"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
