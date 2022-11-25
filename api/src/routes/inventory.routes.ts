import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { Inventory } from '../models/data/inventory.model';
import { Item } from '../models/data/item.model';
import { User } from '../models/data/user.model';

export const InventoryRoutes = Router();

InventoryRoutes.get("/all", [middleware.findAll(Inventory)], controller.result(Inventory));

InventoryRoutes.get("/", [middleware.find(Inventory, ['items'])], controller.result(Inventory));

InventoryRoutes.post("/", [auth.isAdmin, middleware.add(Inventory)], controller.message("last"));

InventoryRoutes.put("/", [auth.isAdmin, middleware.get(Inventory), middleware.get(User, [], undefined, "userId"), middleware.setAssociation(User, "inventory", Inventory)], controller.message("last"));

InventoryRoutes.delete("/", [auth.isAdmin, middleware.get(Inventory), middleware.remove(Inventory)], controller.message("last"));

InventoryRoutes.post("/item", [auth.isAdmin, middleware.get(Inventory, [], undefined, ["inventory", "id"]), middleware.get(Item, [], undefined, ["item", "id"]), middleware.addAssociation(Inventory, "items", Item)], controller.message("last"));

InventoryRoutes.delete("/item", [auth.isAdmin, middleware.get(Inventory, [], undefined, ["inventory", "id"]), middleware.getAll(Item, [], 'items', undefined, 'id'), middleware.removeAssociation(Inventory, "items", Item)], controller.message("last"));