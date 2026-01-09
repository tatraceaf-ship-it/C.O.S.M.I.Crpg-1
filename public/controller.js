const socket = io();

function aplicarHUD() {
  socket.emit("updateHud", {
    id: "leafone",

    name: nome.value,
    level: nivel.value,

    vidaAtual: Number(vidaAtual.value),
    vidaMax: Number(vidaMax.value),

    manaAtual: Number(manaAtual.value),
    manaMax: Number(manaMax.value),

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
