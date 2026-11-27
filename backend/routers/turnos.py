from fastapi import APIRouter, HTTPException
from datos import buscar_turno_por_id, turnos
from modelos import Turno

router = APIRouter(prefix="/turnos", tags=["Turnos"])

@router.get("/", response_model=list[Turno])
def obtener_turnos():
    return turnos

@router.get("/{turno_id}", response_model=Turno)
def obtener_turno_por_id(turno_id: int):
    turno = buscar_turno_por_id(turno_id)
    if turno is None:
        raise HTTPException(status_code=404, detail="Ese turno no existe.")
    return turno