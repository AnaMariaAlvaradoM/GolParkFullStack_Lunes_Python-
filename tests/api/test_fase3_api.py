# Fase 3 · API de GolPark con FastAPI (carpeta backend/)

RESERVA = {"turno_id": 1, "equipo": "Los Cracks", "celular": "3001234567"}


def test_listar_turnos_devuelve_los_6_turnos(api):
    respuesta = api.get("/turnos")
    assert respuesta.status_code == 200, f"GET /turnos debería responder 200 (respondió {respuesta.status_code})"
    assert len(respuesta.json()) == 6, "GET /turnos debería devolver los 6 turnos del correo"


def test_cada_turno_trae_los_campos_del_contrato(api):
    turnos = api.get("/turnos").json()
    assert turnos[0] == {"id": 1, "cancha": "Cancha 1", "hora": "6:00 p. m.", "precio": 120000, "disponible": True}, \
        "El primer turno debería ser {id: 1, cancha: 'Cancha 1', hora: '6:00 p. m.', precio: 120000, disponible: true}"
    assert turnos[1]["disponible"] is False, "El turno 2 (Cancha 1, 7:00 p. m.) debería estar ocupado"


def test_obtener_un_turno_por_id(api):
    respuesta = api.get("/turnos/3")
    assert respuesta.status_code == 200, f"GET /turnos/3 debería responder 200 (respondió {respuesta.status_code})"
    assert respuesta.json()["hora"] == "8:00 p. m.", "GET /turnos/3 debería devolver el turno de las 8:00 p. m."


def test_turno_inexistente_responde_404(api):
    respuesta = api.get("/turnos/99")
    assert respuesta.status_code == 404, f"GET /turnos/99 debería responder 404 (respondió {respuesta.status_code})"
    assert respuesta.json().get("detail") == "Ese turno no existe.", "El 404 debería traer detail: 'Ese turno no existe.'"


def test_reservar_un_turno_libre_responde_201(api):
    respuesta = api.post("/reservas", json=RESERVA)
    assert respuesta.status_code == 201, f"POST /reservas con un turno libre debería responder 201 (respondió {respuesta.status_code})"
    reserva = respuesta.json()
    assert reserva == {"id": 1, "turno_id": 1, "equipo": "Los Cracks", "celular": "3001234567", "cancha": "Cancha 1", "hora": "6:00 p. m."}, \
        "La reserva debería traer id, turno_id, equipo, celular, cancha y hora"


def test_reservar_deja_el_turno_ocupado_y_guarda_la_reserva(api):
    api.post("/reservas", json=RESERVA)
    assert api.get("/turnos/1").json()["disponible"] is False, "Después de reservar, el turno 1 debería quedar con disponible: false"
    reservas = api.get("/reservas").json()
    assert len(reservas) == 1 and reservas[0]["equipo"] == "Los Cracks", "GET /reservas debería devolver la reserva creada"


def test_reservar_un_turno_ocupado_responde_409(api):
    respuesta = api.post("/reservas", json={**RESERVA, "turno_id": 2})
    assert respuesta.status_code == 409, f"Reservar el turno 2 (ocupado) debería responder 409 (respondió {respuesta.status_code})"
    assert respuesta.json().get("detail") == "Ese turno ya está ocupado.", "El 409 debería traer detail: 'Ese turno ya está ocupado.'"


def test_reservar_dos_veces_el_mismo_turno_responde_409(api):
    api.post("/reservas", json=RESERVA)
    respuesta = api.post("/reservas", json=RESERVA)
    assert respuesta.status_code == 409, "Reservar dos veces el turno 1 debería responder 409 la segunda vez"


def test_reservar_un_turno_inexistente_responde_404(api):
    respuesta = api.post("/reservas", json={**RESERVA, "turno_id": 99})
    assert respuesta.status_code == 404, f"Reservar el turno 99 debería responder 404 (respondió {respuesta.status_code})"


def test_datos_invalidos_responden_422(api):
    corto = api.post("/reservas", json={**RESERVA, "equipo": "AB"})
    assert corto.status_code == 422, "Un equipo de menos de 3 letras debería responder 422 (usa Field(min_length=3))"
    celular = api.post("/reservas", json={**RESERVA, "celular": "2001234567"})
    assert celular.status_code == 422, "Un celular que no empieza por 3 o no tiene 10 dígitos debería responder 422 (usa Field(pattern=...))"


def test_cors_permite_el_frontend_y_bloquea_otros_origenes(api):
    cabeceras = {"Access-Control-Request-Method": "GET"}
    permitido = api.options("/turnos", headers={**cabeceras, "Origin": "http://localhost:5173"})
    assert permitido.headers.get("access-control-allow-origin") == "http://localhost:5173", \
        "CORS debería permitir http://localhost:5173 (CORSMiddleware con allow_origins)"
    otro = api.options("/turnos", headers={**cabeceras, "Origin": "http://sitio-falso.com"})
    assert otro.headers.get("access-control-allow-origin") is None, "CORS solo debería permitir http://localhost:5173, no cualquier origen"
