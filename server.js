const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

// SERVE A PASTA PUBLIC
app.use(express.static(path.join(__dirname, "public")));

// ROTA RAIZ → LOGIN
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// SOCKET
io.on("connection", (socket) => {
  console.log("🟢 Socket conectado:", socket.id);

  socket.on("hud:update", ({ id, data }) => {
    io.emit(`hud:${id}`, data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket saiu:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("🔥 Server rodando na porta", PORT);
});
