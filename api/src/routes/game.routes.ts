import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Game } from "../models/data/game.model";

export const GameRoutes = Router();

GameRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Game, page: { size: 100, key: "page" } })], controller.result(Game));

GameRoutes.post("/", [auth.isAdmin, middleware.add({ model: Game })], controller.result(Game));


export const GameIdRoutes = Router();

GameRoutes.use("/:id", [middleware.get({ model: Game, body: { key: 'id' } })], GameIdRoutes);

GameIdRoutes.get("/", controller.result(Game));

GameIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Game })], controller.result(Game));

GameIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Game })], controller.message("last"));