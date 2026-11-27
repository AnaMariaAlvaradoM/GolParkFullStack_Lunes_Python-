# GolPark

Sistema de reserva de turnos para uso de canchas sinteticas de futbol 5: La persona ve los horarios del día y los precios

## Cómo correrlo

### Backend (FastAPI) - puerto 8000

´´´bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
´´´

En macOS o Linux, el segundo comando es `source .venv/bin/activate`.

### Frontend (React + Vite) - puerto 5173

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```
## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/turnos` | 200 · lista de turnos |
| GET | `/turnos/{turno_id}` | 200 · un turno · 404 si no existe |
| POST | `/reservas` | 201 · la reserva creada · 404 · 409 sin cupos · 422 datos no válidos |
| GET | `/reservas` | 200 · lista de reservas |