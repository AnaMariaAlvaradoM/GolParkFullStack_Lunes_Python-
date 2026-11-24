from fastapi import APIRouter, HTTPException
from datos import buscar_turno_por_hora, turnos
from modelos import Turno

router = APIRouter(prefix="/turnos", tags=["Turnos"])

@router.get("/", response_model=list[Turno])
def obtener_turnos():
    return turnos

@router.get("/{hora}", response_model=Turno)
def obtener_turno_por_hora(hora: str):
    turno = buscar_turno_por_hora(hora)
    if turno is None:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    return turno