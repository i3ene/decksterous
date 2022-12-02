import { Server, Socket } from "socket.io";
import { Config } from "../config";
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
}