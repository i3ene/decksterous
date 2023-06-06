import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Card } from "../models/data/card.model";
import { Ability } from "../models/data/ability.model";

export const CardRoutes = Router();

CardRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Card, scopes: ["abilities"], page: { size: 100, key: "page" } })], controller.result(Card));

CardRoutes.post("/", [auth.isAdmin, middleware.add({ model: Card })], controller.result(Card));


export const CardIdRoutes = Router();

CardRoutes.use("/:id", [middleware.get({ model: Card, body: { key: 'id' } })], CardIdRoutes);

CardIdRoutes.get("/", controller.result(Card));

CardIdRoutes.put('/', [
  auth.isAdmin,
  middleware.edit({ model: Card }),
  middleware.getAll({ model: Ability, list: { key: 'abilities', id: 'key' }}),
  middleware.setAssociation({ model: Card, association: { name: "abilities", data: Ability }})
], controller.message('success'));

CardIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Card })], controller.message("last"));

CardIdRoutes.get("/type", [middleware.getAssociation({ model: Card, association: { name: "type" } })], controller.result([Card, "type"]));

CardIdRoutes.get("/ability", [middleware.getAssociation({ model: Card, association: { name: "abilities" } })], controller.result([Card, "abilities"]));