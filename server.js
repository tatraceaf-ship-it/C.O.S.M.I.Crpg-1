import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

// servir arquivos estáticos
app.use(express.static("public"));

// estado global por HUD ID
const hudState = {};

// socket
io.on("connection", socket => {
  console.log("🟢 Conectado:", socket.id);

  socket.on("join-hud", hudId => {
    socket.join(hudId);

    // envia estado atual ao conectar
    if (hudState[hudId]) {
      socket.emit("hud-update", hudState[hudId]);
    }
  });

  socket.on("update-hud", ({ hudId, data }) => {
    hudState[hudId] = {
      ...hudState[hudId],
      ...data
    };

    io.to(hudId).emit("hud-update", hudState[hudId]);
  });

  socket.on("roll-result", ({ hudId, roll }) => {
    io.to(hudId).emit("dice-result", roll);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("🔥 Server rodando na porta", PORT);
});

