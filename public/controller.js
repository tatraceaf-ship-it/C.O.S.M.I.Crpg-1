const socket = io();

function aplicarHUD() {
  socket.emit("updateHud", {
    id: "leafone",
    name: document.getElementById("nome").value,
    level: document.getElementById("nivel").value,
    vidaAtual: document.getElementById("vidaAtual").value,
    vidaMax: document.getElementById("vidaMax").value,
    manaAtual: document.getElementById("manaAtual").value,
    manaMax: document.getElementById("manaMax").value,
    showVidaBar: true,
    dice: { rolls: [] }
  });
}

function rolarDado() {
  const r = Math.floor(Math.random() * 20) + 1;

  socket.emit("updateHud", {
    id: "leafone",
    dice: { rolls: [r] }
  });
}
