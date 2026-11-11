
import { turnos } from "./datos.js";

const lista = document.querySelector("#lista-turnos");
const contador = document.querySelector("#contador");

let misReservas = 0;

function renderizar() {
  lista.innerHTML = turnos
    .map(
      (turno) => `
        <article class="tarjeta">
          <h3>${turno.cancha}</h3>
          <p>Hora: ${turno.hora}</p>
          <p>Precio: $${turno.precio.toLocaleString("es-CO")}</p>
          <button class="btn-reservar" data-id="${turno.id}" ${!turno.disponible ? "disabled" : ""}>
            ${turno.disponible ? "Reservar" : "Ocupado"}
          </button>
        </article>
      `
    )
    .join("");

  contador.textContent = misReservas;

  document.querySelectorAll(".btn-reservar").forEach((boton) => {
    boton.addEventListener("click", () => reservar(Number(boton.dataset.id)));
  });
}

function reservar(id) {
  const turno = turnos.find((t) => t.id === id);

  if (!turno || !turno.disponible) return;
  turno.disponible = false;
  misReservas += 1;
  renderizar();
}

renderizar();
