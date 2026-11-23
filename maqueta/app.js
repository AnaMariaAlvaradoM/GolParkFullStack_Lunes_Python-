import { turnos } from "./datos.js";

const lista = document.querySelector("#lista-turnos");
const contador = document.querySelector("#contador");
let reservas = 0;

function tarjeta(turno) {
  const estado = turno.disponible ? "libre" : "ocupado";
  return `
    <article class="turno turno--${estado}">
      <h2>${turno.cancha}</h2>
      <p>Hora: ${turno.hora}</p>
      <p>Precio: $${turno.precio.toLocaleString("es-CO")}</p>
      <button class="btn-reservar" data-id="${turno.id}" ${turno.disponible ? "" : "disabled"}>${turno.disponible ? "Reservar" : "Ocupado"}</button>
    </article>
  `;
}

function pintar() {
  lista.innerHTML = turnos.map(tarjeta).join("");
  contador.textContent = reservas;
}

lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-reservar");
  if (!boton || boton.disabled) return;

  const turno = turnos.find((t) => t.id === Number(boton.dataset.id));
  if (!turno || !turno.disponible) return;

  turno.disponible = false;
  reservas += 1;
  pintar();
});

pintar();
