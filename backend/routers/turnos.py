from fastapi import APIRouter, HTTPException

from datos import buscar_turno, turnos
from modelos import Turno

router = APIRouter(prefix="/turnos", tags=["turnos"])


@router.get("", response_model=list[Turno])
def listar_turnos():
    return turnos


@router.get("/{turno_id}", response_model=Turno)
def obtener_turno(turno_id: int):
    turno = buscar_turno(turno_id)
    if turno is None:
        raise HTTPException(status_code=404, detail="Ese turno no existe.")
    return turno