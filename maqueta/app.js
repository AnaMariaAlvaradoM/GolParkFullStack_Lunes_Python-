import { turnos } from "./datos.js";

const lista = document.querySelector("#lista-turnos");
const contador = document.querySelector("#contador");

let reservas = 0;

function crearTarjeta(turno) {
  const boton = turno.disponible
    ? `<button class="btn-reservar" data-id="${turno.id}">Reservar</button>`
    : `<button class="btn-reservar" data-id="${turno.id}" disabled>Ocupado</button>`;

  return `
    <article class="tarjeta ${turno.disponible ? "" : "tarjeta-ocupada"}">
      <h2>${turno.cancha}</h2>
      <p>Hora: ${turno.hora}</p>
      <p>Precio: $${turno.precio.toLocaleString("es-CO")}</p>
      ${boton}
    </article>
  `;
}

function renderizar() {
  lista.innerHTML = turnos.map(crearTarjeta).join("");
  contador.textContent = reservas;
}

lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-reservar");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const turno = turnos.find((t) => t.id === id);

  if (!turno || !turno.disponible) return;

  turno.disponible = false;
  reservas++;
  renderizar();
});

renderizar();