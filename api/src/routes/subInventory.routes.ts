import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { SubInventory } from "../models/data/subInventory.model";

export const SubInventoryRoutes = Router();

SubInventoryRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: SubInventory, page: { size: 100, key: "page" } })], controller.result(SubInventory));

SubInventoryRoutes.post("/", [auth.isAdmin, middleware.add({ model: SubInventory })], controller.result(SubInventory));


export const SubInventoryIdRoutes = Router();

SubInventoryRoutes.use("/:id", [middleware.get({ model: SubInventory, body: { key: 'id' } })], SubInventoryIdRoutes);

SubInventoryIdRoutes.get("/", controller.result(SubInventory));

SubInventoryIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: SubInventory })], controller.result(SubInventory));

SubInventoryIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: SubInventory })], controller.message("last"));


export const SubInventoryIdRoutesHash = Router();

SubInventoryIdRoutes.use("/:hash", SubInventoryIdRoutesHash);

SubInventoryIdRoutesHash.post("/", /* TODO: Add hash object to subInventory by id */);

SubInventoryIdRoutesHash.delete("/", /* TODO: Remove hash object from subInventory by id */);