import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { Inventory } from '../models/data/inventory.model';
import { Item } from '../models/data/item.model';
import { User } from '../models/data/user.model';

export const InventoryRoutes = Router();

InventoryRoutes.get("/all", [middleware.findAll({ model: Inventory})], controller.result(Inventory));

InventoryRoutes.get("/", [middleware.find({ model: Inventory, scopes: ['items']})], controller.result(Inventory));

InventoryRoutes.post("/", [auth.isAdmin, middleware.add({ model: Inventory})], controller.message("last"));

InventoryRoutes.put("/", [auth.isAdmin, middleware.get({ model: Inventory}), middleware.get({ model: User, body: { key: "userId"}}), middleware.setAssociation({ model: User, association: { name: "inventory", data: Inventory}})], controller.message("last"));

InventoryRoutes.delete("/", [auth.isAdmin, middleware.get({ model: Inventory}), middleware.remove({ model: Inventory})], controller.message("last"));

InventoryRoutes.post("/item", [auth.isAdmin, middleware.get({ model: Inventory, body: { key: ["inventory", "id"]}}), middleware.get({ model: Item, body: { key: ["item", "id"]}}), middleware.addAssociation({ model: Inventory, association: { name: "items", data: Item}})], controller.message("last"));

InventoryRoutes.post("/items", [auth.isAdmin, middleware.get({ model: Inventory, body: { key: ["inventory", "id"]}}), middleware.getAll({ model: Item, list: { key: 'items', id: 'id'}}), middleware.addAssociation({ model: Inventory, association: { name: "items", data: Item}})], controller.message("last"));

InventoryRoutes.delete("/item", [auth.isAdmin, middleware.get({ model: Inventory, body: { key: ["inventory", "id"]}}), middleware.get({ model: Item, body: { key: ["item", "id"]}}), middleware.removeAssociation({ model: Inventory, association: { name: "items", data: Item}})], controller.message("last"));

InventoryRoutes.delete("/items", [auth.isAdmin, middleware.get({ model: Inventory, body: { key: ["inventory", "id"]}}), middleware.getAll({ model: Item, list: { key: 'items', id: 'id'}}), middleware.removeAssociation({ model: Inventory, association: { name: "items", data: Item}})], controller.message("last"));