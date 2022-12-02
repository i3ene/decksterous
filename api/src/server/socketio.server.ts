import * as socketio from "socket.io";
import { AuthSocket } from "../socket/auth.socket";
import { GameSocket } from "../socket/game.socket";
import { RoomSocket } from "../socket/room.socket";
import { server } from "./http.server";

export const io = new socketio.Server(server);

RoomSocket.listener(io);
GameSocket.listener(io);

io.on("connection", async (socket) => {
  console.log("socket", socket.id, "connected");
  await AuthSocket.register(io, socket);
  await RoomSocket.register(io, socket);
});
