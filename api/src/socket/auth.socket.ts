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
    io.sockets.adapter.on('auth-signup', async (id) => {
      const socket = io.sockets.sockets.get(id);
      if (!socket) return;
      AuthController.signupToken(io, socket);
    });

    io.sockets.adapter.on('auth-register', async (credentials, id) => {
      const socket = io.sockets.sockets.get(id);
      if (!socket) return;
      AuthController.registerSocket(io, socket, credentials);
    });
  }
}