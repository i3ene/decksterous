import http from "http";
import { app } from "./express.server";

export const server = new http.Server(app);