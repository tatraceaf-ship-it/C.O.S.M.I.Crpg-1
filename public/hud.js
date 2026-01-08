const params = new URLSearchParams(window.location.search);
const HUD_ID = params.get("id") || "default";
const socket = io();

const vidaBar = document.getElementById("vidaBar");
const vidaText = document.getElementById("vidaText");
const manaText = document.getElementById("manaText");
const dadoBox = document.getElementById("diceResults");
const hud = document.querySelector(".hud");

let diceTimeout = null;

socket.on("state:update", state => {
  // VIDA
  const perc = Math.max(
    0,
    Math.min(100, (state.vida.atual / state.vida.max) * 100)
  );

  vidaBar.style.width = `${perc}%`;
  vidaText.textContent = `${state.vida.atual}/${state.vida.max}`;
  manaText.textContent = `${state.mana.atual}/${state.mana.max}`;

  // ESCONDER BARRA
  hud.classList.toggle("hp-hidden", !state.showVidaBar);

  // ANIMAÇÃO DANO / CURA
  hud.classList.remove("damage", "heal");
  if (perc < 100) hud.classList.add("damage");
  if (perc === 100) hud.classList.add("heal");

  // DADOS
  if (state.dado) {
    dadoBox.innerHTML = "";
    state.dado.resultados.forEach(v => {
      const el = document.createElement("div");
      el.className = "dice-hex";

      if (state.dado.faces === 20 && v === 20) el.classList.add("crit");
      if (state.dado.faces === 20 && v === 1) el.classList.add("fail");

      el.textContent = v;
      dadoBox.appendChild(el);
    });

    dadoBox.classList.add("show");

    clearTimeout(diceTimeout);
    diceTimeout = setTimeout(() => {
      dadoBox.classList.remove("show");
    }, 15000);
  }
});
setInterval(() => {
  if (window.socket && socket.connected) {
    socket.emit("hud:ping");
  }
}, 3000);



