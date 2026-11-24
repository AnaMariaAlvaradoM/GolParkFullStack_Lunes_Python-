import { Outlet } from 'react-router';
import Encabezado from './Encabezado';
import FondoCancha from './FondoCancha';
import PiePagina from './PiePagina';

export default function Layout() {
  return (
    <div className="relative isolate flex h-dvh min-h-0 flex-col overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 text-slate-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <FondoCancha tono="pagina" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Encabezado />

        <main className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>

        <PiePagina />
      </div>
    </div>
  );
}