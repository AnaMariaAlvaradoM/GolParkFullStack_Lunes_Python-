# Prepara la API del estudiante para las pruebas. NO modifiques este archivo.
import copy
import importlib
import sys
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parents[2] / "backend"
_original = {}


def _cargar_app():
    if not (BACKEND / "main.py").exists():
        pytest.fail("Falta el archivo backend/main.py", pytrace=False)
    if not (BACKEND / "datos.py").exists():
        pytest.fail("Falta el archivo backend/datos.py (con las listas turnos y reservas)", pytrace=False)
    if str(BACKEND) not in sys.path:
        sys.path.insert(0, str(BACKEND))
    try:
        main = importlib.import_module("main")
        datos = importlib.import_module("datos")
    except Exception as error:
        pytest.fail(f"Tu backend no arranca: {type(error).__name__}: {error}", pytrace=False)
    if not hasattr(main, "app"):
        pytest.fail("backend/main.py debería crear app = FastAPI()", pytrace=False)
    if not isinstance(getattr(datos, "turnos", None), list) or not isinstance(getattr(datos, "reservas", None), list):
        pytest.fail("backend/datos.py debería tener dos listas: turnos y reservas", pytrace=False)
    return main.app, datos


@pytest.fixture
def api():
    from fastapi.testclient import TestClient

    app, datos = _cargar_app()
    if "turnos" not in _original:
        _original["turnos"] = copy.deepcopy(datos.turnos)
    datos.turnos[:] = copy.deepcopy(_original["turnos"])
    datos.reservas.clear()
    with TestClient(app) as cliente:
        yield cliente
