const socket = io();

function getHudId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "default";
}

// Controller envia
function sendHudUpdate(data) {
  socket.emit("hud:update", {
    id: getHudId(),
    data
  });
}

// HUD escuta
function listenHudUpdates(callback) {
  socket.on(`hud:${getHudId()}`, callback);
}
