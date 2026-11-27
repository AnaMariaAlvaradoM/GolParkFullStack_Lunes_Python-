from fastapi import APIRouter, HTTPException

from datos import buscar_turno, reservas
from modelos import Reserva, ReservaCrear

router = APIRouter(prefix="/reservas", tags=["reservas"])

@router.get("", response_model=list[Reserva])
def listar_reservas():
    return reservas

@router.post("", response_model=Reserva, status_code=201)
def crear_reserva(datos: ReservaCrear):
    turno = buscar_turno(datos.turno_id)

    if not turno:
        raise HTTPException(status_code=404, detail="Ese turno no existe.")
    
    if not turno["disponible"]:
        raise HTTPException(status_code=409, detail="Ese turno ya está ocupado.")

    nueva_reserva = {
        "id": len(reservas) + 1,
        "turno_id": datos.turno_id,
        "equipo": datos.equipo,
        "celular": datos.celular,
        "cancha": turno["cancha"],
        "hora": turno["hora"]
    }
    
    reservas.append(nueva_reserva)
    turno["disponible"] = False
    
    return nueva_reserva