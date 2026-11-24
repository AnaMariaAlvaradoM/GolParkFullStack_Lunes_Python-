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
          <p>Precio: ${turno.precio.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
          <p>Disponible: ${turno.disponible ? "Sí" : "No"}</p>
          <button
            class="btn-reservar"
            type="button"
            data-id="${turno.id}"
            ${turno.disponible ? "" : "disabled"}
          >
            ${turno.disponible ? "Reservar" : "No disponible"}
          </button>
        </article>
      `,
    )
    .join("");

  contador.textContent = misReservas;

  document.querySelectorAll(".btn-reservar:not(:disabled)").forEach((boton) => {
    boton.addEventListener("click", () => reservar(Number(boton.dataset.id)));
  });
}

function reservar(id) {
  const turno = turnos.find((turno) => turno.id === id);

  if (!turno || !turno.disponible) return;

  turno.disponible = false;
  misReservas += 1;
  renderizar();
}

renderizar();
