import { joinHud, updateHud, sendRoll } from "./shared-socket.js";

const hudId = joinHud();

// aplicar vida/mana
document.getElementById("aplicar").addEventListener("click", () => {
  const vidaAtual = Number(document.getElementById("vidaAtual").value);
  const vidaMax = Number(document.getElementById("vidaMax").value);
  const manaAtual = Number(document.getElementById("manaAtual").value);
  const manaMax = Number(document.getElementById("manaMax").value);
  const nivel = Number(document.getElementById("nivel").value);

  updateHud(hudId, {
    vidaAtual,
    vidaMax,
    manaAtual,
    manaMax,
    nivel
  });
});

// rolar dado
document.getElementById("rolar").addEventListener("click", () => {
  const tipo = document.getElementById("tipoDado").value;
  const qtd = Number(document.getElementById("qtdDado").value);

  const lados = Number(tipo.replace("d", ""));
  const resultados = [];

  for (let i = 0; i < qtd; i++) {
    resultados.push(1 + Math.floor(Math.random() * lados));
  }

  sendRoll(hudId, {
    tipo,
    resultados,
    critico: resultados.includes(lados),
    falha: resultados.includes(1)
  });
});
