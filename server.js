const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("Conectado:", socket.id);

  socket.on("joinHud", hudId => {
    socket.join(hudId);
    console.log("HUD entrou na sala:", hudId);
  });

  socket.on("updateHud", data => {
    if (!data.hudId) return;
    io.to(data.hudId).emit("hudUpdate", data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
