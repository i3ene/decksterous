
import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { CardDeck } from '../models/data/cardDeck.model';

export const CardDeckRoutes = Router();

CardDeckRoutes.get("/all", [middleware.findAll(CardDeck)], controller.result(CardDeck));

CardDeckRoutes.get("/", [middleware.find(CardDeck, ['cards'])], controller.result(CardDeck));

CardDeckRoutes.post("/", [auth.isAdmin, middleware.add(CardDeck)], controller.message("last"));

CardDeckRoutes.put("/", [auth.isAdmin, middleware.get(CardDeck), middleware.edit(CardDeck)], controller.message("last"));

CardDeckRoutes.delete("/", [auth.isAdmin, middleware.get(CardDeck), middleware.remove(CardDeck)], controller.message("last"));
