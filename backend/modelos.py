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
    celular: str = Field(pattern=r"^3\d{9}$", description="El número de celular debe comenzar con '3' y tener 10 dígitos en total.")


class Reserva(ReservaCrear):
    id: int
    cancha: str
    hora: str