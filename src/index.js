import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("Nueva conexión: ", socket.id);
  socket.on("client:newnote", (data) => {
    console.log(data);
    io.emit("server:updatenote", data);
  });
});

server.listen(3000);

console.log("Server on port", 3000);
