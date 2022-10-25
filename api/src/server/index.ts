import { app } from "./express.server";
import { server } from "./http.server";
import { io } from "./socketio.server";

export namespace Server {
    export const Express = app;
    export const Http = server;
    export const SocketIO = io;
}