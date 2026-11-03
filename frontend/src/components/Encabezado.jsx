function Encabezado() {
  return (
    <header className="flex flex-col gap-3 bg-green-900 px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-wide">
          GolPark
        </h1>

        <p className="mt-1 text-sm text-green-200">
          Reserva tu cancha y disfruta el partido.
        </p>
      </div>

      <p className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold">Mis reservas: <span id="contador">0</span></p>
    </header>
  );
}

export default Encabezado;