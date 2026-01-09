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
