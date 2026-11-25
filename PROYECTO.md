# ⚽ GolPark · Sistema de reservas de canchas

Sistema de reservas de GolPark, canchas sintéticas de fútbol 5.

## Cómo correrlo

### Backend (FastAPI) · puerto 8000
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React + Vite) · puerto 5173
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
| POST | `/reservas` | 201 · reserva creada · 404 · 409 turno ocupado · 422 datos inválidos |
| GET | `/reservas` | 200 · lista de reservas |