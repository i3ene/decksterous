import { Server, Socket } from "socket.io";
import { GameController } from "../controllers/game.controller";
import { Game } from "../models/object/game.object";

export namespace GameSocket {

  /**
   * Register function for game functionality
   * @param io Socket server
   * @param socket Socket connection
   */
  export async function register(io: Server, socket: Socket) {
    console.log("Registered Game Socket");
  }

  export function listener(io: Server) {
    io.sockets.adapter.on('create-room', async (room) => {
      if (!room.startsWith('game_')) return;
      GameController.games.set(room, new Game(io.to(room)));
    });

    io.sockets.adapter.on('delete-room', async (room) => {
      if (!room.startsWith('game_')) return;
      GameController.games.delete(room);
    });

    io.sockets.adapter.on('join-room', (room, id) => {
      if (!room.startsWith('game_')) return;
      GameController.addPlayer(io, io.sockets.sockets.get(id)!, room);
    });

    io.sockets.adapter.on('leave-room', (room, id) => {
      if (!room.startsWith('game_')) return;
      GameController.removePlayer(io, io.sockets.sockets.get(id)!, room);
    });
  }
}