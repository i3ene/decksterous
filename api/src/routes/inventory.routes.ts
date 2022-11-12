import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { Inventory } from '../models/data/inventory.model';

export const InventoryRoutes = Router();

InventoryRoutes.get("/all", [middleware.findAll(Inventory)], controller.result(Inventory));

InventoryRoutes.get("/", [middleware.find(Inventory, ['items'])], controller.result(Inventory));

InventoryRoutes.post("/", [auth.isAdmin, middleware.add(Inventory)], controller.message("last"));

InventoryRoutes.put("/", [auth.isAdmin, middleware.get(Inventory), middleware.edit(Inventory)], controller.message("last"));

InventoryRoutes.delete("/", [auth.isAdmin, middleware.get(Inventory), middleware.remove(Inventory)], controller.message("last"));
