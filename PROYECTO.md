# GolPark

Aplicación para consultar turnos de canchas sintéticas y crear reservas.

## Requisitos

- Python 3
- Node.js y npm

## Ejecutar el backend

En una terminal, desde la raíz del proyecto:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

La API queda disponible en `http://localhost:8000`. La documentación interactiva de FastAPI está en `http://localhost:8000/docs`.

## Ejecutar el frontend

En otra terminal, desde la raíz del proyecto:

```powershell
cd frontend
npm install
npm run dev
```

Vite muestra en la terminal la dirección local del frontend (normalmente `http://localhost:5173`). La URL del backend se configura con `VITE_API_URL`; consulta `frontend/.env.example`.
Si no creaste un archivo `.env`, el frontend usa `http://localhost:8000` por defecto. Las tarjetas de turnos aparecen en `/turnos`; las de reservas, después de crear una reserva, en `/mis-reservas`.

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/turnos` | Lista los turnos disponibles y ocupados. |
| `GET` | `/turnos/{turno_id}` | Devuelve el detalle de un turno. |
| `POST` | `/reservas` | Crea una reserva para un turno disponible. |
| `GET` | `/reservas` | Lista las reservas creadas. |

El cuerpo de `POST /reservas` debe incluir `turno_id`, `equipo` y `celular`. Si el turno no existe, la API responde `404`; si ya está ocupado, responde `409`.
