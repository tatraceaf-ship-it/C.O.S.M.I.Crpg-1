const socket = io();

function aplicar() {
  const state = {
    name: document.getElementById("nome")?.value || "Nome",
    level: Number(document.getElementById("nivel")?.value || 6),

    vidaAtual: Number(document.getElementById("vidaAtual").value),
    vidaMax: Number(document.getElementById("vidaMax").value),

    manaAtual: Number(document.getElementById("manaAtual").value),
    manaMax: Number(document.getElementById("manaMax").value),

    diceResult: null,
    showBar: true
  };

  localStorage.setItem("COSMIC_STATE", JSON.stringify(state));
  socket.emit("state:update", state);
}

function rolarDado() {
  const sides = Number(document.getElementById("diceType").value.replace("d", ""));
  const result = Math.floor(Math.random() * sides) + 1;

  const state = JSON.parse(localStorage.getItem("COSMIC_STATE"));
  state.diceResult = result;

  localStorage.setItem("COSMIC_STATE", JSON.stringify(state));
  socket.emit("state:update", state);
}

function aplicarStatus() {
  const vidaAtual = Number(document.getElementById("vidaAtual").value);
  const vidaMax = Number(document.getElementById("vidaMax").value);
  const manaAtual = Number(document.getElementById("manaAtual").value);
  const manaMax = Number(document.getElementById("manaMax").value);
  const nivel = Number(document.getElementById("nivel").value);

  sendHudUpdate({
    vidaAtual,
    vidaMax,
    manaAtual,
    manaMax,
    nivel
  });
}

function rolarDado() {
  const faces = 20;
  const resultado = Math.floor(Math.random() * faces) + 1;

  sendHudUpdate({
    dado: resultado,
    dadoTs: Date.now()
  });
}

