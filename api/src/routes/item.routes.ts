import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Item } from "../models/data/item.model";

export const ItemRoutes = Router();

ItemRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Item, page: { size: 100, key: "page" } })], controller.result(Item));

ItemRoutes.post("/", [auth.isAdmin, middleware.add({ model: Item })], controller.result(Item));


export const ItemIdRoutes = Router();

ItemRoutes.use("/:id", [middleware.get({ model: Item, body: { key: 'id' } })], ItemIdRoutes);

ItemIdRoutes.get("/", controller.result(Item));

ItemIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Item })], controller.result(Item));

ItemIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Item })], controller.message("last"));