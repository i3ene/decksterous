import * as socketio from "socket.io";
import { Config } from "../config";
import { RoomSocket } from "../socket/room.socket";
import { server } from "./http.server";

export const io = new socketio.Server(server);

RoomSocket.listener(io);

io.on("connection", async (socket) => {
  console.log("socket", socket.id, "connected");
  console.log(socket.handshake.headers[Config.Auth.HEADER]);

  io.emit("socket_connect", "A new socket connected!");

  await RoomSocket.register(io, socket);
});
