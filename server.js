import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔹 Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 🔹 ROTA PRINCIPAL → LOGIN
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔹 Estado global
let state = {
  name: "Leafone",
  level: 6,
  vida: { atual: 36, max: 100 },
  mana: { atual: 15, max: 15 },
  dado: null,
  showVidaBar: true
};

// 🔹 Socket
io.on("connection", socket => {
  socket.emit("state:update", state);

  socket.on("state:update", newState => {
    state = { ...state, ...newState };
    io.emit("state:update", state);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
