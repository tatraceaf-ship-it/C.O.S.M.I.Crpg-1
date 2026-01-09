const socket = io();

socket.on("state:update", state => {
  render(state);
});

function render(state) {
  document.getElementById("nome").textContent = state.name;
  document.getElementById("vida").textContent = `${state.vidaAtual}/${state.vidaMax}`;
  document.getElementById("mana").textContent = `${state.manaAtual}/${state.manaMax}`;
  document.getElementById("nivel").textContent = state.level;

  if (state.diceResult !== null) {
    const dice = document.getElementById("dice");
    dice.textContent = state.diceResult;
    dice.classList.add("dice-pop");

    setTimeout(() => {
      dice.textContent = "";
      dice.classList.remove("dice-pop");
    }, 15000);
  }

  animarVida(state);
}

function animarVida(state) {
  const bar = document.getElementById("vidaBar");
  const percent = (state.vidaAtual / state.vidaMax) * 100;
  bar.style.width = percent + "%";

  bar.classList.remove("shake");
  if (percent < 30) {
    bar.classList.add("shake");
  }
}
listenHudUpdates((data) => {
  if (data.vidaAtual !== undefined) {
    document.getElementById("vida").innerText =
      `${data.vidaAtual}/${data.vidaMax}`;

    const pct = (data.vidaAtual / data.vidaMax) * 100;
    document.getElementById("vidaBar").style.width = pct + "%";
  }

  if (data.manaAtual !== undefined) {
    document.getElementById("mana").innerText =
      `${data.manaAtual}/${data.manaMax}`;
  }

  if (data.nivel !== undefined) {
    document.getElementById("nivel").innerText = data.nivel;
  }

  if (data.dado) {
    const dado = document.getElementById("dado");
    dado.innerText = data.dado;
    dado.classList.add("anim-dado");

    setTimeout(() => {
      dado.classList.remove("anim-dado");
      dado.innerText = "";
    }, 15000);
  }
});

