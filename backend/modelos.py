from pydantic import BaseModel, Field

class Turno(BaseModel):
    id: int
    cancha: str
    precio: float
    hora: str
    disponible: bool

class ReservaCrear(BaseModel):
    turno_id: int
    equipo: str = Field(min_length=3, max_length=15)
    celular: str = Field(pattern=r"^3[0-9]{9}$")

class Reserva(BaseModel):
    id: int
    turno_id: int
    equipo: str 
    celular: str
    cancha: str
    hora: str
     
    