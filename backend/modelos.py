from pydantic import BaseModel, Field


class Turno(BaseModel):
    id: int
    cancha: str
    hora: str
    precio: int
    disponible: bool


class ReservaCrear(BaseModel):
    turno_id: int
    equipo: str = Field(min_length=3)
    celular: str = Field(pattern=r"^3\d{9}$")


class Reserva(ReservaCrear):
    id: int
    cancha: str
    hora: str