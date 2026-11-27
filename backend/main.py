from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import turnos, reservas

app = FastAPI(title="API de GolPark", description="API para la gestión de reservas de canchas de fútbol", version="1.0.0")

# CORS permite SOLO http://localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(turnos.router)
app.include_router(reservas.router)