from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import reservas, turnos

app = FastAPI(title="API de GolPark")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(turnos.router)
app.include_router(reservas.router)