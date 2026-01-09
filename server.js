const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/controller.html");
});

io.on("connection", socket => {
  console.log("Socket conectado:", socket.id);

  socket.on("join", hudId => {
    console.log("Entrou no HUD:", hudId);
    socket.join(hudId);
  });

  socket.on("updateHud", data => {
    console.log("Update HUD:", data.id);
    io.to(data.id).emit("hudUpdate", data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
