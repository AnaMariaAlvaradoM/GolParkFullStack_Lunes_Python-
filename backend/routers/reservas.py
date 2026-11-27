from fastapi import APIRouter, HTTPException
from datos import buscar_turno_por_id, reservas
from modelos import Reserva, ReservaCrear

router = APIRouter(prefix="/reservas", tags=["Reservas"])

@router.post("",response_model=Reserva, status_code=201)
def crear_reserva(reserva: ReservaCrear):
    turno = buscar_turno_por_id(reserva.turno_id)
    if turno is None:
        raise HTTPException(status_code=404, detail="Ese turno no existe.")
    if not turno["disponible"]:
        raise HTTPException(status_code=409, detail="Ese turno ya está ocupado.")
    
    turno["disponible"] = False
    nueva = {
        "id": len(reservas) + 1,
        **reserva.model_dump(),
        "cancha": turno["cancha"],
        "hora": turno["hora"]
        
        }
    reservas.append(nueva)
    return nueva

@router.get("", response_model=list[Reserva])
def obtener_reservas():
    return reservas