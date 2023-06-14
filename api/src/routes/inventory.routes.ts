import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Inventory } from "../models/data/inventory.model";
import { ItemMiddleware as itemMiddleware } from "../middleware/item.middleware";
import { Item } from "../models/data/item.model";

export const InventoryRoutes = Router();

InventoryRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Inventory, page: { size: 100, key: "page" } })], controller.result(Inventory));

InventoryRoutes.post("/", [auth.isAdmin, middleware.add({ model: Inventory })], controller.result(Inventory));


export const InventoryIdRoutes = Router();

InventoryRoutes.use("/:id", [middleware.get({ model: Inventory, body: { key: 'id' } })], InventoryIdRoutes);

InventoryIdRoutes.get("/", controller.result(Inventory));

InventoryIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Inventory })], controller.result(Inventory));

InventoryIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Inventory })], controller.message("last"));

InventoryIdRoutes.post("/:itemId", [
  auth.isAdmin,
  middleware.get({ model: Item, body: { key: 'itemId' } }),
  itemMiddleware.createItemObject({ data: { key: Item, name: "object" } }),
  middleware.addAssociation({ model: Inventory, data: { key: Inventory }, association: { name: "objects", data: "object" } })
], controller.message("last"));

InventoryIdRoutes.get("/object", [middleware.getAssociation({ model: Inventory, scopes: ["item"], association: { name: "objects" } })], controller.result([Inventory, "objects"]));