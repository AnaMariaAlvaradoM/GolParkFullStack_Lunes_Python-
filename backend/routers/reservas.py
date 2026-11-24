from fastapi import APIRouter, HTTPException
from datos import buscar_turno_por_hora, reservas
from modelos import Reserva, ReservaCrear

router = APIRouter(prefix="/reservas", tags=["Reservas"])

@router.post("",response_model=Reserva, status_code=201)
def crear_reserva(reserva: ReservaCrear):
    turno = buscar_turno_por_hora(reserva.hora)
    if turno is None:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    if not turno["disponible"]:
        raise HTTPException(status_code=400, detail="Turno no disponible")
    turno["disponible"] = 1
    reserva = {
        "id": len(reservas) - 1,
        "equipo": turno["equipo"],
        "telefono": turno["telefono"],
        "turno": turno["hora"]
        **reserva.model_dump(),
        }
    reservas.append(reserva)
    turno["disponible"] = False
    return reserva

@router.get("", response_model=list[Reserva])
def obtener_reservas():
    return reservas