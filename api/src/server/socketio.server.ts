import * as socketio from "socket.io";
import { Config } from "../config";
import { server } from "./http.server";

export const io = new socketio.Server(server);

io.on("connection", (socket) => {
  console.log("socket", socket.id, "connected");
  console.log(socket.handshake.headers[Config.Auth.HEADER]);

  io.emit("joined", { message: "A new socket joined!" });
});
