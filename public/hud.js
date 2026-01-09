const socket = io();

const params = new URLSearchParams(window.location.search);
const hudId = params.get("id");

socket.emit("join", hudId);

socket.on("hudUpdate", data => {
  document.getElementById("nome").innerText = data.nome;
  document.getElementById("vida").innerText = `${data.vida}/${data.vidaMax}`;
  document.getElementById("mana").innerText = `${data.mana}/${data.manaMax}`;
  document.getElementById("nivel").innerText = data.nivel;
  document.getElementById("dado").innerText = data.dado ?? "";
});

