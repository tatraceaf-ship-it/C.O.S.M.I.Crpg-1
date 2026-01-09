const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

io.on("connection", socket => {

  socket.on("join", id => {
    socket.join(id);
    console.log("Entrou no HUD:", id);
  });

  socket.on("updateHud", data => {
    io.to(data.id).emit("hudUpdate", data);
  });

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
