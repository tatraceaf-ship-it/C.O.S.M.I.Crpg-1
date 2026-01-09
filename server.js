import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const states = {};

io.on("connection", socket => {

  socket.on("controller:update", ({ id, data }) => {
    states[id] = data;
  });

  socket.on("hud:get", id => {
    socket.emit("hud:state", states[id] || null);
  });

});

server.listen(3000, () => {
  console.log("Servidor rodando");
});

