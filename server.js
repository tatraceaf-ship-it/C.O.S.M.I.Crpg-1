import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// 🔧 IMPORTANTE: permitir CORS automático do Render
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// healthcheck iradissimo e radicopolis só pra garantir
app.get("/health", (_, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;

// Estado em memória
const characters = {};

// SOCKET.IO
io.on("connection", socket => {
  console.log("🔗 Conectado:", socket.id);

  socket.on("joinCharacter", charId => {
    socket.join(charId);

    if (characters[charId]) {
      socket.emit("syncState", characters[charId]);
    }
  });

  socket.on("updateState", ({ charId, data }) => {
    characters[charId] = data;
    socket.to(charId).emit("stateUpdated", data);
  });

  socket.on("rollDice", ({ charId, result }) => {
    socket.to(charId).emit("diceResult", result);
  });

  socket.on("disconnect", () => {
    console.log("❌ Desconectado:", socket.id);
  });
});


server.listen(PORT, "0.0.0.0", () => {
  console.log("🔥 Servidor rodando na porta", PORT);
});