// Se ejecuta antes de cada archivo de pruebas. NO lo modifiques.
// Cambia la forma en que axios hace peticiones: en lugar de ir a internet,
// le responde un servidor falso de GolPark que vive en tests/web/ayudas.js.
import axios from "axios";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { manejarPeticion } from "./ayudas.js";

axios.defaults.adapter = (config) => manejarPeticion(config);

afterEach(() => cleanup());
