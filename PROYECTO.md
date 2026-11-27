# GolPark

Sistema de reservas de canchas de fútbol GolPark: la persona consulta los turnos disponibles del día, entra al detalle de uno y reserva su espacio con su equipo.

## Cómo correrlo

### Backend (FastAPI) · puerto 8000

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

En macOS o Linux, el segundo comando es `source .venv/bin/activate`.

### Frontend (React + Vite) · puerto 5173

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

En macOS o Linux, el tercer comando es `cp .env.example .env`.

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/turnos` | 200 · lista de turnos |
| GET | `/turnos/{turno_id}` | 200 · detalle del turno · 404 si no existe |
| POST | `/reservas` | 201 · reserva creada · 404 si el turno no existe · 409 si no está disponible · 422 si los datos no son válidos |
| GET | `/reservas` | 200 · lista de reservas |