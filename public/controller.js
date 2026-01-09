const socket = io();

const ID = new URLSearchParams(location.search).get("id") || "default";

function enviarEstado() {
  const state = {
    vidaAtual: Number(document.getElementById("vidaAtual").value),
    vidaMax: Number(document.getElementById("vidaMax").value),
    manaAtual: Number(document.getElementById("manaAtual").value),
    manaMax: Number(document.getElementById("manaMax").value),
    nivel: Number(document.getElementById("nivel").value),
    dado: window.lastRoll || null
  };

  socket.emit("controller:update", { id: ID, data: state });
}

document.getElementById("aplicar").onclick = enviarEstado;
document.getElementById("rolar").onclick = () => {
  window.lastRoll = Math.floor(Math.random() * 20) + 1;
  enviarEstado();
};

