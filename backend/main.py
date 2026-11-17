from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from datos import reservas, turnos

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class DatosReserva(BaseModel):
    turno_id: int
    equipo: str = Field(min_length=3)
    celular: str = Field(pattern=r"^3\d{9}$")


@app.get("/turnos")
def listar_turnos():
    return turnos


@app.get("/turnos/{turno_id}")
def obtener_turno(turno_id: int):
    for turno in turnos:
        if turno["id"] == turno_id:
            return turno

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Ese turno no existe.",
    )


@app.post("/reservas", status_code=status.HTTP_201_CREATED)
def crear_reserva(datos: DatosReserva):
    turno = None

    for turno_actual in turnos:
        if turno_actual["id"] == datos.turno_id:
            turno = turno_actual
            break

    if turno is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ese turno no existe.",
        )

    if not turno["disponible"]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ese turno ya está ocupado.",
        )

    reserva = {
        "id": len(reservas) + 1,
        "turno_id": turno["id"],
        "equipo": datos.equipo,
        "celular": datos.celular,
        "cancha": turno["cancha"],
        "hora": turno["hora"],
    }

    turno["disponible"] = False
    reservas.append(reserva)

    return reserva


@app.get("/reservas")
def listar_reservas():
    return reservas