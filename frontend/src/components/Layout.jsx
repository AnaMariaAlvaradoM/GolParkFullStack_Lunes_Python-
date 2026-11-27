import { Outlet } from "react-router";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink font-sans text-paper">
      <Encabezado />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;