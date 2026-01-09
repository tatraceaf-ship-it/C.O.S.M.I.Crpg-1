const socket = io();
const ID = new URLSearchParams(location.search).get("id") || "default";

function atualizarHUD(state) {
  if (!state) return;

  document.getElementById("vida").innerText =
    `${state.vidaAtual}/${state.vidaMax}`;

  document.getElementById("mana").innerText =
    `${state.manaAtual}/${state.manaMax}`;

  document.getElementById("nivel").innerText = state.nivel;

  if (state.dado) {
    const dado = document.getElementById("dado");
    dado.innerText = state.dado;
    dado.style.opacity = 1;
    setTimeout(() => dado.style.opacity = 0, 15000);
  }
}

/* 🔥 PULL LOOP – ISSO FAZ FUNCIONAR NO OBS */
setInterval(() => {
  socket.emit("hud:get", ID);
}, 500);

socket.on("hud:state", atualizarHUD);
