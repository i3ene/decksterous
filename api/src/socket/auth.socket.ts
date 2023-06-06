import { Server, Socket } from "socket.io";
import { AuthController } from "../controllers/auth.controller";

export namespace AuthSocket {
  /**
   * Register function for auth functionality
   * @param io Socket server
   * @param socket Socket connection
   */
  export async function register(io: Server, socket: Socket) {
    await AuthController.verifyToken(io, socket);
    await AuthController.getSelf(io, socket);
  }

  export function listener(io: Server) {
    // Generate token and link it to type
    io.sockets.adapter.on('auth-token', async (type, id) => {
      const socket = io.sockets.sockets.get(id);
      if (!socket) return;
      AuthController.validationToken(io, socket, type);
    });
  }
}