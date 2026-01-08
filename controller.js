const socket = io();

function getValue(id) {
  return Number(document.getElementById(id).value);
}

document.getElementById("apply").onclick = () => {
  socket.emit("state:update", {
    vida: {
      atual: getValue("vidaAtual"),
      max: getValue("vidaMax")
    },
    mana: {
      atual: getValue("manaAtual"),
      max: getValue("manaMax")
    }
  });
};

document.getElementById("roll").onclick = () => {
  const faces = Number(document.getElementById("dice").value);
  const qty = Number(document.getElementById("qty").value);

  const results = Array.from({ length: qty }, () =>
    Math.floor(Math.random() * faces) + 1
  );

  socket.emit("state:update", {
    dado: {
      faces,
      resultados: results
    }
  });
};

document.getElementById("toggleVida").onclick = () => {
  socket.emit("state:update", { showVidaBar: false });
};
