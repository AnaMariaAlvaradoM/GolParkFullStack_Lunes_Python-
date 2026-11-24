from pydantic import BaseModel, Field

class Turno(BaseModel):
    id: int
    cancha: str
    precio: float
    hora: str
    disponible: bool

class ReservaCrear(BaseModel):
    id: int
    equipo: str = Field( min_length=3, max_length=15)
    telefono: str = Field( min_length=10, max_length=10)
    hora: str

class Reserva(BaseModel):
    id: int
    equipo: str = Field( min_length=3, max_length=15)
    telefono: str = Field( min_length=10, max_length=10)
    turno: Turno