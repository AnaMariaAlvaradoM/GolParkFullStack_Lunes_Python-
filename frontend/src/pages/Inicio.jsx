import { Link } from "react-router"

function Inicio() {
    return (
        <section className="mx-auto max-w-xl py-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Reserva tu cancha en segundos</h2>
            <p className="mb-6 text-slate-600">
                Mira los turnos que tenemos y apartalo.
            </p>
            <Link
                to="/turnos"
                className="rounded-md bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700"
            >
                Ver los turnos
            </Link>
        </section>   
    );
}

export default Inicio;
