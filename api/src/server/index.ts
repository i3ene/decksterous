import { app } from "./express.server";
import { server } from "./http.server";

export namespace Server {
    export const Express = app;
    export const Http = server; 
}