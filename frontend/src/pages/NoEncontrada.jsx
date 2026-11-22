import { Link } from "react-router";

function NoEncontrada() {
  return (
    <section className="py-10 text-center">
      <h2 className="mb-3 text-2xl font-bold">
        Página no encontrada
      </h2>

      <Link
        to="/"
        className="font-bold text-orange-700 underline"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrada;