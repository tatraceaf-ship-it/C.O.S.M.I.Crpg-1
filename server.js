import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ==========================
// SERVIR ARQUIVOS ESTÁTICOS
// ==========================
app.use(express.static(path.join(__dirname, "public")));

// ==========================
// ROTAS HTML (IMPORTANTE)
// ==========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/controller", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "controller.html"));
});

app.get("/hud", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hud.html"));
});

app.get("/mestre", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mestre.html"));
});

app.get("/ficha", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ficha.html"));
});

// ==========================
// SOCKET.IO (SEU SISTEMA)
// ==========================
const characters = {};

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
});

// ==========================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🔥 Servidor rodando na porta", PORT);
});

