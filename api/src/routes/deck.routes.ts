import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Deck } from "../models/data/deck.model";

export const DeckRoutes = Router();

DeckRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Deck, page: { size: 100, key: "page" } })], controller.result(Deck));

DeckRoutes.post("/", [auth.isAdmin, middleware.add({ model: Deck })], controller.result(Deck));


export const DeckIdRoutes = Router();

DeckRoutes.use("/:id", [middleware.get({ model: Deck, body: { key: 'id' } })], DeckIdRoutes);

DeckIdRoutes.get("/", controller.result(Deck));

DeckIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Deck })], controller.result(Deck));

DeckIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Deck })], controller.message("last"));