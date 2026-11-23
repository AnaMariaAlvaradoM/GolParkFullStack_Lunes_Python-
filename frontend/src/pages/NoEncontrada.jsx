import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">
        La ruta a la que intentas acceder no existe o fue movida.
      </p>
      <Link
        to="/"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
