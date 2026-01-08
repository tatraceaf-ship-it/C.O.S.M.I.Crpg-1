const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ===== SERVE A PASTA PUBLIC =====
app.use(express.static(path.join(__dirname, "public")));

// ===== ROTA PADRÃO =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ===== SOCKET =====
io.on("connection", (socket) => {
  console.log("🟢 Conectado:", socket.id);

  socket.on("hud:update", ({ hudId, data }) => {
    io.to(hudId).emit("hud:update", data);
  });

  socket.on("dice:roll", ({ hudId, dice }) => {
    io.to(hudId).emit("dice:roll", dice);
  });

  socket.on("join:hud", (hudId) => {
    socket.join(hudId);
    console.log("🎯 HUD conectado:", hudId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🔥 Server rodando na porta", PORT);
});
