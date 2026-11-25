import { Outlet } from "react-router";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col text-[#17231d]">
      <Encabezado />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;