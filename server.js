const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", socket => {
  socket.on("join", hudId => {
    socket.join(hudId);
  });

  socket.on("updateHud", data => {
    io.to(data.id).emit("hudUpdate", data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
