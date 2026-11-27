import { Outlet } from "react-router";
import Encabezado from "./Encabezado.jsx";
import PiePagina from "./PiePagina.jsx";

function Layout() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <Encabezado />
            <main className="p-6">
                <Outlet />
            </main>
            <PiePagina />
        </div>
    );
}

export default Layout;