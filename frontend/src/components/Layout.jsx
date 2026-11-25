import { Outlet } from "react-router";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f2] text-[#1f2a24]">
      <Encabezado />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;