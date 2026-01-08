const socket = io();

// ===== PEGAR ID DO HUD =====
const params = new URLSearchParams(window.location.search);
const HUD_ID = params.get("id") || "default";

socket.emit("join:hud", HUD_ID);

// ===== ENVIAR STATUS =====
function enviarHUD(data) {
  socket.emit("hud:update", {
    hudId: HUD_ID,
    data
  });
}

// ===== RECEBER STATUS =====
socket.on("hud:update", (data) => {
  if (window.updateHUD) window.updateHUD(data);
});

// ===== ENVIAR DADO =====
function enviarDado(dice) {
  socket.emit("dice:roll", {
    hudId: HUD_ID,
    dice
  });
}

// ===== RECEBER DADO =====
socket.on("dice:roll", (dice) => {
  if (window.mostrarDado) window.mostrarDado(dice);
});

