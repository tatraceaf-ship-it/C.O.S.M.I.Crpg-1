const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 3000;

// 🔹 Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Rota raiz → login
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// 🔹 Socket HUB
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  socket.on("hud:update", (payload) => {
    // payload = { id, data }
    io.emit(`hud:${payload.id}`, payload.data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente saiu:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
