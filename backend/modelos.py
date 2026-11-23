from pydantic import BaseModel, Field


class ReservaCreate(BaseModel):
    turno_id: int
    equipo: str = Field(min_length=3)
    celular: str = Field(pattern=r"^3\d{9}$")
