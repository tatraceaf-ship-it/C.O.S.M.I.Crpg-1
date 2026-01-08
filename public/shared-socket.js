// URL do seu site no Render
const SOCKET_URL = window.location.origin;

export const socket = io(SOCKET_URL);

// pega ID do HUD via ?id=
export function getHudId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "default";
}

// entrar no canal do HUD
export function joinHud() {
  const hudId = getHudId();
  socket.emit("join-hud", hudId);
  return hudId;
}

// enviar atualização
export function updateHud(hudId, data) {
  socket.emit("update-hud", { hudId, data });
}

// enviar resultado de dado
export function sendRoll(hudId, roll) {
  socket.emit("roll-result", { hudId, roll });
}

