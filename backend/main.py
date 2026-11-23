from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from modelos import ReservaCreate
import datos

app = FastAPI(title="GolPark API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/turnos")
def listar_turnos():
    return datos.turnos


@app.get("/turnos/{turno_id}")
def obtener_turno(turno_id: int):
    for turno in datos.turnos:
        if turno["id"] == turno_id:
            return turno
    raise HTTPException(status_code=404, detail="Ese turno no existe.")


@app.get("/reservas")
def listar_reservas():
    return datos.reservas


@app.post("/reservas", status_code=status.HTTP_201_CREATED)
def crear_reserva(reserva_in: ReservaCreate):
    turno = None
    for t in datos.turnos:
        if t["id"] == reserva_in.turno_id:
            turno = t
            break

    if turno is None:
        raise HTTPException(status_code=404, detail="Ese turno no existe.")

    if not turno["disponible"]:
        raise HTTPException(status_code=409, detail="Ese turno ya está ocupado.")

    turno["disponible"] = False

    nueva_reserva = {
        "id": len(datos.reservas) + 1,
        "turno_id": turno["id"],
        "equipo": reserva_in.equipo,
        "celular": reserva_in.celular,
        "cancha": turno["cancha"],
        "hora": turno["hora"],
    }
    datos.reservas.append(nueva_reserva)
    return nueva_reserva
