import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { SubInventory } from "../models/data/subInventory.model";
import { _Object } from "../models/data/object.model";
import { ItemMiddleware } from "../middleware/item.middleware";

export const SubInventoryRoutes = Router();

SubInventoryRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: SubInventory, page: { size: 100, key: "page" } })], controller.result(SubInventory));

SubInventoryRoutes.post("/", [auth.isAdmin, middleware.add({ model: SubInventory })], controller.result(SubInventory));


export const SubInventoryObjectHashRoutes = Router();

SubInventoryRoutes.use("/object/:objectHash", [
  middleware.get({ model: _Object, body: { key: 'objectHash' } }),
  middleware.getAssociation({ model: _Object, data: { key: _Object }, association: { name: "subInventory" } }),
  middleware.map([_Object, "subInventory"], SubInventory),
  middleware.check(undefined, true, "Object has no SubInventory!", { data: { key: SubInventory } }),
], SubInventoryObjectHashRoutes);


export const SubInventoryIdRoutes = Router();

SubInventoryRoutes.use("/:id", [middleware.get({ model: SubInventory, body: { key: 'id' } })], SubInventoryIdRoutes);

SubInventoryObjectHashRoutes.use(SubInventoryIdRoutes);

SubInventoryIdRoutes.get("/", controller.result(SubInventory));

SubInventoryIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: SubInventory })], controller.result(SubInventory));

SubInventoryIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: SubInventory })], controller.message("last"));


export const SubInventoryIdHashRoutes = Router();

SubInventoryObjectHashRoutes.use(SubInventoryIdHashRoutes);

SubInventoryIdRoutes.use(SubInventoryIdHashRoutes);


export const SubInventoryObjectRoutes = Router();

SubInventoryIdHashRoutes.use("/:hash", [
  middleware.get({ model: _Object, body: { key: 'hash' } }),
  middleware.getAssociation({ model: SubInventory, association: { name: "object" } }),
  ItemMiddleware.checkSameInventory({ data: { key: _Object }, other: [SubInventory, "object"] })
], SubInventoryObjectRoutes);

SubInventoryObjectRoutes.post("/", [
  auth.isAdmin,
  middleware.addAssociation({ model: SubInventory, association: { name: "objects", data: _Object } })
], controller.message("last"));

SubInventoryObjectRoutes.delete("/", [
  auth.isAdmin,
  middleware.removeAssociation({ model: SubInventory, association: { name: "objects", data: _Object } })
], controller.message("last"));