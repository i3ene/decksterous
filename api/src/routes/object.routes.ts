import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { _Object } from "../models/data/object.model";
import { SubInventory } from "../models/data/subInventory.model";

export const ObjectRoutes = Router();

ObjectRoutes.get(["/all", "/all/:page"], [
  middleware.findAll({ model: _Object, page: { size: 100, key: "page" } })
], controller.result(_Object));

ObjectRoutes.post("/", [
  auth.isAdmin,
  middleware.add({ model: _Object })
], controller.result(_Object));


export const ObjectHashRoutes = Router();

ObjectRoutes.use("/:hash", [
  middleware.get({ model: _Object, scopes: ["item"], body: { key: 'hash' } })
], ObjectHashRoutes);

ObjectHashRoutes.get("/", controller.result(_Object));

ObjectHashRoutes.put("/", [
  auth.isAdmin,
  middleware.edit({ model: _Object })
], controller.result(_Object));

ObjectHashRoutes.delete("/", [
  auth.isAdmin,
  middleware.remove({ model: _Object })
], controller.message("last"));


export const ObjectHashSubInventoryRoutes = Router();

ObjectHashRoutes.use("/subInventory", [
  middleware.getAssociation({ model: _Object, association: { name: "subInventory" } })
], ObjectHashSubInventoryRoutes);

ObjectHashSubInventoryRoutes.get("/", controller.result([_Object, "subInventory"]));


export const ObjectHashSubInventoryObjectRoutes = Router();

ObjectHashSubInventoryRoutes.use("/object", ObjectHashSubInventoryObjectRoutes);

ObjectHashSubInventoryObjectRoutes.get("/", [
  middleware.getAssociation({ model: SubInventory, data: { key: [_Object, "subInventory"] }, association: { name: "objects" }, scopes: ["item"] })
], controller.result([_Object, "subInventory", "objects"]));

ObjectHashSubInventoryObjectRoutes.post("/", [
  auth.isAdmin,
  middleware.getAll({ model: _Object, data: { key: "objects" } }),
  middleware.addAssociation({ model: SubInventory, data: { key: [_Object, "subInventory"] }, association: { name: "objects", data: "objects" } })
], controller.message("last"));

ObjectHashSubInventoryObjectRoutes.put("/", [
  auth.isAdmin,
  middleware.getAll({ model: _Object, data: { key: "objects" } }),
  middleware.setAssociation({ model: SubInventory, data: { key: [_Object, "subInventory"] }, association: { name: "objects", data: "objects" } })
], controller.message("last"));

ObjectHashSubInventoryObjectRoutes.delete("/", [
  auth.isAdmin,
  middleware.getAll({ model: _Object, data: { key: "objects" } }),
  middleware.removeAssociation({ model: SubInventory, data: { key: [_Object, "subInventory"] }, association: { name: "objects", data: "objects" } })
], controller.message("last"));
