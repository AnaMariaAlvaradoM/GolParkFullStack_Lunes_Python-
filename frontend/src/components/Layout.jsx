import { Outlet } from "react-router";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";

function Layout() {
  return (
    <div className="min-h-screen bg-[#04150c] font-[family-name:Barlow,sans-serif] text-white [background-image:linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),radial-gradient(circle_at_top,#1b7a3a_0%,#062214_48%,#03140c_100%)] [background-size:96px_96px,96px_96px,auto]">
      <Encabezado />
      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;
