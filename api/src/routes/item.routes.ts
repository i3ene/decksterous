
import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { Item } from '../models/data/item.model';
import { CardRoutes } from './card.routes';

export const ItemRoutes = Router();

ItemRoutes.get("/all", [middleware.findAll({ model: Item})], controller.result(Item));

ItemRoutes.get("/", [middleware.find({ model: Item})], controller.result(Item));

ItemRoutes.post("/", [auth.isAdmin, middleware.add({ model: Item})], controller.message("last"));

ItemRoutes.put("/", [auth.isAdmin, middleware.get({ model: Item}), middleware.edit({ model: Item})], controller.message("last"));

ItemRoutes.delete("/", [auth.isAdmin, middleware.get({ model: Item}), middleware.remove({ model: Item})], controller.message("last"));

ItemRoutes.use('/card', CardRoutes);
