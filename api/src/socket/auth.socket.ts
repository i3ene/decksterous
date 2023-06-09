import { Server, Socket } from "socket.io";
import { AuthController } from "../controllers/auth.controller";

export namespace AuthSocket {
  /**
   * Register function for auth functionality
   * @param io Socket server
   * @param socket Socket connection
   */
  export async function register(io: Server, socket: Socket) {
    // Generate token and link it to type
    socket.on('auth-token', async (type) => {
      console.log(type);
      AuthController.validationToken(io, socket, type);
    });

    await AuthController.verifyToken(io, socket);
    await AuthController.getSelf(io, socket);
  }
}